import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { ArrowLeft, RefreshCw } from "lucide-react";
import type { UseFormReturn } from "react-hook-form";

interface OTPFormProps {
  form: UseFormReturn<{ pin: string }>;
  onSubmit: (values: { pin: string }) => void;
  onBack: () => void;
  onResend: () => void;
  isSumbitting?: boolean;
  isResending?: boolean;
}

export default function OTPForm({
  form,
  onSubmit,
  onBack,
  onResend,
  isSumbitting = false,
  isResending = false,
}: OTPFormProps) {
  const [countdown, setCountdown] = useState(60);

  useEffect(() => {
    if (countdown === 0) return;

    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [countdown]);

  const handleResend = async () => {
    onResend();
    setCountdown(60);
  };

  return (
    <div className="mx-auto my-auto max-w-sm">
      <div className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
        {/* Back Button */}
        <button
          type="button"
          onClick={onBack}
          className="mb-4 flex items-center gap-1.5 rounded-md text-sm font-medium text-slate-600 transition-colors hover:text-slate-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
        >
          <ArrowLeft className="h-4 w-4" />
          Change number
        </button>

        {/* Header */}
        <div className="mb-5 text-center">
          <h2 className="text-lg font-semibold text-slate-900">
            Enter Verification Code
          </h2>
          <p className="mt-1 text-xs text-slate-600">
            We sent a 6-digit code to your phone
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="pin"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel className="text-base font-medium text-slate-800">
                    One-Time Password
                  </FormLabel>
                  <FormControl>
                    <div className="flex justify-center">
                      <InputOTP maxLength={6} {...field}>
                        <InputOTPGroup className="gap-2">
                          {[...Array(6)].map((_, i) => (
                            <InputOTPSlot
                              key={i}
                              index={i}
                              className="h-12 w-12 rounded-lg border border-slate-300 bg-white text-lg font-medium text-slate-900 shadow-sm transition-all focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-1 data-invalid:border-red-500 data-invalid:ring-2 data-invalid:ring-red-500"
                            />
                          ))}
                        </InputOTPGroup>
                      </InputOTP>
                    </div>
                  </FormControl>
                  <FormDescription className="text-center text-xs text-slate-600">
                    Check your messages for the code
                  </FormDescription>
                  <FormMessage className="text-center text-xs font-medium text-red-600" />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              disabled={isSumbitting}
              className="w-full rounded-lg bg-blue-600 py-3 text-sm font-medium text-white shadow-sm transition-all hover:bg-blue-700 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:outline-none"
            >
              {isSumbitting ? "Verifying..." : "Verify Code"}
            </Button>
          </form>
        </Form>

        {/* Resend Section */}
        <div className="mt-4 text-center">
          {countdown > 0 ? (
            <p className="text-xs text-slate-500">
              Resend code in
              <span className="ml-1 font-medium text-slate-700">
                {countdown}s
              </span>
            </p>
          ) : (
            <button
              type="button"
              onClick={handleResend}
              disabled={isResending}
              className="inline-flex items-center gap-1.5 text-xs font-medium text-blue-600 transition-colors hover:text-blue-700 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isResending ? (
                <>
                  <RefreshCw className="h-3 w-3 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <RefreshCw className="h-3 w-3" />
                  Resend Code
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
