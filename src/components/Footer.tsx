
'use client';

import React from 'react';
import { Heart, Instagram, Facebook, Twitter, Mail } from 'lucide-react';

export function Footer() {
  const socialLinks = [
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Mail, href: "#", label: "Email" }
  ];

  const quickLinks = [
    { name: "Início", href: "#inicio" },
    { name: "Produtos", href: "#produtos" },
    { name: "Sobre Nós", href: "#sobre" },
    { name: "Contato", href: "#contato" }
  ];

  return (
    <footer className="bg-foreground text-background/80">
      <div className="container mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8">
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-3 mb-6">
              <Heart className="w-8 h-8 text-primary" />
              <h3 className="text-2xl font-bold text-background">PetLovers Club</h3>
            </div>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Conectando tutores apaixonados com produtos excepcionais para 
              o bem-estar e felicidade dos nossos amigos de quatro patas.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 bg-background/10 rounded-full flex items-center justify-center hover:bg-primary transition-colors duration-300"
                >
                  <social.icon size={20} />
                </a>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-lg font-bold mb-6 text-background">Links Rápidos</h4>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors duration-300"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-bold mb-6 text-background">Categorias</h4>
             <ul className="space-y-3">
                <li><a href="#produtos" className="text-muted-foreground hover:text-primary transition-colors duration-300">Eletrônicos</a></li>
                <li><a href="#produtos" className="text-muted-foreground hover:text-primary transition-colors duration-300">Casa & Cozinha</a></li>
                <li><a href="#produtos" className="text-muted-foreground hover:text-primary transition-colors duration-300">Livros</a></li>
                <li><a href="#produtos" className="text-muted-foreground hover:text-primary transition-colors duration-300">Brinquedos</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-bold mb-6 text-background">Newsletter</h4>
            <p className="text-muted-foreground mb-4">
              Receba novidades e ofertas especiais para seu pet
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="Seu email"
                className="flex-1 px-4 py-3 bg-background/10 border border-border text-background rounded-l-lg focus:outline-none focus:border-primary transition-colors"
              />
              <button className="bg-primary hover:bg-primary/90 px-6 py-3 rounded-r-lg transition-colors duration-300">
                <Mail size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-border/20">
        <div className="container mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-muted-foreground text-sm text-center md:text-left">
              © 2024 PetLovers Club. Feito com ❤️ para pets e seus tutores.
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-sm">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                Política de Privacidade
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                Termos de Uso
              </a>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-border/20">
            <p className="text-xs text-muted-foreground/70 text-center max-w-4xl mx-auto leading-relaxed">
              <strong>Aviso Legal:</strong> Este site contém links de afiliados da Amazon. 
              Podemos receber uma comissão por compras realizadas através destes links, 
              sem custo adicional para você. Isso nos ajuda a manter o site funcionando 
              e continuar oferecendo as melhores recomendações para seu pet.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
