import { combineRoutes, r } from '@marblejs/core'
import { createCharacterEffect } from './character.effect'

const createCharacterRoute = r.pipe(
  r.matchPath('/'),
  r.matchType('POST'),
  r.useEffect(createCharacterEffect),
)

export const characters = combineRoutes('character', {
  effects: [createCharacterRoute],
})
