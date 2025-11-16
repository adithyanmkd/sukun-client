import { useState } from "react";
import LoginForm from "../components/LoginForm";
import LoginBg from "@assets/images/loginPageBg.svg";
import { Spinner } from "@/components/ui/spinner";

const Login = () => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  return (
    <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-gray-50 px-4 sm:px-6">
      {/* Background Image – Full bleed */}
      <img
        src={LoginBg}
        alt="login background"
        loading="lazy"
        onLoad={() => setIsImageLoaded(true)}
        className="absolute inset-0 h-full w-full object-cover opacity-50"
      />

      {/* Spinner – Centered */}
      {!isImageLoaded && (
        <div className="absolute inset-0 flex items-center justify-center">
          <Spinner className="size-10 text-gray-500" />
        </div>
      )}

      {/* Form – Centered, Responsive */}
      {isImageLoaded && (
        <div className="relative z-10 w-full max-w-md">
          <LoginForm />
        </div>
      )}
    </div>
  );
};

export default Login;
