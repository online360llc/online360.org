// SQLite (better-sqlite3) has been replaced by Prisma + PostgreSQL.
// This file is kept as a re-export shim so any remaining imports still resolve.
export { prisma } from './prisma';

export interface Project {
  id: number;
  slug: string;
  name: string;
  description: string;
  url: string | null;
  category: string | null;
  featured: boolean;
  icon_name: string | null;
  created_at: Date;
}

export interface Contact {
  id: number;
  name: string;
  email: string;
  message: string;
  created_at: Date;
}
