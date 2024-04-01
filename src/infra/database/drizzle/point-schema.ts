import { text, integer, sqliteTable } from 'drizzle-orm/sqlite-core'

export const points = sqliteTable('points', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  xCoord: integer('x_coord').notNull(),
  yCoord: integer('y_coord').notNull(),
})
