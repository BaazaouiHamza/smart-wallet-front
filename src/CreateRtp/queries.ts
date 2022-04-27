// import { pipe } from 'fp-ts/lib/function'
// import { useMutation } from 'react-query'
// import { taskEither, task, either } from 'fp-ts'
// import { createRtp } from './api'
// export const throwLeft: <L, R>(ma: taskEither.TaskEither<L, R>) => task.Task<R> = task.map(
//     either.fold(
//       (e) => {
//         throw e
//       },
//       (x) => x
//     )
//   )

//   export const useCreateRtp= ({...data}) => {
//     return useMutation(createRtp),pipe()
//   }