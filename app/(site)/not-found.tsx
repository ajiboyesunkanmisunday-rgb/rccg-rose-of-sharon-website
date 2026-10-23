import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 px-4 py-12 md:px-8">
      <div className="w-full max-w-md space-y-6 rounded-lg bg-white p-6 text-center shadow-lg md:p-8">
        <h2 className="text-2xl font-bold text-gray-800">
          Why didn&apos;t they play cards on the Ark?
        </h2>
        <p className="newsreader text-lg italic text-gray-600">
          Because Noah was standing on the deck.
        </p>
        <div className="my-4 border-t border-gray-200" />
        <p className="text-sm text-gray-500">
          Also, we couldn&apos;t find what you were looking for.
        </p>
        <p className="font-semibold text-gray-800">
          Let&apos;s get you{" "}
          <Link href="/" className="text-red-600 transition-colors hover:text-red-800">
            Home
          </Link>
        </p>
      </div>
    </div>
  );
}
