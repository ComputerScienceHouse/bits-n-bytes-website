"use client"

import { ArrowDown, Brain, ShoppingBag, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useRef } from "react"

export default function Home() {
  const featuresRef = useRef<HTMLElement>(null)

  const scrollToFeatures = () => {
    featuresRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <main className="min-h-screen w-full overflow-y-auto snap-y snap-mandatory">
      {/* Hero Section */}
      <section className="min-h-screen w-full snap-start bg-gradient-to-b from-background to-background/50 flex flex-col items-center justify-center relative px-4">
        <div className="space-y-6 text-center max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/50 animate-in fade-in slide-in-from-bottom-8 duration-1000">
            Bits N&apos; Bytes
          </h1>
          <p className="text-xl sm:text-2xl text-muted-foreground animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200 pb-2">
            The Future of Vending, Powered by AI
          </p>
          <Button
            variant="outline"
            size="lg"
            className="animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300"
            onClick={scrollToFeatures}
          >
            Learn More <ArrowDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </section>

      {/* Features Section */}
      <section
        ref={featuresRef}
        className="min-h-screen w-full snap-start bg-gradient-to-b from-background/50 to-background flex items-center justify-center px-4"
      >
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center mb-12">Innovative Features</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="p-6 backdrop-blur-sm bg-background/50">
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="p-3 rounded-full bg-primary/10">
                  <Brain className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">AI-Powered</h3>
                <p className="text-muted-foreground">
                  Advanced machine learning algorithms for smart inventory management and user interactions
                </p>
              </div>
            </Card>
            <Card className="p-6 backdrop-blur-sm bg-background/50">
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="p-3 rounded-full bg-primary/10">
                  <ShoppingBag className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">Smart Shopping</h3>
                <p className="text-muted-foreground">
                  Seamless checkout process with automatic item detection and tracking
                </p>
              </div>
            </Card>
            <Card className="p-6 backdrop-blur-sm bg-background/50">
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="p-3 rounded-full bg-primary/10">
                  <Zap className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">Real-time Analytics</h3>
                <p className="text-muted-foreground">Instant insights into inventory levels and purchasing patterns</p>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Future Vision Section */}
      <section className="min-h-screen w-full snap-start bg-gradient-to-b from-background to-background/50 flex items-center justify-center px-4">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">The Future of Vending</h2>
          <p className="text-xl text-muted-foreground leading-relaxed">
            We&apos;re building more than just a vending machine - we&apos;re creating an intelligent retail experience
            that understands and adapts to user needs in real-time. With advanced AI capabilities and sensor technology,
            Bits N&apos; Bytes represents the next evolution in automated retail.
          </p>
        </div>
      </section>
    </main>
  )
}

