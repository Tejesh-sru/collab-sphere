import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import { Card, Button, Badge, Input } from '../components/common';
import api from '../services/api';
import messageService from '../services/messageService';

function TeamChatPage() {
  const { teamId } = useParams();
  const navigate = useNavigate();
  const [team, setTeam] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [activeMembers, setActiveMembers] = useState([]);
  const [selectedMember, setSelectedMember] = useState(null);
  const [privateMessages, setPrivateMessages] = useState([]);
  const [chatMode, setChatMode] = useState('team'); // 'team' or 'private'
  const messagesEndRef = useRef(null);
  const pollInterval = useRef(null);

  useEffect(() => {
    fetchTeamData();
    startPolling();

    return () => {
      if (pollInterval.current) {
        clearInterval(pollInterval.current);
      }
    };
  }, [teamId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages, privateMessages]);

  useEffect(() => {
    if (selectedMember && chatMode === 'private') {
      fetchPrivateMessages(selectedMember.id);
    }
  }, [selectedMember]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const fetchTeamData = async () => {
    setLoading(true);
    try {
      const response = await api.get(`/teams/${teamId}`);
      if (response.data.success) {
        const teamData = response.data.data;
        setTeam(teamData);
        // Set active members (those who have accepted)
        const acceptedMembers = teamData.members?.filter(m => m.status === 'ACCEPTED') || [];
        setActiveMembers(acceptedMembers);
      }
    } catch (error) {
      console.error('Error fetching team:', error);
    } finally {
      setLoading(false);
    }
  };

  const startPolling = () => {
    // Poll for new messages every 3 seconds
    pollInterval.current = setInterval(() => {
      if (chatMode === 'team') {
        fetchTeamMessages();
      } else if (selectedMember) {
        fetchPrivateMessages(selectedMember.id);
      }
    }, 3000);
  };

  const fetchTeamMessages = async () => {
    try {
      // For now, we'll create a group conversation ID based on team ID
      // In a real app, you'd have a dedicated team chat endpoint
      const response = await api.get(`/teams/${teamId}/messages`);
      if (response.data.success) {
        setMessages(response.data.data || []);
      }
    } catch (error) {
      // If team messages endpoint doesn't exist, we'll use a workaround
      console.log('Team messages endpoint not available, using fallback');
    }
  };

  const fetchPrivateMessages = async (userId) => {
    try {
      const response = await api.get(`/messages/conversation/${userId}`);
      if (response.data.success) {
        setPrivateMessages(response.data.data || []);
      }
    } catch (error) {
      console.error('Error fetching private messages:', error);
    }
  };

  const handleSendTeamMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() || sending) return;

    setSending(true);
    try {
      // For team chat, we'll post a message that all team members can see
      const response = await api.post(`/teams/${teamId}/messages`, {
        content: newMessage.trim()
      });

      if (response.data.success) {
        setMessages([...messages, response.data.data]);
        setNewMessage('');
        scrollToBottom();
      }
    } catch (error) {
      console.error('Error sending message:', error);
      alert('Failed to send message. Using fallback...');
      // Fallback: create a local message
      const localMessage = {
        id: Date.now(),
        content: newMessage.trim(),
        sender: {
          id: 'current',
          displayName: 'You',
          photoURL: null
        },
        createdAt: new Date().toISOString(),
        isLocal: true
      };
      setMessages([...messages, localMessage]);
      setNewMessage('');
    } finally {
      setSending(false);
    }
  };

  const handleSendPrivateMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedMember || sending) return;

    setSending(true);
    try {
      const response = await messageService.sendMessage(selectedMember.id, newMessage.trim());
      if (response.success) {
        setPrivateMessages([...privateMessages, response.data]);
        setNewMessage('');
        scrollToBottom();
      }
    } catch (error) {
      console.error('Error sending private message:', error);
      alert('Failed to send private message');
    } finally {
      setSending(false);
    }
  };

  const handlePrivateChat = (member) => {
    setSelectedMember(member.user);
    setChatMode('private');
    fetchPrivateMessages(member.user.id);
  };

  const handleBackToTeamChat = () => {
    setChatMode('team');
    setSelectedMember(null);
    setPrivateMessages([]);
  };

  const formatMessageTime = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = (now - date) / (1000 * 60 * 60);

    if (diffInHours < 24) {
      return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    } else {
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
    }
  };

  if (loading) {
    return (
      <div className="min-vh-100 d-flex align-items-center justify-content-center" style={{ backgroundColor: 'var(--cs-bg-secondary)' }}>
        <div className="text-center">
          <div className="spinner-border text-primary mb-3" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="text-muted">Loading team chat...</p>
        </div>
      </div>
    );
  }

  if (!team) {
    return (
      <div className="min-vh-100" style={{ backgroundColor: 'var(--cs-bg-secondary)' }}>
        <Navbar />
        <div className="container" style={{ paddingTop: '100px' }}>
          <Card className="text-center py-5">
            <h5 className="text-muted">Team not found</h5>
            <Button variant="primary" onClick={() => navigate('/teams')} className="mt-3">
              Back to Teams
            </Button>
          </Card>
        </div>
      </div>
    );
  }

  const currentMessages = chatMode === 'team' ? messages : privateMessages;

  return (
    <div className="min-vh-100" style={{ backgroundColor: 'var(--cs-bg-secondary)' }}>
      <Navbar />
      
      <div className="container-fluid" style={{ paddingTop: '80px', height: '100vh' }}>
        <div className="row h-100">
          {/* Sidebar - Team Members */}
          <div className="col-md-3 border-end" style={{ backgroundColor: 'white', height: 'calc(100vh - 80px)', overflowY: 'auto' }}>
            <div className="p-3">
              {/* Team Info */}
              <div className="mb-4">
                <h5 className="fw-bold mb-2">{team.name}</h5>
                <p className="text-muted small mb-2">{team.description}</p>
                <Badge variant="primary">{activeMembers.length} Active Members</Badge>
              </div>

              {/* Team Chat Button */}
              <Button
                variant={chatMode === 'team' ? 'primary' : 'outline'}
                fullWidth
                className="mb-3"
                onClick={handleBackToTeamChat}
              >
                <i className="bi bi-chat-dots me-2"></i>
                Team Chat
              </Button>

              <hr />

              {/* Team Members List */}
              <h6 className="fw-bold mb-3">Team Members</h6>
              <div className="d-flex flex-column gap-2">
                {activeMembers.map(member => (
                  <div
                    key={member.id}
                    className={`d-flex align-items-center gap-2 p-2 rounded cursor-pointer ${
                      selectedMember?.id === member.user.id ? 'bg-primary bg-opacity-10' : 'hover-bg-light'
                    }`}
                    style={{ cursor: 'pointer' }}
                    onClick={() => handlePrivateChat(member)}
                  >
                    <div className="position-relative">
                      <img
                        src={member.user.photoURL || 'https://i.pravatar.cc/40'}
                        alt={member.user.displayName}
                        className="rounded-circle"
                        style={{ width: '40px', height: '40px' }}
                      />
                      <span
                        className="position-absolute bottom-0 end-0 rounded-circle border border-2 border-white"
                        style={{
                          width: '12px',
                          height: '12px',
                          backgroundColor: '#28a745'
                        }}
                      ></span>
                    </div>
                    <div className="flex-grow-1">
                      <div className="fw-semibold small">{member.user.displayName}</div>
                      <div className="text-muted" style={{ fontSize: '11px' }}>
                        {member.role}
                      </div>
                    </div>
                    {member.role === 'LEADER' && (
                      <Badge variant="warning" size="sm">
                        <i className="bi bi-star-fill"></i>
                      </Badge>
                    )}
                  </div>
                ))}
              </div>

              {/* Quick Actions */}
              <hr />
              <div className="d-grid gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigate(`/projects/${team.id}`)}
                >
                  <i className="bi bi-kanban me-2"></i>
                  View Tasks
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigate(`/teams/${teamId}`)}
                >
                  <i className="bi bi-info-circle me-2"></i>
                  Team Details
                </Button>
              </div>
            </div>
          </div>

          {/* Main Chat Area */}
          <div className="col-md-9 d-flex flex-column" style={{ height: 'calc(100vh - 80px)' }}>
            {/* Chat Header */}
            <div className="p-3 border-bottom bg-white">
              <div className="d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center gap-3">
                  {chatMode === 'private' && selectedMember ? (
                    <>
                      <Button
                        variant="link"
                        size="sm"
                        onClick={handleBackToTeamChat}
                        className="p-0"
                      >
                        <i className="bi bi-arrow-left"></i>
                      </Button>
                      <img
                        src={selectedMember.photoURL || 'https://i.pravatar.cc/50'}
                        alt={selectedMember.displayName}
                        className="rounded-circle"
                        style={{ width: '40px', height: '40px' }}
                      />
                      <div>
                        <h6 className="mb-0">{selectedMember.displayName}</h6>
                        <small className="text-muted">Private Chat</small>
                      </div>
                    </>
                  ) : (
                    <>
                      <i className="bi bi-people-fill text-primary" style={{ fontSize: '24px' }}></i>
                      <div>
                        <h6 className="mb-0">{team.name} - Team Chat</h6>
                        <small className="text-muted">{activeMembers.length} members online</small>
                      </div>
                    </>
                  )}
                </div>
                <div className="d-flex gap-2">
                  <Button variant="outline" size="sm">
                    <i className="bi bi-telephone"></i>
                  </Button>
                  <Button variant="outline" size="sm">
                    <i className="bi bi-camera-video"></i>
                  </Button>
                </div>
              </div>
            </div>

            {/* Messages Area */}
            <div className="flex-grow-1 p-3" style={{ overflowY: 'auto', backgroundColor: '#f8f9fa' }}>
              {currentMessages.length === 0 ? (
                <div className="text-center py-5">
                  <i className="bi bi-chat-dots display-1 text-muted mb-3"></i>
                  <h5 className="text-muted">No messages yet</h5>
                  <p className="text-muted">
                    {chatMode === 'team' 
                      ? 'Start the conversation with your team!'
                      : `Start chatting with ${selectedMember?.displayName}`
                    }
                  </p>
                </div>
              ) : (
                <div className="d-flex flex-column gap-3">
                  {currentMessages.map((message, index) => {
                    const isCurrentUser = message.sender?.id === 'current' || message.isCurrentUser;
                    const showAvatar = index === 0 || currentMessages[index - 1].sender?.id !== message.sender?.id;
                    
                    return (
                      <div
                        key={message.id}
                        className={`d-flex gap-2 ${isCurrentUser ? 'flex-row-reverse' : ''}`}
                      >
                        {showAvatar && !isCurrentUser && (
                          <img
                            src={message.sender?.photoURL || 'https://i.pravatar.cc/40'}
                            alt={message.sender?.displayName}
                            className="rounded-circle"
                            style={{ width: '32px', height: '32px' }}
                          />
                        )}
                        {!showAvatar && !isCurrentUser && (
                          <div style={{ width: '32px' }}></div>
                        )}
                        
                        <div className={`${isCurrentUser ? 'text-end' : ''}`} style={{ maxWidth: '70%' }}>
                          {showAvatar && !isCurrentUser && (
                            <small className="text-muted mb-1 d-block">
                              {message.sender?.displayName}
                            </small>
                          )}
                          <div
                            className={`p-3 rounded ${
                              isCurrentUser
                                ? 'bg-primary text-white'
                                : 'bg-white border'
                            }`}
                            style={{
                              borderRadius: isCurrentUser ? '18px 18px 4px 18px' : '18px 18px 18px 4px'
                            }}
                          >
                            {message.content}
                          </div>
                          <small className="text-muted d-block mt-1" style={{ fontSize: '11px' }}>
                            {formatMessageTime(message.createdAt)}
                            {message.isLocal && <span className="ms-1">• Sending...</span>}
                          </small>
                        </div>
                      </div>
                    );
                  })}
                  <div ref={messagesEndRef} />
                </div>
              )}
            </div>

            {/* Message Input */}
            <div className="p-3 border-top bg-white">
              <form onSubmit={chatMode === 'team' ? handleSendTeamMessage : handleSendPrivateMessage}>
                <div className="d-flex gap-2 align-items-center">
                  <Button type="button" variant="outline" size="sm">
                    <i className="bi bi-paperclip"></i>
                  </Button>
                  <Button type="button" variant="outline" size="sm">
                    <i className="bi bi-emoji-smile"></i>
                  </Button>
                  <Input
                    type="text"
                    placeholder={
                      chatMode === 'team'
                        ? 'Type a message to the team...'
                        : `Message ${selectedMember?.displayName}...`
                    }
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    className="flex-grow-1"
                    disabled={sending}
                  />
                  <Button
                    type="submit"
                    variant="primary"
                    disabled={!newMessage.trim() || sending}
                  >
                    {sending ? (
                      <span className="spinner-border spinner-border-sm"></span>
                    ) : (
                      <i className="bi bi-send-fill"></i>
                    )}
                  </Button>
                </div>
              </form>
              <small className="text-muted mt-2 d-block">
                Press Enter to send • Shift + Enter for new line
              </small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TeamChatPage;
