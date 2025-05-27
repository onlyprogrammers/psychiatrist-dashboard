"use client"

import { useState } from "react"
import {
  Calendar,
  Users,
  DollarSign,
  Clock,
  Video,
  FileText,
  Settings,
  Bell,
  Search,
  Filter,
  MoreHorizontal,
  AlertCircle,
  TrendingUp,
  User,
  Phone,
  Mail,
  MapPin,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Progress } from "@/components/ui/progress"

export default function PsychiatristDashboard() {
  const [activeTab, setActiveTab] = useState("overview")

  // Mock data
  const stats = {
    totalPatients: 156,
    todayAppointments: 8,
    pendingRequests: 12,
    monthlyRevenue: 15420,
    liveConsultations: 2,
  }

  const appointments = [
    {
      id: 1,
      patient: "Sarah Johnson",
      time: "09:00 AM",
      type: "Initial Consultation",
      status: "confirmed",
      duration: "60 min",
    },
    {
      id: 2,
      patient: "Michael Chen",
      time: "10:30 AM",
      type: "Follow-up",
      status: "pending",
      duration: "45 min",
    },
    {
      id: 3,
      patient: "Emma Wilson",
      time: "02:00 PM",
      type: "Therapy Session",
      status: "live",
      duration: "50 min",
    },
    {
      id: 4,
      patient: "David Brown",
      time: "03:30 PM",
      type: "Medication Review",
      status: "confirmed",
      duration: "30 min",
    },
  ]

  const recentRequests = [
    {
      id: 1,
      patient: "Alice Cooper",
      requestType: "New Patient Consultation",
      urgency: "high",
      date: "2024-01-15",
      status: "pending",
    },
    {
      id: 2,
      patient: "John Smith",
      requestType: "Prescription Refill",
      urgency: "medium",
      date: "2024-01-14",
      status: "completed",
    },
    {
      id: 3,
      patient: "Lisa Garcia",
      requestType: "Emergency Consultation",
      urgency: "high",
      date: "2024-01-14",
      status: "pending",
    },
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "confirmed":
        return (
          <Badge variant="default" className="bg-green-100 text-green-800">
            Confirmed
          </Badge>
        )
      case "pending":
        return (
          <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
            Pending
          </Badge>
        )
      case "live":
        return (
          <Badge variant="destructive" className="bg-red-100 text-red-800 animate-pulse">
            Live
          </Badge>
        )
      case "completed":
        return (
          <Badge variant="outline" className="bg-blue-100 text-blue-800">
            Completed
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getUrgencyBadge = (urgency: string) => {
    switch (urgency) {
      case "high":
        return <Badge variant="destructive">High</Badge>
      case "medium":
        return <Badge variant="secondary">Medium</Badge>
      case "low":
        return <Badge variant="outline">Low</Badge>
      default:
        return <Badge variant="outline">{urgency}</Badge>
    }
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-sm border-r">
        <div className="p-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <User className="w-4 h-4 text-white" />
            </div>
            <span className="font-semibold text-lg">MindCare Pro</span>
          </div>
        </div>

        <nav className="px-4 space-y-2">
          <Button
            variant={activeTab === "overview" ? "secondary" : "ghost"}
            className="w-full justify-start"
            onClick={() => setActiveTab("overview")}
          >
            <Calendar className="w-4 h-4 mr-2" />
            Overview
          </Button>
          <Button
            variant={activeTab === "appointments" ? "secondary" : "ghost"}
            className="w-full justify-start"
            onClick={() => setActiveTab("appointments")}
          >
            <Clock className="w-4 h-4 mr-2" />
            Appointments
          </Button>
          <Button
            variant={activeTab === "patients" ? "secondary" : "ghost"}
            className="w-full justify-start"
            onClick={() => setActiveTab("patients")}
          >
            <Users className="w-4 h-4 mr-2" />
            Patients
          </Button>
          <Button
            variant={activeTab === "requests" ? "secondary" : "ghost"}
            className="w-full justify-start"
            onClick={() => setActiveTab("requests")}
          >
            <FileText className="w-4 h-4 mr-2" />
            Requests
          </Button>
          <Button
            variant={activeTab === "revenue" ? "secondary" : "ghost"}
            className="w-full justify-start"
            onClick={() => setActiveTab("revenue")}
          >
            <DollarSign className="w-4 h-4 mr-2" />
            Revenue
          </Button>
          <Button
            variant={activeTab === "live" ? "secondary" : "ghost"}
            className="w-full justify-start"
            onClick={() => setActiveTab("live")}
          >
            <Video className="w-4 h-4 mr-2" />
            Live Sessions
          </Button>
          <Button
            variant={activeTab === "profile" ? "secondary" : "ghost"}
            className="w-full justify-start"
            onClick={() => setActiveTab("profile")}
          >
            <Settings className="w-4 h-4 mr-2" />
            Profile
          </Button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Header */}
        <header className="bg-white border-b px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">
                {activeTab === "overview" && "Dashboard Overview"}
                {activeTab === "appointments" && "Appointments"}
                {activeTab === "patients" && "Patient Management"}
                {activeTab === "requests" && "Treatment Requests"}
                {activeTab === "revenue" && "Revenue & Billing"}
                {activeTab === "live" && "Live Consultations"}
                {activeTab === "profile" && "Profile Settings"}
              </h1>
              <p className="text-gray-600">Welcome back, Dr. Smith</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input placeholder="Search..." className="pl-10 w-64" />
              </div>
              <Button variant="outline" size="icon">
                <Bell className="w-4 h-4" />
              </Button>
              <Avatar>
                <AvatarImage src="/placeholder.svg?height=32&width=32" />
                <AvatarFallback>DS</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="p-6">
          {activeTab === "overview" && (
            <div className="space-y-6">
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Patients</CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stats.totalPatients}</div>
                    <p className="text-xs text-muted-foreground">+12% from last month</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Today's Appointments</CardTitle>
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stats.todayAppointments}</div>
                    <p className="text-xs text-muted-foreground">3 completed, 5 upcoming</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Pending Requests</CardTitle>
                    <AlertCircle className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stats.pendingRequests}</div>
                    <p className="text-xs text-muted-foreground">4 urgent, 8 routine</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">${stats.monthlyRevenue.toLocaleString()}</div>
                    <p className="text-xs text-muted-foreground">+8% from last month</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Live Sessions</CardTitle>
                    <Video className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stats.liveConsultations}</div>
                    <p className="text-xs text-muted-foreground">Active consultations</p>
                  </CardContent>
                </Card>
              </div>

              {/* Today's Schedule */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Today's Schedule</CardTitle>
                    <CardDescription>Your appointments for today</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {appointments.slice(0, 4).map((appointment) => (
                        <div key={appointment.id} className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex items-center gap-3">
                            <Avatar className="h-8 w-8">
                              <AvatarFallback>
                                {appointment.patient
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">{appointment.patient}</p>
                              <p className="text-sm text-gray-600">{appointment.type}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-medium">{appointment.time}</p>
                            {getStatusBadge(appointment.status)}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Recent Requests</CardTitle>
                    <CardDescription>Latest treatment requests</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentRequests.map((request) => (
                        <div key={request.id} className="flex items-center justify-between p-3 border rounded-lg">
                          <div>
                            <p className="font-medium">{request.patient}</p>
                            <p className="text-sm text-gray-600">{request.requestType}</p>
                          </div>
                          <div className="text-right space-y-1">
                            {getUrgencyBadge(request.urgency)}
                            {getStatusBadge(request.status)}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {activeTab === "appointments" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <div className="flex gap-2">
                  <Button>
                    <Calendar className="w-4 h-4 mr-2" />
                    Schedule New
                  </Button>
                  <Button variant="outline">
                    <Filter className="w-4 h-4 mr-2" />
                    Filter
                  </Button>
                </div>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Appointment Management</CardTitle>
                  <CardDescription>Manage your consultation schedule</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Patient</TableHead>
                        <TableHead>Time</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Duration</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {appointments.map((appointment) => (
                        <TableRow key={appointment.id}>
                          <TableCell className="flex items-center gap-2">
                            <Avatar className="h-8 w-8">
                              <AvatarFallback>
                                {appointment.patient
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            {appointment.patient}
                          </TableCell>
                          <TableCell>{appointment.time}</TableCell>
                          <TableCell>{appointment.type}</TableCell>
                          <TableCell>{appointment.duration}</TableCell>
                          <TableCell>{getStatusBadge(appointment.status)}</TableCell>
                          <TableCell>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <MoreHorizontal className="w-4 h-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent>
                                <DropdownMenuItem>View Details</DropdownMenuItem>
                                <DropdownMenuItem>Reschedule</DropdownMenuItem>
                                <DropdownMenuItem>Cancel</DropdownMenuItem>
                                {appointment.status === "confirmed" && (
                                  <DropdownMenuItem>Start Session</DropdownMenuItem>
                                )}
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === "revenue" && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>This Month</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">${stats.monthlyRevenue.toLocaleString()}</div>
                    <div className="flex items-center gap-1 text-sm text-green-600">
                      <TrendingUp className="w-4 h-4" />
                      +8% from last month
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Outstanding</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">$3,240</div>
                    <div className="text-sm text-gray-600">12 pending invoices</div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Collection Rate</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">94%</div>
                    <Progress value={94} className="mt-2" />
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {activeTab === "profile" && (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Profile Information</CardTitle>
                  <CardDescription>Manage your professional profile</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-20 w-20">
                      <AvatarImage src="/placeholder.svg?height=80&width=80" />
                      <AvatarFallback>DS</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="text-lg font-semibold">Dr. Sarah Smith</h3>
                      <p className="text-gray-600">Psychiatrist, MD</p>
                      <Button variant="outline" size="sm" className="mt-2">
                        Change Photo
                      </Button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium">Full Name</label>
                        <Input defaultValue="Dr. Sarah Smith" />
                      </div>
                      <div>
                        <label className="text-sm font-medium">Specialization</label>
                        <Input defaultValue="Adult Psychiatry, Anxiety Disorders" />
                      </div>
                      <div>
                        <label className="text-sm font-medium">License Number</label>
                        <Input defaultValue="PSY-12345-CA" />
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-gray-500" />
                        <Input defaultValue="dr.smith@mindcare.com" />
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-gray-500" />
                        <Input defaultValue="+1 (555) 123-4567" />
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-gray-500" />
                        <Input defaultValue="123 Medical Center Dr, San Francisco, CA" />
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button>Save Changes</Button>
                    <Button variant="outline">Cancel</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
