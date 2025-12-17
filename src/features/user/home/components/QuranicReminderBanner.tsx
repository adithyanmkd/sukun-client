import { Link } from "react-router-dom";

const QuranicReminderBanner = () => {
  return (
    <div className="bg-[#FFC107] py-6 text-center">
      <h1 className="text-4xl font-semibold text-[#19191F]">
        Did you read Quran today?
      </h1>
      <p className="pt-6 pb-4 font-light">
        "The best of you are those who learn the Qur'an and teach it." - Prophet
        Muhammad (SAW)
      </p>
      <Link
        to={"/quran"}
        className="mt-4 rounded-md bg-black px-4 py-2 pt-2 font-medium text-white"
      >
        Read Now
      </Link>
    </div>
  );
};

export default QuranicReminderBanner;
