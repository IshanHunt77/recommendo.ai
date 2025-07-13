// app/v1/recommendation/page.tsx
import Recommend from "@/components/Recommend/page";
import { Suspense } from "react";
import LoaderComponent from "@/components/Loader/page";

export default function Page() {
  return (
    <Suspense fallback={<div><LoaderComponent/></div>}>
      <Recommend />
    </Suspense>
  );
}
