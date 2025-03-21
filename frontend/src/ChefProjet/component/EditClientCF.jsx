import React from "react";
import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { ArrowLeft, Save, User, Mail, Phone, MapPin, Check, X } from "lucide-react"
import HeaderChefProjet from "./HeaderChefProjet";
import FooterChefProjet from "./FooterChefProjet";

const EditClientCF = ({ clients, setClients }) => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [notification, setNotification] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    email: "",
    phone: "",
    address: "",
    status: "active",
    industry: "",
    notes: "",
  })

  // Fallback data if no clients prop is provided
  const [localClients, setLocalClients] = useState([
    {
      id: 1,
      name: "Acme Corporation",
      contact: "John Doe",
      email: "john@acmecorp.com",
      phone: "+1 (555) 123-4567",
      address: "123 Business Ave, New York, NY 10001",
      status: "active",
      projects: 3,
      totalSpent: 12500,
      lastActivity: "2023-03-15",
      industry: "Technology",
      notes: "Key client for Q2 objectives. Looking to expand services in coming months.",
    },
    {
      id: 2,
      name: "Globex Industries",
      contact: "Jane Smith",
      email: "jane@globex.com",
      phone: "+1 (555) 987-6543",
      address: "456 Corporate Blvd, Chicago, IL 60601",
      status: "active",
      projects: 1,
      totalSpent: 8750,
      lastActivity: "2023-04-02",
      industry: "Manufacturing",
      notes: "New client, started with a small project. Potential for growth.",
    },
    {
      id: 3,
      name: "Initech LLC",
      contact: "Michael Johnson",
      email: "michael@initech.com",
      phone: "+1 (555) 456-7890",
      address: "789 Tech Park, San Francisco, CA 94105",
      status: "inactive",
      projects: 0,
      totalSpent: 0,
      lastActivity: "2023-01-10",
      industry: "Finance",
      notes: "Previous client, currently inactive. Follow up in Q3 for potential new projects.",
    },
  ])

  // Use provided clients or local state
  const clientsList = clients || localClients
  const updateClients = setClients || setLocalClients

  // Find the client to edit
  useEffect(() => {
    const clientId = Number.parseInt(id)
    const clientToEdit = clientsList.find((client) => client.id === clientId)

    if (clientToEdit) {
      setFormData({
        name: clientToEdit.name,
        contact: clientToEdit.contact,
        email: clientToEdit.email,
        phone: clientToEdit.phone || "",
        address: clientToEdit.address || "",
        status: clientToEdit.status,
        industry: clientToEdit.industry || "",
        notes: clientToEdit.notes || "",
      })
      setIsLoading(false)
    } else {
      // Client not found
      setNotification({
        type: "error",
        message: "Client not found",
      })
      setIsLoading(false)
    }
  }, [id, clientsList])

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault()
    const clientId = Number.parseInt(id)

    // Update client data
    const updatedClients = clientsList.map((client) => (client.id === clientId ? { ...client, ...formData } : client))

    updateClients(updatedClients)

    // Show success notification
    setNotification({
      type: "success",
      message: "Client updated successfully",
    })

    // Navigate back to clients page after a short delay
    setTimeout(() => {
      navigate("/clients", { state: { message: "Client updated successfully" } })
    }, 1500)
  }

  // Cancel edit and go back
  const handleCancel = () => {
    navigate("/clients")
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <HeaderChefProjet />

      <main className="flex-grow p-4 md:p-6">
        <div className="max-w-screen-lg mx-auto">
          {/* Back button and page title */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
            <div className="flex items-center mb-4 sm:mb-0">
              <button onClick={handleCancel} className="mr-3 text-gray-500 hover:text-gray-700">
                <ArrowLeft className="h-5 w-5" />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Edit Client</h1>
                <p className="text-sm text-gray-500 mt-1">Update client information</p>
              </div>
            </div>
          </div>

          {/* Notification */}
          {notification && (
            <div
              className={`mb-6 p-4 rounded-md ${notification.type === "success" ? "bg-green-50 text-green-800" : "bg-red-50 text-red-800"}`}
            >
              <div className="flex items-center">
                {notification.type === "success" ? <Check className="h-5 w-5 mr-2" /> : <X className="h-5 w-5 mr-2" />}
                <p>{notification.message}</p>
              </div>
            </div>
          )}

          {isLoading ? (
            <div className="bg-white rounded-lg shadow-sm p-8 flex justify-center">
              <p>Loading client data...</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="p-6 border-b border-gray-200">
                  <h2 className="text-lg font-medium text-gray-900">Client Information</h2>
                  <p className="mt-1 text-sm text-gray-500">Basic information about the client.</p>
                </div>

                <div className="p-6 space-y-6">
                  {/* Company Information */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                        Company Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label htmlFor="industry" className="block text-sm font-medium text-gray-700">
                        Industry
                      </label>
                      <input
                        type="text"
                        id="industry"
                        name="industry"
                        value={formData.industry}
                        onChange={handleInputChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </div>

                  {/* Contact Information */}
                  <div>
                    <h3 className="text-md font-medium text-gray-700 mb-3">Contact Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="contact" className="block text-sm font-medium text-gray-700">
                          Contact Person *
                        </label>
                        <div className="mt-1 relative rounded-md shadow-sm">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <User className="h-4 w-4 text-gray-400" />
                          </div>
                          <input
                            type="text"
                            id="contact"
                            name="contact"
                            required
                            value={formData.contact}
                            onChange={handleInputChange}
                            className="pl-10 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                          />
                        </div>
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                          Email *
                        </label>
                        <div className="mt-1 relative rounded-md shadow-sm">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Mail className="h-4 w-4 text-gray-400" />
                          </div>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            required
                            value={formData.email}
                            onChange={handleInputChange}
                            className="pl-10 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                          />
                        </div>
                      </div>
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                          Phone
                        </label>
                        <div className="mt-1 relative rounded-md shadow-sm">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Phone className="h-4 w-4 text-gray-400" />
                          </div>
                          <input
                            type="text"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            className="pl-10 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                          />
                        </div>
                      </div>
                      <div>
                        <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                          Address
                        </label>
                        <div className="mt-1 relative rounded-md shadow-sm">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <MapPin className="h-4 w-4 text-gray-400" />
                          </div>
                          <input
                            type="text"
                            id="address"
                            name="address"
                            value={formData.address}
                            onChange={handleInputChange}
                            className="pl-10 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Additional Information */}
                  <div>
                    <h3 className="text-md font-medium text-gray-700 mb-3">Additional Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="status" className="block text-sm font-medium text-gray-700">
                          Status
                        </label>
                        <select
                          id="status"
                          name="status"
                          value={formData.status}
                          onChange={handleInputChange}
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        >
                          <option value="active">Active</option>
                          <option value="inactive">Inactive</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Notes */}
                  <div>
                    <label htmlFor="notes" className="block text-sm font-medium text-gray-700">
                      Notes
                    </label>
                    <textarea
                      id="notes"
                      name="notes"
                      rows="4"
                      value={formData.notes}
                      onChange={handleInputChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Add any additional notes about this client..."
                    ></textarea>
                  </div>
                </div>

                <div className="px-6 py-4 bg-gray-50 flex flex-col sm:flex-row-reverse gap-3 sm:gap-2">
                  <button
                    type="submit"
                    className="inline-flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    <Save className="h-4 w-4 mr-2" />
                    Save Changes
                  </button>
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="inline-flex justify-center items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>
      </main>

      <FooterChefProjet />
    </div>
  )
}

export default EditClientCF

