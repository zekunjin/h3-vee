export const isObject = (val: any): val is Record<string, any> => val && typeof val === 'object' && !Array.isArray(val)

export const isUndefined = (value: any): value is undefined => typeof value === 'undefined'
