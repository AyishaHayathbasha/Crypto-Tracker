// src/data/lessons.js
export const lessons = [
  {
    id: 1,
    title: "What is Cryptocurrency?",
    description: "Learn the basics of blockchain and how digital currencies work.",
    content:
      "Cryptocurrency is a form of digital currency that uses cryptography for security. It operates independently of a central authority.",
    videoUrl: "https://www.youtube.com/embed/SSo_EIwHSd4",
    quiz: [
      {
        question: "What technology powers cryptocurrencies?",
        options: ["Blockchain", "Internet", "AI"],
        answer: "Blockchain",
      },
      {
        question: "Is Bitcoin centralized?",
        options: ["Yes", "No"],
        answer: "No",
      },
    ],
  },
  {
    id: 2,
    title: "Understanding Market Cap",
    description: "Explore how market capitalization affects crypto valuation.",
    content:
      "Market cap is calculated by multiplying the current price by total supply. It helps measure the size of a cryptocurrency.",
    videoUrl: "https://www.youtube.com/embed/8XJ1MSTEuU0",
    quiz: [
      {
        question: "How is market cap calculated?",
        options: [
          "Price × Total Supply",
          "Volume × Price",
          "Total Supply ÷ Price",
        ],
        answer: "Price × Total Supply",
      },
    ],
  },
  {
    id: 3,
    title: "How Exchanges Work",
    description: "Discover how crypto buying and selling happens securely.",
    content:
      "Crypto exchanges are platforms where users can trade cryptocurrencies. They can be centralized or decentralized.",
    videoUrl: "https://www.youtube.com/embed/2nL1V2Zf35E",
    quiz: [
      {
        question: "What do crypto exchanges do?",
        options: [
          "Facilitate trading",
          "Mine cryptocurrencies",
          "Store government data",
        ],
        answer: "Facilitate trading",
      },
    ],
  },
  
  {
    id: 4,
    title: "What is a Wallet?",
    description: "Learn about hot and cold wallets and how to secure assets.",
    content:
      "Crypto wallets store private keys that allow users to access and manage their cryptocurrencies. They can be online (hot) or offline (cold).",
    videoUrl: "https://www.youtube.com/embed/v6zNwq4sRls",
    quiz: [
      {
        question: "What do crypto wallets store?",
        options: ["Private keys", "Coins physically", "Usernames"],
        answer: "Private keys",
      },
    ],
  },
];