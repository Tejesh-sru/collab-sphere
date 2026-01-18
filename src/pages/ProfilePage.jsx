import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Navbar from '../components/common/Navbar';
import { Card, Button, Badge } from '../components/common';
import api from '../services/api';
import userService from '../services/userService';

/**
 * Profile Page
 * User profile with avatar, bio, skills, education, and projects
 */
function ProfilePage() {
  const { userId } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [profileData, setProfileData] = useState(null);
  const [connectionStatus, setConnectionStatus] = useState('NONE');
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  
  // Mock profile data (in production, fetch based on userId)
  const isOwnProfile = !userId || userId === user?.uid;

  useEffect(() => {
    fetchProfileData();
    if (!isOwnProfile && userId) {
      fetchConnectionStatus();
    }
  }, [userId]);

  const fetchProfileData = async () => {
    try {
      if (isOwnProfile) {
        // Use current user's data
        setProfileData({
          id: user?.uid,
          name: user?.displayName || 'User',
          email: user?.email,
          role: 'Student',
          university: 'University',
          location: 'Location',
          avatar: user?.photoURL || `https://ui-avatars.com/api/?name=${user?.displayName || 'User'}&background=4f46e5&color=fff`,
          coverImage: 'https://images.unsplash.com/photo-1557683316-973673baf926?w=1200&h=300&fit=crop',
          bio: 'Welcome to my profile!',
          connections: 0,
          followers: 0,
          following: 0,
          isOnline: true,
          joinDate: 'January 2025',
          skills: [],
          interests: []
        });
      } else {
        // Fetch other user's profile
        const response = await api.get(`/users/${userId}`);
        if (response.data.success) {
          const userData = response.data.data;
          setProfileData({
            id: userData.id,
            name: userData.displayName || 'User',
            email: userData.email,
            role: userData.role || 'Student',
            university: 'University',
            location: 'Location',
            avatar: userData.photoURL || `https://ui-avatars.com/api/?name=${userData.displayName || 'User'}&background=4f46e5&color=fff`,
            coverImage: 'https://images.unsplash.com/photo-1557683316-973673baf926?w=1200&h=300&fit=crop',
            bio: userData.bio || 'Welcome to my profile!',
            connections: 0,
            followers: 0,
            following: 0,
            isOnline: true,
            joinDate: 'January 2025',
            skills: userData.skills || [],
            interests: userData.interests || []
          });
        }
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchConnectionStatus = async () => {
    try {
      const response = await userService.getConnectionStatus(userId);
      if (response.success) {
        setConnectionStatus(response.data);
      }
    } catch (error) {
      console.error('Error fetching connection status:', error);
    }
  };

  const handleConnect = async () => {
    try {
      setActionLoading(true);
      const response = await userService.sendConnectionRequest(userId);
      if (response.success) {
        setConnectionStatus('PENDING_SENT');
        alert('Connection request sent successfully!');
      }
    } catch (error) {
      console.error('Error sending connection request:', error);
      alert(error.response?.data?.message || 'Failed to send connection request');
    } finally {
      setActionLoading(false);
    }
  };

  const handleMessage = () => {
    navigate(`/messages?user=${userId}`);
  };

  const renderConnectionButton = () => {
    if (isOwnProfile) return null;

    switch (connectionStatus) {
      case 'CONNECTED':
        return (
          <Button variant="outline" disabled>
            <i className="bi bi-check-circle me-2"></i>
            Connected
          </Button>
        );
      case 'PENDING_SENT':
        return (
          <Button variant="outline" disabled>
            <i className="bi bi-clock me-2"></i>
            Request Sent
          </Button>
        );
      case 'PENDING_RECEIVED':
        return (
          <Button variant="primary" onClick={() => navigate('/connections')}>
            <i className="bi bi-person-check me-2"></i>
            Accept Request
          </Button>
        );
      case 'SELF':
        return null;
      default:
        return (
          <Button variant="primary" onClick={handleConnect} disabled={actionLoading}>
            <i className="bi bi-person-plus me-2"></i>
            {actionLoading ? 'Sending...' : 'Connect'}
          </Button>
        );
    }
  };

  if (loading || !profileData) {
    return (
      <div className="min-vh-100" style={{ backgroundColor: 'var(--cs-bg-secondary)' }}>
        <Navbar />
        <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    );
  }
  
  const profileData2 = {
    name: isOwnProfile ? (user?.displayName || 'User') : profileData.name,
    role: profileData.role,
    university: profileData.university,
    location: profileData.location,
    avatar: profileData.avatar,
    coverImage: profileData.coverImage,
    bio: profileData.bio,
    connections: profileData.connections,
    followers: profileData.followers,
    following: profileData.following,
    isOnline: profileData.isOnline,
    joinDate: profileData.joinDate,
  };

  const skills = profileData.skills && profileData.skills.length > 0 ? profileData.skills : [
    'Machine Learning', 'Python', 'TensorFlow', 'Data Science',
    'Neural Networks', 'Computer Vision', 'NLP', 'React', 'JavaScript'
  ];

  const interests = profileData.interests && profileData.interests.length > 0 ? profileData.interests : [
    'AI Research', 'Deep Learning', 'Open Source', 'Hackathons', 'Mentorship'
  ];

  const education = [
    {
      degree: 'B.S. Computer Science',
      institution: 'Stanford University',
      period: '2023 - Present',
      gpa: '3.9/4.0',
    },
  ];

  const projects = [
    {
      title: 'AI Image Generator',
      description: 'Built a GAN-based image generation model using PyTorch. Achieved state-of-the-art results on benchmark datasets.',
      technologies: ['Python', 'PyTorch', 'Machine Learning'],
      link: '#',
    },
    {
      title: 'Student Collaboration Platform',
      description: 'Full-stack web application connecting students for project collaboration. Used by 500+ students.',
      technologies: ['React', 'Node.js', 'MongoDB'],
      link: '#',
    },
    {
      title: 'Real-time Chat Application',
      description: 'Scalable chat application with WebSocket support and end-to-end encryption.',
      technologies: ['React', 'Socket.io', 'Express'],
      link: '#',
    },
  ];

  const achievements = [
    { icon: 'trophy', title: 'Hackathon Winner', description: '1st place at Stanford Hackathon 2025' },
    { icon: 'star', title: 'Top Contributor', description: 'Top 10 open source contributor' },
    { icon: 'award', title: 'Research Award', description: 'Best undergraduate research paper' },
  ];

  return (
    <div className="min-vh-100" style={{ backgroundColor: 'var(--cs-bg-secondary)' }}>
      <Navbar />
      
      <div className="container" style={{ paddingTop: '80px', paddingBottom: '60px' }}>
        {/* Cover Image & Profile Header */}
        <Card className="mb-4 overflow-hidden p-0">
          {/* Cover Image */}
          <div 
            className="position-relative"
            style={{
              height: '200px',
              background: `url(${profileData2.coverImage}) center/cover`,
            }}
          >
            {isOwnProfile && (
              <button className="btn btn-light btn-sm position-absolute bottom-0 end-0 m-3">
                <i className="bi bi-camera me-2"></i>
                Edit Cover
              </button>
            )}
          </div>

          {/* Profile Info */}
          <div className="p-4">
            <div className="row align-items-end" style={{ marginTop: '-60px' }}>
              <div className="col-md-auto text-center text-md-start mb-3 mb-md-0">
                <div className="position-relative d-inline-block">
                  <img
                    src={profileData2.avatar}
                    alt={profileData2.name}
                    className="rounded-circle border border-4 border-white shadow-lg"
                    style={{ width: '150px', height: '150px', objectFit: 'cover' }}
                  />
                  {profileData2.isOnline && (
                    <span
                      className="position-absolute bottom-0 end-0 bg-success rounded-circle border border-3 border-white"
                      style={{ width: '24px', height: '24px' }}
                    ></span>
                  )}
                  {isOwnProfile && (
                    <button className="btn btn-primary btn-sm rounded-circle position-absolute bottom-0 end-0 m-2">
                      <i className="bi bi-camera"></i>
                    </button>
                  )}
                </div>
              </div>

              <div className="col-md flex-grow-1 text-center text-md-start">
                <h2 className="fw-bold mb-1">{profileData2.name}</h2>
                <p className="text-muted mb-2">{profileData2.role} • {profileData2.university}</p>
                <p className="text-muted small mb-3">
                  <i className="bi bi-geo-alt me-1"></i>
                  {profileData2.location}
                  <span className="ms-3">
                    <i className="bi bi-calendar me-1"></i>
                    Joined {profileData2.joinDate}
                  </span>
                </p>

                <div className="d-flex gap-4 justify-content-center justify-content-md-start mb-3">
                  <div>
                    <strong>{profileData2.connections}</strong>
                    <span className="text-muted ms-1">Connections</span>
                  </div>
                  <div>
                    <strong>{profileData2.followers}</strong>
                    <span className="text-muted ms-1">Followers</span>
                  </div>
                  <div>
                    <strong>{profileData2.following}</strong>
                    <span className="text-muted ms-1">Following</span>
                  </div>
                </div>
              </div>

              {!isOwnProfile && (
                <div className="col-md-auto text-center text-md-end">
                  <div className="d-flex gap-2 justify-content-center justify-content-md-end">
                    {renderConnectionButton()}
                    {connectionStatus === 'CONNECTED' && (
                      <Button variant="outline" onClick={handleMessage}>
                        <i className="bi bi-chat me-2"></i>
                        Message
                      </Button>
                    )}
                    <Button variant="outline">
                      <i className="bi bi-three-dots"></i>
                    </Button>
                  </div>
                </div>
              )}

              {isOwnProfile && (
                <div className="col-md-auto text-center text-md-end">
                  <Button variant="outline" icon="pencil" onClick={() => navigate('/settings')}>
                    Edit Profile
                  </Button>
                </div>
              )}
            </div>
          </div>
        </Card>

        <div className="row g-4">
          {/* Left Column */}
          <div className="col-lg-4">
            {/* About */}
            <Card className="mb-4">
              <h5 className="fw-bold mb-3">About</h5>
              <p className="text-muted mb-0">{profileData2.bio}</p>
            </Card>

            {/* Skills */}
            <Card className="mb-4">
              <h5 className="fw-bold mb-3">Skills</h5>
              <div className="d-flex flex-wrap gap-2">
                {skills.map((skill, index) => (
                  <Badge key={index} variant="primary">
                    {skill}
                  </Badge>
                ))}
              </div>
            </Card>

            {/* Interests */}
            <Card className="mb-4">
              <h5 className="fw-bold mb-3">Interests</h5>
              <div className="d-flex flex-wrap gap-2">
                {interests.map((interest, index) => (
                  <Badge key={index} variant="secondary">
                    {interest}
                  </Badge>
                ))}
              </div>
            </Card>

            {/* Achievements */}
            <Card>
              <h5 className="fw-bold mb-3">Achievements</h5>
              {achievements.map((achievement, index) => (
                <div key={index} className={`d-flex gap-3 ${index < achievements.length - 1 ? 'mb-3 pb-3 border-bottom' : ''}`}>
                  <div className="icon-box bg-warning-subtle text-warning">
                    <i className={`bi bi-${achievement.icon}`}></i>
                  </div>
                  <div>
                    <h6 className="fw-bold mb-1">{achievement.title}</h6>
                    <p className="text-muted small mb-0">{achievement.description}</p>
                  </div>
                </div>
              ))}
            </Card>
          </div>

          {/* Right Column */}
          <div className="col-lg-8">
            {/* Education */}
            <Card className="mb-4">
              <h5 className="fw-bold mb-3">Education</h5>
              {education.map((edu, index) => (
                <div key={index} className="d-flex gap-3">
                  <div className="icon-box bg-primary-subtle text-primary flex-shrink-0">
                    <i className="bi bi-mortarboard"></i>
                  </div>
                  <div>
                    <h6 className="fw-bold mb-1">{edu.degree}</h6>
                    <p className="text-muted mb-1">{edu.institution}</p>
                    <p className="text-muted small mb-1">{edu.period}</p>
                    <p className="text-muted small mb-0">GPA: {edu.gpa}</p>
                  </div>
                </div>
              ))}
            </Card>

            {/* Projects */}
            <Card>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className="fw-bold mb-0">Projects</h5>
                {isOwnProfile && (
                  <Button variant="outline" size="sm">
                    <i className="bi bi-plus-lg me-1"></i>
                    Add Project
                  </Button>
                )}
              </div>

              {projects.map((project, index) => (
                <div
                  key={index}
                  className={`${index < projects.length - 1 ? 'mb-4 pb-4 border-bottom' : ''}`}
                >
                  <h6 className="fw-bold mb-2">{project.title}</h6>
                  <p className="text-muted mb-3">{project.description}</p>
                  <div className="d-flex flex-wrap gap-2 mb-3">
                    {project.technologies.map((tech, i) => (
                      <Badge key={i} variant="info" size="sm">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                  <a href={project.link} className="link-custom small">
                    View Project <i className="bi bi-arrow-right ms-1"></i>
                  </a>
                </div>
              ))}
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
