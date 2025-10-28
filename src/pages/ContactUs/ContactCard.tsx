import type { LucideIcon } from "lucide-react";

interface ContactCardProps {
  icon: LucideIcon;
  label: string;
  value: string;
}

const ContactCard = ({ icon: Icon, label, value }: ContactCardProps) => {
  return (
    <div
      className="flex h-[72px] w-80 items-center gap-3 rounded-2xl bg-[#2E8A56] px-4 shadow-lg"
      style={{ width: "320px" }}
    >
      {/* Icon Box */}
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white shadow-sm">
        <Icon className="h-6 w-6 text-green-600" />
      </div>

      {/* Text Content */}
      <div className="flex flex-col text-white">
        <span className="text-sm font-medium opacity-90">{label}</span>
        <span className="text-base font-semibold tracking-wide">{value}</span>
      </div>
    </div>
  );
};

export default ContactCard;
