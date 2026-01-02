export interface Quiz {
  question: string;
  options: string[];
  answer: string;
}

export interface LessonProgress {
  completed: boolean;
  quizProgress: number;
  lastAccessed: string | null;
}

export interface Lesson {
  id: number;
  title: string;
  description: string;
  content: string;
  videoUrl: string;
  quiz: Quiz[];
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  tags: string[];
  estimatedTime: number;
  resources?: { title: string; url: string }[];
  progress?: LessonProgress;
}

export const lessons: Lesson[] = [
  {
    id: 1,
    title: "What is Cryptocurrency?",
    description: "Learn the basics of blockchain and how digital currencies work.",
    content:
      "Cryptocurrency is a form of digital currency that uses cryptography for security. It operates independently of a central authority. Popular cryptocurrencies include Bitcoin, Ethereum, and Litecoin.",
    videoUrl: "https://www.youtube.com/embed/SSo_EIwHSd4", // Working intro to crypto
    quiz: [
      { question: "What technology powers cryptocurrencies?", options: ["Blockchain", "Internet", "AI"], answer: "Blockchain" },
      { question: "Is Bitcoin centralized?", options: ["Yes", "No"], answer: "No" },
    ],
    difficulty: "Beginner",
    tags: ["crypto", "blockchain", "bitcoin"],
    estimatedTime: 10,
    resources: [{ title: "Bitcoin Whitepaper", url: "https://bitcoin.org/bitcoin.pdf" }],
    progress: { completed: false, quizProgress: 0, lastAccessed: null },
  },
  {
    id: 2,
    title: "Understanding Market Cap",
    description: "Explore how market capitalization affects crypto valuation.",
    content:
      "Market cap is calculated by multiplying the current price by total supply. It helps measure the size of a cryptocurrency and compare it to others in the market.",
    videoUrl: "https://www.youtube.com/embed/O3W6m2bEi3s", // Simplified market cap explainer
    quiz: [
      { question: "How is market cap calculated?", options: ["Price × Total Supply", "Volume × Price", "Total Supply ÷ Price"], answer: "Price × Total Supply" },
    ],
    difficulty: "Beginner",
    tags: ["crypto", "market", "valuation"],
    estimatedTime: 8,
    progress: { completed: false, quizProgress: 0, lastAccessed: null },
  },
  {
    id: 3,
    title: "How Exchanges Work",
    description: "Discover how crypto buying and selling happens securely.",
    content:
      "Crypto exchanges are platforms where users can trade cryptocurrencies. They can be centralized (like Binance, Coinbase) or decentralized (like Uniswap, PancakeSwap).",
    videoUrl: "https://www.youtube.com/embed/6Y6Xq5iKUEo", // How exchanges work video
    quiz: [
      { question: "What do crypto exchanges do?", options: ["Facilitate trading", "Mine cryptocurrencies", "Store government data"], answer: "Facilitate trading" },
    ],
    difficulty: "Beginner",
    tags: ["exchange", "trading", "crypto"],
    estimatedTime: 12,
    resources: [{ title: "Binance Academy", url: "https://academy.binance.com" }],
    progress: { completed: false, quizProgress: 0, lastAccessed: null },
  },
  {
    id: 4,
    title: "What is a Wallet?",
    description: "Learn about hot and cold wallets and how to secure assets.",
    content:
      "Crypto wallets store private keys that allow users to access and manage their cryptocurrencies. Hot wallets are online and convenient but less secure, while cold wallets are offline and safer for large holdings.",
    videoUrl: "https://www.youtube.com/embed/5t7P6b8m8GQ", // Wallet types explainer
    quiz: [
      { question: "What do crypto wallets store?", options: ["Private keys", "Coins physically", "Usernames"], answer: "Private keys" },
    ],
    difficulty: "Intermediate",
    tags: ["wallet", "security", "crypto"],
    estimatedTime: 15,
    resources: [{ title: "Ledger Wallet Guide", url: "https://www.ledger.com/academy" }],
    progress: { completed: false, quizProgress: 0, lastAccessed: null },
  },
  {
    id: 5,
    title: "Introduction to DeFi (Decentralized Finance)",
    description: "Learn how DeFi is changing the financial world without banks.",
    content:
      "DeFi, or Decentralized Finance, refers to blockchain-based financial systems that operate without intermediaries. Using smart contracts on networks like Ethereum, users can lend, borrow, earn interest, and trade directly from their wallets.",
    videoUrl: "https://www.youtube.com/embed/ZkBz-Cz6VxQ", // DeFi beginner explanation
    quiz: [
      { question: "What does DeFi stand for?", options: ["Decentralized Finance", "Defined Finance", "Digital Finance"], answer: "Decentralized Finance" },
      { question: "What technology enables DeFi platforms?", options: ["Smart Contracts", "Bank Servers", "Mobile Apps"], answer: "Smart Contracts" },
      { question: "Which is a key benefit of DeFi?", options: ["Removing intermediaries", "Centralized control", "Offline transactions"], answer: "Removing intermediaries" },
    ],
    difficulty: "Intermediate",
    tags: ["DeFi", "finance", "smart contracts"],
    estimatedTime: 20,
    resources: [{ title: "DeFi Pulse", url: "https://defipulse.com/" }],
    progress: { completed: false, quizProgress: 0, lastAccessed: null },
  },
  {
    id: 6,
    title: "NFTs and Web3 Explained",
    description: "Understand how NFTs and Web3 are transforming digital ownership.",
    content:
      "NFTs (Non-Fungible Tokens) represent unique digital assets verified on the blockchain — like art, collectibles, or music. Web3 envisions a decentralized internet owned and governed by users, powered by tokens and smart contracts.",
    videoUrl: "https://www.youtube.com/embed/YQ_xWvX1n9g", // Web3 and NFT explainer
    quiz: [
      { question: "What does NFT stand for?", options: ["Non-Fungible Token", "New Financial Token", "Network File Transfer"], answer: "Non-Fungible Token" },
      { question: "What makes an NFT unique?", options: ["It has a unique identifier on the blockchain", "It can be copied easily", "It is the same as Bitcoin"], answer: "It has a unique identifier on the blockchain" },
      { question: "What is Web3 mainly about?", options: ["User ownership and decentralization", "Faster browsers", "Centralized platforms"], answer: "User ownership and decentralization" },
    ],
    difficulty: "Advanced",
    tags: ["NFT", "Web3", "blockchain", "digital ownership"],
    estimatedTime: 25,
    resources: [{ title: "Web3 Foundation", url: "https://web3.foundation/" }],
    progress: { completed: false, quizProgress: 0, lastAccessed: null },
  },
];