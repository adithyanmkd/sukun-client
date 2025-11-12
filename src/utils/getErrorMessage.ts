// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getErrorMessage = (err: any): string => {
  // HTTP errors (400, 401, 500 …)
  if (err?.data?.message) return err.data.message;
  if (typeof err?.data === "string") return err.data;

  // Fallback
  return "Something went wrong. Please try again later.";
};
