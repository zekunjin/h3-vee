import mapValues from 'lodash.mapvalues'
import { Field, ValidatorFields, defineValidator, defineField, isField } from 'veelidate'
import { isObject, isUndefined } from './utils'

const mapObjectValues = <T extends Record<string, any>>(object: T) => {
  const result: any = mapValues(object, (value) => {
    if (!isField(value) && isObject(value)) {
      return defineValidator().setup(() => mapObjectValues(value))
    }

    return value
  })

  return result
}

export const asyncValidate = async <R extends Record<string, any>>(json: Record<string, any>, schema?: (f: <T>(value?: T | undefined) => Field<T>) => R): Promise<typeof schema extends undefined ? Record<string, any>: ValidatorFields<R>> => {
  if (isUndefined(schema)) { return Promise.resolve(json as any) }

  const fields = mapObjectValues(schema(defineField))

  const validator = defineValidator().setup(() => fields)

  validator.value = json

  try {
    await validator.validate()
    return validator.value
  } catch (error) {
    throw new Error(String(error))
  }
}
