import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "404",
  description: "Page not found",
};

export default function NotFound() {
  return (
    <div className="px-4 pb-10 mt-4 md:px-6 md:mt-6">
      <div>
        <h1 className="mb-2 text-3xl font-semibold">Error 404</h1>
        <p>What you requested does not exist.</p>
      </div>
      <div className="text-center my-10">
        <div className="mt-8">
          <Link href="/">Go back to the Home page</Link>
        </div>
      </div>
    </div>
  );
}
