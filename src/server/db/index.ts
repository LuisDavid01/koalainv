import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema';
import dotenv from "dotenv";
import { neon } from '@neondatabase/serverless';

dotenv.config()

const globalForDb = globalThis as unknown as { 
	conn : ReturnType<typeof neon> | undefined
}

const conn = globalForDb.conn ?? neon(process.env.DATABASE_URL!)

if (process.env.NODE_ENV === 'production') globalForDb.conn = conn
export const db = drizzle(conn, {schema});

