import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import { Card, Button, Input, Badge } from '../components/common';
import api from '../services/api';

function NewProjectPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    requiredSkills: [],
    maxMembers: 5,
  });

  const availableSkills = [
    'React', 'Node.js', 'Python', 'Java', 'JavaScript', 'TypeScript',
    'Machine Learning', 'Data Science', 'Mobile Dev', 'UI/UX', 'DevOps',
    'C++', 'Cybersecurity', 'Blockchain', 'Cloud Computing', 'SQL'
  ];

  const handleSkillToggle = (skill) => {
    setFormData(prev => ({
      ...prev,
      requiredSkills: prev.requiredSkills.includes(skill)
        ? prev.requiredSkills.filter(s => s !== skill)
        : [...prev.requiredSkills, skill]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.requiredSkills.length === 0) {
      alert('Please select at least one skill');
      return;
    }

    setLoading(true);
    try {
      const response = await api.post('/teams/create', formData);
      
      if (response.data.success) {
        const teamData = response.data.data;
        // Navigate to browse students page to manually select team members
        navigate('/browse-students', {
          state: {
            teamId: teamData.id,
            teamName: teamData.name,
            requiredSkills: formData.requiredSkills
          }
        });
      }
    } catch (error) {
      console.error('Error creating team:', error);
      alert('Failed to create team. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-vh-100" style={{ backgroundColor: 'var(--cs-bg-secondary)' }}>
      <Navbar />
      
      <div className="container" style={{ paddingTop: '100px', paddingBottom: '60px' }}>
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <Card>
              <h2 className="fw-bold mb-2">Create New Project Team</h2>
              <p className="text-muted mb-4">
                We'll automatically match you with the best team members and assign a mentor based on your selected skills.
              </p>

              <form onSubmit={handleSubmit}>
                {/* Team Name */}
                <div className="mb-4">
                  <label className="form-label fw-semibold">Team Name *</label>
                  <Input
                    type="text"
                    placeholder="e.g., AI Research Team"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>

                {/* Description */}
                <div className="mb-4">
                  <label className="form-label fw-semibold">Project Description *</label>
                  <textarea
                    className="form-control"
                    rows="4"
                    placeholder="Describe what your team wants to build..."
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    required
                  />
                </div>

                {/* Required Skills */}
                <div className="mb-4">
                  <label className="form-label fw-semibold">
                    Required Skills * ({formData.requiredSkills.length} selected)
                  </label>
                  <p className="text-muted small mb-2">Select skills needed for this project</p>
                  <div className="d-flex flex-wrap gap-2">
                    {availableSkills.map(skill => (
                      <Badge
                        key={skill}
                        variant={formData.requiredSkills.includes(skill) ? 'primary' : 'light'}
                        className="cursor-pointer"
                        onClick={() => handleSkillToggle(skill)}
                        style={{ cursor: 'pointer', padding: '8px 16px', fontSize: '14px' }}
                      >
                        {skill}
                        {formData.requiredSkills.includes(skill) && ' ✓'}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Team Size */}
                <div className="mb-4">
                  <label className="form-label fw-semibold">Team Size</label>
                  <select
                    className="form-select"
                    value={formData.maxMembers}
                    onChange={(e) => setFormData({ ...formData, maxMembers: parseInt(e.target.value) })}
                  >
                    <option value="3">3 members</option>
                    <option value="4">4 members</option>
                    <option value="5">5 members (recommended)</option>
                    <option value="6">6 members</option>
                  </select>
                  <small className="text-muted">Including you as the team leader</small>
                </div>

                {/* Info Box */}
                <div className="alert alert-info mb-4">
                  <i className="bi bi-info-circle me-2"></i>
                  <strong>How it works:</strong>
                  <ul className="mb-0 mt-2">
                    <li>Select the skills your team needs</li>
                    <li>Browse student profiles ranked by skill match</li>
                    <li>Send invitations to students you want on your team</li>
                    <li>Once team members accept, your team is ready!</li>
                    <li>A real-world project will be assigned based on your team's skill set</li>
                    <li>Get access to interactive tools to manage and complete your project</li>
                  </ul>
                </div>

                {/* Buttons */}
                <div className="d-flex gap-3">
                  <Button
                    type="submit"
                    variant="primary"
                    disabled={loading}
                    fullWidth
                  >
                    {loading ? 'Creating Team...' : 'Create Team & Browse Students'}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => navigate('/dashboard')}
                    style={{ minWidth: '120px' }}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewProjectPage;
