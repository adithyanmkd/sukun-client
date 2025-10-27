import HeroSection from "./components/HeroSection";
import CategorySection from "./components/category/CategorySection";
import FeaturedVideo from "./components/featuredVideo/FeaturedVideo";
import FeaturedTutorsSection from "./components/featuredTutors/FeaturedTutorsSection";
import PopularNewsSection from "./components/popularNews/PopularNewsSection";
import OtherCategoriesSection from "./components/otherCategories/OtherCategoriesSection";
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
