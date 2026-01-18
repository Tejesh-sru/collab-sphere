import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import notificationService from '../../services/notificationService';
import './NotificationDropdown.css';

/**
 * NotificationDropdown Component
 * LinkedIn-style notification dropdown with real data
 */
function NotificationDropdown() {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUnreadCount();
    
    // Poll for new notifications every 30 seconds
    const interval = setInterval(() => {
      fetchUnreadCount();
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (isOpen) {
      fetchNotifications();
    }
  }, [isOpen]);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const fetchUnreadCount = async () => {
    try {
      const response = await notificationService.getUnreadCount();
      if (response.success) {
        setUnreadCount(response.data || 0);
      }
    } catch (error) {
      console.error('Error fetching unread count:', error);
    }
  };

  const fetchNotifications = async () => {
    try {
      setLoading(true);
      const response = await notificationService.getMyNotifications();
      if (response.success) {
        setNotifications(response.data || []);
      }
    } catch (error) {
      console.error('Error fetching notifications:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleNotificationClick = async (notification) => {
    try {
      // Mark as read
      if (!notification.isRead) {
        await notificationService.markAsRead(notification.id);
        setUnreadCount(prev => Math.max(0, prev - 1));
        setNotifications(prev =>
          prev.map(n =>
            n.id === notification.id ? { ...n, isRead: true } : n
          )
        );
      }

      // Navigate to action URL
      if (notification.actionUrl) {
        navigate(notification.actionUrl);
        setIsOpen(false);
      }
    } catch (error) {
      console.error('Error handling notification click:', error);
    }
  };

  const handleMarkAllAsRead = async () => {
    try {
      await notificationService.markAllAsRead();
      setUnreadCount(0);
      setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
    } catch (error) {
      console.error('Error marking all as read:', error);
    }
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'CONNECTION_REQUEST':
        return 'bi-person-plus';
      case 'CONNECTION_ACCEPTED':
        return 'bi-person-check';
      case 'TEAM_INVITATION':
        return 'bi-people';
      case 'MESSAGE_RECEIVED':
        return 'bi-chat-dots';
      case 'PROJECT_ASSIGNED':
        return 'bi-diagram-3';
      default:
        return 'bi-bell';
    }
  };

  const getNotificationColor = (type) => {
    switch (type) {
      case 'CONNECTION_REQUEST':
        return 'primary';
      case 'CONNECTION_ACCEPTED':
        return 'success';
      case 'TEAM_INVITATION':
        return 'info';
      case 'MESSAGE_RECEIVED':
        return 'warning';
      case 'PROJECT_ASSIGNED':
        return 'purple';
      default:
        return 'secondary';
    }
  };

  const formatTime = (timestamp) => {
    const now = new Date();
    const notifTime = new Date(timestamp);
    const diffMs = now - notifTime;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return notifTime.toLocaleDateString();
  };

  return (
    <div className="notification-dropdown" ref={dropdownRef}>
      <button
        className="btn btn-link text-secondary p-0 position-relative"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Notifications"
      >
        <i className="bi bi-bell fs-5"></i>
        {unreadCount > 0 && (
          <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
            {unreadCount > 99 ? '99+' : unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="notification-dropdown-menu shadow-lg">
          <div className="notification-header">
            <h6 className="mb-0 fw-bold">Notifications</h6>
            {notifications.length > 0 && unreadCount > 0 && (
              <button
                className="btn btn-link btn-sm text-primary p-0"
                onClick={handleMarkAllAsRead}
              >
                Mark all read
              </button>
            )}
          </div>

          <div className="notification-list">
            {loading ? (
              <div className="text-center py-4">
                <div className="spinner-border spinner-border-sm text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            ) : notifications.length === 0 ? (
              <div className="notification-empty">
                <i className="bi bi-bell-slash fs-1 text-muted mb-2"></i>
                <p className="text-muted mb-0">No notifications yet</p>
              </div>
            ) : (
              notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`notification-item ${!notification.isRead ? 'unread' : ''}`}
                  onClick={() => handleNotificationClick(notification)}
                >
                  <div className="notification-icon-wrapper">
                    <div className={`notification-icon bg-${getNotificationColor(notification.type)}-subtle`}>
                      <i className={`bi ${getNotificationIcon(notification.type)} text-${getNotificationColor(notification.type)}`}></i>
                    </div>
                  </div>
                  <div className="notification-content">
                    <p className="notification-title mb-1">
                      {notification.title}
                      {!notification.isRead && <span className="unread-dot"></span>}
                    </p>
                    <p className="notification-message mb-1">{notification.message}</p>
                    <span className="notification-time">{formatTime(notification.createdAt)}</span>
                  </div>
                </div>
              ))
            )}
          </div>

          {notifications.length > 0 && (
            <div className="notification-footer">
              <button
                className="btn btn-link w-100 text-primary"
                onClick={() => {
                  setIsOpen(false);
                  // You can create a dedicated notifications page later
                }}
              >
                View all notifications
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default NotificationDropdown;
