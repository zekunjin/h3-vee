import { describe, expect, test } from 'vitest'
import { asyncValidate } from '../src/core'

const jsonA = { id: 0, name: 'NAME' }

const jsonB = {
  id: 0,
  name: 'NAME',
  location: {
    city: 'Tokyo',
    code: 10000,
    others: {
      isDefault: true
    }
  },
  like: ['travel']
}

describe('vee core', () => {
  test('should pass', async () => {
    const query = await asyncValidate(jsonA, f => ({
      id: f<number>().required().isNumber(),
      name: f<string>().required().isString()
    }))

    expect(!!query).toBe(true)
  })

  test('should throw error', async () => {
    let msg = ''

    try {
      await asyncValidate(jsonA, f => ({
        id: f<number>().required().isString().message('ERROR'),
        name: f<string>().required().isString()
      }))
    } catch (error) {
      msg = error.message
    }

    expect(msg).toBe('ERROR')
  })

  test('should valid deep object', async () => {
    const query = await asyncValidate(jsonB, f => ({
      id: f<number>().isNumber(),
      name: f<string>().isString(),
      location: {
        city: f<string>().required().isString(),
        code: f<number>().required().isNumber(),
        others: {
          isDefault: f<boolean>(false).required()
        }
      },
      like: f<string[]>([])
    }))

    expect(query.location.others.isDefault).toBe(true)
  })
})
