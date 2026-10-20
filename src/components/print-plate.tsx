import Image from "next/image";
import type { ReactNode } from "react";

import { cn } from "@/utils/cn";

import { CropMarks } from "@/components/ink";

interface PrintPlateBase {
  alt: string;
  className?: string;
  imageClassName?: string;
  sizes?: string;
  priority?: boolean;
}

type PrintPlateProps = PrintPlateBase &
  ({ artwork: ReactNode; src?: never } | { artwork?: never; src: string });

export function PrintPlate({
  alt,
  className,
  imageClassName,
  sizes = "(min-width: 1024px) 640px, 100vw",
  priority = false,
  ...media
}: PrintPlateProps) {
  return (
    <figure
      className={cn(
        "plate-frame border-line relative overflow-hidden border bg-[#f3eee4] p-3",
        className,
      )}
    >
      <div className="plate-drift absolute inset-3">
        {media.src ? (
          <Image
            src={media.src}
            alt={alt}
            fill
            sizes={sizes}
            quality={92}
            priority={priority}
            className={cn("plate-image object-cover", imageClassName)}
          />
        ) : (
          <div className="absolute inset-0" role="img" aria-label={alt}>
            {media.artwork}
          </div>
        )}
      </div>
      <CropMarks />
    </figure>
  );
}
