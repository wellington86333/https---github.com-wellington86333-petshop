
'use client';

import { useWatchlist } from '@/hooks/use-watchlist';
import { DealList } from '@/components/DealList';
import { Heart } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function WatchlistPage() {
  const { watchlistItems } = useWatchlist();

  return (
    <main className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold tracking-tight mb-2 flex items-center gap-3">
          <Heart className="w-10 h-10 text-destructive" />
          My Watchlist
        </h1>
        <p className="text-muted-foreground">Deals you're keeping an eye on. They'll be saved here in your browser.</p>
      </div>

      {watchlistItems.length > 0 ? (
        <DealList deals={watchlistItems} />
      ) : (
        <div className="text-center py-16 border-2 border-dashed rounded-lg">
          <Heart className="mx-auto h-12 w-12 text-muted-foreground" />
          <h3 className="mt-4 text-lg font-medium">Your watchlist is empty</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Click the heart icon on any deal to add it here.
          </p>
          <div className="mt-6">
            <Button asChild>
              <Link href="/">
                Find Deals
              </Link>
            </Button>
          </div>
        </div>
      )}
    </main>
  );
}
