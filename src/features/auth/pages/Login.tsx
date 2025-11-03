import { useState } from "react";
import LoginForm from "../components/LoginForm";
import LoginBg from "@assets/images/loginPageBg.svg";

const Login = () => {
  const [isImageLoaded, setIsImagedLoaded] = useState(false);

  return (
    <div className="relative flex flex-col items-center justify-center">
      <img
        className="opacity-50"
        onLoad={() => setIsImagedLoaded(true)}
        src={LoginBg}
        alt="register bg"
      />
      {isImageLoaded && <LoginForm />}
    </div>
  );
};

export default Login;
