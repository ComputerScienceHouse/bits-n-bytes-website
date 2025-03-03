import { Progress } from "@/components/ui/progress"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { HeartHandshake } from "lucide-react"
import Link from "next/link"

export default function FundingPage() {
  // Example current amount - you can make this dynamic
  const currentAmount = 5000
  const goalAmount = 15000
  const progressPercentage = (currentAmount / goalAmount) * 100

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-b from-background to-background/50">
      <Card className="max-w-2xl w-full">
        <CardHeader className="text-center space-y-4">
          <div className="mx-auto bg-primary/10 w-fit p-4 rounded-full">
            <HeartHandshake className="w-8 h-8 text-primary" />
          </div>
          <CardTitle className="text-3xl sm:text-4xl font-bold">Help Us Get to OpenSauce 2025!</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Raised: ${currentAmount.toLocaleString()}</span>
              <span>Goal: ${goalAmount.toLocaleString()}</span>
            </div>
            <Progress value={progressPercentage} className="h-2" />
          </div>

          <div className="space-y-4 text-center">
            <p className="text-lg text-muted-foreground">
              We&apos;re raising funds to present Bits N&apos; Bytes at OpenSauce 2025 in California. Your support will
              help us showcase our innovative AI-powered vending machine to the tech community.
            </p>

            <div className="space-y-2">
              <p className="font-semibold">Your contribution will help cover:</p>
              <ul className="text-muted-foreground space-y-1">
                <li>• Travel and accommodation expenses</li>
                <li>• Conference registration fees</li>
                <li>• Equipment transportation</li>
                <li>• Presentation materials</li>
              </ul>
            </div>
            <Link href="/contact">
              <Button size="lg" className="mt-4">
                Support Our Project
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

