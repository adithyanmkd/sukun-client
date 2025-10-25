import HeroSection from "./components/HeroSection";
import CategorySection from "./components/categorySection/CategorySection";
import FeaturedVideo from "./components/featuredVideoSection/FeaturedVideo";
import FeaturedTutorsSection from "./components/featuredTutorsSection/FeaturedTutorsSection";
import PopularNewsSection from "./components/popularNewsSection/PopularNewsSection";
import OtherCategoriesSection from "./components/otherCategoriesSection/OtherCategoriesSection";
import QuranicReminderBanner from "./components/QuranicReminderBanner";

const HomePage = () => {
  return (
    <>
      <div>
        <HeroSection />
        <CategorySection />
        <FeaturedVideo />
        <FeaturedTutorsSection />
        <PopularNewsSection />
        <OtherCategoriesSection />
        <QuranicReminderBanner />
      </div>
    </>
  );
};

export default HomePage;
