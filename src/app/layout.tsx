
import type { Metadata } from 'next';
import './globals.css';
import { cn } from '@/lib/utils';
import { Header } from '@/components/Header';
import { Toaster } from "@/components/ui/toaster";
import { Footer } from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Achou Leva Aí - Ofertas Selecionadas',
  description: 'As melhores ofertas da Amazon selecionadas para o seu pet!',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body className={cn("min-h-screen bg-background antialiased", "font-body")}>
        <div className="relative flex min-h-screen flex-col">
          <Header />
          <div className="flex-1">{children}</div>
          <Footer />
        </div>
        <Toaster />
      </body>
    </html>
  );
}
