import axios, { AxiosError, AxiosResponse, AxiosRequestConfig } from 'axios'
import * as t from 'io-ts'
import { taskEither, either, task } from 'fp-ts'
import { flow, identity } from 'fp-ts/lib/function'
import { failure } from 'io-ts/lib/PathReporter'
import { pipe } from 'fp-ts/lib/function'
export { CancelToken } from 'axios'

type RequestConfig<A, B = unknown> = AxiosRequestConfig & {
  encoder?: t.Encoder<B, any>
  decoder: t.Decoder<unknown, A>
}

axios.defaults.withCredentials = true

export const isAxiosError = (u: unknown): u is AxiosError =>
  u instanceof Object && u instanceof Error && 'isAxiosError' in u

const AxiosErrorC = new t.Type<AxiosError, AxiosError, unknown>(
  'AxiosError',
  isAxiosError,
  (u, c) => (isAxiosError(u) ? t.success(u) : t.failure(u, c)),
  t.identity
)

export const validationErrToErr = (es: t.ValidationError[]) => new TypeError(failure(es).join('\n'))

const axiosErr = flow(AxiosErrorC.decode, either.fold(validationErrToErr, identity))

const decodeResponse = <A>(decoder: t.Decoder<unknown, A>) =>
  taskEither.chain((x: AxiosResponse<any>) =>
    pipe(task.of(decoder.decode(x.data)), taskEither.mapLeft(validationErrToErr))
  )

export const get = <A>(
  url: string,
  { decoder, ...config }: RequestConfig<A>
): taskEither.TaskEither<Error, A> =>
  pipe(
    taskEither.tryCatch(() => axios.get(url, config), axiosErr),
    decodeResponse(decoder)
  )

export const delete_ = <A>(
  url: string,
  { decoder, ...config }: RequestConfig<A>
): taskEither.TaskEither<Error, A> =>
  pipe(
    taskEither.tryCatch(() => axios.delete(url, config), axiosErr),
    decodeResponse(decoder)
  )

export const post = <A, B>(
  url: string,
  body: B,
  { decoder, encoder, ...config }: RequestConfig<A, B>
): taskEither.TaskEither<Error, A> =>
  pipe(
    taskEither.tryCatch(
      () => axios.post(url, !!encoder ? encoder.encode(body) : body, config),
      axiosErr
    ),
    decodeResponse(decoder)
  )
export const remove = <A>(
  url: string,
  { decoder, ...config }: RequestConfig<A>
): taskEither.TaskEither<Error, A> =>
  pipe(
    taskEither.tryCatch(() => axios.delete(url, config), axiosErr),
    decodeResponse(decoder)
  )
export const put = <A, B>(
  url: string,
  body: B,
  { decoder, encoder, ...config }: RequestConfig<A, B>
): taskEither.TaskEither<Error, A> =>
  pipe(
    taskEither.tryCatch(
      () => axios.put(url, !!encoder ? encoder.encode(body) : body, config),
      axiosErr
    ),
    decodeResponse(decoder)
  )
