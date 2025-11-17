import { type MouseEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import GoogleLogo from "@assets/icons/google-logo.svg";
import { useRegisterMutation, useSendOtpMutation } from "../api/authApi";
import {
  registerSchema,
  type RegisterSchema,
} from "../validations/registerSchema";
import { getErrorMessage } from "@/utils/getErrorMessage";
import { useAppDispatch } from "@/app/hooks";
import { loginWithGoogle } from "../authSlice";

const RegisterForm = () => {
  const navigate = useNavigate();
  const dispath = useAppDispatch();

  const form = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
    defaultValues: { username: "", phone: "", terms: false },
  });

  const [register, { isLoading: isRegistering }] = useRegisterMutation();
  const [sendOtp, { isLoading: isSendingOtp }] = useSendOtpMutation();

  // handle login with phone
  const onSubmit = async (data: RegisterSchema) => {
    try {
      await register({ phone: data.phone, username: data.username }).unwrap();
      await sendOtp({ phone: data.phone }).unwrap();
      navigate("/otp-verify", { state: { phone: data.phone } });
    } catch (error) {
      form.setError("phone", { message: getErrorMessage(error) });
    }
  };

  // handle register with google
  const handleGoogleLogin = (e: MouseEvent) => {
    e.preventDefault();
    dispath(loginWithGoogle());
  };

  return (
    <Card className="w-full max-w-[20rem] bg-[#FFC107] shadow-2xl sm:max-w-88 md:max-w-[24rem]">
      <CardHeader className="space-y-1 pb-3 text-center sm:space-y-2 sm:pb-4">
        <CardTitle className="text-lg font-bold text-black sm:text-xl md:text-2xl">
          Create Account
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
              name="username"
              render={({ field }) => (
                <FormItem className="grid gap-1.5 sm:gap-2">
                  <FormLabel className="text-sm text-black sm:text-base">
                    Username
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Enter your username"
                      className="h-10 bg-white text-base placeholder:text-gray-500 focus-visible:ring-0 focus-visible:ring-offset-0 sm:h-11"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-xs text-red-600 sm:text-sm" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem className="grid gap-1.5 sm:gap-2">
                  <FormLabel className="text-sm text-black sm:text-base">
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
                  <FormMessage className="text-xs text-red-600 sm:text-sm" />
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
                  <div className="flex w-full items-center gap-2">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        id="terms"
                        className="size-4 border-white data-[state=checked]:border-green-500 data-[state=checked]:bg-green-500 data-[state=checked]:text-white sm:size-5"
                      />
                    </FormControl>
                    <FormLabel
                      htmlFor="terms"
                      className="cursor-pointer text-xs text-white sm:text-sm"
                    >
                      Accept Terms & conditions
                    </FormLabel>
                  </div>
                  <FormMessage className="text-xs text-red-600" />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              disabled={isRegistering || isSendingOtp}
              className="h-10 w-full bg-[#29A847] text-sm font-bold text-white hover:bg-[#1e8d38] sm:h-11 sm:text-base"
            >
              {isRegistering || isSendingOtp ? "Registering..." : "Register"}
            </Button>

            <Button
              onClick={handleGoogleLogin}
              variant="outline"
              className="flex h-10 w-full items-center justify-center gap-3 border-white text-black hover:bg-white/10 sm:h-11"
            >
              <img src={GoogleLogo} alt="google logo" className="h-5 w-5" />
              <span className="text-xs font-medium sm:text-sm">
                Login with Google
              </span>
            </Button>

            <p className="mt-3 text-center text-xs text-black sm:mt-4 sm:text-sm">
              Already have an account?{" "}
              <Link
                to="/auth/login"
                className="font-bold text-green-800 hover:underline"
              >
                Login
              </Link>
            </p>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
};

export default RegisterForm;
