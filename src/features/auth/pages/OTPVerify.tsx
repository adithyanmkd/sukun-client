import { useLocation, useNavigate } from "react-router-dom";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// import components
import OTPForm from "../components/OTPForm";

const otpSchema = z.object({
  pin: z.string().length(6, "OTP must be 6 digits"),
});

const OTPVerify = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const phone = state?.phone as string;

  //   const masked = phone ? `XXXXXX${phone.slice(-4)}` : ""
  const form = useForm<z.infer<typeof otpSchema>>({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      pin: "",
    },
  });

  const handleOnSubmit = (data: { pin: string }) => {
    console.log("OTP:", data.pin);
    console.log(phone);
    // navigate("/");
  };

  const handleOnBack = () => navigate(-1);

  const handleoOnResend = async () => {
    console.log("Resending OTP to", phone);
  };

  return (
    <div>
      <OTPForm
        form={form}
        onBack={handleOnBack}
        onResend={handleoOnResend}
        onSubmit={handleOnSubmit}
      />
    </div>
  );
};

export default OTPVerify;
