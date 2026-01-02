/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useRef } from "react";

type Props = {
  poster: string;
  video?: string;
  isActive: boolean;
  onActivate: () => void;
};

export default function VideoPreview({
  poster,
  video,
  isActive,
  onActivate,
}: Props) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!video) return;
    if (isActive) ref.current?.play();
    else ref.current?.pause();
  }, [isActive, video]);

  // اگر ویدیو وجود نداشت، فقط عکس نشون بده
  if (!video) {
    return (
      <img
        src={poster}
        alt="Project Poster"
        className="w-full h-full object-cover rounded-xl"
      />
    );
  }

  return (
    <div
      onMouseEnter={onActivate}
      onClick={onActivate}
      className="relative h-full w-full cursor-pointer"
    >
      <video
        ref={ref}
        src={video}
        poster={poster}
        muted
        loop
        playsInline
        className="h-full w-full object-cover rounded-xl transition-opacity duration-700"
      />

      {!isActive && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-xl">
          <span className="rounded-full border border-white/40 px-4 py-1 text-xs text-white">
            Preview
          </span>
        </div>
      )}
    </div>
  );
}
