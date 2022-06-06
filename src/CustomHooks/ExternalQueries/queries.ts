import { getProfileName } from './api'
import { pipe } from 'fp-ts/lib/function'
import { taskEither, task, either } from 'fp-ts'
import { useQuery } from 'react-query'

export const throwLeft: <L, R>(ma: taskEither.TaskEither<L, R>) => task.Task<R> = task.map(
  either.fold(
    (e) => {
      throw e
    },
    (x) => x
  )
)

export const useGetProfileNames = (nymID?: string) =>
  useQuery(['profiles', nymID], pipe(getProfileName(nymID), throwLeft), {
    keepPreviousData: true,
  })
