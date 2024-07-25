import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";
import { Header } from "./header";

export const metadata: Metadata = {
  title: "Argo CD",
  description: "",
  icons: {
    icon: "/images/favicon-32x32.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <Header/>
          {children}
        </Providers>
      </body>
    </html>
  );
}
