import React, { ReactNode, useCallback, useRef, useState } from 'react';
import { useRefresh } from '../../contexts/refresh-context';

interface PullToRefreshProps {
  onRefresh?: () => Promise<void> | void;
  children: ReactNode;
  thresholdPx?: number;
}

export const PullToRefresh: React.FC<PullToRefreshProps> = ({
  onRefresh,
  children,
  thresholdPx = 64,
}) => {
  const startYRef = useRef<number | null>(null);
  const [pullDistance, setPullDistance] = useState(0);
  const [isPulling, setIsPulling] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const { triggerRefresh } = useRefresh();

  const isAtTop = (): boolean => {
    const scrollElement = document.scrollingElement || document.documentElement;
    return (scrollElement?.scrollTop || 0) <= 0;
  };

  const reset = useCallback(() => {
    setIsRefreshing(false);
    setIsPulling(false);
    setPullDistance(0);
    startYRef.current = null;
  }, []);

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    if (isRefreshing) return;
    if (!isAtTop()) return;
    startYRef.current = e.touches[0].clientY;
    setIsPulling(true);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!isPulling || isRefreshing) return;
    if (startYRef.current === null) return;
    const currentY = e.touches[0].clientY;
    const delta = currentY - startYRef.current;
    if (delta > 0) {
      e.preventDefault();
      // Resistance: pull distance grows slower than finger movement
      setPullDistance(Math.min(delta * 0.6, thresholdPx * 2));
    }
  };

  const handleTouchEnd = async () => {
    if (!isPulling || isRefreshing) {
      reset();
      return;
    }

    if (pullDistance >= thresholdPx) {
      setIsRefreshing(true);
      try {
        // Fire global refresh event
        triggerRefresh();
        // Also allow local handler
        const result = onRefresh?.();
        if (result && typeof (result as Promise<void>).then === 'function') {
          await result;
        } else {
          await new Promise((r) => setTimeout(r, 500));
        }
      } finally {
        reset();
      }
    } else {
      reset();
    }
  };

  const progress = Math.min(1, pullDistance / thresholdPx);
  const showIndicator = isPulling || isRefreshing || pullDistance > 0;

  return (
    <div
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      className="relative"
      style={{
        touchAction: 'pan-x pan-y',
        WebkitOverflowScrolling: 'touch',
      }}
    >
      {/* Indicator */}
      {showIndicator && (
        <div
          className="pointer-events-none absolute inset-x-0 top-0 flex h-14 items-center justify-center"
          style={{
            opacity: isRefreshing ? 1 : progress,
            transition: isRefreshing ? 'opacity 150ms ease' : 'none',
          }}
        >
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <span
              className={`inline-block transform transition-transform duration-150 ${
                (isRefreshing || progress >= 1) ? 'rotate-180' : ''
              }`}
            >
              ↓
            </span>
            <span>
              {isRefreshing ? 'Actualizando…' : progress >= 1 ? 'Suelta para actualizar' : 'Desliza para refrescar'}
            </span>
          </div>
        </div>
      )}

      {/* Content with translate */}
      <div
        className="transition-transform duration-150"
        style={{ transform: `translateY(${isRefreshing ? 56 : pullDistance}px)` }}
      >
        {children}
      </div>
    </div>
  );
};