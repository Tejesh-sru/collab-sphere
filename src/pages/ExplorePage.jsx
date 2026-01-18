import { useState } from 'react';
import Navbar from '../components/common/Navbar';
import { Card, Button, Badge, Input } from '../components/common';

/**
 * Explore Page
 * Search and filter students/mentors
 */
function ExplorePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [selectedInterests, setSelectedInterests] = useState([]);

  const handleConnect = (studentName) => {
    // TODO: Implement actual connection request to backend
    alert(`Connection request sent to ${studentName}!`);
  };

  const handleMessage = (studentName) => {
    // TODO: Navigate to messages page when implemented
    alert(`Opening chat with ${studentName}...`);
  };

  const skills = ['Python', 'JavaScript', 'React', 'Machine Learning', 'Data Science', 'UI/UX', 'Node.js', 'Java', 'C++', 'Mobile Dev'];
  const interests = ['AI Research', 'Web Development', 'Mobile Apps', 'Blockchain', 'Game Dev', 'Cybersecurity'];

  const students = [
    {
      id: 1,
      name: 'Sarah Johnson',
      role: 'Computer Science',
      university: 'Stanford University',
      avatar: 'https://i.pravatar.cc/80?img=1',
      bio: 'Passionate about AI and machine learning. Looking for research collaborators.',
      skills: ['Machine Learning', 'Python', 'Data Science'],
      connections: 234,
      isOnline: true,
    },
    {
      id: 2,
      name: 'Marcus Chen',
      role: 'Software Engineering',
      university: 'MIT',
      avatar: 'https://i.pravatar.cc/80?img=3',
      bio: 'Full-stack developer building scalable web applications.',
      skills: ['React', 'Node.js', 'JavaScript'],
      connections: 189,
      isOnline: false,
    },
    {
      id: 3,
      name: 'Emily Rodriguez',
      role: 'Data Science',
      university: 'UC Berkeley',
      avatar: 'https://i.pravatar.cc/80?img=5',
      bio: 'Data scientist with a focus on predictive analytics and visualization.',
      skills: ['Python', 'Data Science', 'Machine Learning'],
      connections: 156,
      isOnline: true,
    },
    {
      id: 4,
      name: 'David Kim',
      role: 'Product Design',
      university: 'Harvard',
      avatar: 'https://i.pravatar.cc/80?img=8',
      bio: 'UX designer creating delightful user experiences.',
      skills: ['UI/UX', 'Figma', 'Design Systems'],
      connections: 312,
      isOnline: true,
    },
    {
      id: 5,
      name: 'Alex Thompson',
      role: 'Mobile Development',
      university: 'Stanford',
      avatar: 'https://i.pravatar.cc/80?img=12',
      bio: 'iOS and Android developer. Open to mentoring beginners.',
      skills: ['Mobile Dev', 'React', 'JavaScript'],
      connections: 98,
      isOnline: false,
    },
    {
      id: 6,
      name: 'Jessica Lee',
      role: 'Cybersecurity',
      university: 'Carnegie Mellon',
      avatar: 'https://i.pravatar.cc/80?img=9',
      bio: 'Security researcher focused on network security and ethical hacking.',
      skills: ['Python', 'Cybersecurity', 'C++'],
      connections: 145,
      isOnline: true,
    },
  ];

  const toggleSkill = (skill) => {
    setSelectedSkills((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]
    );
  };

  const toggleInterest = (interest) => {
    setSelectedInterests((prev) =>
      prev.includes(interest) ? prev.filter((i) => i !== interest) : [...prev, interest]
    );
  };

  return (
    <div className="min-vh-100" style={{ backgroundColor: 'var(--cs-bg-secondary)' }}>
      <Navbar />
      
      <div className="container" style={{ paddingTop: '100px', paddingBottom: '60px' }}>
        {/* Header */}
        <div className="mb-4">
          <h2 className="fw-bold mb-2">Explore Students & Mentors</h2>
          <p className="text-muted">Discover and connect with amazing students from around the world</p>
        </div>

        <div className="row g-4">
          {/* Filters Sidebar */}
          <div className="col-lg-3">
            <Card>
              <h5 className="fw-bold mb-3">Filters</h5>
              
              {/* Search */}
              <Input
                type="text"
                placeholder="Search by name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                icon="search"
              />

              {/* Skills Filter */}
              <div className="mb-4">
                <h6 className="fw-semibold mb-3">Skills</h6>
                <div className="d-flex flex-wrap gap-2">
                  {skills.map((skill) => (
                    <Badge
                      key={skill}
                      variant={selectedSkills.includes(skill) ? 'primary' : 'light'}
                      className="cursor-pointer"
                      onClick={() => toggleSkill(skill)}
                      style={{ cursor: 'pointer' }}
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Interests Filter */}
              <div className="mb-4">
                <h6 className="fw-semibold mb-3">Interests</h6>
                <div className="d-flex flex-wrap gap-2">
                  {interests.map((interest) => (
                    <Badge
                      key={interest}
                      variant={selectedInterests.includes(interest) ? 'primary' : 'light'}
                      className="cursor-pointer"
                      onClick={() => toggleInterest(interest)}
                      style={{ cursor: 'pointer' }}
                    >
                      {interest}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Clear Filters */}
              {(selectedSkills.length > 0 || selectedInterests.length > 0 || searchQuery) && (
                <Button
                  variant="outline"
                  fullWidth
                  onClick={() => {
                    setSelectedSkills([]);
                    setSelectedInterests([]);
                    setSearchQuery('');
                  }}
                >
                  Clear Filters
                </Button>
              )}
            </Card>
          </div>

          {/* Students Grid */}
          <div className="col-lg-9">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <p className="text-muted mb-0">{students.length} students found</p>
              <select className="form-select form-select-sm w-auto">
                <option>Most Relevant</option>
                <option>Most Connections</option>
                <option>Recently Joined</option>
              </select>
            </div>

            <div className="row g-4">
              {students.map((student) => (
                <div key={student.id} className="col-md-6 col-lg-4">
                  <Card className="h-100 text-center" hoverable>
                    <div className="position-relative d-inline-block mb-3">
                      <img
                        src={student.avatar}
                        alt={student.name}
                        className="rounded-circle"
                        style={{ width: '80px', height: '80px' }}
                      />
                      {student.isOnline && (
                        <span
                          className="position-absolute bottom-0 end-0 bg-success rounded-circle border border-2 border-white"
                          style={{ width: '16px', height: '16px' }}
                        ></span>
                      )}
                    </div>

                    <h5 className="fw-bold mb-1">{student.name}</h5>
                    <p className="text-muted small mb-2">{student.role}</p>
                    <p className="text-muted small mb-3">
                      <i className="bi bi-geo-alt me-1"></i>
                      {student.university}
                    </p>

                    <p className="text-muted small mb-3">{student.bio}</p>

                    <div className="d-flex flex-wrap gap-1 justify-content-center mb-3">
                      {student.skills.slice(0, 3).map((skill, index) => (
                        <Badge key={index} variant="primary" size="sm">
                          {skill}
                        </Badge>
                      ))}
                    </div>

                    <div className="d-flex align-items-center justify-content-center gap-2 mb-3 text-muted small">
                      <i className="bi bi-people"></i>
                      <span>{student.connections} connections</span>
                    </div>

                    <div className="d-flex gap-2">
                      <Button variant="primary" fullWidth size="sm" onClick={() => handleConnect(student.name)}>
                        <i className="bi bi-person-plus me-1"></i>
                        Connect
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleMessage(student.name)}>
                        <i className="bi bi-chat"></i>
                      </Button>
                    </div>
                  </Card>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <nav className="mt-4">
              <ul className="pagination justify-content-center">
                <li className="page-item disabled">
                  <span className="page-link">Previous</span>
                </li>
                <li className="page-item active"><a className="page-link" href="#">1</a></li>
                <li className="page-item"><a className="page-link" href="#">2</a></li>
                <li className="page-item"><a className="page-link" href="#">3</a></li>
                <li className="page-item">
                  <a className="page-link" href="#">Next</a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ExplorePage;
