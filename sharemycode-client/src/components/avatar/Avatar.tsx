"use client";

import React, { useMemo } from "react";
import Image from "next/image";
import { getContrastingColor } from "../../utils/getContrastingColor";

type BothProps = {
  variant?: "avatar" | "more";
  size?: number;
  outlineColor?: string;
  outlineWidth?: number;
  borderRadius?: number;
  className?: string;
  style?: Record<string, string>;
};

type PictureProps = BothProps & {
  variant?: "avatar";
  name?: string;
  picture?: string;
  color: [string, string];
  statusColor?: string;
  count?: never;
};

type MoreProps = BothProps & {
  variant: "more";
  count: number;
  picture?: never;
  name?: never;
  statusColor?: never;
  color?: never;
};

type AvatarProps = PictureProps | MoreProps;

/**
 * Can present avatars as gradients with letters, as pictures, or as a count (e.g +3)
 * Size, outline color, color, radius can all be changed, a status circle can be added
 */
export function Avatar({
  variant = "avatar",
  picture = "",
  name = "",
  color = ["", ""],
  size = 52,
  statusColor = "",
  outlineColor = "",
  outlineWidth = 3,
  borderRadius = 9999,
  className = "",
  style = {},
  count = 0,
}: AvatarProps) {
  const innerVariant = variant === "avatar" && !picture ? "letter" : variant;
  const realSize = size - outlineWidth * 2;

  return (
    <div
      style={{
        height: realSize,
        width: realSize,
        boxShadow: `${outlineColor} 0 0 0 ${outlineWidth}px`,
        margin: outlineWidth,
        borderRadius,
        ...style,
      }}
      className={`flex relative place-content-center ${className}`}
      data-tooltip={name}
      title={name}
    >
      {innerVariant === "more" ? (
        <MoreCircle count={count} borderRadius={borderRadius} />
      ) : null}

      {innerVariant === "avatar" ? (
        <PictureCircle
          name={name}
          picture={picture}
          size={realSize}
          borderRadius={borderRadius}
        />
      ) : null}

      {innerVariant === "letter" ? (
        <LetterCircle name={name} color={color} borderRadius={borderRadius} />
      ) : null}

      {statusColor ? (
        <span
          style={{ backgroundColor: statusColor }}
          className="block absolute right-0 bottom-0 w-3 h-3 rounded-full shadow-[0_0_0_2px_white] ring-white"
        />
      ) : null}
    </div>
  );
}

function LetterCircle({
  name,
  color,
  borderRadius,
}: Pick<PictureProps, "name" | "color" | "borderRadius">) {
  const textColor = useMemo(
    () => (color ? getContrastingColor(color[1]) : undefined),
    [color]
  );

  return (
    <div
      style={{
        backgroundImage: `linear-gradient(to bottom right, ${color[0]}, ${color[1]})`,
        borderRadius,
      }}
      className="
        flex isolate overflow-hidden absolute top-0 right-0 bottom-0 left-0
        justify-center items-center rounded-full
      "
    >
      <div
        className="z-10 text-white font-medium text-sm"
        style={{ color: textColor }}
      >
        {name ? name.charAt(0) : null}
      </div>
    </div>
  );
}

function PictureCircle({
  name = "",
  picture = "",
  size,
  borderRadius,
}: Pick<PictureProps, "name" | "picture" | "size" | "borderRadius">) {
  return (
    <Image
      alt={name}
      src={picture}
      height={size}
      width={size}
      style={{ borderRadius }}
    />
  );
}

function MoreCircle({
  count,
  borderRadius,
}: Pick<MoreProps, "count" | "borderRadius">) {
  return (
    <div
      style={{ borderRadius }}
      className="
        flex absolute top-0 left-0 right-0 bottom-0 pr-1 bg-[#6b7280]
        text-white text-sm leading-tight font-semibold justify-center items-center
      "
    >
      +{count}
    </div>
  );
}
