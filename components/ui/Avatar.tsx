import Image from "next/image";

interface AvatarProps {
  src: string;
  alt: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizeMap = {
  sm: "h-8 w-8",
  md: "h-10 w-10",
  lg: "h-16 w-16",
};

const pixelMap = {
  sm: 32,
  md: 40,
  lg: 64,
};

export default function Avatar({
  src,
  alt,
  size = "md",
  className = "",
}: AvatarProps) {
  return (
    <div
      className={`relative overflow-hidden rounded-full border-2 border-neon-primary/30 ${sizeMap[size]} ${className}`}
    >
      <Image
        src={src}
        alt={alt}
        width={pixelMap[size]}
        height={pixelMap[size]}
        className="h-full w-full object-cover"
      />
    </div>
  );
}
