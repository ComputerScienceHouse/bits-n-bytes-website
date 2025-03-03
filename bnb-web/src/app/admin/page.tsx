import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { UserPlus, Scale } from 'lucide-react'
import Link from "next/link"

export default function AdminPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-b from-background to-background/50">
      <Card className="max-w-md w-full">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Admin Dashboard</CardTitle>
          <CardDescription>Select an administrative function</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Link href="/registration">
            <Button className="w-full h-16 text-lg" variant="outline">
              <UserPlus className="mr-2 h-5 w-5" />
              Registration
            </Button>
          </Link>
          
          <Link href="/tare-screen">
            <Button className="w-full h-16 text-lg" variant="outline">
              <Scale className="mr-2 h-5 w-5" />
              Tare Screen
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  )
}