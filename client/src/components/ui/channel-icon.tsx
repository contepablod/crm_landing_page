import { Channel } from "@/lib/types";
import { Instagram, Linkedin, Twitter, MessageCircle, HelpCircle, Video, MessageSquare } from "lucide-react";

interface ChannelIconProps {
  channel: Channel;
  className?: string;
}

export function ChannelIcon({ channel, className }: ChannelIconProps) {
  switch (channel) {
    case "instagram":
      return <Instagram className={className} />;
    case "tiktok":
      return <Video className={className} />;
    case "linkedin":
      return <Linkedin className={className} />;
    case "whatsapp":
      return <MessageCircle className={className} />;
    case "x":
      return <Twitter className={className} />;
    case "reddit":
      return <MessageSquare className={className} />;
    default:
      return <HelpCircle className={className} />;
  }
}
