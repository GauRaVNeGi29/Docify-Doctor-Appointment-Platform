import { Link } from "react-router-dom";

const NotAuthorized = () => {
  return (
    <div className="min-h-[70vh] flex items-center justify-center p-6 bg-white">
      <div className="text-center">
        <h1 className="text-4xl font-semibold text-red-600 mb-4">
          🚫 Access Denied
        </h1>
        <p className="text-gray-700 mb-4 text-lg">
          You are not authorized to view this page.
        </p>
        <p className="text-gray-600 mb-6">
          Please check your permissions or login with an appropriate account.{" "}
          <Link to="/" className="text-blue-500 underline">
            Go back to Home
          </Link>
        </p>
      </div>
    </div>
  );
};

export default NotAuthorized;
