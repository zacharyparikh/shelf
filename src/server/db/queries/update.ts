import { and, eq } from 'drizzle-orm'
import { db } from '../index.js'
import { type SelectRating, ratings } from '../schema.js'

export async function updateRating(
  userId: SelectRating['user_id'],
  movieId: SelectRating['movie_id'],
  data: Partial<Omit<SelectRating, 'user_id' | 'movie_id'>>,
) {
  await db
    .update(ratings)
    .set(data)
    .where(and(eq(ratings.user_id, userId), eq(ratings.movie_id, movieId)))
}
