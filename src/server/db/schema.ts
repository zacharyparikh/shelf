import { relations } from 'drizzle-orm'
import {
  integer,
  pgTable,
  primaryKey,
  serial,
  text,
  timestamp,
} from 'drizzle-orm/pg-core'

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
})

export const usersRelations = relations(users, ({ many }) => ({
  watchlists: many(watchlists),
  ratings: many(ratings),
}))

export const watchlists = pgTable('watchlists', {
  id: serial().primaryKey(),
  title: text(),
  user_id: integer()
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  created_at: timestamp().notNull().defaultNow(),
  updated_at: timestamp()
    .notNull()
    .$onUpdate(() => new Date()),
})

export const watchlistsRelations = relations(watchlists, ({ one, many }) => ({
  user: one(users, { fields: [watchlists.user_id], references: [users.id] }),
  movies: many(watchlistedMovies),
}))

export const watchlistedMovies = pgTable(
  'watchlisted_movies',
  {
    movie_id: integer(),
    watchlist_id: integer()
      .notNull()
      .references(() => watchlists.id, {
        onDelete: 'cascade',
      }),
    added_at: timestamp().notNull().defaultNow(),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.movie_id, table.watchlist_id] }),
  }),
)

export const watchlistedMoviesRelations = relations(
  watchlistedMovies,
  ({ one }) => ({
    watchlist: one(watchlists, {
      fields: [watchlistedMovies.watchlist_id],
      references: [watchlists.id],
    }),
  }),
)

export const ratings = pgTable(
  'ratings',
  {
    movie_id: integer().notNull(),
    user_id: integer()
      .notNull()
      .references(() => users.id, {
        onDelete: 'cascade',
      }),
    rating: text({
      enum: ['0.5', '1', '1.5', '2', '2.5', '3', '3.5', '4', '4.5', '5'],
    }).notNull(),
    rated_at: timestamp().notNull().defaultNow(),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.movie_id, table.user_id] }),
  }),
)

export type InsertUser = typeof users.$inferInsert
export type SelectUser = typeof users.$inferSelect

export type InsertWatchlist = typeof watchlists.$inferInsert
export type SelectWatchlist = typeof watchlists.$inferSelect

export type InsertWatchlistedMovie = typeof watchlistedMovies.$inferInsert
export type SelectWatchlistedMovie = typeof watchlistedMovies.$inferSelect

export type InsertRating = typeof ratings.$inferInsert
export type SelectRating = typeof ratings.$inferSelect
