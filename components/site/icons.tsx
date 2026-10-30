import { ContactType } from "@prisma/client";
import { Mail, Github, Instagram, Linkedin, Phone, MessageCircle, Link as LinkIcon } from "lucide-react";

export function ContactIcon({ type, className = "h-4 w-4" }: { type: ContactType | "EMAIL"; className?: string }) {
  switch (type) {
    case ContactType.EMAIL:
    case "EMAIL":
      return <Mail className={className} />;
    case ContactType.GITHUB:
      return <Github className={className} />;
    case ContactType.INSTAGRAM:
      return <Instagram className={className} />;
    case ContactType.LINKEDIN:
      return <Linkedin className={className} />;
    case ContactType.PHONE:
      return <Phone className={className} />;
    case ContactType.WHATSAPP:
      return <MessageCircle className={className} />;
    default:
      return <LinkIcon className={className} />;
  }
}
