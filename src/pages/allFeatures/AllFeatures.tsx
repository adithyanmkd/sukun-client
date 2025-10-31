import {
  Baby,
  Smartphone,
  Shirt,
  Utensils,
  Scissors,
  Sofa,
  Store,
  ShoppingBag,
  Locate,
  Home,
  Coins,
  Wallet,
  Shield,
  Video,
} from "lucide-react";

import FeatureCard, { type FeatureCardProps } from "./FeatureCard";

const features: FeatureCardProps[] = [
  { icon: Baby, title: "Baby", href: "/baby" },
  { icon: Smartphone, title: "Gadget", href: "/gadget" },
  { icon: Shirt, title: "Fashion", href: "/fashion" },
  { icon: Utensils, title: "Food", href: "/food" },
  { icon: Scissors, title: "Beauty", href: "/beauty" },
  { icon: Sofa, title: "Furniture", href: "/furniture" },
  { icon: Store, title: "Official Store", href: "/official-store" },
  { icon: ShoppingBag, title: "Nearby Shops", href: "/nearby-shops" },
  { icon: Locate, title: "Location", href: "/location" },
  { icon: Home, title: "Cleanliness", href: "/cleanliness" },
  { icon: Coins, title: "Top-Up", href: "/top-up" },
  { icon: Wallet, title: "Wallet", href: "/wallet" },
  { icon: Shield, title: "Insurance", href: "/insurance" },
  { icon: Video, title: "Video", href: "/video" },
];

const AllFeatures = () => {
  return (
    <div>
      <h1 className="py-8 text-center text-3xl font-bold">
        All Features & Services
      </h1>
      <div className="mx-auto grid max-w-5xl grid-cols-5 gap-4">
        {features.map((feature, index) => (
          <FeatureCard
            key={index}
            color={index % 2 === 0 ? "bg-[#2E8A56]" : "bg-[#FFC107]"}
            {...feature}
          />
        ))}
      </div>
    </div>
  );
};

export default AllFeatures;
