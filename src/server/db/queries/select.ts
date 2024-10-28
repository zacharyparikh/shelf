import { db } from '../index.js'
import {
  type SelectRating,
  type SelectWatchlist,
  type SelectWatchlistedMovie,
} from '../schema.js'

export async function getWatchlistsByUserId(
  userId: SelectWatchlist['user_id'],
) {
  return db.query.watchlists.findMany({
    where: (watchlists, { eq }) => eq(watchlists.user_id, userId),
  })
}

export async function getMoviesByWatchlistId(
  watchlistId: SelectWatchlistedMovie['watchlist_id'],
) {
  return db.query.watchlistedMovies.findMany({
    where: (movies, { eq }) => eq(movies.watchlist_id, watchlistId),
    with: {
      watchlist: {
        with: {
          user: {
            with: {
              ratings: true,
            },
            columns: {},
          },
        },
        columns: {},
      },
    },
  })
}

export async function getRatingsByUserId(userId: SelectRating['user_id']) {
  return db.query.ratings.findMany({
    where: (ratings, { eq }) => eq(ratings.user_id, userId),
  })
}
