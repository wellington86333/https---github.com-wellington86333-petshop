
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Heart, Home, ShoppingBag } from 'lucide-react';
import { AIPrompt } from './AIPrompt';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';

export function Header() {
  const pathname = usePathname();

  const navLinks = [
    { href: '/', label: 'Home', icon: Home },
    { href: '/watchlist', label: 'Watchlist', icon: Heart },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-20 items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2" aria-label="Back to homepage">
            <ShoppingBag className="h-8 w-8 text-primary" />
            <span className="hidden sm:inline text-2xl font-bold text-foreground">AchouLevaAí</span>
          </Link>
          <nav className="hidden md:flex items-center gap-2">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Button key={link.href} variant="ghost" asChild className={cn(isActive && 'bg-accent text-accent-foreground hover:bg-accent/90 hover:text-accent-foreground')}>
                   <Link href={link.href}>
                    <link.icon className="h-4 w-4 mr-2" />
                    {link.label}
                  </Link>
                </Button>
              );
            })}
          </nav>
        </div>
        
        <div className="flex-1 flex justify-end">
          <AIPrompt />
        </div>
      </div>
       <nav className="md:hidden flex items-center justify-around p-2 border-t bg-background">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Button key={link.href} variant="ghost" asChild className={cn("flex-1 flex-col h-auto py-1", isActive && 'bg-accent text-accent-foreground hover:bg-accent/90 hover:text-accent-foreground')}>
                   <Link href={link.href}>
                    <link.icon className="h-5 w-5 mb-1" />
                    <span className="text-xs">{link.label}</span>
                  </Link>
                </Button>
              );
            })}
        </nav>
    </header>
  );
}
