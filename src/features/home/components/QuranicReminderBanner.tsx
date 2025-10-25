const QuranicReminderBanner = () => {
  return (
    <div className="bg-[#FFC107] py-6 text-center">
      <h1 className="text-4xl font-semibold text-[#19191F]">
        Did you read Quran today?
      </h1>
      <p className="pt-6 font-light">
        "The best of you are those who learn the Qur'an and teach it." - Prophet
        Muhammad (SAW)
      </p>
      <button className="mt-4 rounded-md bg-black px-4 py-2 pt-2 font-medium text-white">
        Read Now
      </button>
    </div>
  );
};

export default QuranicReminderBanner;
