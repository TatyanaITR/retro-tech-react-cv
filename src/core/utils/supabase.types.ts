export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      documents: {
        Row: {
          content: string | null
          created_at: string | null
          icon_name: string | null
          id: string
          is_removable: boolean
          parent_id: string | null
          size: Json | null
          title: string
          tooltip: string | null
          type: string | null
          updated_at: string | null
          windowtype: string
        }
        Insert: {
          content?: string | null
          created_at?: string | null
          icon_name?: string | null
          id?: string
          is_removable: boolean
          parent_id?: string | null
          size?: Json | null
          title: string
          tooltip?: string | null
          type?: string | null
          updated_at?: string | null
          windowtype: string
        }
        Update: {
          content?: string | null
          created_at?: string | null
          icon_name?: string | null
          id?: string
          is_removable?: boolean
          parent_id?: string | null
          size?: Json | null
          title?: string
          tooltip?: string | null
          type?: string | null
          updated_at?: string | null
          windowtype?: string
        }
      }
      documents_shortcuts: {
        Row: {
          created_at: string | null
          id: string
          is_removable: boolean
          link_id: string
          parent_id: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          is_removable?: boolean
          link_id: string
          parent_id?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          is_removable?: boolean
          link_id?: string
          parent_id?: string | null
          updated_at?: string | null
        }
      }
      folders: {
        Row: {
          created_at: string | null
          icon_name: string | null
          id: string
          is_removable: boolean
          parent_id: string | null
          title: string
          tooltip: string | null
          type: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          icon_name?: string | null
          id?: string
          is_removable?: boolean
          parent_id?: string | null
          title: string
          tooltip?: string | null
          type?: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          icon_name?: string | null
          id?: string
          is_removable?: boolean
          parent_id?: string | null
          title?: string
          tooltip?: string | null
          type?: string
          updated_at?: string | null
        }
      }
      folders_shortcuts: {
        Row: {
          created_at: string | null
          id: string
          is_removable: boolean
          link_id: string
          parent_id: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          is_removable?: boolean
          link_id: string
          parent_id?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          is_removable?: boolean
          link_id?: string
          parent_id?: string | null
          updated_at?: string | null
        }
      }
      inner_docs: {
        Row: {
          documents: string[] | null
          documents_shortcuts: string[] | null
          folder_id: string | null
          folders: string[] | null
          folders_shortcuts: string[] | null
          id: string
        }
        Insert: {
          documents?: string[] | null
          documents_shortcuts?: string[] | null
          folder_id?: string | null
          folders?: string[] | null
          folders_shortcuts?: string[] | null
          id?: string
        }
        Update: {
          documents?: string[] | null
          documents_shortcuts?: string[] | null
          folder_id?: string | null
          folders?: string[] | null
          folders_shortcuts?: string[] | null
          id?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
