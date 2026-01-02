// services/chatbot.js
import axios from "axios";

export async function handleChat(query) {
  query = query.toLowerCase();

  const match = query.match(/bitcoin|ethereum|dogecoin|solana|cardano|Tether|Ripple/i);

  if (!match) {
    return "I did not recognize that coin. Try Bitcoin, Ethereum, Solana, etc.";
  }

  const coin = match[0].toLowerCase();

  try {
    const res = await axios.get(
      `https://api.coingecko.com/api/v3/simple/price?ids=${coin}&vs_currencies=usd`
    );

    const price = res.data?.[coin]?.usd;

    if (!price) return "Price not available";

    return `The price of ${coin} is ${price} dollars.`;
  } catch (e) {
    return "Unable to fetch price right now.";
  }
}
