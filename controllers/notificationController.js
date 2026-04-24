import Notification from '../models/Notification.js';

// ✅ Get user notifications
export const getUserNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({ user: req.user._id })
      .sort({ createdAt: -1 });
    const unreadCount = notifications.filter(n => !n.isRead).length;
    
    res.json({ 
      success: true, 
      notifications,
      unreadCount 
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Mark notification as read
export const markAsRead = async (req, res) => {
  try {
    const notification = await Notification.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      { isRead: true },
      { new: true }
    );
    if (!notification) {
      return res.status(404).json({ message: "Notification not found" });
    }
    res.json({ success: true, notification });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Create notification (internal use - called from orderController)
// controllers/notificationController.js
export const createNotification = async (userId, title, message, type, orderId) => {
    try {
        // Temporary fix - just log for now
        console.log("Notification:", { userId, title, message, type, orderId });
        return true;
    } catch (error) {
        console.log("Notification error:", error.message);
        return false;
    }
};

// ✅ Mark all as read
export const markAllAsRead = async (req, res) => {
  try {
    await Notification.updateMany(
      { user: req.user._id, isRead: false },
      { isRead: true }
    );
    res.json({ success: true, message: "All notifications marked as read" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};