import Image from "next/image";
import type { ReactNode } from "react";

import { cn } from "@/utils/cn";

import { CropMarks } from "@/components/ink";

type PrintPlateBase = {
  alt: string;
  className?: string;
  imageClassName?: string;
  sizes?: string;
  priority?: boolean;
};

type PrintPlateProps = PrintPlateBase & {
  artwork?: ReactNode;
  src?: string;
};

export function PrintPlate({
  src,
  alt,
  artwork,
  className,
  imageClassName,
  sizes = "(min-width: 1024px) 640px, 100vw",
  priority = false,
}: PrintPlateProps) {
  return (
    <figure
      className={cn(
        "plate-frame border-line relative overflow-hidden border bg-[#f3eee4] p-3",
        className,
      )}
    >
      <div className="plate-drift absolute inset-3">
        {artwork ? (
          <div className="absolute inset-0" role="img" aria-label={alt}>
            {artwork}
          </div>
        ) : null}
        {!artwork && src ? (
          <Image
            src={src}
            alt={alt}
            fill
            sizes={sizes}
            quality={95}
            priority={priority}
            className={cn("plate-image object-cover", imageClassName)}
          />
        ) : null}
      </div>
      <CropMarks />
    </figure>
  );
}
