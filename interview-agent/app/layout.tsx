import type { Metadata } from "next";
import { Mona_Sans } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import { Check, CircleAlert } from "lucide-react";

const monaSans = Mona_Sans({
  variable: "--font-mona-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Prep AI",
  description: "Your AI Interview Preparation Assistant",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${monaSans.className} antialiased pattern`}
      >
        {children}
        <Toaster
          position="top-center"
          icons={{
            success: <Check className="text-green-500 size-5" />,
            error: <CircleAlert className="text-red-500 size-5" />,
          }}
        />
      </body>
    </html>
  );
}
