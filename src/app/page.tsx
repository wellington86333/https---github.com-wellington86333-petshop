
'use client';

import React from 'react';
import { ShoppingCart, Star, Heart, Truck, Shield, Search, Filter } from 'lucide-react';
import { deals } from '@/lib/deals';
import type { Deal } from '@/lib/types';

const categories = ["Todos", "Ração", "Petiscos", "Acessórios", "Brinquedos", "Higiene", "Comedouros", "Casinhas", "Saúde", "Transporte"];

export default function Home() {
  const [selectedCategory, setSelectedCategory] = React.useState("Todos");
  const [searchTerm, setSearchTerm] = React.useState("");
  const [favorites, setFavorites] = React.useState<string[]>([]);

  React.useEffect(() => {
    try {
      const savedFavorites = localStorage.getItem('achoulevaai_favorites');
      if (savedFavorites) {
        setFavorites(JSON.parse(savedFavorites));
      }
    } catch (error) {
      console.error("Failed to load favorites from localStorage", error);
    }
  }, []);

  const toggleFavorite = (productId: string) => {
    let updatedFavorites: string[];
    if (favorites.includes(productId)) {
      updatedFavorites = favorites.filter(id => id !== productId);
    } else {
      updatedFavorites = [...favorites, productId];
    }
    setFavorites(updatedFavorites);
    try {
      localStorage.setItem('achoulevaai_favorites', JSON.stringify(updatedFavorites));
    } catch (error) {
      console.error("Failed to save favorites to localStorage", error);
    }
  };

  const filteredProducts = deals.filter(product => {
    const matchesCategory = selectedCategory === "Todos" || product.category === selectedCategory;
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    const matchesSearch = product.title.toLowerCase().includes(lowerCaseSearchTerm) || 
                         product.description.toLowerCase().includes(lowerCaseSearchTerm) ||
                         (product.brand && product.brand.toLowerCase().includes(lowerCaseSearchTerm));
    return matchesCategory && matchesSearch;
  });

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-100 font-sans">
      {/* Header */}
      <header className="bg-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-center md:text-left">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
                🐾 <span className="text-orange-600">AchouLevaAí</span> <span className="text-amber-600">PetShop</span>
              </h1>
              <p className="text-gray-600 mt-1">Tudo para o seu melhor amigo com os melhores preços!</p>
            </div>
            
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <Truck className="w-4 h-4 text-orange-500" />
                <span>Frete Grátis</span>
              </div>
              <div className="flex items-center gap-1">
                <Shield className="w-4 h-4 text-orange-500" />
                <span>Garantia Amazon</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6">
        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Buscar produtos para seu pet..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <select
                className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent appearance-none bg-white"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div key={product.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-105 group">
              <div className="relative">
                <a href={product.link} target="_blank" rel="noopener noreferrer">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                    loading="lazy"
                  />
                </a>
                <div className="absolute top-2 left-2 bg-orange-600 text-white px-2 py-1 rounded-full text-xs font-semibold">
                  {product.category}
                </div>
                {product.discount && (
                  <div className="absolute top-2 right-2 bg-green-600 text-white px-2 py-1 rounded-full text-xs font-semibold">
                    {product.discount}
                  </div>
                )}
                <button
                  onClick={() => toggleFavorite(product.id)}
                  className="absolute bottom-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-red-50 transition-colors"
                  aria-label={favorites.includes(product.id) ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
                >
                  <Heart 
                    className={`w-5 h-5 ${favorites.includes(product.id) ? 'text-red-500 fill-current' : 'text-gray-400'}`}
                  />
                </button>
                {product.badge && (
                  <div className="absolute bottom-2 left-2 bg-blue-600 text-white px-2 py-1 rounded text-xs font-semibold">
                    {product.badge}
                  </div>
                )}
              </div>
              
              <div className="p-4 flex flex-col flex-grow">
                {product.brand && <div className="text-xs text-orange-600 font-semibold mb-1">{product.brand}</div>}
                <h3 className="font-bold text-gray-800 mb-2 line-clamp-2 h-12 text-sm">
                  {product.title}
                </h3>
                
                <p className="text-gray-600 text-xs mb-3 line-clamp-2 h-8 flex-grow">
                  {product.description}
                </p>
                
                {product.rating && (
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex">
                      {renderStars(product.rating)}
                    </div>
                    <span className="text-xs text-gray-600">({product.rating})</span>
                    {product.reviews && <span className="text-xs text-gray-500">• {product.reviews} avaliações</span>}
                  </div>
                )}
                
                <div className="flex items-center justify-between mb-4 mt-auto pt-2">
                  <div>
                    <span className="text-lg font-bold text-green-600">{product.price}</span>
                    {product.originalPrice && (
                      <div className="text-xs text-gray-500 line-through">{product.originalPrice}</div>
                    )}
                  </div>
                  <span className="text-xs text-gray-500">na Amazon</span>
                </div>
                
                <a
                  href={product.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-gradient-to-r from-orange-500 to-amber-600 text-white py-3 px-4 rounded-lg font-semibold hover:from-orange-600 hover:to-amber-700 transition-all duration-300 flex items-center justify-center gap-2 text-sm"
                >
                  <ShoppingCart className="w-4 h-4" />
                  Comprar na Amazon
                </a>
              </div>
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12 col-span-full">
            <div className="text-6xl mb-4">🐕</div>
            <p className="text-gray-500 text-lg">Nenhum produto encontrado para sua busca.</p>
            <p className="text-gray-400 text-sm mt-2">Tente buscar por outro termo ou categoria.</p>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-6">
            <div>
              <h3 className="text-lg font-bold mb-4">🐾 AchouLevaAí PetShop</h3>
              <p className="text-gray-300 text-sm">
                Os melhores produtos para seu pet com preços incríveis. 
                Selecionamos apenas produtos de qualidade na Amazon.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Categorias</h4>
              <div className="grid grid-cols-2 gap-1 text-sm text-gray-300">
                {categories.slice(1).map(category => (
                  <div key={category}>{category}</div>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Garantias</h4>
              <div className="space-y-2 text-sm text-gray-300">
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4" />
                  <span>Garantia Amazon</span>
                </div>
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4" />
                  <span>Frete Grátis</span>
                </div>
                <div className="flex items-center gap-2">
                  <Heart className="w-4 h-4" />
                  <span>Produtos Selecionados</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-700 pt-6 text-center">
            <p className="mb-2">
              Site criado por um entusiasta de IA | Links de associado Amazon
            </p>
            <p className="text-sm text-gray-400">
              Loja ID: <span className="font-mono bg-gray-700 px-2 py-1 rounded">achoulevaai-20</span>
            </p>
            <p className="text-xs text-gray-500 mt-4">
              * Os preços podem variar. Verifique o preço atual na Amazon. 
              Produtos selecionados especialmente para o bem-estar do seu pet.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
