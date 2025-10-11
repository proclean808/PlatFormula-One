import { Router } from 'express'

const router = Router()

// Get all forum threads
router.get('/threads', (req, res) => {
  const { category } = req.query
  
  const threads = [
    {
      id: 1,
      title: 'Best practices for pitch deck design',
      author: 'Sarah Johnson',
      category: 'fundraising',
      replies: 15,
      views: 234,
      lastActivity: '2 hours ago',
    },
    {
      id: 2,
      title: 'How to validate product-market fit?',
      author: 'Mike Chen',
      category: 'product',
      replies: 8,
      views: 156,
      lastActivity: '4 hours ago',
    },
  ]

  const filtered = category
    ? threads.filter((t) => t.category === category)
    : threads

  res.json({ threads: filtered, total: filtered.length })
})

// Get single thread
router.get('/threads/:id', (req, res) => {
  const { id } = req.params
  res.json({
    id,
    title: 'Best practices for pitch deck design',
    author: 'Sarah Johnson',
    category: 'fundraising',
    content: 'Thread content here...',
    replies: [],
  })
})

// Create new thread
router.post('/threads', (req, res) => {
  const threadData = req.body
  res.status(201).json({
    message: 'Thread created successfully',
    id: Date.now(),
    data: threadData,
  })
})

// Add reply to thread
router.post('/threads/:id/replies', (req, res) => {
  const { id } = req.params
  const replyData = req.body
  res.status(201).json({
    message: 'Reply added successfully',
    threadId: id,
    data: replyData,
  })
})

export default router
