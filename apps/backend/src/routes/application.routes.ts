import { Router } from 'express'

const router = Router()

// Get all applications
router.get('/', (req, res) => {
  res.json({
    applications: [
      { id: 1, companyName: 'TechStart Inc', status: 'pending', score: 78 },
      { id: 2, companyName: 'HealthAI Labs', status: 'approved', score: 92 },
    ],
  })
})

// Get single application
router.get('/:id', (req, res) => {
  const { id } = req.params
  res.json({
    id,
    companyName: 'TechStart Inc',
    status: 'pending',
    score: 78,
    data: {},
  })
})

// Create application
router.post('/', (req, res) => {
  const applicationData = req.body
  res.status(201).json({
    message: 'Application created successfully',
    id: Date.now(),
    data: applicationData,
  })
})

// Update application (autosave)
router.put('/:id', (req, res) => {
  const { id } = req.params
  const applicationData = req.body
  res.json({
    message: 'Application updated successfully',
    id,
    data: applicationData,
  })
})

// Calculate readiness score
router.post('/:id/score', (req, res) => {
  const { id } = req.params
  // AI-powered scoring logic would go here
  const score = {
    overall: 78,
    categories: [
      { name: 'Business Model', score: 85, weight: 20 },
      { name: 'Market Validation', score: 72, weight: 20 },
      { name: 'Team Strength', score: 80, weight: 15 },
    ],
  }
  res.json(score)
})

export default router
