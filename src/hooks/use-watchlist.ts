
'use client';

import { useState, useEffect, useCallback } from 'react';
import type { Deal } from '@/lib/types';
import { deals } from '@/lib/deals';

const WATCHLIST_KEY = 'amazon-deals-watchlist';

export const useWatchlist = () => {  
  const [watchlistIds, setWatchlistIds] = useState<string[]>([]);

  useEffect(() => {
    try {
      const item = window.localStorage.getItem(WATCHLIST_KEY);
      const ids = item ? JSON.parse(item) : [];
      setWatchlistIds(ids);
    } catch (error) {
      console.error('Failed to parse watchlist from localStorage', error);
      setWatchlistIds([]);
    }
  }, []);

  const watchlistItems = deals.filter(deal => watchlistIds.includes(deal.id));

  const addToWatchlist = useCallback((dealId: string) => {
    setWatchlistIds(prev => {
      const newIds = [...new Set([...prev, dealId])];
      try {
        window.localStorage.setItem(WATCHLIST_KEY, JSON.stringify(newIds));
      } catch (error) {
        console.error('Failed to save watchlist to localStorage', error);
      }
      return newIds;
    });
  }, []);

  const removeFromWatchlist = useCallback((dealId: string) => {
    setWatchlistIds(prev => {
      const newIds = prev.filter(id => id !== dealId);
      try {
        window.localStorage.setItem(WATCHLIST_KEY, JSON.stringify(newIds));
      } catch (error) {
        console.error('Failed to save watchlist to localStorage', error);
      }
      return newIds;
    });
  }, []);

  const isInWatchlist = useCallback((dealId: string) => {
    return watchlistIds.includes(dealId);
  }, [watchlistIds]);

  return { watchlistItems, addToWatchlist, removeFromWatchlist, isInWatchlist };
};
