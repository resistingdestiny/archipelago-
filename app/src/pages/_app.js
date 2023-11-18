import React from "react";
import { ThemeProvider } from "util/theme";
import Navbar2 from "components/Navbar";
import Footer from "components/Footer";
import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import { goerli, mainnet, polygon, sepolia } from "wagmi/chains";
import { scroll, mantle, arb, base, linea, neon } from "../util/customChains"
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import { Helmet } from 'react-helmet'


const { chains, provider } = configureChains(
  [goerli, mainnet, sepolia, polygon, scroll, mantle, arb, base, linea, neon],
  [publicProvider()]
);

console.log(provider);

const { connectors } = getDefaultWallets({
  appName: "My RainbowKit App",
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});



function MyApp({ Component, serverEmotionCache, pageProps }) {
  React.useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://public.cypherd.io/js/onboardingsdk.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    }
  }, []);
 
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains}>
          <ThemeProvider serverEmotionCache={serverEmotionCache}>
          <Helmet>
            <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />
            
          </Helmet>
          <Navbar2
            logo="logo.png"
            logoInverted="logo.png"
          />
          <Component {...pageProps} />
          <Footer
            size="medium"
            bgImage=""
            bgImageOpacity={1}
            copyright={`© ${new Date().getFullYear()} Archipelago`}
            logo="logo.png"
            logoInverted="logo.png"
            sticky={false}
          />
          </ThemeProvider>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default MyApp;
