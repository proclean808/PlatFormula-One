import { Router } from 'express'

const router = Router()

// Get all resources
router.get('/', (req, res) => {
  const { category, search } = req.query
  
  const resources = [
    {
      id: 1,
      title: 'Business Model Canvas Template',
      category: 'business',
      type: 'Template',
      description: 'A comprehensive template to map out your business model',
      url: '#',
    },
    {
      id: 2,
      title: 'Startup Legal Checklist',
      category: 'legal',
      type: 'Guide',
      description: 'Essential legal steps for early-stage startups',
      url: '#',
    },
  ]

  // Filter by category and search if provided
  let filtered = resources
  if (category) {
    filtered = filtered.filter((r) => r.category === category)
  }
  if (search) {
    filtered = filtered.filter(
      (r) =>
        r.title.toLowerCase().includes((search as string).toLowerCase()) ||
        r.description.toLowerCase().includes((search as string).toLowerCase())
    )
  }

  res.json({ resources: filtered, total: filtered.length })
})

// Get single resource
router.get('/:id', (req, res) => {
  const { id } = req.params
  res.json({
    id,
    title: 'Business Model Canvas Template',
    category: 'business',
    type: 'Template',
    description: 'A comprehensive template to map out your business model',
    url: '#',
  })
})

export default router
