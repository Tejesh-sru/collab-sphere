import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import { Card } from '../components/common';

/**
 * Dashboard Page
 * User dashboard with stats, recent activity, and quick actions
 */
function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleConnect = (personName) => {
    // TODO: Implement actual connection request to backend
    alert(`Connection request sent to ${personName}!`);
  };

  const handleFindStudents = () => {
    navigate('/explore');
  };

  const handleFindMentor = () => {
    navigate('/explore');
  };

  const handleNewProject = () => {
    navigate('/new-project');
  };

  const stats = [
    { label: 'Connections', value: '127', icon: 'people', color: 'primary', change: '+12 this week' },
    { label: 'Mentors', value: '5', icon: 'person-badge', color: 'success', change: '+2 this month' },
    { label: 'Projects', value: '8', icon: 'kanban', color: 'warning', change: '3 active' },
    { label: 'Profile Views', value: '342', icon: 'eye', color: 'info', change: '+28% this week' },
  ];

  const recentActivity = [
    {
      id: 1,
      type: 'connection',
      user: { name: 'Sarah Chen', avatar: 'https://i.pravatar.cc/40?img=1', role: 'Computer Science, MIT' },
      action: 'accepted your connection request',
      time: '2 hours ago',
      icon: 'person-check',
      color: 'success',
    },
    {
      id: 2,
      type: 'message',
      user: { name: 'Marcus Johnson', avatar: 'https://i.pravatar.cc/40?img=3', role: 'Business, Harvard' },
      action: 'sent you a message',
      time: '5 hours ago',
      icon: 'chat-left-text',
      color: 'primary',
    },
    {
      id: 3,
      type: 'project',
      user: { name: 'Emily Rodriguez', avatar: 'https://i.pravatar.cc/40?img=5', role: 'Data Science, Stanford' },
      action: 'invited you to join "ML Research Project"',
      time: '1 day ago',
      icon: 'folder-plus',
      color: 'warning',
    },
    {
      id: 4,
      type: 'endorsement',
      user: { name: 'David Kim', avatar: 'https://i.pravatar.cc/40?img=8', role: 'Engineering, Berkeley' },
      action: 'endorsed you for Python',
      time: '2 days ago',
      icon: 'award',
      color: 'info',
    },
  ];

  const suggestedConnections = [
    { name: 'Alex Thompson', role: 'AI Research, MIT', avatar: 'https://i.pravatar.cc/60?img=12', skills: ['Machine Learning', 'Python'] },
    { name: 'Jessica Lee', role: 'Product Design, Stanford', avatar: 'https://i.pravatar.cc/60?img=9', skills: ['UI/UX', 'Figma'] },
    { name: 'Ryan Martinez', role: 'Web Dev, Berkeley', avatar: 'https://i.pravatar.cc/60?img=15', skills: ['React', 'Node.js'] },
  ];

  return (
    <div className="min-vh-100" style={{ backgroundColor: 'var(--cs-bg-secondary)' }}>
      <Navbar />
      
      <div className="container" style={{ paddingTop: '100px', paddingBottom: '60px' }}>
        {/* Welcome Banner */}
        <Card className="mb-4 bg-gradient" style={{ background: 'linear-gradient(135deg, var(--cs-primary) 0%, var(--cs-secondary) 100%)' }}>
          <div className="text-white">
            <h2 className="fw-bold mb-2">Welcome back, {user?.displayName?.split(' ')[0] || 'User'}! 👋</h2>
            <p className="mb-0 opacity-75">
              You have 3 new connection requests and 2 project invitations waiting for you.
            </p>
          </div>
        </Card>

        {/* Stats Grid */}
        <div className="row g-4 mb-4">
          {stats.map((stat, index) => (
            <div key={index} className="col-lg-3 col-md-6">
              <Card className="h-100">
                <div className="d-flex align-items-start justify-content-between">
                  <div>
                    <p className="text-muted mb-1 small text-uppercase">{stat.label}</p>
                    <h3 className="fw-bold mb-2">{stat.value}</h3>
                    <small className="text-success">
                      <i className="bi bi-arrow-up me-1"></i>
                      {stat.change}
                    </small>
                  </div>
                  <div className={`icon-box bg-${stat.color}-subtle text-${stat.color}`}>
                    <i className={`bi bi-${stat.icon}`}></i>
                  </div>
                </div>
              </Card>
            </div>
          ))}
        </div>

        <div className="row g-4">
          {/* Recent Activity */}
          <div className="col-lg-8">
            <Card header={<h5 className="mb-0 fw-bold">Recent Activity</h5>}>
              <div className="list-group list-group-flush">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="list-group-item border-0 px-0">
                    <div className="d-flex gap-3">
                      <div className="position-relative">
                        <img
                          src={activity.user.avatar}
                          alt={activity.user.name}
                          className="rounded-circle"
                          style={{ width: '48px', height: '48px' }}
                        />
                        <span
                          className={`position-absolute bottom-0 end-0 bg-${activity.color} rounded-circle border border-2 border-white d-flex align-items-center justify-content-center`}
                          style={{ width: '20px', height: '20px', fontSize: '10px' }}
                        >
                          <i className={`bi bi-${activity.icon} text-white`}></i>
                        </span>
                      </div>
                      <div className="flex-grow-1">
                        <p className="mb-1">
                          <strong>{activity.user.name}</strong> {activity.action}
                        </p>
                        <p className="text-muted mb-0 small">{activity.user.role}</p>
                      </div>
                      <small className="text-muted">{activity.time}</small>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Quick Actions */}
            <Card header={<h5 className="mb-0 fw-bold">Quick Actions</h5>} className="mt-4">
              <div className="row g-3">
                <div className="col-md-4">
                  <button className="btn btn-outline-primary w-100" onClick={handleFindStudents}>
                    <i className="bi bi-search me-2"></i>
                    Find Students
                  </button>
                </div>
                <div className="col-md-4">
                  <button className="btn btn-outline-success w-100" onClick={handleFindMentor}>
                    <i className="bi bi-person-plus me-2"></i>
                    Find Mentor
                  </button>
                </div>
                <div className="col-md-4">
                  <button className="btn btn-outline-warning w-100" onClick={handleNewProject}>
                    <i className="bi bi-folder-plus me-2"></i>
                    New Project
                  </button>
                </div>
              </div>
            </Card>
          </div>

          {/* Suggested Connections */}
          <div className="col-lg-4">
            <Card header={<h5 className="mb-0 fw-bold">Suggested Connections</h5>}>
              <div className="d-flex flex-column gap-3">
                {suggestedConnections.map((person, index) => (
                  <div key={index} className="d-flex flex-column">
                    <div className="d-flex gap-3 mb-2">
                      <img
                        src={person.avatar}
                        alt={person.name}
                        className="rounded-circle"
                        style={{ width: '48px', height: '48px' }}
                      />
                      <div className="flex-grow-1">
                        <h6 className="mb-0 fw-bold">{person.name}</h6>
                        <small className="text-muted">{person.role}</small>
                      </div>
                    </div>
                    <div className="d-flex flex-wrap gap-1 mb-2">
                      {person.skills.map((skill, i) => (
                        <span key={i} className="badge-custom small">{skill}</span>
                      ))}
                    </div>
                    <button className="btn btn-primary-custom btn-sm" onClick={() => handleConnect(person.name)}>
                      <i className="bi bi-person-plus me-1"></i>
                      Connect
                    </button>
                    {index < suggestedConnections.length - 1 && <hr className="my-3" />}
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
