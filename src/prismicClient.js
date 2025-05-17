import * as prismic from '@prismicio/client';

export const repositoryName = 'practising'; 

export const client = prismic.createClient(repositoryName, {
  accessToken: '',
});

export const createClient = () => {
  const client = prismic.createClient(repositoryName, {
    // Optional: accessToken: 'your-access-token'
  });

  return client;
};