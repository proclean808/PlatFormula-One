import { Router } from 'express'

const router = Router()

// Get dashboard analytics
router.get('/dashboard', (req, res) => {
  res.json({
    totalUsers: 1247,
    activeApplications: 156,
    completedPrograms: 89,
    revenueThisMonth: 45680,
    userGrowth: [45, 67, 89, 78, 95, 120, 134],
    conversionRate: 23.5,
    avgCompletionTime: 4.2,
    userSatisfaction: 4.7,
  })
})

// Get user analytics
router.get('/users', (req, res) => {
  res.json({
    totalUsers: 1247,
    activeUsers: 856,
    newUsersThisMonth: 134,
    usersByRole: {
      founders: 1100,
      mentors: 89,
      reviewers: 34,
      admins: 24,
    },
  })
})

// Get application analytics
router.get('/applications', (req, res) => {
  res.json({
    total: 1456,
    pending: 156,
    approved: 234,
    rejected: 89,
    inReview: 45,
    avgScore: 74.5,
    scoreDistribution: {
      '0-20': 23,
      '21-40': 67,
      '41-60': 234,
      '61-80': 456,
      '81-100': 676,
    },
  })
})

export default router
