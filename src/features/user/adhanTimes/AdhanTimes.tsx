import React, { useEffect, useState } from "react";
import { Clock, MapPin, Calendar, RefreshCw } from "lucide-react";
import QuickActions from "../qibla/components/QuickAction";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { useGetPrayerTimesByCityQuery } from "./api/prayerTimesApi";
import type { PrayerTimes } from "./types";
import { setLocation } from "./slices/locationSlice";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Link } from "react-router-dom";

const AdhanTimes: React.FC = () => {
  const dispatch = useAppDispatch();
  const location = useAppSelector((state) => state.location);
  const [currentTime, setCurrentTime] = useState<Date>(new Date());
  const [nextPrayer, setNextPrayer] = useState<{
    name: string;
    time: string;
  } | null>(null);

  const { data, isLoading, error, refetch } = useGetPrayerTimesByCityQuery({
    city: location.city,
    country: location.country,
  });

  const prayerNames: (keyof PrayerTimes)[] = [
    "Fajr",
    "Sunrise",
    "Dhuhr",
    "Asr",
    "Maghrib",
    "Isha",
  ];

  const getUserLocation = (): void => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const { latitude, longitude } = position.coords;
            const response = await fetch(
              `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`,
            );
            const data = await response.json();
            const city = data.city || data.locality || "Mumbai";
            const country = data.countryName || "India";
            dispatch(setLocation({ city, country }));
          } catch {
            dispatch(setLocation({ city: "Mumbai", country: "India" }));
          }
        },
        () => {
          dispatch(setLocation({ city: "Mumbai", country: "India" }));
        },
      );
    }
  };

  const findNextPrayer = (): void => {
    if (!data?.data?.timings) return;

    const now = new Date();
    const currentMinutes = now.getHours() * 60 + now.getMinutes();
    const prayerTimes = data.data.timings;

    for (const prayer of prayerNames) {
      if (prayer === "Sunrise") continue;

      const timeStr = prayerTimes[prayer];
      const [hours, minutes] = timeStr.split(":").map(Number);
      const prayerMinutes = hours * 60 + minutes;

      if (prayerMinutes > currentMinutes) {
        setNextPrayer({ name: prayer, time: timeStr });
        return;
      }
    }

    setNextPrayer({ name: "Fajr", time: prayerTimes.Fajr });
  };

  const formatTime = (time24: string): string => {
    const [hours, minutes] = time24.split(":");
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? "PM" : "AM";
    const hour12 = hour % 12 || 12;
    return `${hour12}:${minutes} ${ampm}`;
  };

  const handleRefreshLocation = (): void => {
    getUserLocation();
    refetch();
  };

  useEffect(() => {
    getUserLocation();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
      findNextPrayer();
    }, 1000);

    return () => clearInterval(timer);
  }, [data]);

  useEffect(() => {
    findNextPrayer();
  }, [data]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-linear-to-br from-emerald-50 to-teal-100">
        <div className="text-center">
          <div className="mx-auto mb-4 h-16 w-16 animate-spin rounded-full border-b-4 border-emerald-600"></div>
          <p className="text-lg font-medium text-emerald-700">
            Loading prayer times...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-linear-to-br from-emerald-50 to-teal-100">
        <div className="max-w-md rounded-lg border border-red-400 bg-red-100 px-6 py-4 text-red-700">
          <p className="mb-2 font-semibold">Failed to load prayer times</p>
          <button
            onClick={handleRefreshLocation}
            className="rounded-lg bg-red-500 px-4 py-2 text-white transition-colors hover:bg-red-600"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  const prayerTimes = data?.data?.timings;
  const dateInfo = data?.data?.date;

  return (
    <div className="min-h-screen bg-linear-to-br from-emerald-50 via-teal-50 to-cyan-50">
      <div className="mx-auto max-w-6xl px-4 py-8">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/">Home</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Adhan Times</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div className="mb-8 text-center">
          <h1 className="mb-2 text-4xl font-bold text-emerald-800">
            Prayer Times
          </h1>
          <p className="text-emerald-600">
            Stay connected with your daily prayers
          </p>
        </div>

        <div className="mb-6 rounded-2xl bg-white p-6 shadow-xl">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="flex items-center gap-4">
              <div className="rounded-full bg-emerald-100 p-3">
                <Clock className="h-6 w-6 text-emerald-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Current Time</p>
                <p className="text-2xl font-bold text-gray-800">
                  {currentTime.toLocaleTimeString("en-US", {
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                  })}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="rounded-full bg-blue-100 p-3">
                <MapPin className="h-6 w-6 text-blue-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-600">Location</p>
                <p className="text-lg font-semibold text-gray-800">
                  {location.city}, {location.country}
                </p>
              </div>
              <button
                onClick={handleRefreshLocation}
                className="rounded-full bg-blue-500 p-2 text-white transition-colors hover:bg-blue-600"
                title="Update location"
              >
                <RefreshCw className="h-5 w-5" />
              </button>
            </div>
          </div>

          {dateInfo && (
            <div className="mt-6 border-t border-gray-200 pt-6">
              <div className="flex items-center gap-4">
                <div className="rounded-full bg-amber-100 p-3">
                  <Calendar className="h-6 w-6 text-amber-600" />
                </div>
                <div className="flex-1">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <p className="text-sm text-gray-600">Islamic Date</p>
                      <p className="text-lg font-semibold text-gray-800">
                        {dateInfo.hijri.day} {dateInfo.hijri.month.en}{" "}
                        {dateInfo.hijri.year}{" "}
                        {dateInfo.hijri.designation.abbreviated}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Gregorian Date</p>
                      <p className="text-lg font-semibold text-gray-800">
                        {dateInfo.gregorian.weekday.en},{" "}
                        {dateInfo.gregorian.day} {dateInfo.gregorian.month.en}{" "}
                        {dateInfo.gregorian.year}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {nextPrayer && (
          <div className="mb-6 rounded-2xl bg-linear-to-r from-emerald-600 to-teal-600 p-8 text-center text-white shadow-2xl">
            <p className="mb-2 text-xl opacity-90">Next Prayer</p>
            <h2 className="mb-4 text-5xl font-bold">{nextPrayer.name}</h2>
            <p className="text-6xl font-bold">{formatTime(nextPrayer.time)}</p>
          </div>
        )}

        {prayerTimes && (
          <div className="mb-6 rounded-2xl bg-white p-6 shadow-xl">
            <h3 className="mb-6 text-2xl font-bold text-gray-800">
              Today's Prayer Schedule
            </h3>
            <div className="grid gap-3">
              {prayerNames.map((prayer) => (
                <div
                  key={prayer}
                  className={`flex items-center justify-between rounded-xl p-4 transition-all ${
                    nextPrayer?.name === prayer
                      ? "border-2 border-emerald-500 bg-emerald-100"
                      : "bg-gray-50 hover:bg-gray-100"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-full ${
                        nextPrayer?.name === prayer
                          ? "bg-emerald-500 text-white"
                          : "bg-gray-300 text-gray-700"
                      }`}
                    >
                      <Clock className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="text-lg font-semibold text-gray-800">
                        {prayer}
                      </p>
                      {prayer === "Sunrise" && (
                        <p className="text-xs text-gray-500">
                          Not a prayer time
                        </p>
                      )}
                    </div>
                  </div>
                  <p className="text-2xl font-bold text-gray-800">
                    {formatTime(prayerTimes[prayer])}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        <QuickActions />
      </div>
    </div>
  );
};

export default AdhanTimes;
