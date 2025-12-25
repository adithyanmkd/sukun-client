export interface Location {
  latitude: number;
  longitude: number;
}

export interface PrayerTimes {
  Fajr: string;
  Dhuhr: string;
  Asr: string;
  Maghrib: string;
  Isha: string;
  Sunrise?: string;
  Sunset?: string;
}

export interface NextPrayer {
  name: string;
  time: string;
  timeLeft: string;
}

export type UserLocation = {
  latitude: number;
  longitude: number;
};
