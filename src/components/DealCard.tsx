
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Heart } from 'lucide-react';
import { useWatchlist } from '@/hooks/use-watchlist';
import { useToast } from "@/hooks/use-toast";
import type { Deal } from '@/lib/types';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

export function DealCard({ deal }: { deal: Deal }) {
  const { isInWatchlist, addToWatchlist, removeFromWatchlist } = useWatchlist();
  const { toast } = useToast();
  const onWatchlist = isInWatchlist(deal.id);

  const handleWatchlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onWatchlist) {
      removeFromWatchlist(deal.id);
      toast({
        description: `"${deal.title}" removed from your watchlist.`,
      });
    } else {
      addToWatchlist(deal.id);
      toast({
        description: `"${deal.title}" added to your watchlist.`,
      });
    }
  };

  return (
    <Card className="flex flex-col h-full overflow-hidden transition-all duration-300 hover:shadow-xl group">
      <CardHeader className="p-0 relative">
        <Image
          src={deal.image}
          alt={deal.title}
          width={600}
          height={400}
          className="object-cover w-full aspect-[3/2] group-hover:scale-105 transition-transform duration-300"
          data-ai-hint={deal.dataAiHint}
        />
        <Button
          size="icon"
          variant="secondary"
          className="absolute top-3 right-3 rounded-full h-9 w-9 bg-background/70 hover:bg-background z-10"
          onClick={handleWatchlistToggle}
          aria-label={onWatchlist ? 'Remove from watchlist' : 'Add to watchlist'}
        >
          <Heart className={cn(
            "h-5 w-5 text-destructive transition-all duration-300",
            onWatchlist ? 'fill-destructive' : 'fill-none'
          )} />
        </Button>
        {deal.discount && <Badge variant="destructive" className="absolute top-3 left-3 z-10">{deal.discount} OFF</Badge>}
      </CardHeader>
      <Link href={deal.link} target="_blank" rel="noopener noreferrer" className="flex flex-col flex-grow">
        <CardContent className="p-4 flex-grow">
          <CardTitle className="text-lg font-bold leading-snug mb-2 group-hover:text-primary transition-colors">
            {deal.title}
          </CardTitle>
          <p className="text-sm text-muted-foreground line-clamp-3">
            {deal.description}
          </p>
        </CardContent>
        <CardFooter className="p-4 pt-0 flex justify-between items-center">
          <div className="flex items-baseline gap-2">
            <p className="text-2xl font-bold text-foreground">{deal.price}</p>
            {deal.originalPrice && (
              <p className="text-sm text-muted-foreground line-through">{deal.originalPrice}</p>
            )}
          </div>
          <Button asChild className="bg-accent hover:bg-accent/90">
            <span tabIndex={-1}>View Deal</span>
          </Button>
        </CardFooter>
      </Link>
    </Card>
  );
}
