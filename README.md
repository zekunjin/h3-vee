# h3-vee

A request query / body async validator for [h3](https://github.com/unjs/h3).

## Setup

```
pnpm add h3-vee
```

## Usage (nuxt)

Support deep object after v0.0.3

Get Query

```ts server/api/*.get.ts
import { asyncGetQuery } from 'h3-vee'

export default defineEventHandler(async (event) => {
  try {
    const query = await asyncGetQuery(event, f => ({
      num: f<string>().required().isNumber(),
      str: f<string>().required().isString(),
      obj: {
        num: f<string>().required().isNumber(),
        str: f<string>().required().isString(),
      }
    }))

    return query
  } catch (error) { throw new Error(error.message) }
})
```

Read Body

```ts server/api/*.post.ts
import { asyncReadBody } from 'h3-vee'

export default defineEventHandler(async (event) => {
  try {
    const query = await asyncReadBody(event, f => ({
      num: f<string>().required().isNumber(),
      str: f<string>().required().isString(),
      obj: {
        num: f<string>().required().isNumber(),
        str: f<string>().required().isString(),
      }
    }))

    return query
  } catch (error) { throw new Error(error.message) }
})
```

## Api

- `asyncGetQuery(event: H3Event, (defineField: (value: any) => Field) => Record<string, Field>)`

- `asyncReadBody(event: H3Event, (defineField: (value: any) => Field) => Record<string, Field>)`
