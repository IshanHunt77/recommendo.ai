// app/v1/recommendation/page.tsx
import Recommend from "@/components/Recommend/page";
import { Suspense } from "react";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading Recommendations...</div>}>
      <Recommend />
    </Suspense>
  );
}
