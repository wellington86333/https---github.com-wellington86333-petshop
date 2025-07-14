
'use client';

import React from 'react';
import { Heart, Shield, Leaf, Users, Award, Truck } from 'lucide-react';

export function About() {
  const values = [
    {
      icon: Heart,
      title: "Amor pelos Pets",
      description: "Cada produto é selecionado pensando no bem-estar e felicidade dos nossos amigos de quatro patas."
    },
    {
      icon: Shield,
      title: "Qualidade Garantida",
      description: "Trabalhamos apenas com produtos de alta qualidade, testados e aprovados por especialistas."
    },
    {
      icon: Leaf,
      title: "Sustentabilidade",
      description: "Priorizamos marcas que respeitam o meio ambiente e práticas sustentáveis."
    }
  ];

  return (
    <section id="sobre" className="py-20 bg-card">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          <div className="observe-fade-in opacity-0">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Nossa
              <span className="block text-primary">História</span>
            </h2>
            <div className="space-y-6 text-lg text-secondary-foreground leading-relaxed">
              <p>
                O PetLovers Club nasceu do amor incondicional que sentimos pelos nossos 
                companheiros de quatro patas. Sabemos que cada pet é único e merece 
                produtos que reflitam esse carinho especial.
              </p>
              <p>
                Nossa missão é conectar tutores apaixonados com produtos excepcionais, 
                criando uma comunidade onde o bem-estar animal é sempre prioridade. 
                Cada item em nossa curadoria passa por uma seleção rigorosa.
              </p>
            </div>
          </div>
          <div className="relative observe-fade-in opacity-0">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <img 
                src="https://placehold.co/600x400.png"
                data-ai-hint="happy dogs"
                alt="Pet feliz"
                className="w-full h-96 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-primary/20 rounded-full blur-xl animate-pulse-slow"></div>
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-secondary rounded-full blur-xl animate-float"></div>
          </div>
        </div>
        <div className="mb-20">
          <h3 className="text-3xl font-bold text-foreground text-center mb-12">
            Nossos Valores
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div 
                key={index}
                className="text-center group observe-fade-in opacity-0"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div className="w-20 h-20 bg-gradient-to-br from-accent to-secondary rounded-2xl mx-auto mb-6 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <value.icon className="w-10 h-10 text-primary" />
                </div>
                <h4 className="text-xl font-bold text-foreground mb-4">{value.title}</h4>
                <p className="text-secondary-foreground leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
