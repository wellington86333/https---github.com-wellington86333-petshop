
import type { Deal } from '@/lib/types';
import { DealCard } from './DealCard';

export function DealList({ deals }: { deals: Deal[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {deals.map((deal) => (
        <DealCard key={deal.id} deal={deal} />
      ))}
    </div>
  );
}
