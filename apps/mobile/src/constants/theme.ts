// theme.ts - Catppuccin Theme for React Native
// Official Catppuccin color palettes: https://github.com/catppuccin/catppuccin

/**
 * Catppuccin Mocha (Dark theme - recommended for finance apps)
 */
export const CatppuccinMocha = {
  // Base colors
  base: '#1e1e2e',      // Background
  mantle: '#181825',    // Darker background
  crust: '#11111b',     // Darkest background
  
  // Surface colors
  surface0: '#313244',  // Elevated surface
  surface1: '#45475a',  // More elevated
  surface2: '#585b70',  // Even more elevated
  
  // Overlay colors
  overlay0: '#6c7086',  // Subtle text
  overlay1: '#7f849c',  // Muted text
  overlay2: '#9399b2',  // Less muted
  
  // Text colors
  text: '#cdd6f4',      // Main text
  subtext0: '#a6adc8',  // Secondary text
  subtext1: '#bac2de',  // Tertiary text
  
  // Accent colors
  rosewater: '#f5e0dc',
  flamingo: '#f2cdcd',
  pink: '#f5c2e7',
  mauve: '#cba6f7',     // Purple
  red: '#f38ba8',       // Errors, expenses
  maroon: '#eba0ac',
  peach: '#fab387',     // Warnings
  yellow: '#f9e2af',    // Highlights
  green: '#a6e3a1',     // Success, income
  teal: '#94e2d5',
  sky: '#89dceb',
  sapphire: '#74c7ec',
  blue: '#89b4fa',      // Primary actions
  lavender: '#b4befe',  // Links, accents
};

/**
 * Catppuccin Latte (Light theme)
 */
export const CatppuccinLatte = {
  // Base colors
  base: '#eff1f5',      // Background
  mantle: '#e6e9ef',    // Darker background
  crust: '#dce0e8',     // Darkest background
  
  // Surface colors
  surface0: '#ccd0da',  // Elevated surface
  surface1: '#bcc0cc',  // More elevated
  surface2: '#acb0be',  // Even more elevated
  
  // Overlay colors
  overlay0: '#9ca0b0',  // Subtle text
  overlay1: '#8c8fa1',  // Muted text
  overlay2: '#7c7f93',  // Less muted
  
  // Text colors
  text: '#4c4f69',      // Main text
  subtext0: '#6c6f85',  // Secondary text
  subtext1: '#5c5f77',  // Tertiary text
  
  // Accent colors
  rosewater: '#dc8a78',
  flamingo: '#dd7878',
  pink: '#ea76cb',
  mauve: '#8839ef',     // Purple
  red: '#d20f39',       // Errors, expenses
  maroon: '#e64553',
  peach: '#fe640b',     // Warnings
  yellow: '#df8e1d',    // Highlights
  green: '#40a02b',     // Success, income
  teal: '#179299',
  sky: '#04a5e5',
  sapphire: '#209fb5',
  blue: '#1e66f5',      // Primary actions
  lavender: '#7287fd',  // Links, accents
};

/**
 * Catppuccin Frappe (Medium contrast dark)
 */
export const CatppuccinFrappe = {
  base: '#303446',
  mantle: '#292c3c',
  crust: '#232634',
  surface0: '#414559',
  surface1: '#51576d',
  surface2: '#626880',
  overlay0: '#737994',
  overlay1: '#838ba7',
  overlay2: '#949cbb',
  text: '#c6d0f5',
  subtext0: '#a5adce',
  subtext1: '#b5bfe2',
  rosewater: '#f2d5cf',
  flamingo: '#eebebe',
  pink: '#f4b8e4',
  mauve: '#ca9ee6',
  red: '#e78284',
  maroon: '#ea999c',
  peach: '#ef9f76',
  yellow: '#e5c890',
  green: '#a6d189',
  teal: '#81c8be',
  sky: '#99d1db',
  sapphire: '#85c1dc',
  blue: '#8caaee',
  lavender: '#babbf1',
};

/**
 * Catppuccin Macchiato (Lower contrast dark)
 */
