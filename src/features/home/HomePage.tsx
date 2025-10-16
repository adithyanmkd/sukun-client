import HeroSection from "./components/HeroSection";
import CategorySection from "./components/categorySection/CategorySection";
import FeaturedVideo from "./components/featuredVideo/FeaturedVideo";

const HomePage = () => {
  return (
    <>
      <div>
        <HeroSection />
        <CategorySection />
        <FeaturedVideo />
      </div>
    </>
  );
};

export default HomePage;
