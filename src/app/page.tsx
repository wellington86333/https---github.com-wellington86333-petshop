
'use client';

import { useState, useMemo } from 'react';
import { deals } from '@/lib/deals';
import { DealList } from '@/components/DealList';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = useMemo(() => ['All', ...Array.from(new Set(deals.map((d) => d.category)))], []);
  const filteredDeals = useMemo(() => {
    if (selectedCategory === 'All') {
      return deals;
    }
    return deals.filter((d) => d.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <main className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
          Today's Top Deals
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          Hand-picked offers from Amazon. Updated daily.
        </p>
      </div>

      <div className="mb-8 flex flex-wrap justify-center gap-2">
        {categories.map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? 'default' : 'outline'}
            onClick={() => setSelectedCategory(category)}
            className={cn(
              "capitalize transition-all duration-200",
              selectedCategory === category ? 'text-primary-foreground' : 'text-foreground'
            )}
          >
            {category}
          </Button>
        ))}
      </div>

      <DealList deals={filteredDeals} />
    </main>
  );
}
