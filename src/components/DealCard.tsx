
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ExternalLink, Heart, Star } from 'lucide-react';
import { useWatchlist } from '@/hooks/use-watchlist';
import { useToast } from "@/hooks/use-toast";
import type { Deal } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { useState } from 'react';

export function DealCard({ deal }: { deal: Deal }) {
  const { isInWatchlist, addToWatchlist, removeFromWatchlist } = useWatchlist();
  const { toast } = useToast();
  const onWatchlist = isInWatchlist(deal.id);
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleWatchlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onWatchlist) {
      removeFromWatchlist(deal.id);
      toast({ description: `"${deal.title}" removido da sua lista.` });
    } else {
      addToWatchlist(deal.id);
      toast({ description: `"${deal.title}" adicionado à sua lista.` });
    }
  };

  return (
    <div className="group relative bg-card rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2">
      <div className="relative overflow-hidden">
        {!imageLoaded && (
            <div className="absolute inset-0 w-full h-64 bg-secondary animate-pulse"></div>
        )}
        <Image
          src={deal.image}
          alt={deal.title}
          width={600}
          height={400}
          className={cn(
            "w-full h-64 object-cover transition-all duration-500 group-hover:scale-105",
            imageLoaded ? "opacity-100" : "opacity-0"
          )}
          onLoad={() => setImageLoaded(true)}
          data-ai-hint={deal.dataAiHint}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        {deal.discount && (
          <Badge variant="destructive" className="absolute top-4 left-4 bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-bold animate-pulse-slow">
            {deal.discount} OFF
          </Badge>
        )}

        <Button
          size="icon"
          variant="secondary"
          className="absolute top-4 right-4 p-2 bg-card/90 backdrop-blur-sm rounded-full h-10 w-10 shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110"
          onClick={handleWatchlistToggle}
          aria-label={onWatchlist ? 'Remove from watchlist' : 'Add to watchlist'}
        >
          <Heart className={cn("w-5 h-5 transition-colors", onWatchlist ? 'text-primary fill-primary' : 'text-foreground')} />
        </Button>

        <div className="absolute bottom-4 left-4 bg-card/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {deal.category}
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex items-center mb-3">
            {[...Array(5)].map((_, i) => (
                <Star 
                key={i}
                size={16}
                className={`transition-colors duration-200 ${
                    i < 4 // Assuming a static rating for now
                    ? 'text-amber-400 fill-amber-400' 
                    : 'text-muted'
                }`}
                />
            ))}
            <span className="text-sm text-muted-foreground ml-2 font-medium">(4/5)</span>
        </div>

        <h3 className="font-bold text-lg text-foreground mb-3 line-clamp-2 group-hover:text-primary transition-colors h-14">
          {deal.title}
        </h3>
        
        <p className="text-muted-foreground text-sm mb-4 line-clamp-3 leading-relaxed h-[4.5rem]">
          {deal.description}
        </p>
        
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-primary">{deal.price}</span>
            {deal.originalPrice && (
              <span className="text-sm text-muted-foreground line-through">{deal.originalPrice}</span>
            )}
          </div>
        </div>
        
        <Button asChild className="w-full text-white font-bold py-6 px-6 rounded-2xl transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:scale-105 group/btn">
          <Link href={deal.link} target="_blank" rel="noopener noreferrer">
            <ExternalLink size={18} className="group-hover/btn:rotate-12 transition-transform" />
            Comprar na Amazon
          </Link>
        </Button>
      </div>
    </div>
  );
}
