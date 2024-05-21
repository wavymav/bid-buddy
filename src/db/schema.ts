import { integer, pgTable, serial, timestamp } from 'drizzle-orm/pg-core'

export const bids = pgTable('bb_bids', {
  id: serial('id').primaryKey(),
})
