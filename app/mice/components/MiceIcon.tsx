import {
  Briefcase,
  Building2,
  Check,
  Globe,
  Handshake,
  Landmark,
  Lock,
  MessageCircle,
  Mic,
  Shield,
  Sparkles,
  Star,
  Target,
  Tent,
  Trophy,
  Zap,
  type LucideIcon,
} from 'lucide-react';

const iconMap: Record<string, LucideIcon> = {
  Briefcase,
  Building2,
  Check,
  Globe,
  Handshake,
  Landmark,
  Lock,
  MessageCircle,
  Mic,
  Shield,
  Sparkles,
  Star,
  Target,
  Tent,
  Trophy,
  Zap,
};

interface MiceIconProps {
  name: string;
  className?: string;
}

export default function MiceIcon({ name, className = 'h-5 w-5' }: MiceIconProps) {
  const Icon = iconMap[name];
  if (!Icon) return null;
  return <Icon className={className} aria-hidden="true" />;
}
