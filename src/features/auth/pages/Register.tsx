import { useState } from "react";
import RegisterForm from "../components/RegisterForm";
import RegisterBg from "@assets/images/registerPageBg.svg";
import { Spinner } from "@/components/ui/spinner";

const RegisterPage = () => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  return (
    <div className="relative flex flex-col items-center justify-center">
      <img
        className="opacity-50"
        src={RegisterBg}
        onLoad={() => setIsImageLoaded(true)}
        alt="register bg"
      />
      {isImageLoaded ? (
        <RegisterForm />
      ) : (
        <div className="absolute flex items-center justify-center text-gray-500">
          <Spinner className="size-8" />
        </div>
      )}
    </div>
  );
};

export default RegisterPage;
