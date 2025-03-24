import React from "react"
import HeaderClient from "../component/HeaderClient"
import FooterClient from "../component/FooterClient"
import PaymentPage from "../component/PaymentPage"
import { ChevronRight } from "lucide-react"

export default function Payment() {
  return (
    <div className="min-h-screen bg-blue-50">
      <HeaderClient />

      {/* Breadcrumb header */}
      <div className="bg-gradient-to-r from-blue-800 to-blue-600 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-screen-2xl mx-auto">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center text-xs text-blue-100 mb-2">
                <span>Dashboard</span>
                <ChevronRight className="h-3 w-3 mx-1" />
                <span>Billing</span>
                <ChevronRight className="h-3 w-3 mx-1" />
                <span>Payment</span>
              </div>
              <h1 className="text-2xl font-bold text-white">Payment</h1>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <PaymentPage />
      </div>

      <FooterClient />
    </div>
  )
}

