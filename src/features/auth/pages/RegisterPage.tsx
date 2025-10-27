import RegisterForm from "../components/RegisterForm";

import RegisterBg from "@assets/images/registerPageBg.svg";

const RegisterPage = () => {
  return (
    <div className="border border-t-[#DEE1E6]">
      <div className="relative flex items-center justify-center">
        <img
          className="sticky w-screen opacity-50"
          src={RegisterBg}
          alt="register bg"
        />
        <RegisterForm />
      </div>
    </div>
  );
};

export default RegisterPage;
