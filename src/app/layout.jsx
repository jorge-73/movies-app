import { Inter } from "next/font/google";
import Head from "next/head";
import { Toaster } from "react-hot-toast";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Movies and TV Series",
  description: "Generated by create next app",
  icons: {
    icon: "./movie.svg",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
        <link rel="icon" type="image/svg+xml" href={metadata.icons.icon} />
      </Head>
      <body className={inter.className}>
        {children}
        <Toaster position="bottom-center" reverseOrder={false} />
        <chat-bot platform_id="b4bdb4c2-d290-4cc6-8540-8757a3eb644f" user_id="a8503940-34e6-4dc9-8cf8-abb30377aa8b" chatbot_id="8610b50e-9396-47f4-a3f3-bb3576352325"><a href="https://www.chatsimple.ai/?utm_source=widget&utm_medium=referral">chatsimple</a></chat-bot><script src="https://cdn.chatsimple.ai/chat-bot-loader.js" defer></script>
      </body>
    </html>
  );
}
