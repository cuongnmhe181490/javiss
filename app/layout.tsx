import type { Metadata } from "next";
import { Be_Vietnam_Pro, Fraunces } from "next/font/google";

import { getServerThemePreference, getThemeBootstrapScript } from "@/lib/theme";
import "./globals.css";

const beVietnamPro = Be_Vietnam_Pro({
  variable: "--font-sans",
  weight: ["400", "500", "600", "700"],
  subsets: ["latin", "vietnamese"],
  display: "swap",
});

const fraunces = Fraunces({
  variable: "--font-display",
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://javiss.vercel.app"),
  title: {
    default: "Javiss",
    template: "%s | Javiss",
  },
  description:
    "Ứng dụng sống lành mạnh cá nhân hóa cho bữa ăn theo pantry, kế hoạch theo ngân sách, tập luyện, danh sách mua sắm và theo dõi độ đều.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const themePreference = await getServerThemePreference();

  return (
    <html
      lang="vi"
      suppressHydrationWarning
      data-theme={themePreference}
      className={`${beVietnamPro.variable} ${fraunces.variable} h-full scroll-smooth antialiased${themePreference === "dark" ? " dark" : ""}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: getThemeBootstrapScript(themePreference) }} />
      </head>
      <body className="min-h-full bg-background text-foreground">
        <div className="relative min-h-screen overflow-x-hidden">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-[32rem] bg-[radial-gradient(circle_at_top_left,rgba(127,197,170,0.18),transparent_35%),radial-gradient(circle_at_top_right,rgba(240,246,241,0.95),transparent_40%)] dark:bg-[radial-gradient(circle_at_top_left,rgba(52,117,93,0.22),transparent_32%),radial-gradient(circle_at_top_right,rgba(24,32,40,0.92),transparent_44%)]" />
          <div className="relative flex min-h-screen flex-col">{children}</div>
        </div>
      </body>
    </html>
  );
}
