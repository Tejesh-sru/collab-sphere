import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import { Card, Button, Badge } from '../components/common';
import api from '../services/api';

function TeamsPage() {
  const navigate = useNavigate();
  const [invitations, setInvitations] = useState([]);
  const [myTeams, setMyTeams] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [invitationsRes, teamsRes] = await Promise.all([
        api.get('/teams/invitations'),
        api.get('/teams/my-teams')
      ]);

      if (invitationsRes.data.success) {
        setInvitations(invitationsRes.data.data || []);
      }
      if (teamsRes.data.success) {
        const teams = teamsRes.data.data || [];
        setMyTeams(teams);
        console.log('Teams loaded:', teams.length);
        console.log('Active teams:', teams.filter(t => t.status === 'ACTIVE').length);
        teams.forEach(team => {
          console.log(`Team: ${team.name}, Status: ${team.status}, ID: ${team.id}`);
        });
      }
    } catch (error) {
      console.error('Error fetching teams:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAcceptInvitation = async (teamId) => {
    try {
      const response = await api.post(`/teams/${teamId}/accept`);
      if (response.data.success) {
        alert('Invitation accepted! Welcome to the team.');
        fetchData();
      }
    } catch (error) {
      console.error('Error accepting invitation:', error);
      alert('Failed to accept invitation');
    }
  };

  const handleRejectInvitation = async (teamId) => {
    try {
      const response = await api.post(`/teams/${teamId}/reject`);
      if (response.data.success) {
        alert('Invitation rejected');
        fetchData();
      }
    } catch (error) {
      console.error('Error rejecting invitation:', error);
      alert('Failed to reject invitation');
    }
  };

  const getStatusBadgeVariant = (status) => {
    const variants = {
      FORMING: 'warning',
      READY: 'success',
      ACTIVE: 'primary',
      COMPLETED: 'info',
      DISBANDED: 'danger'
    };
    return variants[status] || 'secondary';
  };

  const getMemberStatusBadgeVariant = (status) => {
    const variants = {
      PENDING: 'warning',
      ACCEPTED: 'success',
      REJECTED: 'danger'
    };
    return variants[status] || 'secondary';
  };

  if (loading) {
    return (
      <div className="min-vh-100 d-flex align-items-center justify-content-center" style={{ backgroundColor: 'var(--cs-bg-secondary)' }}>
        <div className="text-center">
          <div className="spinner-border text-primary mb-3" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="text-muted">Loading teams...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-vh-100" style={{ backgroundColor: 'var(--cs-bg-secondary)' }}>
      <Navbar />
      
      <div className="container" style={{ paddingTop: '100px', paddingBottom: '60px' }}>
        {/* Header */}
        <div className="mb-4">
          <h2 className="fw-bold mb-2">My Teams</h2>
          <p className="text-muted">Manage your team invitations and current teams</p>
        </div>

        {/* Pending Invitations */}
        {invitations.length > 0 && (
          <div className="mb-4">
            <h4 className="fw-bold mb-3">
              Pending Invitations
              <Badge variant="primary" className="ms-2">{invitations.length}</Badge>
            </h4>
            <div className="row g-3">
              {invitations.map(team => (
                <div key={team.id} className="col-lg-6">
                  <Card>
                    <div className="d-flex justify-content-between align-items-start mb-3">
                      <div>
                        <h5 className="fw-bold mb-1">{team.name}</h5>
                        <p className="text-muted small mb-0">Led by {team.leader.displayName}</p>
                      </div>
                      <Badge variant={getStatusBadgeVariant(team.status)}>
                        {team.status}
                      </Badge>
                    </div>

                    <p className="text-muted mb-3">{team.description}</p>

                    <div className="mb-3">
                      <strong className="small">Required Skills:</strong>
                      <div className="d-flex flex-wrap gap-1 mt-1">
                        {team.requiredSkills?.map(skill => (
                          <Badge key={skill} variant="light" size="sm">{skill}</Badge>
                        ))}
                      </div>
                    </div>

                    <div className="d-flex gap-2">
                      <Button
                        variant="success"
                        size="sm"
                        fullWidth
                        onClick={() => handleAcceptInvitation(team.id)}
                      >
                        <i className="bi bi-check-circle me-1"></i>
                        Accept
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleRejectInvitation(team.id)}
                      >
                        Reject
                      </Button>
                    </div>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* My Teams */}
        <div>
          <h4 className="fw-bold mb-3">
            My Teams
            {myTeams.length > 0 && <Badge variant="primary" className="ms-2">{myTeams.length}</Badge>}
          </h4>

          {myTeams.length === 0 ? (
            <Card className="text-center py-5">
              <i className="bi bi-people display-1 text-muted mb-3"></i>
              <h5 className="text-muted mb-3">No teams yet</h5>
              <p className="text-muted mb-4">Create a new project team to get started</p>
              <Button variant="primary" onClick={() => navigate('/new-project')}>
                <i className="bi bi-plus-circle me-2"></i>
                Create New Team
              </Button>
            </Card>
          ) : (
            <div className="row g-4">
              {myTeams.map(team => (
                <div key={team.id} className="col-lg-6">
                  <Card hoverable>
                    <div className="d-flex justify-content-between align-items-start mb-3">
                      <div>
                        <h5 className="fw-bold mb-1">{team.name}</h5>
                        <p className="text-muted small mb-0">
                          {team.members?.filter(m => m.status === 'ACCEPTED').length || 0} / {team.maxMembers} members
                        </p>
                      </div>
                      <Badge variant={getStatusBadgeVariant(team.status)}>
                        {team.status}
                      </Badge>
                    </div>

                    <p className="text-muted mb-3">{team.description}</p>

                    {/* Team Members */}
                    <div className="mb-3">
                      <strong className="small">Team Members:</strong>
                      <div className="mt-2">
                        {team.members?.slice(0, 5).map(member => (
                          <div key={member.id} className="d-flex align-items-center justify-content-between mb-2">
                            <div className="d-flex align-items-center gap-2">
                              <img
                                src={member.user.photoURL || 'https://i.pravatar.cc/40'}
                                alt={member.user.displayName}
                                className="rounded-circle"
                                style={{ width: '32px', height: '32px' }}
                              />
                              <div>
                                <div className="small fw-semibold">{member.user.displayName}</div>
                                <div className="text-muted" style={{ fontSize: '12px' }}>
                                  {member.role}
                                </div>
                              </div>
                            </div>
                            <Badge variant={getMemberStatusBadgeVariant(member.status)} size="sm">
                              {member.status}
                            </Badge>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Mentor */}
                    {team.mentor && (
                      <div className="alert alert-info py-2 mb-0">
                        <i className="bi bi-person-badge me-2"></i>
                        <strong>Mentor:</strong> {team.mentor.displayName}
                      </div>
                    )}

                    {team.status === 'ACTIVE' && (
                      <div className="d-flex gap-2 mt-3">
                        <Button 
                          variant="primary" 
                          fullWidth 
                          onClick={(e) => {
                            e.stopPropagation();
                            console.log('Team Chat clicked for team:', team.id);
                            navigate(`/teams/${team.id}/chat`);
                          }}
                        >
                          <i className="bi bi-chat-dots me-2"></i>
                          Team Chat
                        </Button>
                        <Button 
                          variant="outline" 
                          onClick={(e) => {
                            e.stopPropagation();
                            console.log('Project clicked for team:', team.id, 'Project:', team.project);
                            if (team.project?.id) {
                              navigate(`/projects/${team.project.id}`);
                            } else {
                              console.error('No project found for team:', team.id);
                            }
                          }}
                        >
                          <i className="bi bi-box-arrow-up-right me-2"></i>
                          Project
                        </Button>
                      </div>
                    )}

                    {team.status !== 'ACTIVE' && (
                      <div className="alert alert-warning py-2 mb-0 mt-3">
                        <i className="bi bi-info-circle me-2"></i>
                        Team status: {team.status}
                      </div>
                    )}
                  </Card>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default TeamsPage;
