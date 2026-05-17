import Link from "next/link";

const NotFoundPage = () => {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-6">
      <div className="text-center max-w-xl">
        <h1 className="text-8xl md:text-9xl font-extrabold bg-linear-to-r from-sky-200 to-sky-700 bg-clip-text text-transparent">
          404
        </h1>

        <h2 className="mt-4 text-3xl md:text-4xl font-bold">
          Page Not Found
        </h2>

        <p className="mt-4 text-gray-400 text-lg">
          The page you are looking for doesn’t exist or has been moved.
        </p>

        <div className="mt-8">
          <Link
            href="/"
            className="px-4 py-2 rounded-none bg-white text-sky-600 font-semibold hover:scale-105 transition duration-300 border border-sky-600 hover:bg-sky-600 hover:text-white"
          >
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;