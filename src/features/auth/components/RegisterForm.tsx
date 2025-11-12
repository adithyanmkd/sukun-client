// ----------------------
// 📦 External libraries
// ----------------------
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// ----------------------
// 🎨 UI Components
// ----------------------
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

// ----------------------
// 🖼️ Assets
// ----------------------
import GoogleLogo from "@assets/icons/google-logo.svg";

// ----------------------
// 🌐 API Hooks
// ----------------------
import { useRegisterMutation, useSendOtpMutation } from "../api/authApi";

// ----------------------
// 🧠 Validation & Utils
// ----------------------
import {
  registerSchema,
  type RegisterSchema,
} from "../validations/registerSchema";
import { getErrorMessage } from "@/utils/getErrorMessage";

const RegisterForm = () => {
  // Initialize React Hook Form with Zod validation and default field values
  const form = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      phone: "",
      terms: false,
    },
  });

  const navigate = useNavigate();

  const [register, { isLoading: isRegistering }] = useRegisterMutation();
  const [sendOtp, { isLoading: isSendingOtp }] = useSendOtpMutation();

  // handle form submission
  const handleOnSubmit = async (data: RegisterSchema) => {
    const { phone, username } = data;

    try {
      await register({ phone, username }).unwrap();
      await sendOtp({ phone }).unwrap();

      navigate("/otp-verify", { state: { phone: data.phone } });
    } catch (error) {
      form.setError("phone", {
        message: getErrorMessage(error),
      });
    }
  };

  return (
    <Card className="absolute w-full max-w-sm bg-[#FFC107]">
      <CardHeader>
        <CardTitle className="text-2xl">Create Account</CardTitle>
        <CardDescription className="text-black">
          Welcome! Create your account to get started.
        </CardDescription>
      </CardHeader>

      <Form {...form}>
        <form
          className="flex flex-col gap-6"
          onSubmit={form.handleSubmit(handleOnSubmit)}
        >
          <CardContent className="flex flex-col gap-y-4 py-6">
            {/* username field */}
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem className="grid gap-2">
                  <FormLabel htmlFor="username">Username</FormLabel>
                  <FormControl>
                    <Input
                      className="bg-white outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
                      id="username"
                      type="text"
                      placeholder="Enter your username"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Phone Field */}
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem className="grid gap-2">
                  <FormLabel htmlFor="phone">Phone</FormLabel>
                  <FormControl>
                    <Input
                      id="phone"
                      type="tel"
                      maxLength={10}
                      className="bg-white outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
                      placeholder="Enter your phone number"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>

          <CardFooter className="flex-col gap-2">
            {form.formState.errors.root && (
              <p className="text-red-500">
                {form.formState.errors.root.message}
              </p>
            )}
            {/* Terms Checkbox */}
            <FormField
              control={form.control}
              name="terms"
              render={({ field }) => (
                <FormItem className="w-full">
                  <div className="flex items-center gap-x-2">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        id="terms"
                        name="terms"
                        className="border-white data-[state=checked]:border-green-500 data-[state=checked]:bg-green-500"
                      />
                    </FormControl>
                    <FormLabel
                      htmlFor="terms"
                      className="cursor-pointer text-sm text-white/90"
                    >
                      Accept Terms & conditions
                    </FormLabel>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* submit button */}
            <Button
              disabled={isRegistering || isSendingOtp}
              type="submit"
              className="w-full cursor-pointer bg-[#29A847] hover:bg-[#1e8d38]"
            >
              Register
            </Button>
            <Button variant="outline" className="w-full cursor-pointer">
              <span>
                <img className="w-7" src={GoogleLogo} alt="google logo" />
              </span>
              Login with Google
            </Button>

            {/* Login Link */}
            <p className="mt-4 text-center text-sm">
              Already have an account?
              <Link
                to="/auth/login"
                className="pl-1 font-semibold text-green-800 hover:underline"
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
