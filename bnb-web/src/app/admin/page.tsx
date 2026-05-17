'use client'

import { Button } from "../../../components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../components/ui/card"
import { UserPlus, Scale, Package } from 'lucide-react'
import Link from "next/link"
import { useAuth } from "../hooks/useAuth"
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function AdminPage() {
  const router = useRouter();
  const { isAuthenticated, isAdmin, isLoading } = useAuth(router);

  useEffect(() => {
    if (isLoading) return;
    if (!isAuthenticated) {
      router.push('/login');
    } else if (!isAdmin) {
      router.push('/');
    }
  }, [isAuthenticated, isAdmin, isLoading, router]);

  if (isLoading || !isAuthenticated || !isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen flex items-center justify-center pl-4 pr-4 bg-gradient-to-b from-background to-background/50">
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
          <Link href="/admin/inventory">
            <Button className="w-full h-16 text-lg" variant="outline">
              <Package className="mr-2 h-5 w-5" />
              Inventory Management
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  )
}