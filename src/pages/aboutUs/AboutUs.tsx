import coverImage from "@assets/images/aboutUsCover.svg"; // about us cover image
import founderImg from "@assets/images/demo-user.jpg";

import PartnerCard from "./PartnersCard";

const partners = [
  {
    id: 1,
    name: "NOORULLAH",
    position: "FOUNDER",
    image: founderImg,
  },
  {
    id: 2,
    name: "RIZWAN",
    position: "CO-FOUNDER",
    image: founderImg,
  },
  {
    id: 3,
    name: "MIDLAJ",
    position: "Operational Manager",
    image: founderImg,
  },
  {
    id: 4,
    name: "SUHAIR",
    position: "",
    image: founderImg,
  },
];

const AboutUs = () => {
  return (
    <div className="bg-[#098958]">
      {/* cover image and text */}
      <div className="relative flex flex-col items-center justify-end">
        <img className="" src={coverImage} alt="cover image" />
        <p className="absolute pb-10 text-center text-xl font-bold text-white md:w-3xl">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae
          laborum hic eos, soluta eligendi ipsa accusantium porro! Rem impedit
          animi accusamus tempora neque alias hic modi laudantium pariatur,
          voluptate quia esse veniam inventore ab, obcaecati quisquam incidunt!
          Dolorum, dicta deserunt.
        </p>
      </div>

      {/* partners section */}
      <div className="mx-auto grid max-w-4xl grid-cols-4 py-8">
        {partners.map((partner) => (
          <PartnerCard key={partner.id} {...partner} />
        ))}
      </div>
    </div>
  );
};

export default AboutUs;
