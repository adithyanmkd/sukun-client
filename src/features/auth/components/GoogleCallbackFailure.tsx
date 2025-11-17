import { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { AlertCircle } from "lucide-react";

const GoogleCallbackFailure = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const error = searchParams.get("error") || "Unknown error occurred";

  useEffect(() => {
    // Optional: Log error
    console.error("Google Login Failed:", error);

    // Auto-redirect to login after 3 seconds
    const timer = setTimeout(() => {
      navigate("/auth/login", { replace: true });
    }, 3000);

    return () => clearTimeout(timer);
  }, [error, navigate]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md space-y-6 rounded-lg bg-white p-6 shadow-lg">
        <div className="flex flex-col items-center text-center">
          <AlertCircle className="h-12 w-12 text-red-500" />
          <h1 className="mt-4 text-2xl font-bold text-gray-900">
            Login Failed
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            {decodeURIComponent(error)}
          </p>
          <p className="mt-4 text-xs text-gray-500">
            Redirecting to login page...
          </p>
        </div>
      </div>
    </div>
  );
};

export default GoogleCallbackFailure;
