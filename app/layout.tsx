import type { Metadata } from "next";
import { Fraunces, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
});

const fraunces = Fraunces({
  variable: "--font-display",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://javiss.vercel.app"),
  title: {
    default: "Javiss",
    template: "%s | Javiss",
  },
  description:
    "A personalized healthy lifestyle app for pantry-aware meals, budget-aware planning, workouts, shopping lists, and elegant consistency tracking.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${plusJakartaSans.variable} ${fraunces.variable} h-full scroll-smooth antialiased`}
    >
      <body className="min-h-full bg-background text-foreground">
        <div className="relative min-h-screen overflow-x-hidden">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-[32rem] bg-[radial-gradient(circle_at_top_left,rgba(127,197,170,0.18),transparent_35%),radial-gradient(circle_at_top_right,rgba(240,246,241,0.95),transparent_40%)]" />
          <div className="relative flex min-h-screen flex-col">{children}</div>
        </div>
      </body>
    </html>
  );
}
