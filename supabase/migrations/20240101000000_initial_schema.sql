-- Create projects table
CREATE TABLE IF NOT EXISTS public.projects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    place_type TEXT NOT NULL CHECK (place_type IN ('house', 'apartment')),
    status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'processing', 'completed', 'error')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create rooms table
CREATE TABLE IF NOT EXISTS public.rooms (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
    room_type TEXT NOT NULL,
    name TEXT NOT NULL,
    original_image_url TEXT,
    styles TEXT[] NOT NULL DEFAULT '{}',
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'completed', 'error')),
    error_message TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create previews table
CREATE TABLE IF NOT EXISTS public.previews (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    room_id UUID NOT NULL REFERENCES public.rooms(id) ON DELETE CASCADE,
    result_image_url TEXT NOT NULL,
    metadata JSONB,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_projects_user_id ON public.projects(user_id);
CREATE INDEX IF NOT EXISTS idx_projects_status ON public.projects(status);
CREATE INDEX IF NOT EXISTS idx_rooms_project_id ON public.rooms(project_id);
CREATE INDEX IF NOT EXISTS idx_rooms_status ON public.rooms(status);
CREATE INDEX IF NOT EXISTS idx_previews_room_id ON public.previews(room_id);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add triggers to update updated_at
CREATE TRIGGER update_projects_updated_at
    BEFORE UPDATE ON public.projects
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_rooms_updated_at
    BEFORE UPDATE ON public.rooms
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.rooms ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.previews ENABLE ROW LEVEL SECURITY;

-- RLS Policies for projects table
CREATE POLICY "Users can view their own projects"
    ON public.projects FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own projects"
    ON public.projects FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own projects"
    ON public.projects FOR UPDATE
    USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own projects"
    ON public.projects FOR DELETE
    USING (auth.uid() = user_id);

-- RLS Policies for rooms table
CREATE POLICY "Users can view rooms from their projects"
    ON public.rooms FOR SELECT
    USING (EXISTS (
        SELECT 1 FROM public.projects
        WHERE projects.id = rooms.project_id
        AND projects.user_id = auth.uid()
    ));

CREATE POLICY "Users can create rooms in their projects"
    ON public.rooms FOR INSERT
    WITH CHECK (EXISTS (
        SELECT 1 FROM public.projects
        WHERE projects.id = rooms.project_id
        AND projects.user_id = auth.uid()
    ));

CREATE POLICY "Users can update rooms from their projects"
    ON public.rooms FOR UPDATE
    USING (EXISTS (
        SELECT 1 FROM public.projects
        WHERE projects.id = rooms.project_id
        AND projects.user_id = auth.uid()
    ));

CREATE POLICY "Users can delete rooms from their projects"
    ON public.rooms FOR DELETE
    USING (EXISTS (
        SELECT 1 FROM public.projects
        WHERE projects.id = rooms.project_id
        AND projects.user_id = auth.uid()
    ));

-- RLS Policies for previews table
CREATE POLICY "Users can view previews from their rooms"
    ON public.previews FOR SELECT
    USING (EXISTS (
        SELECT 1 FROM public.rooms
        INNER JOIN public.projects ON projects.id = rooms.project_id
        WHERE rooms.id = previews.room_id
        AND projects.user_id = auth.uid()
    ));

CREATE POLICY "Users can create previews in their rooms"
    ON public.previews FOR INSERT
    WITH CHECK (EXISTS (
        SELECT 1 FROM public.rooms
        INNER JOIN public.projects ON projects.id = rooms.project_id
        WHERE rooms.id = previews.room_id
        AND projects.user_id = auth.uid()
    ));

CREATE POLICY "Users can delete previews from their rooms"
    ON public.previews FOR DELETE
    USING (EXISTS (
        SELECT 1 FROM public.rooms
        INNER JOIN public.projects ON projects.id = rooms.project_id
        WHERE rooms.id = previews.room_id
        AND projects.user_id = auth.uid()
    ));

