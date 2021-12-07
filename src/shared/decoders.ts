import { HttpRequest } from '@marblejs/core'
import * as E from 'fp-ts/Either'
import { pipe } from 'fp-ts/lib/function'
import * as D from 'io-ts/Decoder'
import { of, OperatorFunction } from 'rxjs'
import * as rx from 'rxjs/operators'
import { throwBadRequest } from '../exceptions/bad-request'
import { ErrorMsg } from './types'

const validate = (key: 'body' | 'params') => <T>(
  decoder: D.Decoder<unknown, T>,
): OperatorFunction<HttpRequest<unknown, unknown, unknown>, T> =>
  rx.mergeMap((req: HttpRequest) =>
    pipe(
      req[key],
      ioDecoder(decoder),
      E.fold(
        errorMsg => throwBadRequest(errorMsg)(),
        validated => of(validated),
      ),
    ),
  )

/**
 * Decodes an object using io-ts
 * @param {D.Decoder} decoder a decoder to be used to decode the object
 * @param {unknown} obj an object to be decoded
 * @returns Either an ErrorMessage (string) or the obj
 */
export const ioDecoder = <T>(decoder: D.Decoder<unknown, T>) => (
  obj: unknown,
): E.Either<ErrorMsg, T> => E.mapLeft(D.draw)(decoder.decode(obj))

/**
 * Validates the body of arequest.
 * @param decoder
 * @return validated body or throw bad request
 */
export const validateBody = validate('body')

/**
 * Validates the params of a request.
 * @param decoder
 * @return validated params or throw bad request
 */
export const validateParams = validate('params')
