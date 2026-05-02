import Link from 'next/link';

export default function Unauthorized() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">401 - Unauthorized</h1>
        <p className="text-gray-600 mb-8">You do not have permission to access this page.</p>
        <Link href="/" className="text-indigo-600 hover:text-indigo-800 font-medium">
          Return Home
        </Link>
      </div>
    </div>
  );
}
