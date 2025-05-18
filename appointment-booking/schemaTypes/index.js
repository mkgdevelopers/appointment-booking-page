import admin from './schemas/admin'
import appointment from './schemas/appointment'
import blog from './schemas/Blog'

const json = {
  name: 'json',
  title: 'JSON',
  type: 'object',
  fields: [
    {
      name: 'value',
      type: 'string',
      title: 'Value',
    },
  ],
}

export const schemaTypes = [blog, appointment, admin, json]
