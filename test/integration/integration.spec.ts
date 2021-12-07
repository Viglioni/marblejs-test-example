import { createHttpTestBed, createTestBedSetup } from '@marblejs/testing'
import { pipe } from 'fp-ts/lib/function'
import {
  Character,
  ForceAlignment,
} from '../../src/character/character.decoder'
import { listener } from '../../src/main'

/*
 * Marblejs testing
 */

const useTestBedSetup = createTestBedSetup({
  testBed: createHttpTestBed({ listener }),
})

describe('marblejs/testing', () => {
  const testBedSetup = useTestBedSetup()

  afterEach(testBedSetup.cleanup)

  describe('GET /', () => {
    it('should return 200', async () => {
      const { request } = await testBedSetup.useTestBed()

      const response = await pipe(
        request('GET'),
        request.withPath('/'),
        request.send,
      )

      expect(response.statusCode).toEqual(200)
    })
  })

  describe('POST /characters', () => {
    describe('when payload is invalid', () => {
      it('should return 400', async () => {
        const { request } = await testBedSetup.useTestBed()

        const response = await pipe(
          request('POST'),
          request.withPath('/character'),
          request.withBody({ name: 'inv4lid' }),
          request.send,
        )

        expect(response.statusCode).toEqual(400)
      })
    })

    describe('when payload is valid', () => {
      it('should return 201', async () => {
        const char: Character = {
          name: 'Darth Sidious',
          alignment: ForceAlignment.SITH,
        }
        const { request } = await testBedSetup.useTestBed()

        const response = await pipe(
          request('POST'),
          request.withPath('/character'),
          request.withBody(char),
          request.send,
        )

        expect(response.statusCode).toEqual(201)
        expect(response.body).toEqual(char)
      })
    })
  })
})
