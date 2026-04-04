/**
 * Project Constants & Configuration
 * KSA brand guidelines, API endpoints, GTM tracking
 */

// Brand Colors
export const BRAND_COLORS = {
  primary: "#87be23", // KSA green accent
  dark: "#1a1a1a",
  light: "#f5f5f5",
  border: "#e0e0e0",
  success: "#22c55e",
  warning: "#f59e0b",
  error: "#ef4444",
};

// Typography
export const TYPOGRAPHY = {
  font: "Geist, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  monoFont: "Geist Mono, 'Courier New', monospace",
  sizes: {
    xs: "0.75rem",
    sm: "0.875rem",
    base: "1rem",
    lg: "1.125rem",
    xl: "1.25rem",
    "2xl": "1.5rem",
    "3xl": "1.875rem",
    "4xl": "2.25rem",
  },
};

// Responsive Breakpoints
export const BREAKPOINTS = {
  xs: "0px",
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
  "2xl": "1536px",
};

// KSA Organization Details
export const KSA_ORG = {
  name: "KSA Silmakeskus",
  alternativeName: "KSA Vision Clinic",
  slug: "ksa-silmakeskus",
  website: "https://ksa.ee",
  platform: "https://silmatervis.ksa.ee",
  blog: "https://blog.ksa.ee",
  email: "info@ksa.ee",
  phone: "+372-6-256-256",
  address: {
    street: "Viru 18",
    city: "Tallinn",
    region: "Harjumaa",
    postalCode: "10140",
    country: "EE",
  },
  ceo: {
    name: "Dr. Ants Haavel",
    title: "CEO, Ophthalmologist",
  },
  logo: {
    light: "/images/ksa-logo-light.svg",
    dark: "/images/ksa-logo-dark.svg",
  },
  socials: {
    facebook: "https://www.facebook.com/KSASilmakeskus",
    instagram: "https://www.instagram.com/ksa_silmakeskus",
  },
};

// Google Tag Manager
export const GTM_ID = "GTM-KCZVRJ8";

// Rendia Integration
export const RENDIA = {
  apiBase: "https://api.rendia.com/v1", // Placeholder - update with actual
  domain: "silmatervis.ksa.ee",
  statusPending: "Domain whitelist approval pending",
  placeholderVideoId: "PLACEHOLDER-001", // Used until whitelist approved
};

// ElevenLabs Audio Dubbing
export const ELEVENLABS = {
  apiBase: "https://api.elevenlabs.io/v1",
  voiceProfiles: {
    est: "estonian-professional-f", // Placeholder
    ru: "russian-professional-m", // Placeholder
  },
};

// API Endpoints
export const API_ENDPOINTS = {
  pages: "/api/pages",
  conditions: "/api/conditions",
  procedures: "/api/procedures",
  treatments: "/api/treatments",
  anatomy: "/api/anatomy",
  videos: "/api/videos",
};

// Pagination
export const PAGINATION = {
  perPage: 20,
  maxPages: 5,
};

// Cache Settings
export const CACHE = {
  revalidatePages: 3600, // 1 hour
  revalidateVideos: 86400, // 24 hours
};

// Feature Flags
export const FEATURES = {
  enableRendiaEmbeds: false, // Disabled until whitelist approved
  enableDubbedAudio: false, // Disabled until ElevenLabs integration complete
  enableSchemaMarkup: true, // Always enabled
  enableAnalytics: true, // Google Tag Manager
  enablePreview: true, // Allow preview/draft pages
};

// Clinical Content Guidelines
export const CLINICAL = {
  approvalRequired: true,
  approverName: "Dr. Ants Haavel",
  approverTitle: "CEO, Ophthalmologist",
  contentReviewCycle: "weekly", // Content review cadence
  archiveAfterMonths: 36, // Archive outdated content after 3 years
};

// SEO Defaults
export const SEO = {
  siteName: "KSA Silmatervis",
  siteDescription:
    "Comprehensive eye health education platform with clinical expert guidance",
  twitterHandle: "@KSASilmakeskus",
  canonicalBase: "https://silmatervis.ksa.ee",
  imageWidth: 1200,
  imageHeight: 630,
};

// Video Defaults
export const VIDEO = {
  aspectRatio: "16/9",
  defaultAutoplay: false,
  defaultMuted: false,
  preload: "metadata",
};

// Paths
export const PATHS = {
  home: "/",
  conditions: "/conditions",
  procedures: "/procedures",
  treatments: "/treatments",
  anatomy: "/anatomy",
  blog: "https://blog.ksa.ee",
  contact: "https://ksa.ee/kontakt",
};

// Error Messages
export const ERRORS = {
  notFound: "Page not found",
  serverError: "Server error. Please try again later.",
  videoLoadFailed: "Video failed to load",
  dataLoadFailed: "Failed to load content",
};

// Success Messages
export const SUCCESS = {
  saved: "Saved successfully",
  updated: "Updated successfully",
  deleted: "Deleted successfully",
};
