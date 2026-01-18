import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import api from '../services/api';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';
import Avatar from '../components/common/Avatar';
import Alert from '../components/common/Alert';
import Loading from '../components/common/Loading';
import '../styles/global.css';

function BrowseStudentsPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { teamId, teamName, requiredSkills } = location.state || {};

  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [invitedUsers, setInvitedUsers] = useState(new Set());
  const [searchSkills, setSearchSkills] = useState(requiredSkills || []);

  useEffect(() => {
    if (!teamId) {
      navigate('/new-project');
      return;
    }
    fetchStudents();
  }, [searchSkills]);

  const fetchStudents = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (searchSkills && searchSkills.length > 0) {
        searchSkills.forEach(skill => params.append('skills', skill));
      }
      const response = await api.get(`/teams/search-students?${params.toString()}`);
      setStudents(response.data.data || []);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load students');
    } finally {
      setLoading(false);
    }
  };

  const handleInvite = async (userId) => {
    try {
      setError(null);
      await api.post(`/teams/${teamId}/invite/${userId}`);
      setInvitedUsers(prev => new Set([...prev, userId]));
      setSuccessMessage('Invitation sent successfully!');
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to send invitation');
    }
  };

  const handleFinish = () => {
    navigate('/teams');
  };

  const getSkillMatchPercentage = (userSkills) => {
    if (!requiredSkills || requiredSkills.length === 0) return 0;
    if (!userSkills || userSkills.length === 0) return 0;
    
    const matchCount = requiredSkills.filter(skill => 
      userSkills.some(s => s.toLowerCase() === skill.toLowerCase())
    ).length;
    
    return Math.round((matchCount / requiredSkills.length) * 100);
  };

  if (loading) return <Loading />;

  return (
    <div style={{ padding: '2rem', maxWidth: '1400px', margin: '0 auto' }}>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: '600', marginBottom: '0.5rem' }}>
          Browse Students
        </h1>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem' }}>
          Select team members for: <strong>{teamName}</strong>
        </p>
        
        {requiredSkills && requiredSkills.length > 0 && (
          <div style={{ marginBottom: '1rem' }}>
            <p style={{ fontSize: '0.875rem', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>
              Required Skills:
            </p>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              {requiredSkills.map(skill => (
                <Badge key={skill} variant="primary">{skill}</Badge>
              ))}
            </div>
          </div>
        )}

        <Button 
          onClick={handleFinish} 
          variant="outline"
          style={{ marginTop: '1rem' }}
        >
          Finish & View My Teams
        </Button>
      </div>

      {error && (
        <Alert variant="error" style={{ marginBottom: '1rem' }}>
          {error}
        </Alert>
      )}

      {successMessage && (
        <Alert variant="success" style={{ marginBottom: '1rem' }}>
          {successMessage}
        </Alert>
      )}

      {students.length === 0 ? (
        <Card>
          <div style={{ textAlign: 'center', padding: '3rem' }}>
            <p style={{ color: 'var(--text-secondary)' }}>
              No students found matching your criteria.
            </p>
          </div>
        </Card>
      ) : (
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
          gap: '1.5rem' 
        }}>
          {students.map(student => {
            const matchPercentage = getSkillMatchPercentage(student.skills);
            const isInvited = invitedUsers.has(student.id);

            return (
              <Card key={student.id} hover>
                <div style={{ padding: '1.5rem' }}>
                  {/* Header with Avatar and Name */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                    <Avatar 
                      src={student.profilePicture} 
                      alt={student.name}
                      size="large"
                    />
                    <div style={{ flex: 1 }}>
                      <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '0.25rem' }}>
                        {student.name}
                      </h3>
                      <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                        {student.email}
                      </p>
                    </div>
                  </div>

                  {/* Bio */}
                  {student.bio && (
                    <p style={{ 
                      fontSize: '0.875rem', 
                      color: 'var(--text-secondary)', 
                      marginBottom: '1rem',
                      lineHeight: '1.5'
                    }}>
                      {student.bio}
                    </p>
                  )}

                  {/* Match Percentage */}
                  {requiredSkills && requiredSkills.length > 0 && (
                    <div style={{ marginBottom: '1rem' }}>
                      <div style={{ 
                        display: 'flex', 
                        justifyContent: 'space-between', 
                        alignItems: 'center',
                        marginBottom: '0.5rem'
                      }}>
                        <span style={{ fontSize: '0.875rem', fontWeight: '500' }}>
                          Skill Match
                        </span>
                        <span style={{ 
                          fontSize: '0.875rem', 
                          fontWeight: '600',
                          color: matchPercentage >= 70 ? 'var(--success)' : 
                                 matchPercentage >= 40 ? 'var(--warning)' : 
                                 'var(--text-secondary)'
                        }}>
                          {matchPercentage}%
                        </span>
                      </div>
                      <div style={{ 
                        width: '100%', 
                        height: '6px', 
                        backgroundColor: 'var(--gray-200)',
                        borderRadius: '3px',
                        overflow: 'hidden'
                      }}>
                        <div style={{ 
                          width: `${matchPercentage}%`, 
                          height: '100%',
                          backgroundColor: matchPercentage >= 70 ? 'var(--success)' : 
                                          matchPercentage >= 40 ? 'var(--warning)' : 
                                          'var(--gray-400)',
                          transition: 'width 0.3s ease'
                        }} />
                      </div>
                    </div>
                  )}

                  {/* Skills */}
                  {student.skills && student.skills.length > 0 && (
                    <div style={{ marginBottom: '1rem' }}>
                      <p style={{ 
                        fontSize: '0.75rem', 
                        fontWeight: '600', 
                        marginBottom: '0.5rem',
                        textTransform: 'uppercase',
                        color: 'var(--text-secondary)'
                      }}>
                        Skills
                      </p>
                      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                        {student.skills.map(skill => {
                          const isRequired = requiredSkills && requiredSkills.some(
                            rs => rs.toLowerCase() === skill.toLowerCase()
                          );
                          return (
                            <Badge 
                              key={skill} 
                              variant={isRequired ? 'primary' : 'secondary'}
                              size="small"
                            >
                              {skill}
                            </Badge>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Interests */}
                  {student.interests && student.interests.length > 0 && (
                    <div style={{ marginBottom: '1rem' }}>
                      <p style={{ 
                        fontSize: '0.75rem', 
                        fontWeight: '600', 
                        marginBottom: '0.5rem',
                        textTransform: 'uppercase',
                        color: 'var(--text-secondary)'
                      }}>
                        Interests
                      </p>
                      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                        {student.interests.slice(0, 3).map(interest => (
                          <Badge key={interest} variant="outline" size="small">
                            {interest}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Action Button */}
                  <Button
                    onClick={() => handleInvite(student.id)}
                    disabled={isInvited}
                    variant={isInvited ? 'outline' : 'primary'}
                    style={{ width: '100%' }}
                  >
                    {isInvited ? '✓ Invited' : 'Send Invitation'}
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default BrowseStudentsPage;
