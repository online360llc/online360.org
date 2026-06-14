import Database from 'better-sqlite3';
import path from 'path';
import fs from 'fs';

let dbInstance: Database.Database | null = null;

export function getDb() {
  if (dbInstance) return dbInstance;

  const dataDir = process.env.DATA_DIR || path.join(process.cwd(), 'data');
  
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }

  const dbPath = path.join(dataDir, 'online360.db');
  
  dbInstance = new Database(dbPath);
  
  // Basic optimization pragmas
  dbInstance.pragma('journal_mode = WAL');
  dbInstance.pragma('synchronous = NORMAL');

  // Initialize schema
  dbInstance.exec(`
    CREATE TABLE IF NOT EXISTS projects (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      slug TEXT UNIQUE NOT NULL,
      name TEXT NOT NULL,
      description TEXT NOT NULL,
      url TEXT,
      category TEXT,
      featured BOOLEAN DEFAULT 0,
      icon_name TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  dbInstance.exec(`
    CREATE TABLE IF NOT EXISTS contacts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      message TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  return dbInstance;
}

export interface Project {
  id: number;
  slug: string;
  name: string;
  description: string;
  url: string;
  category: string;
  featured: boolean;
  icon_name: string;
}

export interface Contact {
  id: number;
  name: string;
  email: string;
  message: string;
  created_at: string;
}
