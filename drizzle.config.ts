import type { Config } from 'drizzle-kit'

console.log(process.env.DATABSE_URL)

export default {
  schema: './src/infra/database/drizzle/schema.ts',
  out: './src/infra/database/drizzle/migrations',
  driver: 'libsql', // 'pg' | 'mysql2' | 'better-sqlite' | 'libsql' | 'turso'
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
} satisfies Config
