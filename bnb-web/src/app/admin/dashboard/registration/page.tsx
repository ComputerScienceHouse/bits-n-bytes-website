'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { UserPlus, RadioTower } from "lucide-react"

export default function RegistrationPage() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phone: '',
    nfcToken: ''
  })
  const [loading, setLoading] = useState(false)
  const [nfcLoading, setNfcLoading] = useState(false)

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault()
  //   setLoading(true)

  //   try {
  //     // Print to console for debugging
  //     console.log('Form Data:', formData)
      
  //     const response = await fetch('/api/register', {
  //       method: 'POST',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify(formData)
  //     })

  //     if (response.ok) {
  //       console.log('User registered successfully')
  //       setFormData({ username: '', email: '', phone: '', nfcToken: '' })
  //     } else {
  //       console.error('Failed to register user')
  //     }
  //   } catch (error) {
  //     console.error('Error:', error)
  //   }

  //   setLoading(false)
  // }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Print to console for debugging
      // console.log('Form Data:', formData)

      // TODO: redo this
      const url = `https://bitsnbytes-api-bitsnbytes-api.apps.okd4.csh.rit.edu/nfc/?name=${formData.username}&email=${formData.email}&phone=${formData.phone}&nfc-token=${formData.nfcToken}`;
      console.log('env_token', process.env.API_AUTH)
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': process.env.API_AUTH || "" },
      })

      if (response.ok) {
        console.log('User registered successfully')
        setFormData({ username: '', email: '', phone: '', nfcToken: '' })
      } else {
        console.error('Failed to register user',response)
      }
    } catch (error) {
      console.error('Error:', error)
    }

    setLoading(false)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleNfcScan = async () => {
    setNfcLoading(true)

    try {
      const response = await fetch('/api/scan-nfc')
      const data = await response.json()

      if (data.uid) {
        setFormData(prev => ({ ...prev, nfcToken: data.uid }))
      } else {
        console.error('NFC scan failed')
      }
    } catch (error) {
      console.error('Error scanning NFC:', error)
    }

    setNfcLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-b from-background to-background/50">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-center mb-2">
            <div className="p-3 rounded-full bg-primary/10">
              <UserPlus className="h-6 w-6 text-primary" />
            </div>
          </div>
          <CardTitle className="text-2xl text-center">User Registration</CardTitle>
          <CardDescription className="text-center">
            Enter the new user&apos;s information below
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input id="username" name="username" placeholder="Enter username" value={formData.username} onChange={handleChange} required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" placeholder="Enter email address" value={formData.email} onChange={handleChange} required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input id="phone" name="phone" type="tel" placeholder="Enter phone number" value={formData.phone} onChange={handleChange} required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="nfcToken">NFC Token Number</Label>
              <div className="flex space-x-2">
                <Input id="nfcToken" name="nfcToken" placeholder="Tap card to scan" value={formData.nfcToken} onChange={handleChange} required />
                <Button type="button" onClick={handleNfcScan} disabled={nfcLoading}>
                  {nfcLoading ? 'Scanning...' : <RadioTower />}
                </Button>
              </div>
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Registering...' : 'Register User'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
