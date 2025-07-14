
'use client';

import { useWatchlist } from '@/hooks/use-watchlist';
import { DealList } from '@/components/DealList';
import { Heart } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function WatchlistPage() {
  const { watchlistItems } = useWatchlist();

  return (
    <main className="container mx-auto py-20 px-4 sm:px-6 lg:px-8" id="watchlist">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
          Minha 
          <span className="block text-primary">Lista de Desejos</span>
        </h2>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          Deals you're keeping an eye on. They'll be saved here in your browser.
        </p>
      </div>

      {watchlistItems.length > 0 ? (
        <DealList deals={watchlistItems} />
      ) : (
        <div className="text-center py-16 border-2 border-dashed rounded-lg">
          <Heart className="mx-auto h-12 w-12 text-muted-foreground" />
          <h3 className="mt-4 text-lg font-medium">Sua lista de desejos está vazia</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Clique no ícone de coração em qualquer oferta para adicioná-la aqui.
          </p>
          <div className="mt-6">
            <Button asChild>
              <Link href="/#produtos">
                Encontrar Ofertas
              </Link>
            </Button>
          </div>
        </div>
      )}
    </main>
  );
}
