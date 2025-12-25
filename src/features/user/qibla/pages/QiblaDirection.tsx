import React, { useState, useEffect } from "react";
import { Clock, MapPin, Navigation, Loader } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import QuickActions from "../components/QuickAction";
import {
  useGetQiblaQuery,
  useGetPrayerTimesQuery,
  useGetLocationNameQuery,
} from "../api/qiblaApi";
import type { NextPrayer, PrayerTimes } from "../types";

const QiblaDirection: React.FC = () => {
  const [currentTime, setCurrentTime] = useState<Date>(new Date());
  const [location, setLocation] = useState<{ lat: number; lon: number } | null>(
    null,
  );
  const [compassRotation, setCompassRotation] = useState<number>(0);
  const [deviceHeading, setDeviceHeading] = useState<number>(0);
  const [nextPrayer, setNextPrayer] = useState<NextPrayer | null>(null);
  const [locationError, setLocationError] = useState<string | null>(null);

  // RTK Query hooks - automatically cached!
  const {
    data: qiblaDirection,
    isLoading: qiblaLoading,
    error: qiblaError,
  } = useGetQiblaQuery(
    location ? { lat: location.lat, lon: location.lon } : { lat: 0, lon: 0 },
    { skip: !location }, // Don't fetch until location is available
  );

  const {
    data: prayerTimes,
    isLoading: prayerLoading,
    error: prayerError,
  } = useGetPrayerTimesQuery(
    location ? { lat: location.lat, lon: location.lon } : { lat: 0, lon: 0 },
    { skip: !location },
  );

  const { data: locationName, isLoading: locationNameLoading } =
    useGetLocationNameQuery(
      location ? { lat: location.lat, lon: location.lon } : { lat: 0, lon: 0 },
      { skip: !location },
    );

  const isLoading = qiblaLoading || prayerLoading || locationNameLoading;

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Calculate next prayer
  useEffect(() => {
    if (prayerTimes) {
      calculateNextPrayer(prayerTimes);
    }
  }, [prayerTimes, currentTime]);

  // Handle device orientation
  useEffect(() => {
    const handleOrientation = (event: DeviceOrientationEvent): void => {
      if (event.alpha !== null) {
        setDeviceHeading(event.alpha);
      }
    };

    if (window.DeviceOrientationEvent) {
      window.addEventListener(
        "deviceorientation",
        handleOrientation as EventListener,
      );
    }

    return () => {
      window.removeEventListener(
        "deviceorientation",
        handleOrientation as EventListener,
      );
    };
  }, []);

  // Update compass rotation
  useEffect(() => {
    if (qiblaDirection !== null && qiblaDirection !== undefined) {
      setCompassRotation(qiblaDirection - deviceHeading);
    }
  }, [qiblaDirection, deviceHeading]);

  const calculateNextPrayer = (timings: PrayerTimes): void => {
    const now = new Date();
    const currentMinutes = now.getHours() * 60 + now.getMinutes();

    const prayers: Array<{ name: string; time: string }> = [
      { name: "Fajr", time: timings.Fajr },
      { name: "Dhuhr", time: timings.Dhuhr },
      { name: "Asr", time: timings.Asr },
      { name: "Maghrib", time: timings.Maghrib },
      { name: "Isha", time: timings.Isha },
    ];

    for (const prayer of prayers) {
      const [hours, minutes] = prayer.time.split(":").map(Number);
      const prayerMinutes = hours * 60 + minutes;

      if (prayerMinutes > currentMinutes) {
        const diff = prayerMinutes - currentMinutes;
        const hoursLeft = Math.floor(diff / 60);
        const minutesLeft = diff % 60;

        setNextPrayer({
          name: prayer.name,
          time: prayer.time,
          timeLeft: `${hoursLeft}h ${minutesLeft}m`,
        });
        return;
      }
    }

    const [hours, minutes] = prayers[0].time.split(":").map(Number);
    const fajrMinutes = hours * 60 + minutes;
    const diff = 24 * 60 - currentMinutes + fajrMinutes;
    const hoursLeft = Math.floor(diff / 60);
    const minutesLeft = diff % 60;

    setNextPrayer({
      name: prayers[0].name,
      time: prayers[0].time,
      timeLeft: `${hoursLeft}h ${minutesLeft}m`,
    });
  };

  const updateLocation = (): void => {
    setLocationError(null);

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ lat: latitude, lon: longitude });
        },
        (error) => {
          console.error("Location access denied:", error);
          setLocationError("Please enable location access to use this feature");
        },
      );
    } else {
      setLocationError("Geolocation is not supported by your browser");
    }
  };

  // Initial location fetch
  useEffect(() => {
    updateLocation();
  }, []);

  const calculateDistance = (lat: number, lon: number): number => {
    const kaabaLat = 21.4225;
    const kaabaLon = 39.8262;

    const R = 6371;
    const dLat = ((kaabaLat - lat) * Math.PI) / 180;
    const dLon = ((kaabaLon - lon) * Math.PI) / 180;

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat * Math.PI) / 180) *
        Math.cos((kaabaLat * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return Math.round(R * c);
  };

  const formatTime = (date: Date): string => {
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  const formatDate = (date: Date): string => {
    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  const formatPrayerTime = (time: string): string => {
    const [hours, minutes] = time.split(":");
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? "PM" : "AM";
    const formattedHour = hour % 12 || 12;
    return `${formattedHour}:${minutes} ${ampm}`;
  };

  if (!location || isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-linear-to-br from-slate-50 to-emerald-50">
        <div className="text-center">
          <Loader className="mx-auto mb-4 h-12 w-12 animate-spin text-emerald-600" />
          <p className="text-lg text-slate-600">
            {!location ? "Getting your location..." : "Loading prayer data..."}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 to-emerald-50 px-4 py-8">
      <div className="mx-auto max-w-5xl">
        {/* Breadcrumb */}
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>qibla</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        {/* Main Content Card */}
        <Card className="mt-6 mb-8 border-none bg-white/80 shadow-2xl backdrop-blur">
          <CardContent className="p-8 md:p-12">
            <div className="grid items-center gap-8 md:grid-cols-2">
              {/* Left Side - Compass */}
              <div className="flex flex-col items-center">
                <div className="relative mb-6">
                  <div
                    className="flex h-72 w-72 items-center justify-center rounded-full border-8 border-slate-300 bg-linear-to-br from-slate-700 to-slate-900 shadow-2xl transition-transform duration-500 ease-out md:h-80 md:w-80"
                    style={{ transform: `rotate(${compassRotation}deg)` }}
                  >
                    <div className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-full bg-slate-800">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="relative">
                          <Navigation
                            className="h-24 w-24 text-red-500 drop-shadow-lg"
                            fill="currentColor"
                            style={{
                              filter:
                                "drop-shadow(0 4px 6px rgba(0, 0, 0, 0.5))",
                            }}
                          />
                          <div className="absolute -top-8 left-1/2 -translate-x-1/2 rounded bg-emerald-600 px-2 py-1 text-xs font-bold whitespace-nowrap text-white">
                            QIBLA
                          </div>
                        </div>
                      </div>

                      <div className="absolute top-4 left-1/2 -translate-x-1/2 text-xl font-bold text-white">
                        N
                      </div>
                      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-xl font-bold text-white">
                        S
                      </div>
                      <div className="absolute top-1/2 left-4 -translate-y-1/2 text-xl font-bold text-white">
                        W
                      </div>
                      <div className="absolute top-1/2 right-4 -translate-y-1/2 text-xl font-bold text-white">
                        E
                      </div>
                      <div className="absolute inset-8 rounded-full border border-slate-600"></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Side - Information */}
              <div className="space-y-6">
                {/* Date and Time */}
                <div>
                  <div className="mb-2 flex items-center gap-2 text-slate-500">
                    <Clock className="h-4 w-4" />
                    <span className="text-sm">Current Date & Time</span>
                  </div>
                  <div className="mb-1 text-4xl font-bold text-slate-900">
                    {formatDate(currentTime)}
                  </div>
                  <div className="text-4xl font-bold text-slate-900">
                    {formatTime(currentTime)}
                  </div>
                </div>

                {/* Next Prayer */}
                {nextPrayer && (
                  <div className="rounded-2xl bg-linear-to-br from-emerald-50 to-teal-50 p-6">
                    <div className="mb-2 flex items-center gap-2 text-slate-600">
                      <Clock className="h-4 w-4" />
                      <span className="text-sm">Next Adhan</span>
                    </div>
                    <Badge className="mb-3 bg-emerald-500 text-white hover:bg-emerald-600">
                      Next Prayer
                    </Badge>
                    <div className="mb-1 text-3xl font-bold text-emerald-600">
                      {nextPrayer.name} - {formatPrayerTime(nextPrayer.time)}
                    </div>
                    <div className="text-lg text-slate-600">
                      In {nextPrayer.timeLeft}
                    </div>
                  </div>
                )}

                {/* Location */}
                <div>
                  <div className="mb-2 flex items-center gap-2 text-slate-500">
                    <MapPin className="h-4 w-4" />
                    <span className="text-sm">Your Location</span>
                  </div>
                  <div className="mb-2 text-2xl font-bold text-slate-900">
                    {locationName || "Fetching location..."}
                  </div>
                  {location && (
                    <div className="flex items-center gap-2 text-slate-600">
                      <Navigation className="h-4 w-4" />
                      <span className="text-sm">Distance to Makkah:</span>
                      <span className="text-lg font-bold text-emerald-600">
                        {calculateDistance(
                          location.lat,
                          location.lon,
                        ).toLocaleString()}{" "}
                        km
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Current Location Status */}
        <div className="mb-6 text-center">
          <p className="mb-4 text-slate-600">Current Location Status</p>
          <p className="mb-4 font-medium text-slate-700">
            Location data is automatically detected.
          </p>
          <Button
            onClick={updateLocation}
            className="rounded-lg bg-emerald-600 px-6 py-3 text-white hover:bg-emerald-700"
          >
            <MapPin className="mr-2 h-4 w-4" />
            Update Location
          </Button>
          {(locationError || qiblaError || prayerError) && (
            <Alert variant="destructive" className="mx-auto mt-4 max-w-md">
              <AlertDescription>
                {locationError || "Failed to fetch prayer data"}
              </AlertDescription>
            </Alert>
          )}
        </div>

        {/* Quick Actions */}
        <QuickActions />
      </div>
    </div>
  );
};

export default QiblaDirection;
