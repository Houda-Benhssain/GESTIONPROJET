// Mock API for notifications
export async function fetchNotifications() {
    // In a real application, this would be an API call to your backend
    // For demo purposes, we're returning mock data
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          {
            id: 1,
            title: "New task assigned",
            message: "You have been assigned to SCRUM-42",
            time: "5 min ago",
            read: false,
          },
          {
            id: 2,
            title: "Comment on your task",
            message: "John commented on SCRUM-28",
            time: "1 hour ago",
            read: false,
          },
          {
            id: 3,
            title: "Task status updated",
            message: "SCRUM-13 moved to In Progress",
            time: "3 hours ago",
            read: true,
          },
          {
            id: 4,
            title: "Meeting reminder",
            message: "Daily standup in 15 minutes",
            time: "15 min ago",
            read: true,
          },
        ])
      }, 500)
    })
  }
  
  export async function markAsRead(notificationId) {
    // In a real application, this would update the notification status in your backend
    console.log(`Marking notification ${notificationId} as read`)
    return true
  }
  
  export async function markAllAsRead() {
    // In a real application, this would update all notifications as read in your backend
    console.log("Marking all notifications as read")
    return true
  }
  
  