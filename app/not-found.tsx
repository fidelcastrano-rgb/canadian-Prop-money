import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-white">
      <h2 className="text-4xl font-syne mb-6">404 - Not Found</h2>
      <p className="text-gray-400 mb-8">Could not find requested resource</p>
      <Link href="/" className="px-6 py-3 bg-primary text-black font-semibold rounded-full hover:bg-opacity-90">
        Return Home
      </Link>
    </div>
  );
}
