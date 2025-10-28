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

const RegisterForm = () => {
  return (
    <Card className="absolute w-full max-w-sm bg-[#FFC107]">
      <CardHeader>
        <CardTitle className="text-2xl">Create Account</CardTitle>
        <CardDescription className="text-black">
          Welcome! Create your account to get started.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form>
          <div className="flex flex-col gap-6">
            {/* Username */}
            <div className="grid gap-2">
              <Label htmlFor="username">Username</Label>
              <Input
                className="bg-white"
                id="username"
                type="text"
                placeholder="Enter your username"
                required
              />
            </div>

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
        <div className="flex w-full gap-3">
          <Checkbox id="terms" className="bg-white" />
          <Label htmlFor="terms">Accept terms and conditions</Label>
        </div>
        <Button
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
    </Card>
  );
};

export default RegisterForm;
