import { Console } from "@/types";
import ConsoleCard from "./ConsoleCard";

interface ConsoleGridProps {
  consoles: Console[];
  rentalType?: "hourly" | "daily";
  columns?: 3 | 4;
  className?: string;
}

export default function ConsoleGrid({
  consoles,
  rentalType = "hourly",
  columns = 3,
  className = "",
}: ConsoleGridProps) {
  const gridCols =
    columns === 4
      ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
      : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3";

  return (
    <div className={`grid gap-6 ${gridCols} ${className}`}>
      {consoles.map((item) => (
        <ConsoleCard key={item.id} console={item} rentalType={rentalType} />
      ))}
    </div>
  );
}
