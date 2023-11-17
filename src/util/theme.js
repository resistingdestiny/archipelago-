import React, { useEffect, useLayoutEffect, useState } from "react";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import { createTheme, ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import { deepmerge } from "@mui/utils";
import CssBaseline from "@mui/material/CssBaseline";
import useMediaQuery from "@mui/material/useMediaQuery";
import { createLocalStorageStateHook } from "use-local-storage-state";

const clientEmotionCache = createCache({ key: "css", prepend: true });

const themeConfig = {
  // Dark theme inspired by Ribbon Finance
  dark: {
    palette: {
      mode: "dark",
      primary: {
        main: '#212121', // A dark grey for the primary color
      },
      secondary: {
        main: "#BB86FC", // A purple color for secondary elements
      },
      background: {
        default: '#121212', // Black for the background
        paper: '#121212',
      },
      text: {
        primary: '#e0e0e0', // Light grey for primary text
        secondary: '#a0a0a0', // Slightly darker grey for secondary text
      },
    },
    typography: {
      fontFamily: '"Orbitron", "Roboto", "Helvetica", "Arial", sans-serif',
    },
    components: {
      // Apply global styles for Navbar and Footer
      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundColor: '#212121', // Dark grey color for the navbar
            boxShadow: '0 4px 10px 0 rgba(98, 54, 255, 0.3)', // Glowing effect
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundColor: '#212121', // Dark grey color for components like Paper
            color: '#FFFFFF',
          },
        },
      },
      // Additional component overrides for glowing effects, etc.
    },
  },


  // Light theme (if needed)
  light: {
    // Light theme configuration
  },

  // Shared values
  shared: {
    // Shared properties for all themes
  },
};

const useStoredTheme = createLocalStorageStateHook("storedTheme", "dark"); // Default to dark theme

export const ThemeProvider = (props) => {
  let [storedTheme, setStoredTheme] = useStoredTheme();
  const hasHydrated = useHasHydrated();
  if (!hasHydrated) {
    storedTheme = undefined;
  }

  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const themeName = storedTheme || (prefersDarkMode ? "dark" : "light");

  const theme = createTheme(deepmerge(themeConfig[themeName], themeConfig.shared), {
    name: themeName,
    set: (name) => setStoredTheme(name),
    toggle: () => setStoredTheme(themeName === "dark" ? "light" : "dark"),
  });

  const emotionCache = props.serverEmotionCache || clientEmotionCache;

  return (
    <CacheProvider value={emotionCache}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {props.children}
      </MuiThemeProvider>
    </CacheProvider>
  );
};

function useHasHydrated() {
  const [hasHydrated, setHasHydrated] = useState(false);
  const isServer = typeof window === "undefined";
  const useEffectFn = isServer ? useEffect : useLayoutEffect;
  useEffectFn(() => { setHasHydrated(true); }, []);
  return hasHydrated;
}
