import { createServer, httpListener } from '@marblejs/core'
import { bodyParser$ } from '@marblejs/middleware-body'
import { IO, of } from 'fp-ts/lib/IO'
import { characters } from './character/character.controller'
import { helloThere } from './hello-there/hello-there.controller'

export const listener = httpListener({
  middlewares: [bodyParser$()],
  effects: [helloThere, characters],
})

async function main(): Promise<IO<void>> {
  const server = await createServer({
    port: 3583,
    listener,
  })

  server()

  return of({})
}

main()
