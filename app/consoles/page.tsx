import { Suspense } from "react";
import ConsolesPage from "./ConsolesPage";

export default function Page() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[50vh] items-center justify-center">
          <div className="h-8 w-8 animate-pulse rounded-full bg-neon-primary/30" />
        </div>
      }
    >
      <ConsolesPage />
    </Suspense>
  );
}
