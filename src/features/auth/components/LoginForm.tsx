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

const userFormSchema = z.object({
  phone: z
    .string()
    .regex(/^[6-9]\d{9}$/, "Please enter a valid 10-digit mobile number"),
  terms: z.boolean().refine((v) => v === true, {
    message: "You must accept the Terms & Conditions",
  }),
});

const LoginForm = () => {
  const navigate = useNavigate();

  // 1. Define your form.
  const form = useForm<z.infer<typeof userFormSchema>>({
    resolver: zodResolver(userFormSchema),
    defaultValues: {
      phone: "",
      terms: false,
    },
  });

  const handleOnSumbit = (data: z.infer<typeof userFormSchema>) => {
    console.log("phone number:", data);

    navigate("/otp-verify", { state: { phone: data.phone } });
  };

  return (
    <Card className="absolute w-full max-w-sm bg-[#28A745]">
      <CardHeader>
        <CardTitle className="text-2xl">Login Now</CardTitle>
        <CardDescription className="text-black">
          Welcome! Create your account to get started.
        </CardDescription>
      </CardHeader>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleOnSumbit)}>
          <CardContent className="flex flex-col gap-y-4 py-6">
            {/* Phone Field */}
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem className="grid gap-2">
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <Input
                      type="tel"
                      maxLength={10}
                      className="utline-none bg-white focus-visible:ring-0 focus-visible:ring-offset-0"
                      placeholder="Enter your phone number"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>

          <CardFooter className="flex-col gap-y-2">
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
                        className="border-white data-[state=checked]:border-yellow-500 data-[state=checked]:bg-yellow-500"
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
            {/* Submit Button (Only One!) */}
            <Button
              type="submit"
              className="w-full cursor-pointer bg-[#FFC107] pt-4 text-black hover:bg-[#eeb300]"
            >
              Login
            </Button>

            <Button
              variant="outline"
              className="flex w-full cursor-pointer gap-x-4"
            >
              <span>
                <img className="w-7" src={GoogleLogo} alt="google logo" />
              </span>
              Login with Google
            </Button>
            {/* Register Link */}
            <p className="mt-4 text-center text-sm text-white/80">
              Don't have an account?
              <Link
                to="/auth/register"
                className="pl-1 font-semibold text-yellow-400 hover:underline"
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
