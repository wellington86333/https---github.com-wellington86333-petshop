
'use client';

import React, { useState, useMemo } from 'react';
import { DealCard } from './DealCard';
import { Button } from './ui/button';
import { deals } from '@/lib/deals';
import { cn } from '@/lib/utils';
import { Filter } from 'lucide-react';

export function ProductGrid() {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = useMemo(() => ['All', ...Array.from(new Set(deals.map((d) => d.category)))], []);
  const filteredDeals = useMemo(() => {
    if (selectedCategory === 'All') {
      return deals;
    }
    return deals.filter((d) => d.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <section id="produtos" className="py-20 bg-secondary">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Produtos
            <span className="block text-primary">Selecionados</span>
          </h2>
          <p className="text-xl text-secondary-foreground max-w-2xl mx-auto leading-relaxed">
            Cada produto é escolhido pensando no bem-estar e felicidade do seu companheiro.
          </p>
        </div>

        <div className="flex flex-wrap justify-center items-center mb-12 gap-3">
          {categories.map((category) => (
            <Button
              key={category}
              onClick={() => setSelectedCategory(category)}
              variant={selectedCategory === category ? 'default' : 'outline'}
              className={cn(
                "px-6 py-3 rounded-full font-medium transition-all duration-300 capitalize text-base",
                 selectedCategory === category ? 'shadow-lg' : 'bg-card text-foreground hover:bg-muted shadow-sm'
              )}
            >
              {category}
            </Button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredDeals.map((deal, index) => (
            <div
              key={deal.id}
              style={{ animationDelay: `${index * 100}ms` }}
              className="observe-fade-in opacity-0"
            >
              <DealCard deal={deal} />
            </div>
          ))}
        </div>

        {filteredDeals.length === 0 && (
          <div className="text-center py-16 col-span-full">
            <div className="w-24 h-24 bg-muted rounded-full mx-auto mb-6 flex items-center justify-center">
              <Filter className="w-12 h-12 text-muted-foreground" />
            </div>
            <h3 className="text-2xl font-bold text-foreground mb-4">Nenhum produto encontrado</h3>
            <p className="text-secondary-foreground">Tente selecionar uma categoria diferente</p>
          </div>
        )}
      </div>
    </section>
  );
};
