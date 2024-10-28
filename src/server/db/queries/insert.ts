import { db } from '../index.js'
import {
  type InsertRating,
  type InsertUser,
  type InsertWatchlist,
  type InsertWatchlistedMovie,
  ratings,
  users,
  watchlistedMovies,
  watchlists,
} from '../schema.js'

export async function createUser(data: InsertUser) {
  await db.insert(users).values(data)
}

export async function createWatchlist(data: InsertWatchlist) {
  await db.insert(watchlists).values(data)
}

export async function createRating(data: InsertRating) {
  await db.insert(ratings).values(data)
}

export async function createWatchlistedMovie(data: InsertWatchlistedMovie) {
  await db.insert(watchlistedMovies).values(data)
}
