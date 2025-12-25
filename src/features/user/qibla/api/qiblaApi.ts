import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface QiblaResponse {
  code: number;
  data: {
    direction: number;
  };
}

interface PrayerTimingsResponse {
  code: number;
  data: {
    timings: {
      Fajr: string;
      Dhuhr: string;
      Asr: string;
      Maghrib: string;
      Isha: string;
      Sunrise: string;
      Sunset: string;
    };
  };
}

interface LocationResponse {
  address: {
    city?: string;
    town?: string;
    village?: string;
    country?: string;
  };
}

// Helper function for local Qibla calculation (fallback)
const calculateQiblaLocal = (lat: number, lon: number): number => {
  const kaabaLat = 21.4225;
  const kaabaLon = 39.8262;

  const phiK = (kaabaLat * Math.PI) / 180;
  const lambdaK = (kaabaLon * Math.PI) / 180;
  const phi = (lat * Math.PI) / 180;
  const lambda = (lon * Math.PI) / 180;

  const qibla = Math.atan2(
    Math.sin(lambdaK - lambda),
    Math.cos(phi) * Math.tan(phiK) - Math.sin(phi) * Math.cos(lambdaK - lambda),
  );

  return ((qibla * 180) / Math.PI + 360) % 360;
};

export const qiblaApi = createApi({
  reducerPath: "qiblaApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://api.aladhan.com/v1" }),
  // Cache for 24 hours (86400 seconds)
  keepUnusedDataFor: 86400,
  tagTypes: ["Qibla", "PrayerTimes", "Location"],
  endpoints: (builder) => ({
    // Get Qibla Direction
    getQibla: builder.query<number, { lat: number; lon: number }>({
      async queryFn({ lat, lon }, _api, _extraOptions, baseQuery) {
        try {
          const result = await baseQuery(`/qibla/${lat}/${lon}`);

          // Handle rate limit with local calculation
          if (result.error && result.error.status === 429) {
            console.log("Rate limited - using local Qibla calculation");
            return { data: calculateQiblaLocal(lat, lon) };
          }

          if (result.error) {
            console.log("API error - using local Qibla calculation");
            return { data: calculateQiblaLocal(lat, lon) };
          }

          const data = result.data as QiblaResponse;
          return { data: data.data.direction };
        } catch {
          // Fallback to local calculation
          return { data: calculateQiblaLocal(lat, lon) };
        }
      },
      providesTags: ["Qibla"],
    }),

    // Get Prayer Times
    getPrayerTimes: builder.query<
      PrayerTimingsResponse["data"]["timings"],
      { lat: number; lon: number; method?: number }
    >({
      query: ({ lat, lon, method = 2 }) => {
        const timestamp = Math.floor(Date.now() / 1000);
        return `/timings/${timestamp}?latitude=${lat}&longitude=${lon}&method=${method}`;
      },
      transformResponse: (response: PrayerTimingsResponse) =>
        response.data.timings,
      providesTags: ["PrayerTimes"],
      // Refetch prayer times if cache is older than 1 hour
      keepUnusedDataFor: 3600,
    }),

    // Get Location Name (reverse geocoding)
    getLocationName: builder.query<string, { lat: number; lon: number }>({
      async queryFn({ lat, lon }) {
        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`,
          );
          const data: LocationResponse = await response.json();

          const city =
            data.address.city ||
            data.address.town ||
            data.address.village ||
            "";
          const country = data.address.country || "";

          return { data: `${city}, ${country}` };
        } catch {
          return { data: "Unknown Location" };
        }
      },
      providesTags: ["Location"],
      keepUnusedDataFor: 86400, // Cache for 24 hours
    }),
  }),
});

export const {
  useGetQiblaQuery,
  useGetPrayerTimesQuery,
  useGetLocationNameQuery,
} = qiblaApi;
