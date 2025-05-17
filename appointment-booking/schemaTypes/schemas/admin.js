// schemas/admin.js
export default {
  name: 'admin',
  type: 'document',
  title: 'Admin',
  fields: [
    {
      name: 'email',
      type: 'string',
      title: 'Email',
    },
    {
      name: 'password',
      type: 'string',
      title: 'Hashed Password',
    },
  ],
}
