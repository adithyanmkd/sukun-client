import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Link, useNavigate } from "react-router-dom";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import GoogleLogo from "@assets/icons/google-logo.svg";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useLoginMutation, useSendOtpMutation } from "../api/authApi";
import { getErrorMessage } from "@/utils/getErrorMessage";

const userFormSchema = z.object({
  phone: z
    .string()
    .regex(/^[6-9]\d{9}$/, "Please enter a valid 10-digit mobile number"),
  terms: z.boolean().refine((v) => v === true, {
    message: "You must accept the Terms & Conditions",
  }),
});

type FormValues = z.infer<typeof userFormSchema>;

const LoginForm = () => {
  const navigate = useNavigate();
  const [sendOtp, { isLoading: isSendingOtp }] = useSendOtpMutation();
  const [login, { isLoading: isLoggingIn }] = useLoginMutation();

  const form = useForm<FormValues>({
    resolver: zodResolver(userFormSchema),
    defaultValues: { phone: "", terms: false },
  });

  const onSubmit = async (data: FormValues) => {
    try {
      await login({ phone: data.phone }).unwrap();
      await sendOtp({ phone: data.phone }).unwrap();
      navigate("/otp-verify", { state: { phone: data.phone } });
    } catch (error) {
      form.setError("phone", {
        type: "server",
        message: getErrorMessage(error),
      });
    }
  };

  return (
    <Card className="w-full max-w-[20rem] bg-[#28A745] shadow-2xl sm:max-w-88 md:max-w-[24rem]">
      <CardHeader className="space-y-1 pb-3 sm:space-y-2 sm:pb-4">
        <CardTitle className="text-lg font-bold sm:text-xl md:text-2xl">
          Login Now
        </CardTitle>
        <CardDescription className="text-xs text-black sm:text-sm md:text-base">
          Welcome! Create your account to get started.
        </CardDescription>
      </CardHeader>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-3 sm:space-y-4"
        >
          <CardContent className="space-y-3 pb-2 sm:space-y-4 sm:pb-3">
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem className="grid gap-1.5 sm:gap-2">
                  <FormLabel className="text-sm text-white sm:text-base">
                    Phone
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="tel"
                      maxLength={10}
                      placeholder="Enter your phone number"
                      className="h-10 bg-white text-base placeholder:text-gray-500 focus-visible:ring-0 focus-visible:ring-offset-0 sm:h-11"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-xs text-yellow-300 sm:text-sm" />
                </FormItem>
              )}
            />
          </CardContent>

          <CardFooter className="flex flex-col space-y-2 pt-1 sm:space-y-3">
            <FormField
              control={form.control}
              name="terms"
              render={({ field }) => (
                <FormItem className="flex w-full flex-col items-start gap-1.5">
                  {/* Checkbox + Label Row */}
                  <div className="flex w-full items-center gap-2">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        id="terms"
                        className="size-4 border-white data-[state=checked]:border-yellow-500 data-[state=checked]:bg-yellow-500 data-[state=checked]:text-black sm:size-5"
                      />
                    </FormControl>
                    <FormLabel
                      htmlFor="terms"
                      className="cursor-pointer text-xs text-white/90 sm:text-sm"
                    >
                      Accept Terms & conditions
                    </FormLabel>
                  </div>

                  {/* Error Message – Below */}
                  <FormMessage className="text-xs text-yellow-300" />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              disabled={isLoggingIn || isSendingOtp}
              className="h-10 w-full bg-[#FFC107] text-sm text-black hover:bg-[#eeb300] sm:h-11 sm:text-base"
            >
              {isLoggingIn
                ? "Checking number..."
                : isSendingOtp
                  ? "Sending OTP..."
                  : "Continue"}
            </Button>

            <Button
              variant="outline"
              className="flex h-10 w-full items-center justify-center gap-3 border-white hover:bg-white/10 hover:text-white sm:h-11"
            >
              <img src={GoogleLogo} alt="google logo" className="h-5 w-5" />
              <span className="text-xs font-medium sm:text-sm">
                Login with Google
              </span>
            </Button>

            <p className="mt-3 text-center text-xs text-white/80 sm:mt-4 sm:text-sm">
              Don't have an account?
              <Link
                to="/auth/register"
                className="pl-1 font-bold text-yellow-400 hover:underline"
              >
                Register
              </Link>
            </p>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
};

export default LoginForm;
