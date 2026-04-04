/**
 * RendiaVideo Component
 * Responsive video embed with lazy-loading, KSA branding, and whitelist fallback
 *
 * Props:
 *   - id: Rendia video ID (e.g., "rendia-12345")
 *   - title: Video title/description
 *   - lazy: Enable lazy-loading (default: true)
 *   - aspectRatio: Video aspect ratio (default: "16/9")
 */

import React, { useEffect, useRef, useState } from "react";
import { RENDIA, BRAND_COLORS, FEATURES } from "@/lib/constants";

const RendiaVideo = ({
  id = RENDIA.placeholderVideoId,
  title = "Educational Video",
  lazy = true,
  aspectRatio = "16/9",
  className = "",
}) => {
  const containerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(!lazy);
  const [isLoading, setIsLoading] = useState(true);
  const [embedCode, setEmbedCode] = useState(null);

  // Calculate padding-bottom for aspect ratio
  const [width, height] = aspectRatio.split("/").map(Number);
  const paddingPercent = (height / width) * 100;

  // Lazy-loading with IntersectionObserver
  useEffect(() => {
    if (!lazy) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [lazy]);

  // Generate Rendia embed code
  // Replace with actual Rendia embed URL once whitelist approved
  const getEmbedUrl = () => {
    if (!FEATURES.enableRendiaEmbeds && id === RENDIA.placeholderVideoId) {
      return null; // Return fallback instead
    }
    return `https://rendia.com/embed/${id}?domain=${RENDIA.domain}`;
  };

  const embedUrl = getEmbedUrl();

  // Fallback UI for pending whitelist
  if (!embedUrl) {
    return (
      <div
        ref={containerRef}
        className={`video-fallback rounded-lg border-2 border-dashed p-8 text-center ${className}`}
        style={{ borderColor: BRAND_COLORS.primary }}
      >
        <div className="mx-auto mb-4 w-16 h-16 rounded-full bg-opacity-10 flex items-center justify-center" style={{ backgroundColor: BRAND_COLORS.primary }}>
          <svg className="w-8 h-8" style={{ color: BRAND_COLORS.primary }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <p className="text-lg font-semibold text-gray-800">{title}</p>
        <p className="mt-2 text-sm text-gray-600">
          Video unavailable. Domain whitelist approval pending.
        </p>
        <p className="mt-4 text-xs text-gray-500">
          This video will be available shortly after platform launch.
        </p>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={`rendia-video-container relative w-full overflow-hidden rounded-lg shadow-md ${className}`}
      style={{ paddingBottom: `${paddingPercent}%` }}
    >
      {isVisible ? (
        <>
          <iframe
            src={embedUrl}
            title={title}
            className="absolute inset-0 w-full h-full border-0"
            allowFullScreen
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            loading={lazy ? "lazy" : "eager"}
            onLoad={() => setIsLoading(false)}
            style={{
              borderRadius: "0.5rem",
            }}
          />
          {isLoading && (
            <div
              className="absolute inset-0 flex items-center justify-center bg-gray-100"
              style={{ borderRadius: "0.5rem" }}
            >
              <div className="flex flex-col items-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2" style={{ borderColor: BRAND_COLORS.primary }}></div>
                <p className="mt-2 text-sm text-gray-600">Loading video...</p>
              </div>
            </div>
          )}
        </>
      ) : (
        // Placeholder while lazy-loading
        <div
          className="absolute inset-0 flex items-center justify-center bg-gray-200"
          style={{ borderRadius: "0.5rem", backgroundColor: "#f0f0f0" }}
        >
          <div className="text-center">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <p className="mt-2 text-sm text-gray-500">{title}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default RendiaVideo;
