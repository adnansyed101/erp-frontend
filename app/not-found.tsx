import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="text-center max-w-md">
        {/* 404 Error Code */}
        <div className="mb-6">
          <h1 className="text-9xl font-bold mb-2">
            404
          </h1>
        </div>

        {/* Message */}
        <h2 className="text-3xl font-bold mb-3">Page Not Found</h2>
        <p className="mb-8 leading-relaxed">
          The page you&apos;re looking for doesn&apos;t exist or has been moved. Let&apos;s get
          you back on track.
        </p>

        {/* Action Buttons */}
        <Button
          className="flex flex-col sm:flex-row gap-4 justify-center"
          asChild
        >
          <Link
            href="/home"
            className="px-6 py-3 font-medium rounded-lg transition-colors duration-200"
          >
            Go Home
          </Link>
        </Button>
      </div>
    </main>
  );
}
