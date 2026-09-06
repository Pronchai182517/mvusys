/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: { 
        "outline": "#75777e", "on-secondary": "#ffffff", "primary-fixed-dim": "#b8c7e8", "status-warning": "#B45309", "error": "#ba1a1a", "on-tertiary-container": "#029576", "surface-subtle": "#F1F5F9", "status-danger-bg": "#FEF2F2", "primary-fixed": "#d7e3ff", "tertiary-fixed": "#85f7d3", "surface-container-highest": "#d3e4fe", "outline-variant": "#c5c6ce", "surface-container": "#e5eeff", "status-warning-bg": "#FFFBEB", "on-tertiary-fixed-variant": "#00513f", "secondary-container": "#fdba45", "on-background": "#0b1c30", "accent-gold-subtle": "#FEF3C7", "on-secondary-container": "#6f4b00", "inverse-primary": "#b8c7e8", "inverse-on-surface": "#eaf1ff", "surface-container-high": "#dce9ff", "surface": "#f8f9ff", "on-error-container": "#93000a", "on-surface": "#0b1c30", "status-danger": "#B91C1C", "tertiary-container": "#002118", "surface-dim": "#cbdbf5", "on-error": "#ffffff", "secondary-fixed-dim": "#fdba45", "on-primary-fixed": "#0b1b34", "on-secondary-fixed": "#281900", "on-secondary-fixed-variant": "#604100", "border-strong": "#CBD5E1", "text-secondary": "#475569", "border-hairline": "#E2E8F0", "inverse-surface": "#213145", "secondary-fixed": "#ffdeae", "surface-container-lowest": "#ffffff", "surface-bright": "#f8f9ff", "surface-canvas": "#F8FAFC", "status-success-bg": "#ECFDF5", "status-success": "#15803D", "surface-container-low": "#eff4ff", "text-primary": "#0F172A", "on-primary-container": "#7584a2", "on-tertiary": "#ffffff", "text-muted": "#94A3B8", "tertiary-fixed-dim": "#68dab7", "error-container": "#ffdad6", "tertiary": "#000000", "surface-variant": "#d3e4fe", "on-tertiary-fixed": "#002118", "surface-card": "#FFFFFF", "on-surface-variant": "#44474d", "on-primary": "#ffffff", "primary-container": "#0b1b34", "on-primary-fixed-variant": "#394762", "surface-tint": "#505f7b", "secondary": "#7f5700", "primary": "#000000", "background": "#f8f9ff" 
      },
      borderRadius: { 
        "DEFAULT": "0.125rem", "lg": "0.25rem", "xl": "0.5rem", "full": "0.75rem" 
      },
      spacing: { 
        "space-xs": "4px", "space-3xl": "32px", "space-xl": "20px", "space-2xs": "2px", "screen-margin-mobile": "16px", "space-sm": "8px", "space-2xl": "24px", "card-padding-mobile": "14px", "space-lg": "16px", "space-md": "12px", "table-row-height": "44px" 
      },
      fontFamily: { 
        "body-md": ["Inter", "sans-serif"], "headline-lg": ["Inter", "sans-serif"], "headline-xl": ["Inter", "sans-serif"], "headline-md": ["Inter", "sans-serif"], "body-sm": ["Inter", "sans-serif"], "mono-badge": ["monospace"], "label-sm": ["Inter", "sans-serif"], "headline-sm": ["Inter", "sans-serif"], "label-md": ["Inter", "sans-serif"], "mono-data": ["monospace"], "body-lg": ["Inter", "sans-serif"] 
      },
      fontSize: { 
        "body-md": ["14px", { "lineHeight": "20px", "letterSpacing": "0em", "fontWeight": "400" }], 
        "headline-lg": ["24px", { "lineHeight": "30px", "letterSpacing": "-0.02em", "fontWeight": "600" }], 
        "headline-xl": ["30px", { "lineHeight": "36px", "letterSpacing": "-0.025em", "fontWeight": "600" }], 
        "headline-md": ["20px", { "lineHeight": "26px", "letterSpacing": "-0.015em", "fontWeight": "600" }], 
        "body-sm": ["13px", { "lineHeight": "18px", "letterSpacing": "0em", "fontWeight": "400" }], 
        "mono-badge": ["10px", { "lineHeight": "12px", "letterSpacing": "0.04em", "fontWeight": "600" }], 
        "label-sm": ["11px", { "lineHeight": "14px", "letterSpacing": "0.02em", "fontWeight": "500" }], 
        "headline-sm": ["16px", { "lineHeight": "22px", "letterSpacing": "-0.01em", "fontWeight": "600" }], 
        "label-md": ["12px", { "lineHeight": "16px", "letterSpacing": "0.01em", "fontWeight": "500" }], 
        "mono-data": ["12px", { "lineHeight": "16px", "letterSpacing": "0.02em", "fontWeight": "500" }], 
        "body-lg": ["15px", { "lineHeight": "22px", "letterSpacing": "-0.005em", "fontWeight": "400" }] 
      }
    },
  },
  plugins: [],
}
