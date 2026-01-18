import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import { Card, Button, Badge, Avatar, Loading } from '../components/common';
import userService from '../services/userService';
import api from '../services/api';

/**
 * ConnectionsPage
 * Manage connection requests and view connections (LinkedIn-style)
 */
function ConnectionsPage() {
  const [activeTab, setActiveTab] = useState('pending'); // 'pending' | 'connections'
  const [pendingRequests, setPendingRequests] = useState([]);
  const [connections, setConnections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  const fetchData = async () => {
    try {
      setLoading(true);
      if (activeTab === 'pending') {
        const response = await userService.getPendingRequests();
        if (response.success) {
          setPendingRequests(response.data || []);
        }
      } else {
        const response = await userService.getConnections();
        if (response.success) {
          setConnections(response.data || []);
        }
      }
    } catch (error) {
      console.error('Error fetching connections:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAccept = async (connectionId) => {
    try {
      setActionLoading(prev => ({ ...prev, [connectionId]: 'accepting' }));
      const response = await userService.acceptConnection(connectionId);
      if (response.success) {
        setPendingRequests(prev => prev.filter(req => req.id !== connectionId));
        alert('Connection accepted!');
        // Refresh connections list
        if (activeTab === 'connections') {
          fetchData();
        }
      }
    } catch (error) {
      console.error('Error accepting connection:', error);
      alert(error.response?.data?.message || 'Failed to accept connection');
    } finally {
      setActionLoading(prev => ({ ...prev, [connectionId]: null }));
    }
  };

  const handleReject = async (connectionId) => {
    try {
      setActionLoading(prev => ({ ...prev, [connectionId]: 'rejecting' }));
      const response = await userService.rejectConnection(connectionId);
      if (response.success) {
        setPendingRequests(prev => prev.filter(req => req.id !== connectionId));
        alert('Connection rejected');
      }
    } catch (error) {
      console.error('Error rejecting connection:', error);
      alert(error.response?.data?.message || 'Failed to reject connection');
    } finally {
      setActionLoading(prev => ({ ...prev, [connectionId]: null }));
    }
  };

  const handleRemove = async (connectionId) => {
    if (!confirm('Are you sure you want to remove this connection?')) return;
    
    try {
      setActionLoading(prev => ({ ...prev, [connectionId]: 'removing' }));
      const response = await userService.removeConnection(connectionId);
      if (response.success) {
        setConnections(prev => prev.filter(conn => conn.id !== connectionId));
        alert('Connection removed');
      }
    } catch (error) {
      console.error('Error removing connection:', error);
      alert(error.response?.data?.message || 'Failed to remove connection');
    } finally {
      setActionLoading(prev => ({ ...prev, [connectionId]: null }));
    }
  };

  const handleMessage = (userId) => {
    navigate(`/messages?user=${userId}`);
  };

  const handleViewProfile = (userId) => {
    navigate(`/profile/${userId}`);
  };

  return (
    <div className="min-vh-100" style={{ backgroundColor: 'var(--cs-bg-secondary)' }}>
      <Navbar />
      
      <div className="container" style={{ paddingTop: '100px', paddingBottom: '60px' }}>
        <div className="row justify-content-center">
          <div className="col-lg-10">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h2 className="fw-bold mb-0">
                <i className="bi bi-people-fill me-2"></i>
                My Connections
              </h2>
            </div>

            {/* Tabs */}
            <Card className="mb-4 p-0">
              <div className="d-flex border-bottom">
                <button
                  className={`flex-fill btn btn-link text-decoration-none py-3 ${
                    activeTab === 'pending' ? 'border-bottom border-primary border-3 text-primary fw-semibold' : 'text-muted'
                  }`}
                  onClick={() => setActiveTab('pending')}
                >
                  <i className="bi bi-clock-history me-2"></i>
                  Pending Requests
                  {pendingRequests.length > 0 && (
                    <Badge variant="danger" className="ms-2">{pendingRequests.length}</Badge>
                  )}
                </button>
                <button
                  className={`flex-fill btn btn-link text-decoration-none py-3 ${
                    activeTab === 'connections' ? 'border-bottom border-primary border-3 text-primary fw-semibold' : 'text-muted'
                  }`}
                  onClick={() => setActiveTab('connections')}
                >
                  <i className="bi bi-check-circle me-2"></i>
                  My Connections
                  {connections.length > 0 && (
                    <Badge variant="primary" className="ms-2">{connections.length}</Badge>
                  )}
                </button>
              </div>
            </Card>

            {/* Content */}
            {loading ? (
              <Loading />
            ) : (
              <>
                {/* Pending Requests Tab */}
                {activeTab === 'pending' && (
                  <div>
                    {pendingRequests.length === 0 ? (
                      <Card className="text-center py-5">
                        <i className="bi bi-inbox display-1 text-muted mb-3"></i>
                        <h5 className="text-muted mb-2">No pending requests</h5>
                        <p className="text-muted">Connection requests will appear here</p>
                      </Card>
                    ) : (
                      <div className="row g-3">
                        {pendingRequests.map(request => {
                          const otherUser = request.sender;
                          return (
                            <div key={request.id} className="col-12">
                              <Card hover>
                                <div className="d-flex align-items-center gap-3">
                                  <Avatar
                                    src={otherUser.photoURL}
                                    alt={otherUser.displayName}
                                    size="large"
                                    className="cursor-pointer"
                                    onClick={() => handleViewProfile(otherUser.id)}
                                  />
                                  <div className="flex-grow-1">
                                    <h6 
                                      className="mb-1 fw-semibold cursor-pointer text-primary"
                                      onClick={() => handleViewProfile(otherUser.id)}
                                      style={{ cursor: 'pointer' }}
                                    >
                                      {otherUser.displayName}
                                    </h6>
                                    <p className="text-muted mb-1 small">{otherUser.email}</p>
                                    {otherUser.skills && otherUser.skills.length > 0 && (
                                      <div className="d-flex flex-wrap gap-1 mt-2">
                                        {otherUser.skills.slice(0, 3).map((skill, idx) => (
                                          <Badge key={idx} variant="secondary" size="sm">
                                            {skill}
                                          </Badge>
                                        ))}
                                        {otherUser.skills.length > 3 && (
                                          <Badge variant="secondary" size="sm">
                                            +{otherUser.skills.length - 3} more
                                          </Badge>
                                        )}
                                      </div>
                                    )}
                                  </div>
                                  <div className="d-flex gap-2">
                                    <Button
                                      variant="primary"
                                      size="sm"
                                      onClick={() => handleAccept(request.id)}
                                      disabled={actionLoading[request.id]}
                                    >
                                      <i className="bi bi-check-lg me-1"></i>
                                      {actionLoading[request.id] === 'accepting' ? 'Accepting...' : 'Accept'}
                                    </Button>
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      onClick={() => handleReject(request.id)}
                                      disabled={actionLoading[request.id]}
                                    >
                                      <i className="bi bi-x-lg me-1"></i>
                                      {actionLoading[request.id] === 'rejecting' ? 'Rejecting...' : 'Reject'}
                                    </Button>
                                  </div>
                                </div>
                              </Card>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                )}

                {/* My Connections Tab */}
                {activeTab === 'connections' && (
                  <div>
                    {connections.length === 0 ? (
                      <Card className="text-center py-5">
                        <i className="bi bi-people display-1 text-muted mb-3"></i>
                        <h5 className="text-muted mb-2">No connections yet</h5>
                        <p className="text-muted">Start connecting with students and mentors!</p>
                        <Button variant="primary" onClick={() => navigate('/explore')}>
                          Find People
                        </Button>
                      </Card>
                    ) : (
                      <div className="row g-3">
                        {connections.map(connection => {
                          // Determine which user is the "other" user
                          const otherUser = connection.sender.id === connection.receiver?.id 
                            ? connection.receiver 
                            : connection.sender;
                          
                          return (
                            <div key={connection.id} className="col-md-6">
                              <Card hover>
                                <div className="d-flex align-items-center gap-3">
                                  <Avatar
                                    src={otherUser.photoURL}
                                    alt={otherUser.displayName}
                                    size="large"
                                    className="cursor-pointer"
                                    onClick={() => handleViewProfile(otherUser.id)}
                                  />
                                  <div className="flex-grow-1">
                                    <h6 
                                      className="mb-1 fw-semibold cursor-pointer text-primary"
                                      onClick={() => handleViewProfile(otherUser.id)}
                                      style={{ cursor: 'pointer' }}
                                    >
                                      {otherUser.displayName}
                                    </h6>
                                    <p className="text-muted mb-0 small">{otherUser.email}</p>
                                    {otherUser.skills && otherUser.skills.length > 0 && (
                                      <div className="d-flex flex-wrap gap-1 mt-2">
                                        {otherUser.skills.slice(0, 2).map((skill, idx) => (
                                          <Badge key={idx} variant="secondary" size="sm">
                                            {skill}
                                          </Badge>
                                        ))}
                                      </div>
                                    )}
                                  </div>
                                  <div className="d-flex flex-column gap-2">
                                    <Button
                                      variant="primary"
                                      size="sm"
                                      onClick={() => handleMessage(otherUser.id)}
                                    >
                                      <i className="bi bi-chat-dots me-1"></i>
                                      Message
                                    </Button>
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      onClick={() => handleRemove(connection.id)}
                                      disabled={actionLoading[connection.id]}
                                    >
                                      {actionLoading[connection.id] === 'removing' ? 'Removing...' : 'Remove'}
                                    </Button>
                                  </div>
                                </div>
                              </Card>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ConnectionsPage;
