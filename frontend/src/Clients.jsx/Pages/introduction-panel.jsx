import React from "react"
import { RefreshCw, Maximize2, RotateCcw, Link } from "lucide-react"

export default function IntroductionPanel() {
  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow">
      <div className="border-b border-gray-100 p-4 flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-800">Introduction</h2>
        <div className="flex space-x-2">
          <button className="text-gray-500 hover:text-gray-700 p-1 rounded hover:bg-gray-50">
            <Maximize2 className="h-4 w-4" />
          </button>
          <button className="text-gray-500 hover:text-gray-700 p-1 rounded hover:bg-gray-50">
            <RefreshCw className="h-4 w-4" />
          </button>
          <button className="text-gray-500 hover:text-gray-700 p-1 rounded hover:bg-gray-50">
            <RotateCcw className="h-4 w-4" />
          </button>
          <button className="text-gray-500 hover:text-gray-700 p-1 rounded hover:bg-gray-50">
            <Link className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="p-6 flex flex-col md:flex-row items-center gap-6">
        <div className="w-full md:w-1/3 flex justify-center">
          <div className="relative w-48 h-48">
            {/* Illustration with charts and people */}
            <div className="absolute top-0 left-0 w-32 h-24 bg-blue-100 rounded-lg transform -rotate-6"></div>
            <div className="absolute top-4 left-4 w-32 h-24 bg-blue-50 rounded-lg border border-blue-200"></div>
            {/* Chart line */}
            <svg
              className="absolute top-8 left-8 w-24 h-16"
              viewBox="0 0 100 60"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M0,50 Q25,10 50,30 T100,10" stroke="#3B82F6" strokeWidth="3" fill="none" />
              <circle cx="50" cy="30" r="4" fill="#3B82F6" />
              <circle cx="75" cy="20" r="4" fill="#3B82F6" />
              <circle cx="25" cy="40" r="4" fill="#3B82F6" />
            </svg>

            {/* Green checkmark */}
            <div className="absolute top-0 right-8 w-8 h-8 bg-green-400 rounded-full flex items-center justify-center">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 13L9 17L19 7" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>

            {/* People illustrations */}
            <div className="absolute bottom-4 left-12 w-8 h-16 bg-yellow-400 rounded-t-full"></div>
            <div className="absolute bottom-4 left-12 w-8 h-8 bg-yellow-300 rounded-full"></div>

            <div className="absolute bottom-4 right-12 w-8 h-16 bg-blue-600 rounded-t-full"></div>
            <div className="absolute bottom-4 right-12 w-8 h-8 bg-blue-500 rounded-full"></div>
          </div>
        </div>

        <div className="w-full md:w-2/3 text-center md:text-left">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Bienvenue sur le tableau de bord</h1>
          <p className="text-gray-600">
           Nouveau sur le tableau de bord ?
            <a href="/documentation/client" className="text-blue-500 hover:underline">
              Documentation
            </a>
            .
          </p>
        </div>
      </div>
      <div className="border-t border-gray-100 p-3 flex items-center text-xs text-gray-500">
        <RotateCcw className="h-3 w-3 mr-1" />
        <span>31 seconds ago</span>
      </div>
    </div>
  )
}

