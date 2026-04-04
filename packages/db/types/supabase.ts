export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.4"
  }
  public: {
    Tables: {
      alerts: {
        Row: {
          created_at: string
          entity_id: string | null
          entity_type: string | null
          id: string
          is_read: boolean
          title: string
          type: string
          workspace_id: string
        }
        Insert: {
          created_at?: string
          entity_id?: string | null
          entity_type?: string | null
          id?: string
          is_read?: boolean
          title: string
          type: string
          workspace_id: string
        }
        Update: {
          created_at?: string
          entity_id?: string | null
          entity_type?: string | null
          id?: string
          is_read?: boolean
          title?: string
          type?: string
          workspace_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "alerts_workspace_id_fkey"
            columns: ["workspace_id"]
            isOneToOne: false
            referencedRelation: "workspaces"
            referencedColumns: ["id"]
          },
        ]
      }
      audit_events: {
        Row: {
          action: string
          actor_id: string | null
          after_data: Json | null
          before_data: Json | null
          created_at: string
          entity_id: string | null
          entity_type: string
          id: string
          ip_address: string | null
          user_agent: string | null
          workspace_id: string | null
        }
        Insert: {
          action: string
          actor_id?: string | null
          after_data?: Json | null
          before_data?: Json | null
          created_at?: string
          entity_id?: string | null
          entity_type: string
          id?: string
          ip_address?: string | null
          user_agent?: string | null
          workspace_id?: string | null
        }
        Update: {
          action?: string
          actor_id?: string | null
          after_data?: Json | null
          before_data?: Json | null
          created_at?: string
          entity_id?: string | null
          entity_type?: string
          id?: string
          ip_address?: string | null
          user_agent?: string | null
          workspace_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "audit_events_workspace_id_fkey"
            columns: ["workspace_id"]
            isOneToOne: false
            referencedRelation: "workspaces"
            referencedColumns: ["id"]
          },
        ]
      }
      change_orders: {
        Row: {
          amount_paise: number
          created_at: string
          description: string
          id: string
          line_items: Json
          project_id: string
          status: string
          timeline_days: number
          workspace_id: string
        }
        Insert: {
          amount_paise: number
          created_at?: string
          description: string
          id?: string
          line_items?: Json
          project_id: string
          status?: string
          timeline_days?: number
          workspace_id: string
        }
        Update: {
          amount_paise?: number
          created_at?: string
          description?: string
          id?: string
          line_items?: Json
          project_id?: string
          status?: string
          timeline_days?: number
          workspace_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "change_orders_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "change_orders_workspace_id_fkey"
            columns: ["workspace_id"]
            isOneToOne: false
            referencedRelation: "workspaces"
            referencedColumns: ["id"]
          },
        ]
      }
      clause_templates: {
        Row: {
          body: string
          id: string
          sort_order: number
          title: string
        }
        Insert: {
          body: string
          id?: string
          sort_order: number
          title: string
        }
        Update: {
          body?: string
          id?: string
          sort_order?: number
          title?: string
        }
        Relationships: []
      }
      clients: {
        Row: {
          address: Json
          company: string | null
          created_at: string
          deleted_at: string | null
          email: string
          gstin: string | null
          id: string
          name: string
          notes: string | null
          phone: string | null
          workspace_id: string
        }
        Insert: {
          address?: Json
          company?: string | null
          created_at?: string
          deleted_at?: string | null
          email: string
          gstin?: string | null
          id?: string
          name: string
          notes?: string | null
          phone?: string | null
          workspace_id: string
        }
        Update: {
          address?: Json
          company?: string | null
          created_at?: string
          deleted_at?: string | null
          email?: string
          gstin?: string | null
          id?: string
          name?: string
          notes?: string | null
          phone?: string | null
          workspace_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "clients_workspace_id_fkey"
            columns: ["workspace_id"]
            isOneToOne: false
            referencedRelation: "workspaces"
            referencedColumns: ["id"]
          },
        ]
      }
      contract_clauses: {
        Row: {
          body: string
          created_at: string
          id: string
          is_default: boolean
          sort_order: number
          title: string
          workspace_id: string
        }
        Insert: {
          body: string
          created_at?: string
          id?: string
          is_default?: boolean
          sort_order?: number
          title: string
          workspace_id: string
        }
        Update: {
          body?: string
          created_at?: string
          id?: string
          is_default?: boolean
          sort_order?: number
          title?: string
          workspace_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "contract_clauses_workspace_id_fkey"
            columns: ["workspace_id"]
            isOneToOne: false
            referencedRelation: "workspaces"
            referencedColumns: ["id"]
          },
        ]
      }
      invoices: {
        Row: {
          amount_paid_paise: number
          client_id: string
          created_at: string
          currency: string
          deleted_at: string | null
          due_at: string
          id: string
          invoice_number: string
          issued_at: string
          line_items: Json
          notes: string | null
          paid_at: string | null
          payment_link_url: string | null
          payment_provider: string | null
          payment_terms: string | null
          pdf_url: string | null
          project_id: string | null
          sent_at: string | null
          status: string
          subtotal_paise: number
          tax_paise: number
          total_paise: number
          voided_at: string | null
          workspace_id: string
        }
        Insert: {
          amount_paid_paise?: number
          client_id: string
          created_at?: string
          currency?: string
          deleted_at?: string | null
          due_at: string
          id?: string
          invoice_number: string
          issued_at?: string
          line_items?: Json
          notes?: string | null
          paid_at?: string | null
          payment_link_url?: string | null
          payment_provider?: string | null
          payment_terms?: string | null
          pdf_url?: string | null
          project_id?: string | null
          sent_at?: string | null
          status?: string
          subtotal_paise: number
          tax_paise?: number
          total_paise: number
          voided_at?: string | null
          workspace_id: string
        }
        Update: {
          amount_paid_paise?: number
          client_id?: string
          created_at?: string
          currency?: string
          deleted_at?: string | null
          due_at?: string
          id?: string
          invoice_number?: string
          issued_at?: string
          line_items?: Json
          notes?: string | null
          paid_at?: string | null
          payment_link_url?: string | null
          payment_provider?: string | null
          payment_terms?: string | null
          pdf_url?: string | null
          project_id?: string | null
          sent_at?: string | null
          status?: string
          subtotal_paise?: number
          tax_paise?: number
          total_paise?: number
          voided_at?: string | null
          workspace_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "invoices_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "invoices_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "invoices_workspace_id_fkey"
            columns: ["workspace_id"]
            isOneToOne: false
            referencedRelation: "workspaces"
            referencedColumns: ["id"]
          },
        ]
      }
      milestones: {
        Row: {
          amount_paise: number
          created_at: string
          description: string | null
          due_date: string | null
          id: string
          percentage: number | null
          project_id: string
          sort_order: number
          status: string
          title: string
          workspace_id: string
        }
        Insert: {
          amount_paise: number
          created_at?: string
          description?: string | null
          due_date?: string | null
          id?: string
          percentage?: number | null
          project_id: string
          sort_order?: number
          status?: string
          title: string
          workspace_id: string
        }
        Update: {
          amount_paise?: number
          created_at?: string
          description?: string | null
          due_date?: string | null
          id?: string
          percentage?: number | null
          project_id?: string
          sort_order?: number
          status?: string
          title?: string
          workspace_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "milestones_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "milestones_workspace_id_fkey"
            columns: ["workspace_id"]
            isOneToOne: false
            referencedRelation: "workspaces"
            referencedColumns: ["id"]
          },
        ]
      }
      payments: {
        Row: {
          amount_paise: number
          id: string
          invoice_id: string
          paid_at: string
          provider: string
          provider_payment_id: string
          status: string
          workspace_id: string
        }
        Insert: {
          amount_paise: number
          id?: string
          invoice_id: string
          paid_at?: string
          provider: string
          provider_payment_id: string
          status?: string
          workspace_id: string
        }
        Update: {
          amount_paise?: number
          id?: string
          invoice_id?: string
          paid_at?: string
          provider?: string
          provider_payment_id?: string
          status?: string
          workspace_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "payments_invoice_id_fkey"
            columns: ["invoice_id"]
            isOneToOne: false
            referencedRelation: "invoices"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "payments_workspace_id_fkey"
            columns: ["workspace_id"]
            isOneToOne: false
            referencedRelation: "workspaces"
            referencedColumns: ["id"]
          },
        ]
      }
      portal_tokens: {
        Row: {
          client_email: string
          created_at: string
          expires_at: string
          id: string
          project_id: string
          token_hash: string
          used_at: string | null
        }
        Insert: {
          client_email: string
          created_at?: string
          expires_at: string
          id?: string
          project_id: string
          token_hash: string
          used_at?: string | null
        }
        Update: {
          client_email?: string
          created_at?: string
          expires_at?: string
          id?: string
          project_id?: string
          token_hash?: string
          used_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "portal_tokens_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      project_messages: {
        Row: {
          body: string
          created_at: string
          id: string
          project_id: string
          sender_type: string
          workspace_id: string
        }
        Insert: {
          body: string
          created_at?: string
          id?: string
          project_id: string
          sender_type: string
          workspace_id: string
        }
        Update: {
          body?: string
          created_at?: string
          id?: string
          project_id?: string
          sender_type?: string
          workspace_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "project_messages_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "project_messages_workspace_id_fkey"
            columns: ["workspace_id"]
            isOneToOne: false
            referencedRelation: "workspaces"
            referencedColumns: ["id"]
          },
        ]
      }
      projects: {
        Row: {
          budget_paise: number | null
          client_id: string
          created_at: string
          deadline: string | null
          deleted_at: string | null
          estimated_hours: number | null
          hourly_rate_paise: number | null
          id: string
          notes: string | null
          proposal_id: string | null
          status: string
          title: string
          workspace_id: string
        }
        Insert: {
          budget_paise?: number | null
          client_id: string
          created_at?: string
          deadline?: string | null
          deleted_at?: string | null
          estimated_hours?: number | null
          hourly_rate_paise?: number | null
          id?: string
          notes?: string | null
          proposal_id?: string | null
          status?: string
          title: string
          workspace_id: string
        }
        Update: {
          budget_paise?: number | null
          client_id?: string
          created_at?: string
          deadline?: string | null
          deleted_at?: string | null
          estimated_hours?: number | null
          hourly_rate_paise?: number | null
          id?: string
          notes?: string | null
          proposal_id?: string | null
          status?: string
          title?: string
          workspace_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "projects_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "projects_workspace_id_fkey"
            columns: ["workspace_id"]
            isOneToOne: false
            referencedRelation: "workspaces"
            referencedColumns: ["id"]
          },
        ]
      }
      proposal_views: {
        Row: {
          id: string
          proposal_id: string
          user_agent: string | null
          viewed_at: string
          viewer_ip: string | null
        }
        Insert: {
          id?: string
          proposal_id: string
          user_agent?: string | null
          viewed_at?: string
          viewer_ip?: string | null
        }
        Update: {
          id?: string
          proposal_id?: string
          user_agent?: string | null
          viewed_at?: string
          viewer_ip?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "proposal_views_proposal_id_fkey"
            columns: ["proposal_id"]
            isOneToOne: false
            referencedRelation: "proposals"
            referencedColumns: ["id"]
          },
        ]
      }
      proposals: {
        Row: {
          addons: Json
          billing_type: string
          clauses_snapshot: Json | null
          client_id: string
          cover_message: string | null
          created_at: string
          deleted_at: string | null
          id: string
          line_items: Json
          payment_schedule: Json
          pdf_url: string | null
          signed_at: string | null
          signed_by_ip: string | null
          signed_by_name: string | null
          status: string
          subtotal_paise: number
          tax_paise: number
          title: string
          total_paise: number
          valid_until: string | null
          view_token: string | null
          workspace_id: string
        }
        Insert: {
          addons?: Json
          billing_type?: string
          clauses_snapshot?: Json | null
          client_id: string
          cover_message?: string | null
          created_at?: string
          deleted_at?: string | null
          id?: string
          line_items?: Json
          payment_schedule?: Json
          pdf_url?: string | null
          signed_at?: string | null
          signed_by_ip?: string | null
          signed_by_name?: string | null
          status?: string
          subtotal_paise?: number
          tax_paise?: number
          title: string
          total_paise?: number
          valid_until?: string | null
          view_token?: string | null
          workspace_id: string
        }
        Update: {
          addons?: Json
          billing_type?: string
          clauses_snapshot?: Json | null
          client_id?: string
          cover_message?: string | null
          created_at?: string
          deleted_at?: string | null
          id?: string
          line_items?: Json
          payment_schedule?: Json
          pdf_url?: string | null
          signed_at?: string | null
          signed_by_ip?: string | null
          signed_by_name?: string | null
          status?: string
          subtotal_paise?: number
          tax_paise?: number
          title?: string
          total_paise?: number
          valid_until?: string | null
          view_token?: string | null
          workspace_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "proposals_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "proposals_workspace_id_fkey"
            columns: ["workspace_id"]
            isOneToOne: false
            referencedRelation: "workspaces"
            referencedColumns: ["id"]
          },
        ]
      }
      tasks: {
        Row: {
          created_at: string
          deleted_at: string | null
          due_date: string | null
          estimated_hours: number | null
          id: string
          priority: string
          project_id: string
          sort_order: number
          status: string
          title: string
          workspace_id: string
        }
        Insert: {
          created_at?: string
          deleted_at?: string | null
          due_date?: string | null
          estimated_hours?: number | null
          id?: string
          priority?: string
          project_id: string
          sort_order?: number
          status?: string
          title: string
          workspace_id: string
        }
        Update: {
          created_at?: string
          deleted_at?: string | null
          due_date?: string | null
          estimated_hours?: number | null
          id?: string
          priority?: string
          project_id?: string
          sort_order?: number
          status?: string
          title?: string
          workspace_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "tasks_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tasks_workspace_id_fkey"
            columns: ["workspace_id"]
            isOneToOne: false
            referencedRelation: "workspaces"
            referencedColumns: ["id"]
          },
        ]
      }
      time_entries: {
        Row: {
          created_at: string
          duration_secs: number
          ended_at: string
          id: string
          invoiced_at: string | null
          is_billable: boolean
          notes: string | null
          project_id: string
          started_at: string
          task_id: string | null
          workspace_id: string
        }
        Insert: {
          created_at?: string
          duration_secs: number
          ended_at: string
          id?: string
          invoiced_at?: string | null
          is_billable?: boolean
          notes?: string | null
          project_id: string
          started_at: string
          task_id?: string | null
          workspace_id: string
        }
        Update: {
          created_at?: string
          duration_secs?: number
          ended_at?: string
          id?: string
          invoiced_at?: string | null
          is_billable?: boolean
          notes?: string | null
          project_id?: string
          started_at?: string
          task_id?: string | null
          workspace_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "time_entries_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "time_entries_task_id_fkey"
            columns: ["task_id"]
            isOneToOne: false
            referencedRelation: "tasks"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "time_entries_workspace_id_fkey"
            columns: ["workspace_id"]
            isOneToOne: false
            referencedRelation: "workspaces"
            referencedColumns: ["id"]
          },
        ]
      }
      webhook_events: {
        Row: {
          event_type: string
          id: string
          processed_at: string
          provider: string
          provider_event_id: string
        }
        Insert: {
          event_type: string
          id?: string
          processed_at?: string
          provider: string
          provider_event_id: string
        }
        Update: {
          event_type?: string
          id?: string
          processed_at?: string
          provider?: string
          provider_event_id?: string
        }
        Relationships: []
      }
      workspaces: {
        Row: {
          address: Json
          created_at: string
          currency: string
          deleted_at: string | null
          gstin: string | null
          id: string
          logo_url: string | null
          name: string
          owner_id: string
          settings: Json
          slug: string
        }
        Insert: {
          address?: Json
          created_at?: string
          currency?: string
          deleted_at?: string | null
          gstin?: string | null
          id?: string
          logo_url?: string | null
          name: string
          owner_id: string
          settings?: Json
          slug: string
        }
        Update: {
          address?: Json
          created_at?: string
          currency?: string
          deleted_at?: string | null
          gstin?: string | null
          id?: string
          logo_url?: string | null
          name?: string
          owner_id?: string
          settings?: Json
          slug?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      custom_access_token_hook: { Args: { event: Json }; Returns: Json }
      workspace_id: { Args: never; Returns: string }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
