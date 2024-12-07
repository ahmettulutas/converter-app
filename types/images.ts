import { SanityAsset } from '@sanity/image-url/lib/types/types';

export type ImageType = {
  _type: 'image';
  alt?: string;
  asset: SanityAsset;
};

export type GenerateMetaImageProps = {
  sanityImage?: ImageType;
  sizes: Array<{ width: number; height: number }>;
  staticImage?: { url: string | URL; alt?: string };
};

export type CoverImageProps = {
  image: ImageType;
  wrapperStyles?: string;
  height: number;
  width: number;
  priority?: boolean;
  imageStyles?: string;
  fill?: boolean;
};
