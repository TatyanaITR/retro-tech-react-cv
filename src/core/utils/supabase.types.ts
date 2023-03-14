export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[];

export interface Database {
  public: {
    Tables: {
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
          type: string;
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
          type?: string;
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
          type?: string;
          updated_at?: string | null;
          windowtype?: string;
        };
      };
      folders: {
        Row: {
          created_at: string | null;
          icon_name: string | null;
          id: string;
          is_removable: boolean;
          parent_id: string | null;
          title: string;
          tooltip: string | null;
          type: string;
          updated_at: string | null;
        };
        Insert: {
          created_at?: string | null;
          icon_name?: string | null;
          id?: string;
          is_removable?: boolean;
          parent_id?: string | null;
          title: string;
          tooltip?: string | null;
          type?: string;
          updated_at?: string | null;
        };
        Update: {
          created_at?: string | null;
          icon_name?: string | null;
          id?: string;
          is_removable?: boolean;
          parent_id?: string | null;
          title?: string;
          tooltip?: string | null;
          type?: string;
          updated_at?: string | null;
        };
      };
      labels: {
        Row: {
          created_at: string | null;
          icon_name: string | null;
          id: string;
          link_id: string;
          linktype: string;
          parent_id: string | null;
          title: string;
          type: string;
          updated_at: string | null;
        };
        Insert: {
          created_at?: string | null;
          icon_name?: string | null;
          id?: string;
          link_id: string;
          linktype: string;
          parent_id?: string | null;
          title: string;
          type?: string;
          updated_at?: string | null;
        };
        Update: {
          created_at?: string | null;
          icon_name?: string | null;
          id?: string;
          link_id?: string;
          linktype?: string;
          parent_id?: string | null;
          title?: string;
          type?: string;
          updated_at?: string | null;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      get_all_data: {
        Args: Record<PropertyKey, never>;
        Returns: Json[];
      };
      get_data: {
        Args: Record<PropertyKey, never>;
        Returns: Json[];
      };
      get_documents: {
        Args: Record<PropertyKey, never>;
        Returns: Json[];
      };
      get_folder_with_subitems: {
        Args: {
          id_input: string;
        };
        Returns: Json;
      };
      get_folders: {
        Args: Record<PropertyKey, never>;
        Returns: Json[];
      };
      get_Labels: {
        Args: Record<PropertyKey, never>;
        Returns: Json[];
      };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      document: {
        content: string;
        created_at: string;
        icon_name: string;
        id: string;
        is_removable: boolean;
        parent_id: string;
        size: Json;
        title: string;
        tooltip: string;
        type: string;
        updated_at: string;
        windowtype: string;
      };
      document_Label: {
        created_at: string;
        id: string;
        is_removable: boolean;
        link_id: string;
        parent_id: string;
        updated_at: string;
      };
      document_Label_type: {
        id: string;
        name: string;
        folder_id: string;
      };
      document_type: {
        id: string;
        name: string;
        folder_id: string;
      };
      folder: {
        created_at: string;
        icon_name: string;
        id: string;
        is_removable: boolean;
        parent_id: string;
        title: string;
        tooltip: string;
        type: string;
        updated_at: string;
      };
      folder_Label: {
        created_at: string;
        id: string;
        is_removable: boolean;
        link_id: string;
        parent_id: string;
        updated_at: string;
      };
      folder_Label_type: {
        id: string;
        name: string;
        folder_id: string;
      };
      folder_type: {
        id: string;
        name: string;
        parent_folder_id: string;
      };
      ifullfolder: {
        folder: Database["public"]["CompositeTypes"]["folder_type"];
        subfolders: unknown;
        documents: unknown;
        folder_Labels: unknown;
        document_Labels: unknown;
      };
    };
  };
}
