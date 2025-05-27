"use client"

import type React from "react"

import { useState } from "react"
import { Eye, EyeOff, Mail, Lock, User, Stethoscope, Phone, MapPin, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

interface SignupPageProps {
  onSignup?: () => void
  onSwitchToLogin?: () => void
}

export default function SignupPage({ onSignup, onSwitchToLogin }: SignupPageProps) {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    // Personal Information
    firstName: "",
    lastName: "",
    email: "",
    phone: "",

    // Professional Information
    licenseNumber: "",
    specialization: "",
    experience: "",
    clinicName: "",
    clinicAddress: "",

    // Account Security
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
    agreeToPrivacy: false,
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const specializations = [
    "General Psychiatry",
    "Child and Adolescent Psychiatry",
    "Geriatric Psychiatry",
    "Addiction Psychiatry",
    "Forensic Psychiatry",
    "Consultation-Liaison Psychiatry",
    "Neuropsychiatry",
    "Psychosomatic Medicine",
  ]

  const experienceLevels = ["0-2 years", "3-5 years", "6-10 years", "11-15 years", "16-20 years", "20+ years"]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      // Validate current step
      if (currentStep === 1) {
        if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone) {
          throw new Error("Please fill in all personal information fields")
        }
        if (!formData.email.includes("@")) {
          throw new Error("Please enter a valid email address")
        }
        setCurrentStep(2)
        setIsLoading(false)
        return
      }

      if (currentStep === 2) {
        if (!formData.licenseNumber || !formData.specialization || !formData.experience) {
          throw new Error("Please fill in all professional information fields")
        }
        setCurrentStep(3)
        setIsLoading(false)
        return
      }

      if (currentStep === 3) {
        if (!formData.password || !formData.confirmPassword) {
          throw new Error("Please fill in all password fields")
        }
        if (formData.password !== formData.confirmPassword) {
          throw new Error("Passwords do not match")
        }
        if (formData.password.length < 8) {
          throw new Error("Password must be at least 8 characters long")
        }
        if (!formData.agreeToTerms || !formData.agreeToPrivacy) {
          throw new Error("Please agree to the terms and privacy policy")
        }

        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 2000))
        onSignup?.()
      }
    } catch (err: any) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (error) setError("")
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center">
              <Stethoscope className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-gray-900">MindCare Pro</span>
          </div>
          <h1 className="text-2xl font-semibold text-gray-900 mb-2">Create Your Account</h1>
          <p className="text-gray-600">Join our platform for mental health professionals</p>
        </div>

        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-center space-x-4">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    step <= currentStep ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-600"
                  }`}
                >
                  {step}
                </div>
                {step < 3 && <div className={`w-16 h-1 mx-2 ${step < currentStep ? "bg-blue-600" : "bg-gray-200"}`} />}
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-2 space-x-8">
            <span className={`text-xs ${currentStep >= 1 ? "text-blue-600" : "text-gray-500"}`}>Personal Info</span>
            <span className={`text-xs ${currentStep >= 2 ? "text-blue-600" : "text-gray-500"}`}>Professional</span>
            <span className={`text-xs ${currentStep >= 3 ? "text-blue-600" : "text-gray-500"}`}>Security</span>
          </div>
        </div>

        {/* Signup Form */}
        <Card className="shadow-lg border-0">
          <CardHeader className="space-y-1 pb-4">
            <CardTitle className="text-xl text-center">
              {currentStep === 1 && "Personal Information"}
              {currentStep === 2 && "Professional Details"}
              {currentStep === 3 && "Account Security"}
            </CardTitle>
            <CardDescription className="text-center">
              {currentStep === 1 && "Tell us about yourself"}
              {currentStep === 2 && "Your professional credentials"}
              {currentStep === 3 && "Secure your account"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {/* Step 1: Personal Information */}
              {currentStep === 1 && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <Input
                          id="firstName"
                          placeholder="John"
                          className="pl-10"
                          value={formData.firstName}
                          onChange={(e) => handleInputChange("firstName", e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        placeholder="Doe"
                        value={formData.lastName}
                        onChange={(e) => handleInputChange("lastName", e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="doctor@example.com"
                        className="pl-10"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="+1 (555) 123-4567"
                        className="pl-10"
                        value={formData.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                        required
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Professional Information */}
              {currentStep === 2 && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="licenseNumber">Medical License Number</Label>
                    <div className="relative">
                      <FileText className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        id="licenseNumber"
                        placeholder="PSY-12345-CA"
                        className="pl-10"
                        value={formData.licenseNumber}
                        onChange={(e) => handleInputChange("licenseNumber", e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="specialization">Specialization</Label>
                      <Select
                        value={formData.specialization}
                        onValueChange={(value) => handleInputChange("specialization", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select specialization" />
                        </SelectTrigger>
                        <SelectContent>
                          {specializations.map((spec) => (
                            <SelectItem key={spec} value={spec}>
                              {spec}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="experience">Years of Experience</Label>
                      <Select
                        value={formData.experience}
                        onValueChange={(value) => handleInputChange("experience", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select experience" />
                        </SelectTrigger>
                        <SelectContent>
                          {experienceLevels.map((level) => (
                            <SelectItem key={level} value={level}>
                              {level}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="clinicName">Clinic/Hospital Name (Optional)</Label>
                    <Input
                      id="clinicName"
                      placeholder="MindCare Medical Center"
                      value={formData.clinicName}
                      onChange={(e) => handleInputChange("clinicName", e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="clinicAddress">Practice Address</Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 text-gray-400 w-4 h-4" />
                      <Textarea
                        id="clinicAddress"
                        placeholder="123 Medical Center Dr, San Francisco, CA 94102"
                        className="pl-10 min-h-[80px]"
                        value={formData.clinicAddress}
                        onChange={(e) => handleInputChange("clinicAddress", e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Account Security */}
              {currentStep === 3 && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Create a strong password"
                        className="pl-10 pr-10"
                        value={formData.password}
                        onChange={(e) => handleInputChange("password", e.target.value)}
                        required
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="w-4 h-4 text-gray-400" />
                        ) : (
                          <Eye className="w-4 h-4 text-gray-400" />
                        )}
                      </Button>
                    </div>
                    <p className="text-xs text-gray-500">Password must be at least 8 characters long</p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        id="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Confirm your password"
                        className="pl-10 pr-10"
                        value={formData.confirmPassword}
                        onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                        required
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="w-4 h-4 text-gray-400" />
                        ) : (
                          <Eye className="w-4 h-4 text-gray-400" />
                        )}
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-start space-x-2">
                      <Checkbox
                        id="terms"
                        checked={formData.agreeToTerms}
                        onCheckedChange={(checked) => handleInputChange("agreeToTerms", checked as boolean)}
                      />
                      <Label htmlFor="terms" className="text-sm text-gray-600 leading-relaxed">
                        I agree to the{" "}
                        <Button variant="link" className="px-0 h-auto text-blue-600 hover:text-blue-800">
                          Terms of Service
                        </Button>
                      </Label>
                    </div>

                    <div className="flex items-start space-x-2">
                      <Checkbox
                        id="privacy"
                        checked={formData.agreeToPrivacy}
                        onCheckedChange={(checked) => handleInputChange("agreeToPrivacy", checked as boolean)}
                      />
                      <Label htmlFor="privacy" className="text-sm text-gray-600 leading-relaxed">
                        I agree to the{" "}
                        <Button variant="link" className="px-0 h-auto text-blue-600 hover:text-blue-800">
                          Privacy Policy
                        </Button>
                      </Label>
                    </div>
                  </div>
                </div>
              )}

              {/* Form Actions */}
              <div className="flex gap-2 pt-4">
                {currentStep > 1 && (
                  <Button type="button" variant="outline" onClick={handleBack} className="flex-1">
                    Back
                  </Button>
                )}
                <Button type="submit" className="flex-1" disabled={isLoading}>
                  {isLoading
                    ? currentStep === 3
                      ? "Creating Account..."
                      : "Processing..."
                    : currentStep === 3
                      ? "Create Account"
                      : "Continue"}
                </Button>
              </div>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Already have an account?{" "}
                <Button variant="link" className="px-0 text-blue-600 hover:text-blue-800" onClick={onSwitchToLogin}>
                  Sign in here
                </Button>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>© 2024 MindCare Pro. All rights reserved.</p>
        </div>
      </div>
    </div>
  )
}
