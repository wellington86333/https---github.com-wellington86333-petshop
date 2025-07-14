
'use client';

import React from 'react';
import { ArrowDown, Sparkles } from 'lucide-react';

export function Hero() {
  return (
    <section id="inicio" className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-secondary via-background to-accent">
      <div className="absolute top-20 left-10 w-32 h-32 bg-primary/10 rounded-full blur-xl animate-float"></div>
      <div className="absolute bottom-20 right-10 w-48 h-48 bg-secondary/30 rounded-full blur-xl animate-float" style={{animationDelay: '2s'}}></div>
      <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-background/40 rounded-full blur-lg animate-pulse-slow"></div>

      <div className="container mx-auto px-6 text-center relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center space-x-2 bg-card/80 backdrop-blur-sm rounded-full px-6 py-3 mb-8 shadow-lg opacity-0 animate-fade-in-up">
            <Sparkles className="w-5 h-5 text-primary" />
            <span className="text-foreground font-medium">Produtos Selecionados com Carinho</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-6 leading-tight opacity-0 animate-fade-in-up" style={{animationDelay: '200ms'}}>
            Amor em Cada
            <span className="block text-primary relative">
              Produto
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-primary/70 rounded-full opacity-0 animate-scale-in" style={{animationDelay: '800ms'}}></div>
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-secondary-foreground mb-12 max-w-2xl mx-auto leading-relaxed opacity-0 animate-fade-in-up" style={{animationDelay: '400ms'}}>
            Descubra ofertas únicas que transformam o dia a dia do seu pet em momentos especiais.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center opacity-0 animate-fade-in-up" style={{animationDelay: '600ms'}}>
            <a 
              href="#produtos" 
              className="group inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-primary-foreground bg-primary rounded-2xl transition-transform duration-300 ease-in-out hover:scale-105"
            >
              Explorar Produtos
              <ArrowDown className="w-5 h-5 ml-2 group-hover:translate-y-1 transition-transform" />
            </a>
            <a 
              href="#sobre" 
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-foreground bg-card border-2 border-border rounded-2xl transition-all duration-300 ease-in-out hover:scale-105 hover:border-primary"
            >
              Nossa História
            </a>
          </div>
        </div>
      </div>
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-muted-foreground rounded-full flex justify-center">
          <div className="w-1 h-3 bg-muted-foreground rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};
