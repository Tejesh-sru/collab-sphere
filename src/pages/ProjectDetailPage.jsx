import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import { Card, Button, Badge, Input } from '../components/common';
import api from '../services/api';

function ProjectDetailPage() {
  const { projectId } = useParams();
  const [project, setProject] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [showNewTaskModal, setShowNewTaskModal] = useState(false);
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    priority: 'MEDIUM',
    assignedTo: null
  });

  useEffect(() => {
    fetchProjectData();
  }, [projectId]);

  const fetchProjectData = async () => {
    setLoading(true);
    try {
      const [projectRes, tasksRes] = await Promise.all([
        api.get(`/projects/${projectId}`),
        api.get(`/projects/${projectId}/tasks`)
      ]);

      if (projectRes.data.success) {
        setProject(projectRes.data.data);
      }
      if (tasksRes.data.success) {
        setTasks(tasksRes.data.data || []);
      }
    } catch (error) {
      console.error('Error fetching project:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTask = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post(`/projects/${projectId}/tasks`, newTask);
      if (response.data.success) {
        setTasks([...tasks, response.data.data]);
        setShowNewTaskModal(false);
        setNewTask({ title: '', description: '', priority: 'MEDIUM', assignedTo: null });
      }
    } catch (error) {
      console.error('Error creating task:', error);
      alert('Failed to create task');
    }
  };

  const handleUpdateTaskStatus = async (taskId, newStatus) => {
    try {
      const response = await api.put(`/projects/tasks/${taskId}/status`, { status: newStatus });
      if (response.data.success) {
        setTasks(tasks.map(t => t.id === taskId ? response.data.data : t));
        fetchProjectData(); // Refresh to update progress
      }
    } catch (error) {
      console.error('Error updating task:', error);
      alert('Failed to update task');
    }
  };

  const getTasksByStatus = (status) => {
    return tasks.filter(task => task.status === status);
  };

  const getPriorityColor = (priority) => {
    const colors = {
      LOW: 'success',
      MEDIUM: 'warning',
      HIGH: 'danger',
      URGENT: 'danger'
    };
    return colors[priority] || 'secondary';
  };

  if (loading) {
    return (
      <div className="min-vh-100 d-flex align-items-center justify-content-center" style={{ backgroundColor: 'var(--cs-bg-secondary)' }}>
        <div className="text-center">
          <div className="spinner-border text-primary mb-3" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="text-muted">Loading project...</p>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-vh-100" style={{ backgroundColor: 'var(--cs-bg-secondary)' }}>
        <Navbar />
        <div className="container text-center" style={{ paddingTop: '100px' }}>
          <h3>Project not found</h3>
        </div>
      </div>
    );
  }

  return (
    <div className="min-vh-100" style={{ backgroundColor: 'var(--cs-bg-secondary)' }}>
      <Navbar />
      
      <div className="container" style={{ paddingTop: '100px', paddingBottom: '60px' }}>
        {/* Project Header */}
        <Card className="mb-4">
          <div className="row align-items-center">
            <div className="col-md-8">
              <h2 className="fw-bold mb-2">{project.title}</h2>
              <p className="text-muted mb-3">{project.description}</p>
              <div className="d-flex flex-wrap gap-2 mb-3">
                {project.technologies?.map(tech => (
                  <Badge key={tech} variant="primary">{tech}</Badge>
                ))}
              </div>
            </div>
            <div className="col-md-4 text-md-end">
              <Badge variant="primary" className="mb-2">{project.difficulty}</Badge>
              <div className="mb-2">
                <strong>Progress:</strong> {project.progressPercentage}%
              </div>
              <div className="progress" style={{ height: '8px' }}>
                <div
                  className="progress-bar bg-success"
                  role="progressbar"
                  style={{ width: `${project.progressPercentage}%` }}
                ></div>
              </div>
            </div>
          </div>
        </Card>

        {/* Tabs */}
        <ul className="nav nav-tabs mb-4">
          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === 'overview' ? 'active' : ''}`}
              onClick={() => setActiveTab('overview')}
            >
              Overview
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === 'tasks' ? 'active' : ''}`}
              onClick={() => setActiveTab('tasks')}
            >
              Tasks Board
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === 'team' ? 'active' : ''}`}
              onClick={() => setActiveTab('team')}
            >
              Team
            </button>
          </li>
        </ul>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="row g-4">
            <div className="col-lg-8">
              <Card header={<h5 className="mb-0 fw-bold">Project Details</h5>}>
                <div className="mb-4">
                  <h6 className="fw-bold">Requirements</h6>
                  <p className="text-muted">{project.requirements}</p>
                </div>
                <div className="mb-4">
                  <h6 className="fw-bold">Objectives</h6>
                  <p className="text-muted">{project.objectives}</p>
                </div>
                <div className="mb-4">
                  <h6 className="fw-bold">Duration</h6>
                  <p className="text-muted">{project.estimatedDurationWeeks} weeks</p>
                </div>
                {project.githubUrl && (
                  <div>
                    <h6 className="fw-bold">GitHub Repository</h6>
                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="btn btn-outline-primary btn-sm">
                      <i className="bi bi-github me-2"></i>
                      View Repository
                    </a>
                  </div>
                )}
              </Card>
            </div>

            <div className="col-lg-4">
              <Card header={<h5 className="mb-0 fw-bold">Quick Stats</h5>}>
                <div className="mb-3">
                  <div className="d-flex justify-content-between mb-2">
                    <span className="text-muted">Total Tasks</span>
                    <strong>{tasks.length}</strong>
                  </div>
                  <div className="d-flex justify-content-between mb-2">
                    <span className="text-muted">Completed</span>
                    <strong className="text-success">
                      {tasks.filter(t => t.status === 'COMPLETED').length}
                    </strong>
                  </div>
                  <div className="d-flex justify-content-between mb-2">
                    <span className="text-muted">In Progress</span>
                    <strong className="text-warning">
                      {tasks.filter(t => t.status === 'IN_PROGRESS').length}
                    </strong>
                  </div>
                  <div className="d-flex justify-content-between">
                    <span className="text-muted">To Do</span>
                    <strong className="text-primary">
                      {tasks.filter(t => t.status === 'TODO').length}
                    </strong>
                  </div>
                </div>
              </Card>

              <Card header={<h5 className="mb-0 fw-bold">Quick Actions</h5>} className="mt-3">
                <div className="d-grid gap-2">
                  <Button variant="primary" onClick={() => setActiveTab('tasks')}>
                    <i className="bi bi-kanban me-2"></i>
                    View Task Board
                  </Button>
                  <Button variant="outline" onClick={() => window.location.href = `/teams/${project.team.id}/chat`}>
                    <i className="bi bi-chat-dots me-2"></i>
                    Team Chat
                  </Button>
                  <Button variant="outline">
                    <i className="bi bi-folder me-2"></i>
                    Files
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        )}

        {/* Tasks Board Tab */}
        {activeTab === 'tasks' && (
          <div>
            <div className="mb-4">
              <Button variant="primary" onClick={() => setShowNewTaskModal(true)}>
                <i className="bi bi-plus-circle me-2"></i>
                Add New Task
              </Button>
            </div>

            <div className="row g-4">
              {/* To Do Column */}
              <div className="col-lg-3">
                <Card>
                  <h6 className="fw-bold mb-3">
                    To Do <Badge variant="primary">{getTasksByStatus('TODO').length}</Badge>
                  </h6>
                  <div className="d-flex flex-column gap-2">
                    {getTasksByStatus('TODO').map(task => (
                      <TaskCard key={task.id} task={task} onUpdateStatus={handleUpdateTaskStatus} getPriorityColor={getPriorityColor} />
                    ))}
                  </div>
                </Card>
              </div>

              {/* In Progress Column */}
              <div className="col-lg-3">
                <Card>
                  <h6 className="fw-bold mb-3">
                    In Progress <Badge variant="warning">{getTasksByStatus('IN_PROGRESS').length}</Badge>
                  </h6>
                  <div className="d-flex flex-column gap-2">
                    {getTasksByStatus('IN_PROGRESS').map(task => (
                      <TaskCard key={task.id} task={task} onUpdateStatus={handleUpdateTaskStatus} getPriorityColor={getPriorityColor} />
                    ))}
                  </div>
                </Card>
              </div>

              {/* In Review Column */}
              <div className="col-lg-3">
                <Card>
                  <h6 className="fw-bold mb-3">
                    In Review <Badge variant="info">{getTasksByStatus('IN_REVIEW').length}</Badge>
                  </h6>
                  <div className="d-flex flex-column gap-2">
                    {getTasksByStatus('IN_REVIEW').map(task => (
                      <TaskCard key={task.id} task={task} onUpdateStatus={handleUpdateTaskStatus} getPriorityColor={getPriorityColor} />
                    ))}
                  </div>
                </Card>
              </div>

              {/* Completed Column */}
              <div className="col-lg-3">
                <Card>
                  <h6 className="fw-bold mb-3">
                    Completed <Badge variant="success">{getTasksByStatus('COMPLETED').length}</Badge>
                  </h6>
                  <div className="d-flex flex-column gap-2">
                    {getTasksByStatus('COMPLETED').map(task => (
                      <TaskCard key={task.id} task={task} onUpdateStatus={handleUpdateTaskStatus} getPriorityColor={getPriorityColor} />
                    ))}
                  </div>
                </Card>
              </div>
            </div>
          </div>
        )}

        {/* Team Tab */}
        {activeTab === 'team' && project.team && (
          <Card>
            <h5 className="fw-bold mb-4">Team Members</h5>
            <div className="row g-3">
              {project.team.members?.map(member => (
                <div key={member.id} className="col-md-6">
                  <div className="d-flex align-items-center gap-3 p-3 border rounded">
                    <img
                      src={member.user.photoURL || 'https://i.pravatar.cc/60'}
                      alt={member.user.displayName}
                      className="rounded-circle"
                      style={{ width: '60px', height: '60px' }}
                    />
                    <div className="flex-grow-1">
                      <h6 className="mb-1">{member.user.displayName}</h6>
                      <p className="text-muted small mb-1">{member.role}</p>
                      <Badge variant={member.status === 'ACCEPTED' ? 'success' : 'warning'} size="sm">
                        {member.status}
                      </Badge>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        )}
      </div>

      {/* New Task Modal */}
      {showNewTaskModal && (
        <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }} onClick={() => setShowNewTaskModal(false)}>
          <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Create New Task</h5>
                <button type="button" className="btn-close" onClick={() => setShowNewTaskModal(false)}></button>
              </div>
              <form onSubmit={handleCreateTask}>
                <div className="modal-body">
                  <div className="mb-3">
                    <label className="form-label">Task Title *</label>
                    <Input
                      type="text"
                      value={newTask.title}
                      onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Description</label>
                    <textarea
                      className="form-control"
                      rows="3"
                      value={newTask.description}
                      onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Priority</label>
                    <select
                      className="form-select"
                      value={newTask.priority}
                      onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
                    >
                      <option value="LOW">Low</option>
                      <option value="MEDIUM">Medium</option>
                      <option value="HIGH">High</option>
                      <option value="URGENT">Urgent</option>
                    </select>
                  </div>
                </div>
                <div className="modal-footer">
                  <Button type="button" variant="outline" onClick={() => setShowNewTaskModal(false)}>
                    Cancel
                  </Button>
                  <Button type="submit" variant="primary">
                    Create Task
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Task Card Component
function TaskCard({ task, onUpdateStatus, getPriorityColor }) {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div className="card border-start border-3" style={{ borderColor: `var(--bs-${getPriorityColor(task.priority)})` }}>
      <div className="card-body p-2">
        <div className="d-flex justify-content-between align-items-start mb-2">
          <h6 className="mb-0 small">{task.title}</h6>
          <div className="dropdown">
            <button
              className="btn btn-sm btn-link text-muted p-0"
              onClick={() => setShowMenu(!showMenu)}
            >
              <i className="bi bi-three-dots-vertical"></i>
            </button>
            {showMenu && (
              <div className="dropdown-menu show">
                {task.status !== 'IN_PROGRESS' && (
                  <button className="dropdown-item" onClick={() => { onUpdateStatus(task.id, 'IN_PROGRESS'); setShowMenu(false); }}>
                    Mark In Progress
                  </button>
                )}
                {task.status !== 'IN_REVIEW' && (
                  <button className="dropdown-item" onClick={() => { onUpdateStatus(task.id, 'IN_REVIEW'); setShowMenu(false); }}>
                    Mark In Review
                  </button>
                )}
                {task.status !== 'COMPLETED' && (
                  <button className="dropdown-item" onClick={() => { onUpdateStatus(task.id, 'COMPLETED'); setShowMenu(false); }}>
                    Mark Completed
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
        {task.description && (
          <p className="text-muted small mb-2">{task.description.substring(0, 60)}...</p>
        )}
        <div className="d-flex justify-content-between align-items-center">
          <Badge variant={getPriorityColor(task.priority)} size="sm">{task.priority}</Badge>
          {task.assignedTo && (
            <img
              src={task.assignedTo.photoURL || 'https://i.pravatar.cc/24'}
              alt={task.assignedTo.displayName}
              className="rounded-circle"
              style={{ width: '24px', height: '24px' }}
              title={task.assignedTo.displayName}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default ProjectDetailPage;
