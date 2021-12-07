import { HttpEffect, HttpStatus } from '@marblejs/core'
import { pipe } from 'fp-ts/lib/function'
import * as O from 'fp-ts/Option'
import { of } from 'rxjs'
import * as rx from 'rxjs/operators'
import { throwConflictRequest } from '../exceptions/conflict-request'
import { validateBody } from '../shared/decoders'
import { Character, createCharacterDecoder } from './character.decoder'
import { dbAddCharacter } from './character.repository'

const saveCharToDb = rx.mergeMap((char: Character) =>
  pipe(
    char,
    dbAddCharacter,
    O.fold(throwConflictRequest("can't add a repeated char"), char => of(char)),
  ),
)

/**
 * Create a new character
 */
export const createCharacterEffect: HttpEffect = req =>
  req.pipe(
    validateBody(createCharacterDecoder),
    saveCharToDb,
    rx.map(body => ({ body, status: HttpStatus.CREATED })),
  )
