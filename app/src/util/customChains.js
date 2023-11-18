import { Chain } from 'wagmi'
 
export const mantle = {
    id: 5001,
    name: 'Mantle',
    network: 'Mantle Testnet',
    iconUrl: "https://pbs.twimg.com/profile_images/1597775748580134914/bLhE1aY1_400x400.jpg",
    nativeCurrency: {
      decimals: 18,
      name: 'BitDAO',
      symbol: 'BIT',
    },
    rpcUrls: {
      public: { http: ['https://rpc.testnet.mantle.xyz'] },
      default: { http: ['https://rpc.testnet.mantle.xyz'] },
    },
    blockExplorers: {
      default: { name: 'SnowTrace', url: 'https://explorer.testnet.mantle.xyz' },
    },
  }

  export const scroll = {
    id: 534353,
    name: 'Scroll Alpha Testnet',
    network: 'scroll',
    iconUrl: "https://scrollscan.com/images/svg/brands/main.svg?v=23.11.2.1",
    nativeCurrency: {
      decimals: 18,
      name: 'Ether',
      symbol: 'ETH',
    },
    rpcUrls: {
      public: { http: ["https://alpha-rpc.scroll.io/l2"] },
      default: { http: ["https://alpha-rpc.scroll.io/l2"] },
    },
    blockExplorers: {
      default: { name: 'Scrollscan', url: 'https://scrollscan.com' },
    },
  }
  
  export const arb = {
    id: 421614,
    name: 'Arbitrum Sepolia',
    network: 'arb',
    iconUrl: "https://s2.coinmarketcap.com/static/img/coins/64x64/11841.png",
    nativeCurrency: {
      decimals: 18,
      name: 'Ether',
      symbol: 'ETH',
    },
    rpcUrls: {
      public: { http: ["https://arbitrum-sepolia.blockpi.network/v1/rpc/public"] },
      default: { http: ["https://arbitrum-sepolia.blockpi.network/v1/rpc/public"] },
    },
    blockExplorers: {
      default: { name: 'Arbiscan', url: 'https://sepolia.arbiscan.io/' },
    },
  }
  
  export const linea = {
    id: 59140 ,
    name: 'Linea Goerli Testnet',
    network: 'linea',
    iconUrl: "https://goerli.lineascan.build/images/favicon.ico?v=23.11.2.0",
    nativeCurrency: {
      decimals: 18,
      name: 'Ether',
      symbol: 'ETH',
    },
    rpcUrls: {
      public: { http: ["https://rpc.goerli.linea.build"] },
      default: { http: ["https://rpc.goerli.linea.build"] },
    },
    blockExplorers: {
      default: { name: 'Lineascan', url: 'https://goerli.lineascan.build/' },
    },
  }

  export const base = {
    id: 84531 ,
    name: 'Base Goerli Testnet',
    network: 'base',
    iconUrl: "https://base.org/document/apple-touch-icon.png",
    nativeCurrency: {
      decimals: 18,
      name: 'Ether',
      symbol: 'ETH',
    },
    rpcUrls: {
      public: { http: ["https://base-goerli.public.blastapi.io"] },
      default: { http: ["https://base-goerli.public.blastapi.io"] },
    },
    blockExplorers: {
      default: { name: 'Basescan', url: 'https://goerli.basescan.org/' },
    },
  }

  export const neon = {
    id: 245022926 ,
    name: 'Neon Testnet',
    network: 'neon',
    iconUrl: "https://devnet.neonscan.org/favicon.png",
    nativeCurrency: {
      decimals: 18,
      name: 'Neon',
      symbol: 'NEON',
    },
    rpcUrls: {
      public: { http: ["https://proxy.devnet.neonlabs.org/solana"] },
      default: { http: ["https://proxy.devnet.neonlabs.org/solana"] },
    },
    blockExplorers: {
      default: { name: 'Neonscan', url: 'https://devnet.neonscan.org/' },
    },
  }