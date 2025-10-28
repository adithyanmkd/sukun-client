import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import ContactCard from "./ContactCard";
import { Mail, Phone } from "lucide-react";

// contains contact card info
const contactCards = [
  {
    icon: Mail,
    label: "Email",
    value: "support@example.com",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+1 (555) 123-4567",
  },
];

const formFields = [
  {
    id: "name",
    label: "Full Name",
    type: "text",
    placeholder: "Enter your fullname",
  },
  {
    id: "email",
    label: "Email",
    type: "email",
    placeholder: "Enter your email",
  },
  {
    id: "phone",
    label: "Phone Number",
    type: "text",
    placeholder: "Enter your phone number", // Fixed typo
  },
];

const ContactUs = () => {
  return (
    <div className="flex gap-x-8 bg-[#FFC107] px-6 py-8">
      {/* contact details */}
      <div className="max-w-80">
        <h2 className="text-[28px] font-bold text-[#121717]">Contact Us</h2>
        <p className="pt-4 font-light">
          We're here to help and answer any question you might have. We look
          forward to hearing from you.
        </p>
        <div className="space-y-3 pt-4">
          {contactCards.map((item, index) => (
            <ContactCard key={index} {...item} />
          ))}
        </div>
      </div>

      {/* contact form */}
      <div>
        <h2 className="text-[28px] font-bold text-[#121717]">
          We'd love to hear from you! Let's get in touch
        </h2>
        {/* contact form */}
        <form>
          <div className="flex flex-col gap-y-6 pt-8">
            {/* input field */}
            {formFields.map((field) => (
              <div
                key={field.id}
                className="grid w-full max-w-sm items-center gap-y-2"
              >
                <Label htmlFor={field.id}>{field.label}</Label>
                <Input
                  className="bg-white"
                  type={field.type}
                  id={field.id}
                  placeholder={field.placeholder}
                />
              </div>
            ))}
            {/* textarea */}
            <div className="grid w-full max-w-sm items-center gap-y-2">
              <Label htmlFor="message">Message</Label>
              <Textarea
                className="h-20 bg-white"
                id="message"
                placeholder="Type your message here."
              />
            </div>
            {/* submit button */}
            <Input
              type="submit"
              className="w-32 cursor-pointer border-none bg-[#0FB282] font-medium transition-colors hover:bg-[#039569]"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactUs;
