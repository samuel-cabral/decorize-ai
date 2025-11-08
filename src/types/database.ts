export type Profile = {
	id: string;
	full_name: string | null;
	avatar_url: string | null;
	created_at: string;
	updated_at: string;
};

export type ProjectStatus = "pending" | "processing" | "completed" | "failed";

export type Project = {
	id: string;
	user_id: string;
	name: string;
	description: string | null;
	location: string | null;
	original_image_url: string;
	result_image_url: string | null;
	selected_styles: string[];
	ai_prompt: string | null;
	is_favorite: boolean;
	status: ProjectStatus;
	error_message: string | null;
	created_at: string;
	updated_at: string;
};


