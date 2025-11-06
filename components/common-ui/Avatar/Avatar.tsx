"use client";

import { useState } from "@preact-signals/safe-react/react";
import clsx from "clsx";
import Image from "next/image";
import type { FC } from "react";
import type { AvatarProps } from "./type";

const Avatar: FC<AvatarProps> = ({
  image,
  icon,
  className,
  isOnline,
  placeHolder,
  alt,
  priority,
}) => {
  const [showPlaceholder, setShowPlaceholder] = useState(!image && !icon);

  const onImageError = () => {
    setShowPlaceholder(true);
  };

  return (
    <div
      className={clsx("avatar", {
        "avatar-online": isOnline === true,
        "avatar-offline": isOnline === false,
        "avatar-placeholder": !image || !icon,
      })}
    >
      <div className={clsx(className || "w-24 rounded")}>
        {image && !showPlaceholder && (
          <Image
            src={image}
            alt={alt ?? "Avatar"}
            width={50}
            height={50}
            loading={priority ? undefined : "lazy"}
            priority={Boolean(priority)}
            onError={onImageError}
          />
        )}
        {icon}
        {showPlaceholder && <span className="text-3xl">{placeHolder}</span>}
      </div>
    </div>
  );
};

export default Avatar;
