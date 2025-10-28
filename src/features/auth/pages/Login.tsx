import LoginForm from "../components/LoginForm";
import LoginBg from "@assets/images/loginPageBg.svg";

const Login = () => {
  return (
    <div className="border border-t-[#DEE1E6]">
      <div className="relative flex items-center justify-center">
        <img
          className="sticky w-screen opacity-50"
          src={LoginBg}
          alt="register bg"
        />
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
