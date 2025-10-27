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

const RegisterForm = () => {
  return (
    <Card className="absolute w-full max-w-sm">
      <CardHeader>
        <CardTitle>Create Account</CardTitle>
        <CardDescription>
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

            {/* Password */}
            {/* <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
              </div>
              <Input
                className="bg-white"
                id="password"
                type="password"
                placeholder="Enter your password"
                required
              />
            </div> */}

            {/* Confirm Password */}
            {/* <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
              </div>
              <Input
                className="bg-white"
                id="confirmPassword"
                type="password"
                placeholder="Re-enter your password"
                required
              />
            </div> */}
          </div>
        </form>
      </CardContent>

      <CardFooter className="flex-col gap-2">
        <div className="flex w-full gap-3">
          <Checkbox id="terms" />
          <Label htmlFor="terms">Accept terms and conditions</Label>
        </div>
        <Button
          type="submit"
          className="w-full cursor-pointer bg-[#29A847] hover:bg-[#1e8d38]"
        >
          Register
        </Button>
        <Button variant="outline" className="w-full cursor-pointer">
          Login with Google
        </Button>
      </CardFooter>
    </Card>
  );
};

export default RegisterForm;
