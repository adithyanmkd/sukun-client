import HeroSection from "./components/HeroSection";
import CategorySection from "./components/categorySection/CategorySection";
import FeaturedVideo from "./components/featuredVideoSection/FeaturedVideo";
import FeaturedTutorsSection from "./components/featuredTutorsSection/FeaturedTutorsSection";

const HomePage = () => {
  return (
    <>
      <div>
        <HeroSection />
        <CategorySection />
        <FeaturedVideo />
        <FeaturedTutorsSection />
      </div>
    </>
  );
};

export default HomePage;
