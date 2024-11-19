import "./globals.css";
import { Poppins } from "next/font/google";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { Navbar } from "@/components/Navbar";

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

const poppins = Poppins({
  subsets: ["latin"],
  weight: "400",
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${poppins.className} h-full`}>
        <main className="h-full flex flex-col">
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <div className="flex-grow flex flex-col">{children}</div>
          </ThemeProvider>
        </main>
      </body>
    </html>
  );
}
