export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      projects: {
        Row: {
          id: string;
          user_id: string;
          name: string;
          place_type: "house" | "apartment";
          status: "draft" | "processing" | "completed" | "error";
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          name: string;
          place_type: "house" | "apartment";
          status?: "draft" | "processing" | "completed" | "error";
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          name?: string;
          place_type?: "house" | "apartment";
          status?: "draft" | "processing" | "completed" | "error";
          created_at?: string;
          updated_at?: string;
        };
      };
      rooms: {
        Row: {
          id: string;
          project_id: string;
          room_type: string;
          name: string;
          original_image_url: string | null;
          styles: string[];
          status: "pending" | "processing" | "completed" | "error";
          error_message: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          project_id: string;
          room_type: string;
          name: string;
          original_image_url?: string | null;
          styles?: string[];
          status?: "pending" | "processing" | "completed" | "error";
          error_message?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          project_id?: string;
          room_type?: string;
          name?: string;
          original_image_url?: string | null;
          styles?: string[];
          status?: "pending" | "processing" | "completed" | "error";
          error_message?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      previews: {
        Row: {
          id: string;
          room_id: string;
          result_image_url: string;
          metadata: Json | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          room_id: string;
          result_image_url: string;
          metadata?: Json | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          room_id?: string;
          result_image_url?: string;
          metadata?: Json | null;
          created_at?: string;
        };
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
  };
}

