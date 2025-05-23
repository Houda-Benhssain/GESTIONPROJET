import React from "react"
import { Heart } from "lucide-react"
import { Link } from "react-router-dom"

const FooterClient = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-white border-t border-gray-200 py-4 mt-auto">
      <div className="max-w-screen-2xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-sm text-gray-500">&copy; {currentYear} PlanIt. All rights reserved.</p>
          </div>

          <div className="flex items-center space-x-6">
          </div>

          <div className="mt-4 md:mt-0 flex items-center">
            <span className="text-sm text-gray-500 flex items-center">
              Made with <Heart className="h-3 w-3 text-red-500 mx-1" /> by PlanIt Team
            </span>
          </div>
        </div>

     
      </div>
    </footer>
  )
}

export default FooterClient

