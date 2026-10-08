import Image from "next/image";

import { cn } from "@/utils/cn";

import { CropMarks } from "@/components/ink";

type PrintPlateProps = {
  src: string;
  alt: string;
  className?: string;
  imageClassName?: string;
  sizes?: string;
  priority?: boolean;
};

export function PrintPlate({
  src,
  alt,
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
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          quality={95}
          priority={priority}
          className={cn("plate-image object-cover", imageClassName)}
        />
      </div>
      <CropMarks />
    </figure>
  );
}
