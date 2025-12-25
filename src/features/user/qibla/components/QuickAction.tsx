import React from "react";
import { Link } from "react-router-dom";
import {
  BookOpen,
  MessageSquare,
  ListTodo,
  Calendar,
  type LucideIcon,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface QuickAction {
  id: string;
  icon?: LucideIcon;
  emoji?: string;
  label: string;
  counter?: number;
  to: string;
}

interface QuickActionsProps {
  actions?: QuickAction[];
  title?: string;
  className?: string;
}

const defaultActions: QuickAction[] = [
  {
    id: "quran",
    icon: BookOpen,
    label: "QURAN",
    to: "/quran",
  },
  {
    id: "masjids",
    emoji: "🕌",
    label: "MASJIDS & PRAYER HALL",
    to: "/masjids",
  },
  {
    id: "qa",
    icon: MessageSquare,
    label: "Q&A",
    to: "/qa",
  },
  {
    id: "todo",
    icon: ListTodo,
    label: "TO-DO",
    to: "/todo",
  },
  {
    id: "dhikr",
    counter: 0,
    label: "DHIKR COUNTER",
    to: "/dhikr",
  },
  {
    id: "calendar",
    icon: Calendar,
    label: "ISLAMIC CALENDAR",
    to: "/calendar",
  },
];

const QuickActions: React.FC<QuickActionsProps> = ({
  actions = defaultActions,
  title = "Quick Actions",
  className = "",
}) => {
  return (
    <Card
      className={`border-none bg-linear-to-br from-emerald-600 to-emerald-700 shadow-xl ${className}`}
    >
      <CardContent className="p-6">
        <h3 className="mb-6 text-xl font-bold text-white">{title}</h3>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
          {actions.map((action) => (
            <Link
              key={action.id}
              to={action.to}
              className="flex flex-col items-center gap-3 rounded-xl bg-slate-800 p-6 text-white transition-colors hover:bg-slate-700 focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-emerald-600 focus:outline-none"
              aria-label={action.label}
            >
              {action.icon && <action.icon className="h-8 w-8" />}
              {action.emoji && <div className="text-3xl">{action.emoji}</div>}
              {action.counter !== undefined && (
                <div className="text-2xl font-bold">{action.counter}</div>
              )}
              <span className="text-center text-sm font-medium">
                {action.label}
              </span>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default QuickActions;
