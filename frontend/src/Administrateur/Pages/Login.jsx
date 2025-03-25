import React from "react"
import { useState } from "react"
import axios from "axios"
import { Eye, EyeOff, LogIn } from "lucide-react"
import LoginImage  from "../../Image/Login2.png"


export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const response = await axios.get("http://127.0.0.1:8000/login", {
        params: { email, password },
      })

      if (response.data.message) {
        localStorage.setItem("user", JSON.stringify(response.data.user))
        localStorage.setItem("role", response.data.role)
        alert("Connexion réussie")

        // Redirection selon le rôle
        if (response.data.role === "administrateur") {
          window.location.href = "/HomePageAdmine"
        } else if (response.data.role === "chef de projet") {
          window.location.href = "/managerdashboard"
        }else if (response.data.role === "membre equipe") {
          window.location.href = "/memberdashboard"
        }
      } else {
        setError(response.data.error || "Identifiants incorrects")
      }
    } catch (error) {
      setError(error.response?.data?.error || "Une erreur est survenue. Vérifiez vos identifiants.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="h-screen w-screen overflow-hidden flex flex-col md:flex-row">
      {/* Left side with blue background and illustration */}
      <div className="bg-blue-500 md:w-1/2 relative overflow-hidden">
        <div className="absolute top-0 left-0 p-6">
          <h1 className="text-2xl font-bold text-white">PlanIt</h1>
        </div>

        <div className="absolute bottom-0 right-0 w-full h-full">
          <svg viewBox="0 0 500 500" preserveAspectRatio="none" className="absolute bottom-0 right-0 h-full w-full">
            <path d="M0,100 C150,200 350,0 500,100 L500,00 L0,0 Z" fill="white" opacity="0.1"></path>
            <path d="M0,100 C150,300 350,0 500,100 L500,00 L0,0 Z" fill="white" opacity="0.05"></path>
          </svg>
        </div>

        <div className="flex items-center justify-center h-full p-8">
          <div className="relative z-10 max-w-md">
            <div className="flex justify-center mb-8">
              <div className="relative w-full h-64">
                <img
                  src={LoginImage}
                  alt="People working together"
                  width={400}
                  height={300}
                  className="object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right side with login form */}
      <div className="bg-white md:w-1/2 flex items-center justify-center p-4 md:p-0">
        <div className="w-full max-w-md p-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-blue-600 mb-2">Welcome Back</h2>
          </div>

          {error && <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-6 text-center text-sm">{error}</div>}

          <div className="mb-6">
            <button className="w-full flex items-center justify-center gap-2 border border-gray-300 rounded-full py-2.5 px-4 text-gray-700 hover:bg-gray-50 transition-colors">
              <svg viewBox="0 0 24 24" width="20" height="20" xmlns="http://www.w3.org/2000/svg">
                <g transform="matrix(1, 0, 0, 1, 27.009001, -39.238998)">
                  <path
                    fill="#4285F4"
                    d="M -3.264 51.509 C -3.264 50.719 -3.334 49.969 -3.454 49.239 L -14.754 49.239 L -14.754 53.749 L -8.284 53.749 C -8.574 55.229 -9.424 56.479 -10.684 57.329 L -10.684 60.329 L -6.824 60.329 C -4.564 58.239 -3.264 55.159 -3.264 51.509 Z"
                  />
                  <path
                    fill="#34A853"
                    d="M -14.754 63.239 C -11.514 63.239 -8.804 62.159 -6.824 60.329 L -10.684 57.329 C -11.764 58.049 -13.134 58.489 -14.754 58.489 C -17.884 58.489 -20.534 56.379 -21.484 53.529 L -25.464 53.529 L -25.464 56.619 C -23.494 60.539 -19.444 63.239 -14.754 63.239 Z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M -21.484 53.529 C -21.734 52.809 -21.864 52.039 -21.864 51.239 C -21.864 50.439 -21.724 49.669 -21.484 48.949 L -21.484 45.859 L -25.464 45.859 C -26.284 47.479 -26.754 49.299 -26.754 51.239 C -26.754 53.179 -26.284 54.999 -25.464 56.619 L -21.484 53.529 Z"
                  />
                  <path
                    fill="#EA4335"
                    d="M -14.754 43.989 C -12.984 43.989 -11.404 44.599 -10.154 45.789 L -6.734 42.369 C -8.804 40.429 -11.514 39.239 -14.754 39.239 C -19.444 39.239 -23.494 41.939 -25.464 45.859 L -21.484 48.949 C -20.534 46.099 -17.884 43.989 -14.754 43.989 Z"
                  />
                </g>
              </svg>
              <span>Log in with Google</span>
            </button>
          </div>

          <div className="flex items-center gap-2 mb-6">
            <div className="flex-1 h-px bg-gray-200"></div>
            <span className="text-sm text-gray-400">OR LOG IN WITH EMAIL</span>
            <div className="flex-1 h-px bg-gray-200"></div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-gray-100 text-gray-800 px-4 py-3 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Email"
              />
            </div>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full bg-gray-100 text-gray-800 px-4 py-3 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-4 w-4 text-blue-500 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-600">
                  Keep me logged in
                </label>
              </div>
              <div className="text-sm">
                <a href="#" className="text-blue-600 hover:underline">
                  Forgot Password
                </a>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center items-center py-3 px-4 rounded-full text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
            >
              {loading ? (
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              ) : (
                <LogIn className="mr-2 h-4 w-4" />
              )}
              {loading ? "Logging in..." : "Log in"}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-sm text-gray-600">
              Need Help?{" "}
              <a href="#" className="text-blue-600 hover:underline">
                Contact Support
              </a>
            </p>
            <p className="text-sm text-gray-600 mt-1">
              You are not a member?{" "}
              <a href="#" className="text-blue-600 hover:underline">
                Register
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

