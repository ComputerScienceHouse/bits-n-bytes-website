import type { Metadata } from "next"
import { Inter } from 'next/font/google'
import "./globals.css"
import Link from "next/link"
import { Home } from 'lucide-react'
import { Button } from "@/components/ui/button"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Bits N' Bytes",
  description: "The Future of Vending, Powered by AI",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
        <header className="fixed top-0 left-0 right-0 z-50 border-b border-[var(--foreground)] bg-background/80 backdrop-blur-sm">
          <div className="flex items-center justify-between h-16 px-4 max-w-7xl mx-auto">
            {/* Home Button */}
            <Link href="/">
              <Button variant="ghost" className="hover:bg-primary/10">
                {/* <Home className="h-5 w-5" /> */}
                <span>Bits &apos;n Bytes</span>
              </Button>
            </Link>

            {/* Navigation Links */}
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <Link href={"/"} className={navigationMenuTriggerStyle()}>Home</Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link href={"/about"} className={navigationMenuTriggerStyle()}>About</Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link href={"/admin"} className={navigationMenuTriggerStyle()}>Admin</Link>
                </NavigationMenuItem>
                {/* <NavigationMenuItem>
                    <Link href={"/funding"} className={navigationMenuTriggerStyle()}>Funding</Link>
                </NavigationMenuItem> */}
                {/* <NavigationMenuItem>
                  <Link href={"/contact"} className={navigationMenuTriggerStyle()}>Contact</Link>
                </NavigationMenuItem> */}
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        </header>

        {/* Main Content with padding for header */}
        <main className="pt-16">
          {children}
        </main>
      </body>
    </html>
  );
}