"use client"

import { useState, useEffect, useCallback } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import { Save, Send, CheckCircle2, Loader2 } from "lucide-react"
import type { Application, Program } from "@/lib/types/database"
import { useToast } from "@/hooks/use-toast"

interface ApplicationBuilderProps {
  userId: string
  programs: Program[]
  existingApplication: Application | null
}

interface FormData {
  program_id: string
  company_name: string
  company_description: string
  problem_statement: string
  solution_description: string
  target_market: string
  business_model: string
  team_size: string
  funding_stage: string
  monthly_revenue: string
  website_url: string
  pitch_deck_url: string
  why_join: string
}

const STEPS = [
  { id: 1, name: "Program Selection", fields: ["program_id"] },
  { id: 2, name: "Company Info", fields: ["company_name", "company_description", "website_url"] },
  { id: 3, name: "Product", fields: ["problem_statement", "solution_description", "target_market"] },
  { id: 4, name: "Business", fields: ["business_model", "funding_stage", "monthly_revenue"] },
  { id: 5, name: "Team & Motivation", fields: ["team_size", "pitch_deck_url", "why_join"] },
]

export function ApplicationBuilder({ userId, programs, existingApplication }: ApplicationBuilderProps) {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<FormData>({
    program_id: "",
    company_name: "",
    company_description: "",
    problem_statement: "",
    solution_description: "",
    target_market: "",
    business_model: "",
    team_size: "",
    funding_stage: "",
    monthly_revenue: "",
    website_url: "",
    pitch_deck_url: "",
    why_join: "",
  })
  const [applicationId, setApplicationId] = useState<string | null>(existingApplication?.id || null)
  const [isSaving, setIsSaving] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [lastSaved, setLastSaved] = useState<Date | null>(null)
  const router = useRouter()
  const { toast } = useToast()

  // Load existing application data
  useEffect(() => {
    if (existingApplication?.data) {
      setFormData(existingApplication.data as FormData)
      setApplicationId(existingApplication.id)
    }
  }, [existingApplication])

  // Auto-save functionality
  const saveApplication = useCallback(
    async (data: FormData, showToast = false) => {
      setIsSaving(true)
      const supabase = createClient()

      try {
        if (applicationId) {
          // Update existing application
          const { error } = await supabase
            .from("applications")
            .update({
              data: data,
              updated_at: new Date().toISOString(),
            })
            .eq("id", applicationId)

          if (error) throw error
        } else {
          // Create new application
          const { data: newApp, error } = await supabase
            .from("applications")
            .insert({
              user_id: userId,
              program_id: data.program_id || programs[0]?.id,
              status: "draft",
              data: data,
            })
            .select()
            .single()

          if (error) throw error
          if (newApp) setApplicationId(newApp.id)
        }

        setLastSaved(new Date())
        if (showToast) {
          toast({
            title: "Saved",
            description: "Your application has been saved.",
          })
        }
      } catch (error) {
        console.error("Error saving application:", error)
        if (showToast) {
          toast({
            title: "Error",
            description: "Failed to save application. Please try again.",
            variant: "destructive",
          })
        }
      } finally {
        setIsSaving(false)
      }
    },
    [applicationId, userId, programs, toast],
  )

  // Auto-save on form data change (debounced)
  useEffect(() => {
    const timer = setTimeout(() => {
      if (formData.program_id || formData.company_name) {
        saveApplication(formData)
      }
    }, 2000)

    return () => clearTimeout(timer)
  }, [formData, saveApplication])

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleNext = () => {
    if (currentStep < STEPS.length) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    const supabase = createClient()

    try {
      await saveApplication(formData)

      const { error } = await supabase
        .from("applications")
        .update({
          status: "submitted",
          submitted_at: new Date().toISOString(),
        })
        .eq("id", applicationId)

      if (error) throw error

      toast({
        title: "Application Submitted!",
        description: "Your application has been successfully submitted for review.",
      })

      router.push("/dashboard")
    } catch (error) {
      console.error("Error submitting application:", error)
      toast({
        title: "Error",
        description: "Failed to submit application. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const progress = (currentStep / STEPS.length) * 100
  const isLastStep = currentStep === STEPS.length

  return (
    <div className="space-y-6">
      {/* Progress Bar */}
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium">
                Step {currentStep} of {STEPS.length}: {STEPS[currentStep - 1].name}
              </span>
              <span className="text-muted-foreground">{Math.round(progress)}% Complete</span>
            </div>
            <Progress value={progress} />
          </div>
        </CardContent>
      </Card>

      {/* Form Content */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>{STEPS[currentStep - 1].name}</CardTitle>
              <CardDescription>Fill in the details below</CardDescription>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              {isSaving && (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Saving...</span>
                </>
              )}
              {!isSaving && lastSaved && (
                <>
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                  <span>Saved {lastSaved.toLocaleTimeString()}</span>
                </>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Step 1: Program Selection */}
          {currentStep === 1 && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="program_id">Select Program</Label>
                <Select value={formData.program_id} onValueChange={(value) => handleInputChange("program_id", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose a program" />
                  </SelectTrigger>
                  <SelectContent>
                    {programs.map((program) => (
                      <SelectItem key={program.id} value={program.id}>
                        {program.name} ({program.duration_weeks} weeks)
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              {formData.program_id && (
                <Card className="bg-muted">
                  <CardContent className="pt-6">
                    <h4 className="font-semibold mb-2">{programs.find((p) => p.id === formData.program_id)?.name}</h4>
                    <p className="text-sm text-muted-foreground">
                      {programs.find((p) => p.id === formData.program_id)?.description}
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          )}

          {/* Step 2: Company Info */}
          {currentStep === 2 && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="company_name">Company Name</Label>
                <Input
                  id="company_name"
                  value={formData.company_name}
                  onChange={(e) => handleInputChange("company_name", e.target.value)}
                  placeholder="Your Startup Inc."
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="company_description">Company Description</Label>
                <Textarea
                  id="company_description"
                  value={formData.company_description}
                  onChange={(e) => handleInputChange("company_description", e.target.value)}
                  placeholder="Describe your company in a few sentences..."
                  rows={4}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="website_url">Website URL (Optional)</Label>
                <Input
                  id="website_url"
                  type="url"
                  value={formData.website_url}
                  onChange={(e) => handleInputChange("website_url", e.target.value)}
                  placeholder="https://yourstartup.com"
                />
              </div>
            </div>
          )}

          {/* Step 3: Product */}
          {currentStep === 3 && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="problem_statement">Problem Statement</Label>
                <Textarea
                  id="problem_statement"
                  value={formData.problem_statement}
                  onChange={(e) => handleInputChange("problem_statement", e.target.value)}
                  placeholder="What problem are you solving?"
                  rows={4}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="solution_description">Solution Description</Label>
                <Textarea
                  id="solution_description"
                  value={formData.solution_description}
                  onChange={(e) => handleInputChange("solution_description", e.target.value)}
                  placeholder="How does your product solve this problem?"
                  rows={4}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="target_market">Target Market</Label>
                <Textarea
                  id="target_market"
                  value={formData.target_market}
                  onChange={(e) => handleInputChange("target_market", e.target.value)}
                  placeholder="Who are your target customers?"
                  rows={3}
                />
              </div>
            </div>
          )}

          {/* Step 4: Business */}
          {currentStep === 4 && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="business_model">Business Model</Label>
                <Textarea
                  id="business_model"
                  value={formData.business_model}
                  onChange={(e) => handleInputChange("business_model", e.target.value)}
                  placeholder="How do you make money?"
                  rows={4}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="funding_stage">Funding Stage</Label>
                <Select
                  value={formData.funding_stage}
                  onValueChange={(value) => handleInputChange("funding_stage", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select funding stage" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pre-seed">Pre-seed</SelectItem>
                    <SelectItem value="seed">Seed</SelectItem>
                    <SelectItem value="series-a">Series A</SelectItem>
                    <SelectItem value="series-b">Series B+</SelectItem>
                    <SelectItem value="bootstrapped">Bootstrapped</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="monthly_revenue">Monthly Revenue (USD)</Label>
                <Input
                  id="monthly_revenue"
                  value={formData.monthly_revenue}
                  onChange={(e) => handleInputChange("monthly_revenue", e.target.value)}
                  placeholder="e.g., 10000 or 0 if pre-revenue"
                />
              </div>
            </div>
          )}

          {/* Step 5: Team & Motivation */}
          {currentStep === 5 && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="team_size">Team Size</Label>
                <Input
                  id="team_size"
                  value={formData.team_size}
                  onChange={(e) => handleInputChange("team_size", e.target.value)}
                  placeholder="e.g., 3 co-founders"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="pitch_deck_url">Pitch Deck URL (Optional)</Label>
                <Input
                  id="pitch_deck_url"
                  type="url"
                  value={formData.pitch_deck_url}
                  onChange={(e) => handleInputChange("pitch_deck_url", e.target.value)}
                  placeholder="https://drive.google.com/..."
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="why_join">Why do you want to join this program?</Label>
                <Textarea
                  id="why_join"
                  value={formData.why_join}
                  onChange={(e) => handleInputChange("why_join", e.target.value)}
                  placeholder="Tell us what you hope to achieve..."
                  rows={5}
                />
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between pt-6 border-t">
            <Button variant="outline" onClick={handlePrevious} disabled={currentStep === 1}>
              Previous
            </Button>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => saveApplication(formData, true)} disabled={isSaving}>
                <Save className="h-4 w-4 mr-2" />
                Save Draft
              </Button>
              {!isLastStep ? (
                <Button onClick={handleNext}>Next</Button>
              ) : (
                <Button onClick={handleSubmit} disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4 mr-2" />
                      Submit Application
                    </>
                  )}
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Application Status */}
      {existingApplication && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Application Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Badge variant={existingApplication.status === "submitted" ? "default" : "secondary"}>
                {existingApplication.status}
              </Badge>
              {existingApplication.submitted_at && (
                <span className="text-sm text-muted-foreground">
                  Submitted on {new Date(existingApplication.submitted_at).toLocaleDateString()}
                </span>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
