export default {
  name: 'blog',
  title: 'Blog',
  type: 'document',
  fields: [
    {name: 'title', title: 'Title', type: 'string'},
    {name: 'slug', title: 'Slug', type: 'slug', options: {source: 'title'}},
    {name: 'content', title: 'Content', type: 'text'},
    {name: 'image', title: 'Cover Image', type: 'image', options: { hotspot: true, },},
    {name: 'publishedAt', title: 'Published At', type: 'datetime'},
    // add image, excerpt, etc.
  ],
}
