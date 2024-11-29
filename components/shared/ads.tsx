import Script from 'next/script';
import React from 'react';

export default function AdSense() {
  return (
    <div>
      <Script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9880416599476522"
        crossOrigin="anonymous"
      ></Script>
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-9880416599476522"
        data-ad-slot="YOUR_AD_SLOT_ID"
        data-ad-format="auto"
      ></ins>
      <Script id="ads">(adsbygoogle = window.adsbygoogle || []).push({});</Script>
    </div>
  );
}
