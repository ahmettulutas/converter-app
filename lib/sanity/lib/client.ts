import { createClient, type QueryParams } from 'next-sanity';
import { apiVersion, dataset, projectId } from '../env';

export const SANITY_URL = '/en/studio';
export const client = createClient({
  projectId,
  dataset,
  apiVersion, // https://www.sanity.io/docs/api-versioning
  useCdn: true, // Set to false if statically generating pages, using ISR or tag-based revalidation
});

export async function sanityFetch<const QueryString extends string>({
  query,
  params = {},
  revalidate = 60, // default revalidation time in seconds
  tags = [],
}: {
  query: QueryString;
  params?: QueryParams;
  revalidate?: number | false;
  tags?: string[];
}) {
  return client.fetch(query, params, {
    next: {
      revalidate: tags.length ? false : revalidate, // for simple, time-based revalidation
      tags, // for tag-based revalidation
    },
  });
}

/* // ./src/app/pages/index.tsx

import {sanityFetch} from '@/sanity/lib/client'
import {POSTS_QUERY} from '@/sanity/lib/queries'

export default async function PostIndex() {
  const posts = await sanityFetch({
    query: POSTS_QUERY,
    revalidate: 3600, // update cache at most once every hour
  })

  return (
    <ul>
      {posts.map((post) => (
        <li key={post._id}>
          <a href={`/posts/${post?.slug.current}`}>{post?.title}</a>
        </li>
      ))}
    </ul>
  )
} */

/* // ./src/app/pages/index.tsx

import {sanityFetch} from '@/sanity/lib/client'
import {POSTS_QUERY} from '@/sanity/lib/queries'

export default async function PostIndex() {
  const posts = await sanityFetch({
    query: POSTS_QUERY,
    tags: ['post', 'author'], // revalidate all pages with the tags 'post' and 'author'
  })

  return (
    <ul>
      {posts.map((post) => (
        <li key={post._id}>
          <a href={`/posts/${post?.slug.current}`}>{post?.title}</a>
        </li>
      ))}
    </ul>
  )
} */
