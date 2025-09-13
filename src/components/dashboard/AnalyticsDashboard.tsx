'use client'

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, Clock, Eye, MapPin, TrendingUp, Users } from 'lucide-react'
import { Bar, BarChart, CartesianGrid, Cell, Line, LineChart, Pie, PieChart, ResponsiveContainer, XAxis, YAxis } from 'recharts'

// Mock analytics data
const mockAnalytics = {
    totalViews: 1247,
    uniqueVisitors: 892,
    todayViews: 23,
    weeklyGrowth: 12.5,
    monthlyViews: [
        { month: 'Jan', views: 186, visitors: 120 },
        { month: 'Feb', views: 305, visitors: 200 },
        { month: 'Mar', views: 237, visitors: 180 },
        { month: 'Apr', views: 273, visitors: 210 },
        { month: 'May', views: 209, visitors: 160 },
        { month: 'Jun', views: 214, visitors: 170 },
    ],
    deviceBreakdown: [
        { device: 'Mobile', count: 534, color: '#0088FE' },
        { device: 'Desktop', count: 358, color: '#00C49F' },
        { device: 'Tablet', count: 155, color: '#FFBB28' },
    ],
    topCountries: [
        { country: 'United States', flag: '🇺🇸', views: 423 },
        { country: 'United Kingdom', flag: '🇬🇧', views: 187 },
        { country: 'Canada', flag: '🇨🇦', views: 156 },
        { country: 'Germany', flag: '🇩🇪', views: 134 },
        { country: 'Australia', flag: '🇦🇺', views: 98 },
    ],
    recentVisitors: [
        { id: 1, location: 'New York, US', time: '2 min ago', device: 'Mobile' },
        { id: 2, location: 'London, UK', time: '5 min ago', device: 'Desktop' },
        { id: 3, location: 'Toronto, CA', time: '12 min ago', device: 'Mobile' },
        { id: 4, location: 'Berlin, DE', time: '18 min ago', device: 'Tablet' },
        { id: 5, location: 'Sydney, AU', time: '25 min ago', device: 'Desktop' },
    ]
}

const chartConfig = {
    views: {
        label: "Views",
        color: "hsl(var(--chart-1))",
    },
    visitors: {
        label: "Visitors",
        color: "hsl(var(--chart-2))",
    },
}

export function AnalyticsDashboard() {
    return (
        <div className="space-y-6">
            {/* Stats Overview */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Views</CardTitle>
                        <Eye className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{mockAnalytics.totalViews.toLocaleString()}</div>
                        <p className="text-xs text-muted-foreground">
                            +{mockAnalytics.todayViews} from today
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Unique Visitors</CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{mockAnalytics.uniqueVisitors.toLocaleString()}</div>
                        <p className="text-xs text-muted-foreground">
                            +{mockAnalytics.weeklyGrowth}% from last week
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Growth Rate</CardTitle>
                        <TrendingUp className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">+{mockAnalytics.weeklyGrowth}%</div>
                        <p className="text-xs text-muted-foreground">
                            Weekly growth
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Today's Views</CardTitle>
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{mockAnalytics.todayViews}</div>
                        <p className="text-xs text-muted-foreground">
                            Real-time updates
                        </p>
                    </CardContent>
                </Card>
            </div>

            {/* Charts Section */}
            <Tabs defaultValue="overview" className="space-y-4">
                <TabsList>
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="analytics">Analytics</TabsTrigger>
                    <TabsTrigger value="visitors">Visitors</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                        <Card className="col-span-4">
                            <CardHeader>
                                <CardTitle>Monthly Analytics</CardTitle>
                                <CardDescription>
                                    Views and visitors over the last 6 months
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="pl-2">
                                <ChartContainer config={chartConfig}>
                                    <ResponsiveContainer width="100%" height={350}>
                                        <BarChart data={mockAnalytics.monthlyViews}>
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis dataKey="month" />
                                            <YAxis />
                                            <ChartTooltip content={<ChartTooltipContent />} />
                                            <Bar dataKey="views" fill="var(--color-views)" />
                                            <Bar dataKey="visitors" fill="var(--color-visitors)" />
                                        </BarChart>
                                    </ResponsiveContainer>
                                </ChartContainer>
                            </CardContent>
                        </Card>

                        <Card className="col-span-3">
                            <CardHeader>
                                <CardTitle>Device Breakdown</CardTitle>
                                <CardDescription>
                                    How visitors access your profile
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <ChartContainer config={chartConfig}>
                                    <ResponsiveContainer width="100%" height={350}>
                                        <PieChart>
                                            <Pie
                                                data={mockAnalytics.deviceBreakdown}
                                                cx="50%"
                                                cy="50%"
                                                labelLine={false}
                                                label={({ device, percent }) => `${device} ${(percent * 100).toFixed(0)}%`}
                                                outerRadius={80}
                                                fill="#8884d8"
                                                dataKey="count"
                                            >
                                                {mockAnalytics.deviceBreakdown.map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                                ))}
                                            </Pie>
                                            <ChartTooltip content={<ChartTooltipContent />} />
                                        </PieChart>
                                    </ResponsiveContainer>
                                </ChartContainer>
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>

                <TabsContent value="analytics" className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2">
                        <Card>
                            <CardHeader>
                                <CardTitle>Top Countries</CardTitle>
                                <CardDescription>Where your visitors are from</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {mockAnalytics.topCountries.map((country, index) => (
                                        <div key={index} className="flex items-center justify-between">
                                            <div className="flex items-center space-x-2">
                                                <span className="text-lg">{country.flag}</span>
                                                <span className="font-medium">{country.country}</span>
                                            </div>
                                            <Badge variant="secondary">{country.views} views</Badge>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Recent Activity</CardTitle>
                                <CardDescription>Latest profile visitors</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {mockAnalytics.recentVisitors.map((visitor) => (
                                        <div key={visitor.id} className="flex items-center space-x-4">
                                            <Avatar className="h-8 w-8">
                                                <AvatarFallback>
                                                    <MapPin className="h-4 w-4" />
                                                </AvatarFallback>
                                            </Avatar>
                                            <div className="flex-1 space-y-1">
                                                <p className="text-sm font-medium">{visitor.location}</p>
                                                <div className="flex items-center space-x-2">
                                                    <Badge variant="outline" className="text-xs">
                                                        {visitor.device}
                                                    </Badge>
                                                    <span className="text-xs text-muted-foreground flex items-center">
                                                        <Clock className="h-3 w-3 mr-1" />
                                                        {visitor.time}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>

                <TabsContent value="visitors" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Visitor Trends</CardTitle>
                            <CardDescription>Daily visitor patterns</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ChartContainer config={chartConfig}>
                                <ResponsiveContainer width="100%" height={400}>
                                    <LineChart data={mockAnalytics.monthlyViews}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="month" />
                                        <YAxis />
                                        <ChartTooltip content={<ChartTooltipContent />} />
                                        <Line
                                            type="monotone"
                                            dataKey="visitors"
                                            stroke="var(--color-visitors)"
                                            strokeWidth={2}
                                        />
                                    </LineChart>
                                </ResponsiveContainer>
                            </ChartContainer>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    )
}
