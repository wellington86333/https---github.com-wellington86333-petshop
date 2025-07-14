
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Heart, Menu, X, Home } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';
import { useState, useEffect } from 'react';

export function Header() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '/', label: 'Início', icon: Home },
    { href: '#produtos', label: 'Produtos' },
    { href: '#sobre', label: 'Sobre Nós' },
    { href: '#contato', label: 'Contato' },
    { href: '/watchlist', label: 'Lista de Desejos', icon: Heart },
  ];

  return (
    <header className={cn(
        "fixed w-full top-0 z-50 transition-all duration-500",
        isScrolled ? 'bg-background/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
    )}>
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <Heart className="w-8 h-8 text-primary transition-transform duration-300 group-hover:scale-110" />
              <div className="absolute inset-0 bg-primary/20 rounded-full scale-0 group-hover:scale-150 transition-transform duration-500"></div>
            </div>
            <h1 className="text-2xl font-bold text-foreground tracking-tight">
              Achou Leva Aí
            </h1>
          </Link>

          <div className="hidden md:flex items-center space-x-2">
             {navLinks.map((link) => (
              <Button key={link.href} variant="ghost" asChild>
                 <Link href={link.href} className="relative text-foreground font-medium transition-colors hover:text-primary after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-primary after:transition-[width]">
                  {link.icon && <link.icon className="h-4 w-4 mr-2" />}
                  {link.label}
                </Link>
              </Button>
            ))}
          </div>

          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-secondary transition-colors"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        <div className={cn(
            "md:hidden transition-all duration-300 overflow-hidden",
            isMenuOpen ? 'max-h-96 opacity-100 py-4' : 'max-h-0 opacity-0'
        )}>
          <div className="flex flex-col space-y-3">
             {navLinks.map((link) => (
                <Link key={link.href} href={link.href} className="flex items-center p-2 rounded-md hover:bg-secondary">
                  {link.icon && <link.icon className="h-4 w-4 mr-2" />}
                  {link.label}
                </Link>
             ))}
          </div>
        </div>
      </nav>
    </header>
  );
}
