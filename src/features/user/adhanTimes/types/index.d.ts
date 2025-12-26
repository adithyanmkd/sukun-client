export interface PrayerTimes {
  Fajr: string;
  Sunrise: string;
  Dhuhr: string;
  Asr: string;
  Maghrib: string;
  Isha: string;
}

export interface DateInfo {
  readable: string;
  timestamp: string;
  hijri: {
    date: string;
    format: string;
    day: string;
    weekday: { en: string; ar: string };
    month: { number: number; en: string; ar: string };
    year: string;
    designation: { abbreviated: string; expanded: string };
  };
  gregorian: {
    date: string;
    format: string;
    day: string;
    weekday: { en: string };
    month: { number: number; en: string };
    year: string;
    designation: { abbreviated: string; expanded: string };
  };
}

export interface ApiResponse {
  data: {
    timings: PrayerTimes;
    date: DateInfo;
  };
}

export interface LocationState {
  city: string;
  country: string;
}
