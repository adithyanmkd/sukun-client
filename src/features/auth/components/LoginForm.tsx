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
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";

import GoogleLogo from "@assets/icons/google-logo.svg";

const LoginForm = () => {
  return (
    <Card className="absolute w-full max-w-sm bg-[#28A745]">
      <CardHeader>
        <CardTitle className="text-2xl">Login Now</CardTitle>
        <CardDescription className="text-black">
          Welcome! Create your account to get started.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form>
          <div className="flex flex-col gap-6">
            {/* Phone */}
            <div className="grid gap-2">
              <Label htmlFor="phone">Phone</Label>
              <Input
                className="bg-white"
                id="phone"
                type="text"
                placeholder="Enter your phone number"
              />
            </div>
          </div>
        </form>
      </CardContent>

      <CardFooter className="flex-col gap-2">
        <div className="mt-4 flex w-full items-center space-x-2">
          <Checkbox
            id="terms"
            className="border-white data-[state=checked]:border-yellow-500 data-[state=checked]:bg-yellow-500"
          />
          <Label
            htmlFor="terms"
            className="cursor-pointer text-sm text-white/90"
          >
            Accept Terms & conditions
          </Label>
        </div>
        <Button
          type="submit"
          className="w-full cursor-pointer bg-[#FFC107] text-black hover:bg-[#eeb300]"
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
    </Card>
  );
};

export default LoginForm;
