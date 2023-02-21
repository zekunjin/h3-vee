import { Field, ValidatorFields, defineValidator, defineField } from 'veelidate'

export const isUndefined = (value: any): value is undefined => typeof value === 'undefined'

export const asyncValidate = async <R extends Record<string, any>>(json: Record<string, any>, schema?: (f: <T>(value?: T | undefined) => Field<T>) => R): Promise<typeof schema extends undefined ? Record<string, any>: ValidatorFields<R>> => {
  if (isUndefined(schema)) { return Promise.resolve(json as any) }

  const validator = defineValidator().setup(() => schema(defineField))

  validator.value = json

  try {
    await validator.validate()
    return validator.value
  } catch (error) {
    throw new Error(String(error))
  }
}
