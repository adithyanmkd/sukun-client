import { type LucideIcon } from "lucide-react";
import {
  Compass,
  User,
  Users,
  Flag,
  Bookmark,
  MessageSquare,
} from "lucide-react";

type Item = {
  label: string;
  icon: LucideIcon | string;
  path: string;
};

export const sidebarItems: Item[] = [
  {
    label: "Discover",
    icon: Compass,
    path: "/profile/discover",
  },
  {
    label: "My Profile",
    icon: User,
    path: "/profile/user",
  },
  {
    label: "Friends",
    icon: Users,
    path: "/profile/users",
  },
  {
    label: "Pages",
    icon: Flag,
    path: "/profile/pages",
  },
  {
    label: "Saved",
    icon: Bookmark,
    path: "/profile/saved",
  },
  {
    label: "Messages",
    icon: MessageSquare,
    path: "/profile/messages",
  },
];
