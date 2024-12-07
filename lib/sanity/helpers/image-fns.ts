import createImageUrlBuilder from '@sanity/image-url';
import { SanityImageSource } from '@sanity/image-url/lib/types/types';

import { dataset, projectId } from '../env';
import { getClient } from '../sanity-client';

const imageBuilder = createImageUrlBuilder({ projectId, dataset });
export const getSanityImageConfig = () => getClient();
export const urlForImage = (source: SanityImageSource) => imageBuilder.image(source).auto('format').fit('max');
