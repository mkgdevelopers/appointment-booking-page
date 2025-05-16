import * as prismic from '@prismicio/client';

export const repositoryName = 'practising'; 

export const client = prismic.createClient(repositoryName, {
  accessToken: '',
});

