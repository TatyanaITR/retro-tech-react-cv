export type Folder = IDatabase["public"]["Tables"]["folders"]["Row"];
export type Document = IDatabase["public"]["Tables"]["documents"]["Row"];
export type Folder_shortcut =
  IDatabase["public"]["Tables"]["folders_shortcuts"]["Row"];
export type Document_shortcut =
  IDatabase["public"]["Tables"]["docs_shortcuts"]["Row"];

type Json = string | number | boolean | null | { [key: string]: Json } | Json[];

interface IDatabase {
  public: {
    Tables: {
      docs_shortcuts: {
        Row: {
          created_at: string | null;
          id: string;
          is_removable: boolean;
          link_id: string;
          parent_id: string | null;
          updated_at: string | null;
        };
        Insert: {
          created_at?: string | null;
          id?: string;
          is_removable?: boolean;
          link_id: string;
          parent_id?: string | null;
          updated_at?: string | null;
        };
        Update: {
          created_at?: string | null;
          id?: string;
          is_removable?: boolean;
          link_id?: string;
          parent_id?: string | null;
          updated_at?: string | null;
        };
      };
      documents: {
        Row: {
          content: string | null;
          created_at: string | null;
          icon_name: string | null;
          id: string;
          is_removable: boolean;
          parent_id: string | null;
          size: Json | null;
          title: string;
          tooltip: string | null;
          type: string | null;
          updated_at: string | null;
          windowtype: string;
        };
        Insert: {
          content?: string | null;
          created_at?: string | null;
          icon_name?: string | null;
          id?: string;
          is_removable: boolean;
          parent_id?: string | null;
          size?: Json | null;
          title: string;
          tooltip?: string | null;
          type?: string | null;
          updated_at?: string | null;
          windowtype: string;
        };
        Update: {
          content?: string | null;
          created_at?: string | null;
          icon_name?: string | null;
          id?: string;
          is_removable?: boolean;
          parent_id?: string | null;
          size?: Json | null;
          title?: string;
          tooltip?: string | null;
          type?: string | null;
          updated_at?: string | null;
          windowtype?: string;
        };
      };
      folders: {
        Row: {
          created_at: string | null;
          icon_name: string | null;
          id: string;
          inner_docs: string[] | null;
          is_removable: boolean;
          parent_id: string | null;
          title: string;
          tooltip: string | null;
          type: string | null;
          updated_at: string | null;
        };
        Insert: {
          created_at?: string | null;
          icon_name?: string | null;
          id?: string;
          inner_docs?: string[] | null;
          is_removable?: boolean;
          parent_id?: string | null;
          title: string;
          tooltip?: string | null;
          type?: string | null;
          updated_at?: string | null;
        };
        Update: {
          created_at?: string | null;
          icon_name?: string | null;
          id?: string;
          inner_docs?: string[] | null;
          is_removable?: boolean;
          parent_id?: string | null;
          title?: string;
          tooltip?: string | null;
          type?: string | null;
          updated_at?: string | null;
        };
      };
      folders_shortcuts: {
        Row: {
          created_at: string | null;
          id: string;
          is_removable: boolean;
          link_id: string;
          parent_id: string | null;
          updated_at: string | null;
        };
        Insert: {
          created_at?: string | null;
          id?: string;
          is_removable?: boolean;
          link_id: string;
          parent_id?: string | null;
          updated_at?: string | null;
        };
        Update: {
          created_at?: string | null;
          id?: string;
          is_removable?: boolean;
          link_id?: string;
          parent_id?: string | null;
          updated_at?: string | null;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}
