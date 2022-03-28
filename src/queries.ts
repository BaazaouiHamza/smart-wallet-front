import { either, task, taskEither } from 'fp-ts'
import { pipe } from 'fp-ts/lib/function'
import { useMutation, useQuery, useQueryClient } from 'react-query'

export const throwLeft = <L, R>(t: taskEither.TaskEither<L, R>) =>
  pipe(
    t,
    task.map(
      either.fold(
        (e) => {
          throw e
        },
        (x) => x
      )
    )
  )

// @ts-ignore
const getThing = (id: number) => undefined as taskEither.TaskEither<unknown, { foo: string }>

// @ts-ignore
const addThing = (_: { foo: string }) =>
  undefined as taskEither.TaskEither<unknown, { id: number; foo: string }>

const useThings = (id: number) => {
  return useQuery(['things', id], pipe(getThing(id), throwLeft))
}

const useAddThing = () => {
  const queryClient = useQueryClient()

  return useMutation('add-thing', (t: { foo: string }) => addThing(t)(), {
    onSuccess: () => {
      queryClient.invalidateQueries('things')
    },
  })
}
