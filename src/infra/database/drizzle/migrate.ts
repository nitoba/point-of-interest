import { migrate } from 'drizzle-orm/bun-sqlite/migrator'
import { Database } from 'bun:sqlite'
import { drizzle } from 'drizzle-orm/bun-sqlite'
import * as schema from './schema'

async function main() {
  const sqlite = new Database('sqlite.db')
  const db = drizzle(sqlite, { schema })
  migrate(db, {
    migrationsFolder: './src/infra/database/drizzle/migrations',
  })

  sqlite.close()
}

main().then(() => {
  console.log('Migrations completed')
})
