import api from './api';

/**
 * Message Service
 * Handles all messaging-related API calls
 */
const messageService = {
  /**
   * Get all conversations for current user
   */
  getConversations: async () => {
    const response = await api.get('/messages/conversations');
    return response.data;
  },

  /**
   * Get messages in a conversation
   * @param {string} conversationId - Conversation ID
   */
  getMessages: async (conversationId) => {
    const response = await api.get(`/messages/conversation/${conversationId}`);
    return response.data;
  },

  /**
   * Get or create conversation with a user
   * @param {string} userId - User ID
   */
  getOrCreateConversation: async (userId) => {
    const response = await api.get(`/messages/conversation/user/${userId}`);
    return response.data;
  },

  /**
   * Send a message
   * @param {string} recipientId - Recipient user ID or conversation ID
   * @param {string} content - Message content
   */
  sendMessage: async (recipientId, content) => {
    const response = await api.post('/messages', {
      recipientId,
      content,
    });
    return response.data;
  },

  /**
   * Mark conversation as read
   * @param {string} conversationId - Conversation ID
   */
  markAsRead: async (conversationId) => {
    const response = await api.put(`/messages/conversation/${conversationId}/read`);
    return response.data;
  },

  /**
   * Delete a message
   * @param {string} messageId - Message ID
   */
  deleteMessage: async (messageId) => {
    const response = await api.delete(`/messages/${messageId}`);
    return response.data;
  },

  /**
   * Get unread message count
   */
  getUnreadCount: async () => {
    const response = await api.get('/messages/unread/count');
    return response.data;
  },
};

export default messageService;
