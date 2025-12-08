import { api, type User } from "@/app/apiSlice";
import { setCredentials } from "../authSlice";

type VerifyOtpRequest = {
  phone: string;
  otp: string;
};

type VerifyOtpResponse = {
  status: number;
  data: {
    message: string;
  };
};

// Extend the existing API slice by adding authentication-related endpoints
export const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    // send otp API endpoint
    sendOtp: builder.mutation({
      query: (data) => ({
        url: "send-otp",
        method: "POST",
        body: data,
      }),
    }),

    // verify otp API endpoint
    verifyOtp: builder.mutation<VerifyOtpResponse, VerifyOtpRequest>({
      query: (data) => ({
        url: "verify-otp",
        method: "POST",
        body: data,
      }),
    }),

    // login API endpoint
    login: builder.mutation({
      query: (data) => ({
        url: "login",
        method: "POST",
        body: data,
      }),

      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setCredentials(data));
        } catch (error) {
          console.log("Login error:", error);
        }
      },
    }),

    // register API endpoint
    register: builder.mutation({
      query: (data) => ({
        url: "register",
        method: "POST",
        body: data,
      }),

      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setCredentials(data));
        } catch (error) {
          console.log("Register error:", error);
        }
      },
    }),

    // GET /users/me
    me: builder.query<User, void>({
      query: () => "/api/users/me",
      providesTags: ["User"],
    }),
  }),

  // Prevents overriding existing endpoints in the same API slice
  overrideExisting: false,
});

export const {
  useSendOtpMutation,
  useVerifyOtpMutation,
  useLoginMutation,
  useRegisterMutation,
  useMeQuery,
} = authApi;
