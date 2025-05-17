import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

// Read-only client
export const client = createClient({
  projectId: 'e3gijinv',
  dataset: 'production',
  apiVersion: '2024-05-17',
  useCdn: true,
});

// Authenticated client for mutations 
export const adminClient = createClient({
  projectId: 'e3gijinv',
  dataset: 'production',
  apiVersion: '2024-05-17',
  useCdn: false,
  token: import.meta.env.VITE_SANITY_TOKEN, 
});


const builder = imageUrlBuilder(client);

export function urlFor(source) {
  return builder.image(source);
}