"use client";

import Image from "next/image";
import type { FC } from "react";
import { useMemo } from "react";

type Props = {
  imageUrl: string;
  altText: string;
  width?: number;
  height?: number;
  className?: string;
};

const AppImage: FC<Props> = ({
  imageUrl,
  altText,
  width = 800,
  height = 450,
  className = "w-full h-auto object-cover rounded",
}) => {
  const imageSrc = useMemo(() => {
    if (!imageUrl) return "";

    try {
      const seed = new URL(imageUrl);
      return seed.toString();
    } catch {
      return `https://picsum.photos/seed/${encodeURIComponent(imageUrl)}/600/400`;
    }
  }, [imageUrl]);

  return (
    <Image
      src={imageSrc}
      width={width}
      height={height}
      alt={altText}
      className={className}
    />
  );
};

export default AppImage;
