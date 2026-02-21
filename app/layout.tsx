import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "destroysass.ai — own your stack",
  description:
    "the place where small businesses stop renting software and start owning it. propose, pledge, and collectively own the tools your business needs.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
