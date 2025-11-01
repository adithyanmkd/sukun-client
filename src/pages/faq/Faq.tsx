import FaqBg from "@assets/images/faq-bg.svg";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

// demo data
const faqs = [
  {
    id: 1,
    question: "What is the mission of Al-Huda?",
    answer:
      "Al-Huda's mission is to promote Islamic knowledge and understanding through education, community service, and outreach programs.",
  },
  {
    id: 2,
    question: "What services does Al-Huda offer?",
    answer:
      "Al-Huda offers Quran classes, community events, charity programs, and educational workshops for all age groups.",
  },
  {
    id: 3,
    question: "How can I join Al-Huda programs?",
    answer:
      "You can join by visiting our website or contacting our team through the contact page to register for upcoming sessions.",
  },
];

const Faq = () => {
  return (
    <div className="relative flex flex-col items-center">
      {/* Background Image */}
      <img src={FaqBg} alt="faq bg" />

      {/* Overlay Content and Accordion Section */}
      <div className="absolute w-full max-w-4xl">
        {/* Overlay Content */}
        <h1 className="text-[32px] font-bold">Frequently Asked Questions</h1>
        <p className="pt-2 text-[#4F968C]">
          Find answers to common questions about our services and organization.
        </p>

        {/* Accordion Section */}
        <Accordion className="space-y-2 pt-12" type="single" collapsible>
          {faqs.map((faq) => (
            <AccordionItem
              key={faq.id}
              className="rounded-xl border border-[#D1E8E3] bg-[#F7FCFA] px-4 py-2"
              value={`faq-${faq.id}`}
            >
              <AccordionTrigger>{faq.question}</AccordionTrigger>
              <AccordionContent className="text-[#4F968C]">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
};

export default Faq;
