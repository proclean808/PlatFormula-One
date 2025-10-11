import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Button } from '@/components/ui/button.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Textarea } from '@/components/ui/textarea.jsx'
import { Progress } from '@/components/ui/progress.jsx'
import { 
  User, 
  MapPin, 
  Building2, 
  Star, 
  MessageCircle, 
  Heart,
  Brain,
  Zap,
  CheckCircle,
  AlertCircle,
  Loader2,
  ExternalLink,
  Users,
  Target,
  TrendingUp
} from 'lucide-react'
import ApiService from '../services/api.js'

export function CoFounderMatching() {
  const [matches, setMatches] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [selectedMatch, setSelectedMatch] = useState(null)
  const [connectionMessage, setConnectionMessage] = useState('')
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [showLogin, setShowLogin] = useState(false)
  const [loginData, setLoginData] = useState({ email: '', password: '' })
  const [registerData, setRegisterData] = useState({ 
    email: '', 
    password: '', 
    first_name: '', 
    last_name: '' 
  })

  useEffect(() => {
    checkAuthStatus()
  }, [])

  const checkAuthStatus = () => {
    const token = localStorage.getItem('access_token')
    setIsAuthenticated(!!token)
    if (token) {
      loadMatches()
    }
  }

  const loadMatches = async () => {
    setLoading(true)
    setError(null)
    
    try {
      const response = await ApiService.getMatches()
      setMatches(response.matches || [])
    } catch (err) {
      setError(err.message)
      console.error('Failed to load matches:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    
    try {
      await ApiService.login(loginData)
      setIsAuthenticated(true)
      setShowLogin(false)
      loadMatches()
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleRegister = async (e) => {
    e.preventDefault()
    setLoading(true)
    
    try {
      await ApiService.register(registerData)
      setIsAuthenticated(true)
      setShowLogin(false)
      loadMatches()
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const sendConnectionRequest = async (matchUserId) => {
    setLoading(true)
    
    try {
      await ApiService.sendConnectionRequest(matchUserId, connectionMessage)
      setSelectedMatch(null)
      setConnectionMessage('')
      // Update match status locally
      setMatches(matches.map(match => 
        match.user_id === matchUserId 
          ? { ...match, connection_sent: true }
          : match
      ))
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const getCompatibilityColor = (score) => {
    if (score >= 80) return 'text-green-600 bg-green-100'
    if (score >= 60) return 'text-blue-600 bg-blue-100'
    if (score >= 40) return 'text-yellow-600 bg-yellow-100'
    return 'text-red-600 bg-red-100'
  }

  const getCompatibilityLabel = (score) => {
    if (score >= 80) return 'Excellent Match'
    if (score >= 60) return 'Good Match'
    if (score >= 40) return 'Potential Match'
    return 'Low Compatibility'
  }

  if (!isAuthenticated) {
    return (
      <div className="max-w-md mx-auto mt-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Brain className="w-6 h-6 text-blue-600 mr-2" />
              NexusYC Co-Founder Matching
            </CardTitle>
            <CardDescription>
              Sign in to access AI-powered co-founder matching
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {!showLogin ? (
              <div className="space-y-4">
                <Button 
                  onClick={() => setShowLogin(true)} 
                  className="w-full bg-blue-600 hover:bg-blue-700"
                >
                  Get Started
                </Button>
                <p className="text-sm text-gray-600 text-center">
                  Join the intelligent co-founder matching platform
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-2">
                  <Button 
                    variant="outline" 
                    onClick={() => setShowLogin('login')}
                    className={showLogin === 'login' ? 'bg-blue-50' : ''}
                  >
                    Login
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => setShowLogin('register')}
                    className={showLogin === 'register' ? 'bg-blue-50' : ''}
                  >
                    Register
                  </Button>
                </div>

                {showLogin === 'login' ? (
                  <form onSubmit={handleLogin} className="space-y-3">
                    <Input
                      type="email"
                      placeholder="Email"
                      value={loginData.email}
                      onChange={(e) => setLoginData({...loginData, email: e.target.value})}
                      required
                    />
                    <Input
                      type="password"
                      placeholder="Password"
                      value={loginData.password}
                      onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                      required
                    />
                    <Button type="submit" className="w-full" disabled={loading}>
                      {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                      Login
                    </Button>
                  </form>
                ) : (
                  <form onSubmit={handleRegister} className="space-y-3">
                    <div className="grid grid-cols-2 gap-2">
                      <Input
                        placeholder="First Name"
                        value={registerData.first_name}
                        onChange={(e) => setRegisterData({...registerData, first_name: e.target.value})}
                        required
                      />
                      <Input
                        placeholder="Last Name"
                        value={registerData.last_name}
                        onChange={(e) => setRegisterData({...registerData, last_name: e.target.value})}
                        required
                      />
                    </div>
                    <Input
                      type="email"
                      placeholder="Email"
                      value={registerData.email}
                      onChange={(e) => setRegisterData({...registerData, email: e.target.value})}
                      required
                    />
                    <Input
                      type="password"
                      placeholder="Password"
                      value={registerData.password}
                      onChange={(e) => setRegisterData({...registerData, password: e.target.value})}
                      required
                    />
                    <Button type="submit" className="w-full" disabled={loading}>
                      {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                      Create Account
                    </Button>
                  </form>
                )}
              </div>
            )}

            {error && (
              <div className="flex items-center space-x-2 text-red-600 bg-red-50 p-3 rounded-lg">
                <AlertCircle className="w-4 h-4" />
                <span className="text-sm">{error}</span>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-2 flex items-center justify-center">
          <Brain className="w-8 h-8 text-blue-600 mr-3" />
          AI-Powered Co-Founder Matching
        </h2>
        <p className="text-gray-600 mb-4">
          Find your perfect co-founder with JoyceGPT intelligence
        </p>
        <div className="flex items-center justify-center space-x-4">
          <Badge className="bg-green-100 text-green-800">
            <CheckCircle className="w-3 h-3 mr-1" />
            Privacy-First
          </Badge>
          <Badge className="bg-blue-100 text-blue-800">
            <Zap className="w-3 h-3 mr-1" />
            Real-Time AI
          </Badge>
          <Badge className="bg-purple-100 text-purple-800">
            <Target className="w-3 h-3 mr-1" />
            Smart Matching
          </Badge>
        </div>
      </div>

      {/* Loading State */}
      {loading && !matches.length && (
        <div className="text-center py-12">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-blue-600" />
          <p className="text-gray-600">Finding your perfect matches...</p>
        </div>
      )}

      {/* Error State */}
      {error && (
        <Card className="border-red-200 bg-red-50">
          <CardContent className="p-6">
            <div className="flex items-center space-x-2 text-red-600">
              <AlertCircle className="w-5 h-5" />
              <span className="font-medium">Error loading matches</span>
            </div>
            <p className="text-red-600 mt-2">{error}</p>
            <Button 
              onClick={loadMatches} 
              className="mt-4 bg-red-600 hover:bg-red-700"
            >
              Try Again
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Matches Grid */}
      {matches.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {matches.map((match, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow duration-200">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                      <User className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{match.name}</CardTitle>
                      <CardDescription className="flex items-center">
                        <Building2 className="w-3 h-3 mr-1" />
                        {match.company_name}
                      </CardDescription>
                    </div>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-xs font-medium ${getCompatibilityColor(match.compatibility_score)}`}>
                    {match.compatibility_score}%
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Compatibility</span>
                    <span className="font-medium">{getCompatibilityLabel(match.compatibility_score)}</span>
                  </div>
                  <Progress value={match.compatibility_score} className="h-2" />
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-500">Industry</span>
                    <p className="font-medium">{match.industry}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Stage</span>
                    <p className="font-medium">{match.company_stage}</p>
                  </div>
                </div>

                {match.location && (
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin className="w-3 h-3 mr-1" />
                    {match.location}
                  </div>
                )}

                {match.skills && match.skills.length > 0 && (
                  <div>
                    <span className="text-gray-500 text-sm">Skills</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {match.skills.slice(0, 3).map((skill, idx) => (
                        <Badge key={idx} variant="secondary" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                      {match.skills.length > 3 && (
                        <Badge variant="secondary" className="text-xs">
                          +{match.skills.length - 3} more
                        </Badge>
                      )}
                    </div>
                  </div>
                )}

                {match.reasoning && (
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <div className="flex items-center mb-2">
                      <Brain className="w-4 h-4 text-blue-600 mr-2" />
                      <span className="text-sm font-medium text-blue-800">AI Analysis</span>
                    </div>
                    <p className="text-sm text-blue-700">{match.reasoning}</p>
                  </div>
                )}

                {match.strengths && match.strengths.length > 0 && (
                  <div>
                    <span className="text-green-600 text-sm font-medium">Strengths</span>
                    <ul className="mt-1 space-y-1">
                      {match.strengths.slice(0, 2).map((strength, idx) => (
                        <li key={idx} className="text-sm text-green-700 flex items-center">
                          <CheckCircle className="w-3 h-3 mr-2 text-green-500" />
                          {strength}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="pt-2 space-y-2">
                  {match.connection_sent ? (
                    <Button disabled className="w-full">
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Connection Sent
                    </Button>
                  ) : (
                    <Button 
                      onClick={() => setSelectedMatch(match)}
                      className="w-full bg-blue-600 hover:bg-blue-700"
                    >
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Connect
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Empty State */}
      {!loading && matches.length === 0 && !error && (
        <div className="text-center py-12">
          <Users className="w-16 h-16 mx-auto text-gray-400 mb-4" />
          <h3 className="text-xl font-semibold mb-2">No matches found</h3>
          <p className="text-gray-600 mb-6">
            Complete your profile to get AI-powered co-founder recommendations
          </p>
          <Button className="bg-blue-600 hover:bg-blue-700">
            Complete Profile
          </Button>
        </div>
      )}

      {/* Connection Modal */}
      {selectedMatch && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>Connect with {selectedMatch.name}</CardTitle>
              <CardDescription>
                Send a personalized message to start the conversation
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                placeholder="Hi! I'd love to discuss potential collaboration opportunities..."
                value={connectionMessage}
                onChange={(e) => setConnectionMessage(e.target.value)}
                rows={4}
              />
              
              {selectedMatch.next_steps && selectedMatch.next_steps.length > 0 && (
                <div className="bg-green-50 p-3 rounded-lg">
                  <div className="flex items-center mb-2">
                    <TrendingUp className="w-4 h-4 text-green-600 mr-2" />
                    <span className="text-sm font-medium text-green-800">Suggested Next Steps</span>
                  </div>
                  <ul className="space-y-1">
                    {selectedMatch.next_steps.slice(0, 3).map((step, idx) => (
                      <li key={idx} className="text-sm text-green-700 flex items-center">
                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2"></div>
                        {step}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="flex space-x-3">
                <Button 
                  variant="outline" 
                  onClick={() => setSelectedMatch(null)}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button 
                  onClick={() => sendConnectionRequest(selectedMatch.user_id)}
                  disabled={loading}
                  className="flex-1 bg-blue-600 hover:bg-blue-700"
                >
                  {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                  Send Request
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
