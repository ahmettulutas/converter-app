import { createClient } from 'next-sanity';
import { apiVersion, dataset, projectId, useCdn } from './env';

export const SANITY_URL = '/en/studio';
export const client = createClient({
  apiVersion,
  dataset,
  projectId,
  useCdn,
  perspective: 'published',
});

export const sanityClient = () => client;
