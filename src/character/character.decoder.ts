import { pipe } from 'fp-ts/lib/function'
import * as D from 'io-ts/Decoder'
import * as R from 'ramda'

const nameMatcher = R.compose(R.isEmpty, R.match(/[^A-Za-z ]/))

const nameDecoder = pipe(
  D.string,
  D.refine((s): s is string => nameMatcher(s), 'only have letters and spaces'),
)

export enum ForceAlignment {
  SITH = 'Sith',
  JEDI = 'Jedi',
  GREY_JEDI = 'Grey Jedi',
}

const forceAlignments = R.values(ForceAlignment)

const classNameDecoder = pipe(
  D.string,
  D.refine(
    (s): s is ForceAlignment => R.includes(s, forceAlignments),
    `be one of the following: ${R.join(', ', forceAlignments)}`,
  ),
)

export const createCharacterDecoder = D.struct({
  name: nameDecoder,
  alignment: classNameDecoder,
})

export type Name = D.TypeOf<typeof nameDecoder>

export type Character = D.TypeOf<typeof createCharacterDecoder>

export type Characters = Character[]
