import type { Metadata } from "next";
import "./globals.css";
import Footer from "@/app/components/footer";

export const metadata: Metadata = {
  title: "destroysass — own the software you use",
  description:
    "small businesses collectively fund, own, and control the software they depend on. no more saas rent. propose ideas, pledge monthly, and own what gets built.",
  metadataBase: new URL("https://destroysass.vercel.app"),
  openGraph: {
    title: "destroysass — own the software you use",
    description:
      "small businesses collectively fund, own, and control the software they depend on. no more saas rent.",
    type: "website",
    siteName: "destroysass",
  },
  twitter: {
    card: "summary_large_image",
    title: "destroysass — own the software you use",
    description:
      "small businesses collectively fund, own, and control the software they depend on. no more saas rent.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
        <Footer />
      </body>
    </html>
  );
}
