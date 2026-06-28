'use client'

import React, { useState, useEffect } from 'react'
import Image, { ImageProps } from 'next/image'
import { motion, AnimatePresence } from 'motion/react'
import { ImageIcon, AlertCircle, Loader2 } from 'lucide-react'

interface ImageOptimizerProps extends Omit<ImageProps, 'onLoad' | 'onError'> {
  /**
   * Fallback image URL if the primary one fails
   */
  fallbackSrc?: string;
  /**
   * Optional wrapper class
   */
  containerClassName?: string;
  /**
   * Show a skeleton or pulse while loading
   */
  showSkeleton?: boolean;
}

/**
 * ImageOptimizer Component
 * Specifically designed to handle high-performance image delivery.
 * Automatically leverages Next.js Image Optimization API for WebP conversion and compression at runtime.
 * Optimized for Core Web Vitals (LCP, CLS).
 */
export function ImageOptimizer({
  src,
  alt,
  className = "",
  containerClassName = "",
  fallbackSrc = "https://picsum.photos/seed/nuansa-fallback/800/600",
  showSkeleton = true,
  quality = 80,
  ...props
}: ImageOptimizerProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [imgSrc, setImgSrc] = useState(src);

  // Update image source if prop changes
  useEffect(() => {
    setImgSrc(src);
    setIsLoading(true);
    setHasError(false);
  }, [src]);

  const handleLoad = () => {
    setIsLoading(false);
  };

  const handleError = () => {
    setHasError(true);
    setIsLoading(false);
    setImgSrc(fallbackSrc);
  };

  return (
    <div className={`relative overflow-hidden bg-stone-50 dark:bg-stone-900 ${props.fill ? "h-full w-full" : ""} ${containerClassName}`}>
      {/* Loading Overlay / Skeleton */}
      <AnimatePresence>
        {isLoading && showSkeleton && (
          <motion.div 
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-10 bg-stone-100 dark:bg-stone-800 flex flex-col items-center justify-center"
          >
            <div className="relative">
              <ImageIcon className="h-8 w-8 text-stone-300 dark:text-stone-600 animate-pulse" />
              <div className="absolute -bottom-6 left-1/2 -translate-x-1/2">
                <Loader2 className="h-3 w-3 text-emerald-600/40 animate-spin" />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Error Indicator */}
      {hasError && (
        <div className="absolute top-3 right-3 z-20">
          <div className="bg-amber-500/10 backdrop-blur-sm px-2 py-1 rounded-md border border-amber-500/20 flex items-center space-x-1">
            <AlertCircle className="h-3 w-3 text-amber-600" />
            <span className="text-[8px] font-bold text-amber-700 uppercase tracking-tighter">Fallback Active</span>
          </div>
        </div>
      )}

      <Image
        src={imgSrc}
        alt={alt}
        onLoad={handleLoad}
        onError={handleError}
        className={`
          transition-all duration-1000 ease-in-out
          ${isLoading ? "scale-105 blur-2xl grayscale opacity-0" : "scale-100 blur-0 grayscale-0 opacity-100"}
          ${className}
        `}
        quality={quality}
        referrerPolicy="no-referrer"
        // Force optimization features via standard Next.js props
        // Next.js handles WebP conversion automatically when runtime supports it
        {...props}
      />
      
      {/* Optimization Metadata Badge (Hidden in production, or subtle hint) */}
      <div className="absolute bottom-2 right-2 z-10 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
        <span className="text-[7px] font-mono text-white/40 bg-black/20 px-1 rounded uppercase">
          Runtime Optimized • WebP
        </span>
      </div>
    </div>
  )
}
