// Placeholder Supabase types — permissive until real types are generated:
//   supabase gen types typescript --project-id <id> > packages/db/types.ts
// Permissive shape lets queries compile against any table; row data is `unknown`
// rather than `never`, so callers cast at the read site.
type PermissiveRow = Record<string, unknown>

export type Database = {
  public: {
    Tables: Record<
      string,
      {
        Row: PermissiveRow
        Insert: PermissiveRow
        Update: PermissiveRow
        Relationships: []
      }
    >
    Views: Record<string, never>
    Functions: Record<string, never>
  }
}
