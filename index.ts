import { getQuery, H3Event, readBody } from 'h3'
import { Field, ValidatorFields } from 'veelidate'
import { asyncValidate } from './src/core'

export type H3Vee = <R extends Record<string, any>>(event: H3Event, schema?: (f: <T>(value?: T | undefined) => Field<T>) => R) => Promise<typeof schema extends undefined ? Record<string, any>: ValidatorFields<R>>

export const asyncGetQuery: H3Vee = async (event, schema) => {
  try {
    const query = await asyncValidate(getQuery(event), schema)
    return query
  } catch (error) {
    throw new Error(String(error))
  }
}

export const asyncReadBody: H3Vee = async (event, schema) => {
  try {
    const query = await asyncValidate(readBody(event), schema)
    return query
  } catch (error) {
    throw new Error(String(error))
  }
}
