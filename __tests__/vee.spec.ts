import { describe, expect, test } from 'vitest'
import { asyncValidate } from '../src/core'

const json = { id: 0, name: 'NAME' }

describe('vee core', () => {
  test('should pass', async () => {
    const query = await asyncValidate(json, f => ({
      id: f<number>().required().isNumber(),
      name: f<string>().required().isString()
    }))

    expect(!!query).toBe(true)
  })

  test('should throw error', async () => {
    let msg = ''

    try {
      await asyncValidate(json, f => ({
        id: f<number>().required().isString().message('ERROR'),
        name: f<string>().required().isString()
      }))
    } catch (error) {
      msg = error.message
    }

    expect(msg).toBe('ERROR')
  })
})
