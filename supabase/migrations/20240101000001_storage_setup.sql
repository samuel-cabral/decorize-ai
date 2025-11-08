-- Create storage bucket for room images
INSERT INTO storage.buckets (id, name, public)
VALUES ('room-images', 'room-images', true)
ON CONFLICT (id) DO NOTHING;

-- Storage policies for room-images bucket
CREATE POLICY "Users can upload their own room images"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
    bucket_id = 'room-images' 
    AND (storage.foldername(name))[1] = auth.uid()::text
);

CREATE POLICY "Users can view their own room images"
ON storage.objects FOR SELECT
TO authenticated
USING (
    bucket_id = 'room-images'
    AND (storage.foldername(name))[1] = auth.uid()::text
);

CREATE POLICY "Users can update their own room images"
ON storage.objects FOR UPDATE
TO authenticated
USING (
    bucket_id = 'room-images'
    AND (storage.foldername(name))[1] = auth.uid()::text
);

CREATE POLICY "Users can delete their own room images"
ON storage.objects FOR DELETE
TO authenticated
USING (
    bucket_id = 'room-images'
    AND (storage.foldername(name))[1] = auth.uid()::text
);

-- Allow public read access for public URLs
CREATE POLICY "Public can view room images"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'room-images');

