"use client";

import Script from "next/script";

const WIDGET_SRC = "https://tally.so/widgets/embed.js";

type TallyWindow = Window & {
  Tally?: {
    loadEmbeds: () => void;
  };
};

function loadTallyEmbeds() {
  const tally = (window as TallyWindow).Tally;
  if (tally) {
    tally.loadEmbeds();
    return;
  }

  document.querySelectorAll<HTMLIFrameElement>("iframe[data-tally-src]:not([src])").forEach((frame) => {
    const src = frame.dataset.tallySrc;
    if (src) frame.src = src;
  });
}

export function PilotTallyEmbed({ src }: { src: string }) {
  return (
    <>
      <iframe
        data-tally-src={src}
        loading="lazy"
        width="100%"
        height={560}
        frameBorder={0}
        marginHeight={0}
        marginWidth={0}
        title="Demander une démonstration gratuite, sans engagement"
        className="block w-full border-0"
      />
      <noscript>
        <iframe
          src={src}
          width="100%"
          height={560}
          frameBorder={0}
          marginHeight={0}
          marginWidth={0}
          title="Demander une démonstration gratuite, sans engagement"
          className="block w-full border-0"
        />
      </noscript>
      <Script src={WIDGET_SRC} strategy="afterInteractive" onReady={loadTallyEmbeds} onError={loadTallyEmbeds} />
    </>
  );
}
