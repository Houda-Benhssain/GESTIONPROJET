import React from "react"
import { useState } from "react"
import { CreditCard, CheckCircle, Lock, Info } from "lucide-react"

export default function PaymentPage() {
  const [paymentMethod, setPaymentMethod] = useState("credit-card")
  const [cardNumber, setCardNumber] = useState("")
  const [cardName, setCardName] = useState("")
  const [expiryDate, setExpiryDate] = useState("")
  const [cvv, setCvv] = useState("")
  const [saveCard, setSaveCard] = useState(false)
  const [billingAddress, setBillingAddress] = useState({
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "United States",
  })
  const [showOrderSummary, setShowOrderSummary] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [paymentComplete, setPaymentComplete] = useState(false)
  const [errors, setErrors] = useState({})

  // Sample order data
  const orderData = {
    items: [
      { id: 1, name: "Website Design Package", price: 1200, description: "Complete website design with 5 pages" },
      { id: 2, name: "SEO Optimization", price: 450, description: "Basic SEO package for 3 months" },
    ],
    subtotal: 1650,
    tax: 132,
    total: 1782,
  }

  const formatCardNumber = (value) => {
    // Remove all non-digit characters
    const digits = value.replace(/\D/g, "")
    // Add space after every 4 digits
    const formatted = digits.replace(/(\d{4})(?=\d)/g, "$1 ")
    // Limit to 19 characters (16 digits + 3 spaces)
    return formatted.slice(0, 19)
  }

  const formatExpiryDate = (value) => {
    // Remove all non-digit characters
    const digits = value.replace(/\D/g, "")
    // Format as MM/YY
    if (digits.length > 2) {
      return `${digits.slice(0, 2)}/${digits.slice(2, 4)}`
    }
    return digits
  }

  const handleCardNumberChange = (e) => {
    setCardNumber(formatCardNumber(e.target.value))
  }

  const handleExpiryDateChange = (e) => {
    setExpiryDate(formatExpiryDate(e.target.value))
  }

  const handleCvvChange = (e) => {
    // Only allow up to 4 digits for CVV
    const value = e.target.value.replace(/\D/g, "").slice(0, 4)
    setCvv(value)
  }

  const handleBillingChange = (e) => {
    const { name, value } = e.target
    setBillingAddress((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const validateForm = () => {
    const newErrors = {}

    // Validate card details
    if (paymentMethod === "credit-card") {
      if (!cardNumber || cardNumber.replace(/\s/g, "").length < 16) {
        newErrors.cardNumber = "Valid card number is required"
      }
      if (!cardName) {
        newErrors.cardName = "Cardholder name is required"
      }
      if (!expiryDate || expiryDate.length < 5) {
        newErrors.expiryDate = "Valid expiry date is required"
      }
      if (!cvv || cvv.length < 3) {
        newErrors.cvv = "Valid CVV is required"
      }
    }

    // Validate billing address
    if (!billingAddress.firstName) {
      newErrors.firstName = "First name is required"
    }
    if (!billingAddress.lastName) {
      newErrors.lastName = "Last name is required"
    }
    if (!billingAddress.address) {
      newErrors.address = "Address is required"
    }
    if (!billingAddress.city) {
      newErrors.city = "City is required"
    }
    if (!billingAddress.zipCode) {
      newErrors.zipCode = "ZIP code is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (validateForm()) {
      setIsProcessing(true)

      // Simulate payment processing
      setTimeout(() => {
        setIsProcessing(false)
        setPaymentComplete(true)
      }, 2000)
    }
  }

  if (paymentComplete) {
    return (
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md p-8 my-8">
        <div className="text-center py-10">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="h-10 w-10 text-blue-600" />
          </div>
          <h2 className="text-2xl font-bold text-blue-800 mb-2">Payment Successful!</h2>
          <p className="text-blue-600 mb-6">
            Your payment of ${orderData.total.toFixed(2)} has been processed successfully.
          </p>
          <div className="bg-blue-50 rounded-lg p-6 max-w-md mx-auto mb-6">
            <h3 className="font-semibold text-blue-800 mb-2">Transaction Details</h3>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-blue-600">Transaction ID:</span>
              <span className="text-blue-800 font-medium">
                TXN-{Math.random().toString(36).substring(2, 10).toUpperCase()}
              </span>
            </div>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-blue-600">Date:</span>
              <span className="text-blue-800 font-medium">{new Date().toLocaleDateString()}</span>
            </div>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-blue-600">Payment Method:</span>
              <span className="text-blue-800 font-medium">
                {paymentMethod === "credit-card" ? `Card ending in ${cardNumber.slice(-4)}` : "PayPal"}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-blue-600">Amount:</span>
              <span className="text-blue-800 font-medium">${orderData.total.toFixed(2)}</span>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              View Receipt
            </button>
            <button className="px-6 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors">
              Back to Dashboard
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-blue-800">Complete Your Payment</h1>
        <p className="text-blue-600">Secure payment processing for your services</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Payment Form */}
        <div className="flex-grow">
          <div className="bg-white rounded-xl shadow-md p-6 mb-6">
            <h2 className="text-xl font-bold text-blue-800 mb-4">Payment Method</h2>

            <div className="space-y-4 mb-6">
              <div
                className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                  paymentMethod === "credit-card" ? "border-blue-500 bg-blue-50" : "border-gray-200"
                }`}
                onClick={() => setPaymentMethod("credit-card")}
              >
                <div className="flex items-center">
                  <div
                    className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center ${
                      paymentMethod === "credit-card" ? "border-blue-500" : "border-gray-300"
                    }`}
                  >
                    {paymentMethod === "credit-card" && <div className="w-3 h-3 rounded-full bg-blue-500"></div>}
                  </div>
                  <div className="flex items-center">
                    <CreditCard className="h-5 w-5 text-blue-600 mr-2" />
                    <span className="font-medium text-blue-800">Credit / Debit Card</span>
                  </div>
                  <div className="ml-auto flex space-x-1">
                    <div className="w-8 h-5 bg-blue-600 rounded"></div>
                    <div className="w-8 h-5 bg-indigo-600 rounded"></div>
                    <div className="w-8 h-5 bg-gray-600 rounded"></div>
                  </div>
                </div>
              </div>

              <div
                className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                  paymentMethod === "paypal" ? "border-blue-500 bg-blue-50" : "border-gray-200"
                }`}
                onClick={() => setPaymentMethod("paypal")}
              >
                <div className="flex items-center">
                  <div
                    className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center ${
                      paymentMethod === "paypal" ? "border-blue-500" : "border-gray-300"
                    }`}
                  >
                    {paymentMethod === "paypal" && <div className="w-3 h-3 rounded-full bg-blue-500"></div>}
                  </div>
                  <div className="flex items-center">
                    <div className="text-blue-800 font-bold mr-1">Pay</div>
                    <div className="text-blue-600 font-bold">Pal</div>
                  </div>
                </div>
              </div>
            </div>

            {paymentMethod === "credit-card" && (
              <div className="space-y-4 mb-6">
                <div>
                  <label htmlFor="cardNumber" className="block text-sm font-medium text-blue-700 mb-1">
                    Card Number
                  </label>
                  <div
                    className={`relative border ${errors.cardNumber ? "border-red-500" : "border-gray-300"} rounded-lg`}
                  >
                    <input
                      type="text"
                      id="cardNumber"
                      value={cardNumber}
                      onChange={handleCardNumberChange}
                      placeholder="1234 5678 9012 3456"
                      className="w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                      <div className="w-8 h-5 bg-blue-600 rounded"></div>
                    </div>
                  </div>
                  {errors.cardNumber && <p className="text-red-500 text-xs mt-1">{errors.cardNumber}</p>}
                </div>

                <div>
                  <label htmlFor="cardName" className="block text-sm font-medium text-blue-700 mb-1">
                    Cardholder Name
                  </label>
                  <input
                    type="text"
                    id="cardName"
                    value={cardName}
                    onChange={(e) => setCardName(e.target.value)}
                    placeholder="John Smith"
                    className={`w-full px-4 py-3 border ${errors.cardName ? "border-red-500" : "border-gray-300"} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  />
                  {errors.cardName && <p className="text-red-500 text-xs mt-1">{errors.cardName}</p>}
                </div>

                <div className="flex space-x-4">
                  <div className="w-1/2">
                    <label htmlFor="expiryDate" className="block text-sm font-medium text-blue-700 mb-1">
                      Expiry Date
                    </label>
                    <input
                      type="text"
                      id="expiryDate"
                      value={expiryDate}
                      onChange={handleExpiryDateChange}
                      placeholder="MM/YY"
                      className={`w-full px-4 py-3 border ${errors.expiryDate ? "border-red-500" : "border-gray-300"} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    />
                    {errors.expiryDate && <p className="text-red-500 text-xs mt-1">{errors.expiryDate}</p>}
                  </div>

                  <div className="w-1/2">
                    <label htmlFor="cvv" className="block text-sm font-medium text-blue-700 mb-1">
                      CVV
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        id="cvv"
                        value={cvv}
                        onChange={handleCvvChange}
                        placeholder="123"
                        className={`w-full px-4 py-3 border ${errors.cvv ? "border-red-500" : "border-gray-300"} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                      />
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-help">
                        <Info className="h-4 w-4 text-blue-500" />
                      </div>
                    </div>
                    {errors.cvv && <p className="text-red-500 text-xs mt-1">{errors.cvv}</p>}
                  </div>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="saveCard"
                    checked={saveCard}
                    onChange={() => setSaveCard(!saveCard)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="saveCard" className="ml-2 block text-sm text-blue-700">
                    Save card for future payments
                  </label>
                </div>
              </div>
            )}

            {paymentMethod === "paypal" && (
              <div className="bg-blue-50 rounded-lg p-4 text-center">
                <p className="text-blue-700 mb-2">You will be redirected to PayPal to complete your payment.</p>
                <div className="flex justify-center">
                  <div className="text-blue-800 font-bold text-xl mr-1">Pay</div>
                  <div className="text-blue-600 font-bold text-xl">Pal</div>
                </div>
              </div>
            )}
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 mb-6">
            <h2 className="text-xl font-bold text-blue-800 mb-4">Billing Address</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-blue-700 mb-1">
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={billingAddress.firstName}
                  onChange={handleBillingChange}
                  className={`w-full px-4 py-3 border ${errors.firstName ? "border-red-500" : "border-gray-300"} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                />
                {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
              </div>

              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-blue-700 mb-1">
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={billingAddress.lastName}
                  onChange={handleBillingChange}
                  className={`w-full px-4 py-3 border ${errors.lastName ? "border-red-500" : "border-gray-300"} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                />
                {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
              </div>

              <div className="md:col-span-2">
                <label htmlFor="address" className="block text-sm font-medium text-blue-700 mb-1">
                  Address
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={billingAddress.address}
                  onChange={handleBillingChange}
                  className={`w-full px-4 py-3 border ${errors.address ? "border-red-500" : "border-gray-300"} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                />
                {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
              </div>

              <div>
                <label htmlFor="city" className="block text-sm font-medium text-blue-700 mb-1">
                  City
                </label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={billingAddress.city}
                  onChange={handleBillingChange}
                  className={`w-full px-4 py-3 border ${errors.city ? "border-red-500" : "border-gray-300"} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                />
                {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city}</p>}
              </div>

              <div>
                <label htmlFor="state" className="block text-sm font-medium text-blue-700 mb-1">
                  State / Province
                </label>
                <input
                  type="text"
                  id="state"
                  name="state"
                  value={billingAddress.state}
                  onChange={handleBillingChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label htmlFor="zipCode" className="block text-sm font-medium text-blue-700 mb-1">
                  ZIP / Postal Code
                </label>
                <input
                  type="text"
                  id="zipCode"
                  name="zipCode"
                  value={billingAddress.zipCode}
                  onChange={handleBillingChange}
                  className={`w-full px-4 py-3 border ${errors.zipCode ? "border-red-500" : "border-gray-300"} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                />
                {errors.zipCode && <p className="text-red-500 text-xs mt-1">{errors.zipCode}</p>}
              </div>

              <div>
                <label htmlFor="country" className="block text-sm font-medium text-blue-700 mb-1">
                  Country
                </label>
                <select
                  id="country"
                  name="country"
                  value={billingAddress.country}
                  onChange={handleBillingChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="United States">United States</option>
                  <option value="Canada">Canada</option>
                  <option value="United Kingdom">United Kingdom</option>
                  <option value="Australia">Australia</option>
                  <option value="Germany">Germany</option>
                  <option value="France">France</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:w-96">
          <div className="bg-white rounded-xl shadow-md overflow-hidden sticky top-4">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-blue-800 mb-1">Order Summary</h2>
              <p className="text-blue-600 text-sm">Review your order details</p>
            </div>

            <div className="p-6 space-y-4">
              {orderData.items.map((item) => (
                <div key={item.id} className="flex justify-between pb-4 border-b border-gray-100">
                  <div>
                    <h3 className="font-medium text-blue-800">{item.name}</h3>
                    <p className="text-sm text-blue-600">{item.description}</p>
                  </div>
                  <div className="text-blue-800 font-medium">${item.price.toFixed(2)}</div>
                </div>
              ))}

              <div className="flex justify-between text-blue-600">
                <span>Subtotal</span>
                <span>${orderData.subtotal.toFixed(2)}</span>
              </div>

              <div className="flex justify-between text-blue-600">
                <span>Tax</span>
                <span>${orderData.tax.toFixed(2)}</span>
              </div>

              <div className="flex justify-between text-lg font-bold text-blue-800 pt-2 border-t border-gray-200">
                <span>Total</span>
                <span>${orderData.total.toFixed(2)}</span>
              </div>
            </div>

            <div className="p-6 bg-blue-50">
              <button
                onClick={handleSubmit}
                disabled={isProcessing}
                className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-blue-300 flex items-center justify-center"
              >
                {isProcessing ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Processing...
                  </>
                ) : (
                  <>Pay ${orderData.total.toFixed(2)}</>
                )}
              </button>

              <div className="flex items-center justify-center mt-4 text-blue-600 text-sm">
                <Lock className="h-3 w-3 mr-1" />
                <span>Secure payment processing</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

