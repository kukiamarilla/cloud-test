import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';

interface RefreshContextValue {
  lastRefresh: number; // epoch millis
  triggerRefresh: () => void;
  showGrouperManagement: boolean;
  setShowGrouperManagement: (show: boolean) => void;
}

const RefreshContext = createContext<RefreshContextValue | undefined>(undefined);

export const RefreshProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lastRefresh, setLastRefresh] = useState<number>(Date.now());
  const [showGrouperManagement, setShowGrouperManagement] = useState<boolean>(false);

  const triggerRefresh = useCallback(() => {
    setLastRefresh(Date.now());
  }, []);

  const value = useMemo(() => ({ 
    lastRefresh, 
    triggerRefresh, 
    showGrouperManagement, 
    setShowGrouperManagement 
  }), [lastRefresh, triggerRefresh, showGrouperManagement, setShowGrouperManagement]);

  return <RefreshContext.Provider value={value}>{children}</RefreshContext.Provider>;
};

export function useRefresh(): RefreshContextValue {
  const ctx = useContext(RefreshContext);
  if (!ctx) {
    throw new Error('useRefresh must be used within a RefreshProvider');
  }
  return ctx;
}