export const CatppuccinMacchiato = {
  base: '#24273a',
  mantle: '#1e2030',
  crust: '#181926',
  surface0: '#363a4f',
  surface1: '#494d64',
  surface2: '#5b6078',
  overlay0: '#6e738d',
  overlay1: '#8087a2',
  overlay2: '#939ab7',
  text: '#cad3f5',
  subtext0: '#a5adcb',
  subtext1: '#b8c0e0',
  rosewater: '#f4dbd6',
  flamingo: '#f0c6c6',
  pink: '#f5bde6',
  mauve: '#c6a0f6',
  red: '#ed8796',
  maroon: '#ee99a0',
  peach: '#f5a97f',
  yellow: '#eed49f',
  green: '#a6da95',
  teal: '#8bd5ca',
  sky: '#91d7e3',
  sapphire: '#7dc4e4',
  blue: '#8aadf4',
  lavender: '#b7bdf8',
};

/**
 * Theme configuration
 */
export type ThemeMode = 'mocha' | 'latte' | 'frappe' | 'macchiato';

export const getTheme = (mode: ThemeMode = 'mocha') => {
  const colors = {
    mocha: CatppuccinMocha,
    latte: CatppuccinLatte,
    frappe: CatppuccinFrappe,
    macchiato: CatppuccinMacchiato,
  }[mode];

  return {
    colors,
    
    // Semantic color mappings for your app
    semantic: {
      // Backgrounds
      background: colors.base,
      backgroundSecondary: colors.mantle,
      backgroundTertiary: colors.crust,
      
      // Cards & surfaces
      card: colors.surface0,
      cardElevated: colors.surface1,
      
      // Text
      textPrimary: colors.text,
      textSecondary: colors.subtext1,
      textTertiary: colors.subtext0,
      textMuted: colors.overlay2,
      
      // Actions
      primary: colors.blue,
      primaryHover: colors.sapphire,
      secondary: colors.mauve,
      
      // Status colors
      success: colors.green,
      successLight: colors.teal,
      warning: colors.yellow,
      warningLight: colors.peach,
      error: colors.red,
      errorLight: colors.maroon,
      info: colors.sky,
      
      // Finance specific
      income: colors.green,
      expense: colors.red,
      savings: colors.blue,
      investment: colors.mauve,
      
      // Chart colors (for donut chart)
      chart: {
        utilities: colors.peach,
        payments: colors.blue,
        expenses: colors.green,
        subscriptions: colors.red,
        food: colors.yellow,
        transport: colors.sky,
        entertainment: colors.mauve,
        other: colors.lavender,
      },
      
      // Borders
      border: colors.surface2,
      borderLight: colors.surface1,
      
      // Overlays
      overlay: colors.overlay0,
      overlayHover: colors.overlay1,
      
      // Special
      accent: colors.lavender,
      accentSecondary: colors.pink,
      link: colors.lavender,
    },
    
    // Typography
    typography: {
      fontFamily: {
        regular: 'System',
        medium: 'System',
        semibold: 'System',
        bold: 'System',
      },
      fontSize: {
        xs: 12,
        sm: 14,
        base: 16,
        lg: 18,
        xl: 20,
        '2xl': 24,
        '3xl': 30,
        '4xl': 36,
      },
      fontWeight: {
        regular: '400' as const,
        medium: '500' as const,
        semibold: '600' as const,
        bold: '700' as const,
      },
    },
    
    // Spacing (using 4px base)
    spacing: {
      xs: 4,
      sm: 8,
      md: 16,
      lg: 24,
      xl: 32,
      '2xl': 48,
      '3xl': 64,
    },
    
    // Border radius
    borderRadius: {
      none: 0,
      sm: 4,
      md: 8,
      lg: 12,
      xl: 16,
      '2xl': 24,
      full: 9999,
    },
    
    // Shadows (adapted for React Native)
    shadows: {
      sm: {
        shadowColor: colors.crust,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 2,
      },
      md: {
        shadowColor: colors.crust,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 4,
      },
      lg: {
        shadowColor: colors.crust,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 8,
      },
      xl: {
        shadowColor: colors.crust,
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.35,
        shadowRadius: 12,
        elevation: 12,
      },
    },
  };
};

// Export default theme (Mocha)
export const theme = getTheme('mocha');

// Type definitions
export type Theme = ReturnType<typeof getTheme>;
export type Colors = Theme['colors'];
export type SemanticColors = Theme['semantic'];
