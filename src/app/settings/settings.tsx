'use client'

import { useState } from 'react'
import { AuthenticatedNavbar } from '../../components/AuthenticatedNavbar'
import { Button } from "../../components/ui/button"
// import { Input } from "../../components/ui/input"
import { Label } from "../../components/ui/label"
import { Card, CardHeader, CardTitle, CardContent } from "../../components/ui/card"
import { Switch } from "../../components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select"

export default function SettingsPage() {
    const [settings, setSettings] = useState({
        emailNotifications: true,
        darkMode: false,
        language: 'english',
        timezone: 'UTC',
    })
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        // Here you would typically send the updated settings to your backend
        console.log('Settings updated', settings)
    }

    return (
        <div className="min-h-screen bg-gray-100 text-left">
            <AuthenticatedNavbar />
            <main className="max-w-4xl mx-auto py-6 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-6">Settings</h1>

                <form onSubmit={handleSubmit}>
                    <Card className="mb-6">
                        <CardHeader>
                            <CardTitle>Notifications</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center justify-between">
                                <Label htmlFor="emailNotifications" className="flex flex-col">
                                    <span className="font-medium">Email Notifications</span>
                                    <span className="text-sm text-gray-500">Receive email updates about your account</span>
                                </Label>
                                <Switch
                                    id="emailNotifications"
                                    checked={settings.emailNotifications}
                                    onCheckedChange={(checked) => setSettings({ ...settings, emailNotifications: checked })}
                                />
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="mb-6">
                        <CardHeader>
                            <CardTitle>Appearance</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center justify-between">
                                <Label htmlFor="darkMode" className="flex flex-col">
                                    <span className="font-medium">Dark Mode</span>
                                    <span className="text-sm text-gray-500">Use dark theme for the application</span>
                                </Label>
                                <Switch
                                    id="darkMode"
                                    checked={settings.darkMode}
                                    onCheckedChange={(checked) => setSettings({ ...settings, darkMode: checked })}
                                />
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="mb-6">
                        <CardHeader>
                            <CardTitle>Language and Region</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="language">Language</Label>
                                <Select
                                    value={settings.language}
                                    onValueChange={(value) => setSettings({ ...settings, language: value })}
                                >
                                    <SelectTrigger id="language">
                                        <SelectValue placeholder="Select a language" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="english">English</SelectItem>
                                        <SelectItem value="spanish">Spanish</SelectItem>
                                        <SelectItem value="french">French</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="timezone">Timezone</Label>
                                <Select
                                    value={settings.timezone}
                                    onValueChange={(value) => setSettings({ ...settings, timezone: value })}
                                >
                                    <SelectTrigger id="timezone">
                                        <SelectValue placeholder="Select a timezone" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="UTC">UTC</SelectItem>
                                        <SelectItem value="EST">Eastern Time (ET)</SelectItem>
                                        <SelectItem value="PST">Pacific Time (PT)</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </CardContent>
                    </Card>

                    <Button type="submit">Save Settings</Button>
                </form>
            </main>
        </div>
    )
}

