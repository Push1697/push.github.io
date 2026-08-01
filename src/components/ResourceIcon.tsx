import { ListVideo } from 'lucide-react';
import { FaYoutube } from 'react-icons/fa';
import { SiUdemy } from 'react-icons/si';
import type { ResourceKind } from '@/lib/learningContent';

export const resourceLabel: Record<ResourceKind, string> = { udemy: 'Udemy', youtube: 'YouTube', playlist: 'Playlist' };

export default function ResourceIcon({ kind }: { kind: ResourceKind }) {
  if (kind === 'udemy') return <SiUdemy />;
  if (kind === 'youtube') return <FaYoutube />;
  return <ListVideo />;
}
