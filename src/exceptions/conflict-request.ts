import { HttpError, HttpStatus } from '@marblejs/core'
import { Observable, throwError } from 'rxjs'
import { ErrorMsg } from '../shared/types'

export class ConflictRequest extends HttpError {
  public constructor(message: ErrorMsg) {
    super('Confict: ' + message, HttpStatus.CONFLICT)
  }
}

export const throwConflictRequest = (
  errorMsg: ErrorMsg = '',
) => (): Observable<never> => throwError(new ConflictRequest(errorMsg))
