import { useLocation, useNavigate } from "react-router-dom";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  useSendOtpMutation,
  useVerifyOtpMutation,
} from "../../auth/api/authApi";

// import components
import OTPForm from "../components/OTPForm";
import { getErrorMessage } from "@/utils/getErrorMessage";

const otpSchema = z.object({
  pin: z.string().length(6, "OTP must be 6 digits"),
});

const OTPVerify = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const phone = state?.phone as string;

  const [sendOtp, { isLoading: isResending }] = useSendOtpMutation();
  const [verifyOtp, { isLoading: isVerifying }] = useVerifyOtpMutation();

  //   const masked = phone ? `XXXXXX${phone.slice(-4)}` : ""
  const form = useForm<z.infer<typeof otpSchema>>({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      pin: "",
    },
  });

  const handleOnSubmit = async (data: { pin: string }) => {
    try {
      await verifyOtp({ phone, otp: data.pin }).unwrap();
      navigate("/");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      const msg = getErrorMessage(error);
      form.setError("pin", { type: "server", message: msg });
    }
  };
  const handleoOnResend = async () => {
    console.log("Resending OTP to", phone);
    try {
      await sendOtp({ phone }).unwrap();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      const msg = getErrorMessage(error);
      form.setError("pin", { type: "server", message: msg });
    }
  };

  const handleOnBack = () => navigate(-1);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <OTPForm
        form={form}
        onBack={handleOnBack}
        onResend={handleoOnResend}
        onSubmit={handleOnSubmit}
        isSumbitting={isVerifying}
        isResending={isResending}
      />
    </div>
  );
};

export default OTPVerify;
