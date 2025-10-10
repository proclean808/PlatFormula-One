import express, { Express, Request, Response } from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import applicationRoutes from './routes/application.routes'
import resourceRoutes from './routes/resource.routes'
import forumRoutes from './routes/forum.routes'
import analyticsRoutes from './routes/analytics.routes'

dotenv.config()

const app: Express = express()
const PORT = process.env.PORT || 3001

// Middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Health check
app.get('/health', (req: Request, res: Response) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

// API Routes
app.use('/api/applications', applicationRoutes)
app.use('/api/resources', resourceRoutes)
app.use('/api/forums', forumRoutes)
app.use('/api/analytics', analyticsRoutes)

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: any) => {
  console.error(err.stack)
  res.status(500).json({ error: 'Something went wrong!' })
})

app.listen(PORT, () => {
  console.log(`🚀 Backend server running on http://localhost:${PORT}`)
})

export default app
