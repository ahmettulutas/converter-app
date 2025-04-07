import React from 'react';
import { FacebookIcon } from '../icons/facebook';
import { TwitterIcon } from '../icons/twitter';
import { WahtsappIcon } from '../icons/whatsapp';

type SocialShareLinksProps = {
  shareUrl: string;
  customShareText?: string;
};

export const SocialShareLinks = ({ shareUrl, customShareText }: SocialShareLinksProps) => {
  const shareText = customShareText ?? `Check out this link: ${shareUrl}`;
  const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
  const twitterShareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`;
  const whatsappShareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`;

  return (
    <div className="flex space-x-2">
      <a href={facebookShareUrl} target="_blank" rel="noopener noreferrer" title="bu makaleyi facebookta paylaş">
        <FacebookIcon className="w-6 h-6" />
      </a>
      <a href={twitterShareUrl} target="_blank" rel="noopener noreferrer" title="bu makaleyi twitterda paylaş">
        <TwitterIcon className="w-6 h-6" />
      </a>
      <a href={whatsappShareUrl} target="_blank" rel="noopener noreferrer" title="bu makaleyi whatsappta paylaş">
        <WahtsappIcon className="w-6 h-6" />
      </a>
    </div>
  );
};
