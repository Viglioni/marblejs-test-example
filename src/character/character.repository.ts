import * as O from 'fp-ts/Option'
import { Character } from './character.decoder'

/**
 * Fake database call
 */
export const dbAddCharacter = (char: Character): O.Option<Character> =>
  O.some(char)
