import { useState } from "react";
import RegisterForm from "../components/RegisterForm";
import RegisterBg from "@assets/images/registerPageBg.svg";
import { Spinner } from "@/components/ui/spinner";

const RegisterPage = () => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  return (
    <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-gray-50 px-4 sm:px-6">
      {/* Background – Full screen, behind */}
      <img
        src={RegisterBg}
        alt="register background"
        loading="lazy"
        onLoad={() => setIsImageLoaded(true)}
        className="absolute inset-0 h-full w-full object-cover opacity-50"
      />

      {/* Spinner */}
      {!isImageLoaded && (
        <div className="absolute inset-0 flex items-center justify-center">
          <Spinner className="size-10 text-gray-500" />
        </div>
      )}

      {/* Form – Centered, on top */}
      {isImageLoaded && (
        <div className="relative z-10 w-full max-w-md">
          <RegisterForm />
        </div>
      )}
    </div>
  );
};

export default RegisterPage;
