import { Link } from "react-router-dom"
import { Button } from "../components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card"
import { UserPlus, Package } from 'lucide-react'

export default function AdminPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-b from-background to-background/50">
      <Card className="max-w-md w-full">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Admin Dashboard</CardTitle>
          <CardDescription>Select an administrative function</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Link to="/admin/dashboard/registration">
            <Button className="w-full h-16 text-lg" variant="outline">
              <UserPlus className="mr-2 h-5 w-5" />
              Registration
            </Button>
          </Link>
          <Link to="/admin/inventory">
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