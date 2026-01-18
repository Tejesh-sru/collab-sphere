import { Link } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';

/**
 * Landing Page
 * Public homepage with hero, features, how-it-works, and testimonials
 */
function LandingPage() {
  return (
    <div className="landing-page">
      <Navbar />
      
      {/* Hero Section */}
      <HeroSection />
      
      {/* Features Section */}
      <FeaturesSection />
      
      {/* Stats Section */}
      <StatsSection />
      
      {/* How It Works Section */}
      <HowItWorksSection />
      
      {/* Testimonials Section */}
      <TestimonialsSection />
      
      {/* CTA Section */}
      <CTASection />
      
      <Footer />
    </div>
  );
}

/**
 * Hero Section Component
 */
function HeroSection() {
  return (
    <section 
      className="hero-section min-vh-100 d-flex align-items-center position-relative overflow-hidden"
      style={{ paddingTop: '80px' }}
    >
      {/* Background Gradient */}
      <div 
        className="position-absolute top-0 start-0 w-100 h-100"
        style={{
          background: 'linear-gradient(135deg, var(--cs-primary-light) 0%, var(--cs-bg-secondary) 50%, var(--cs-secondary-light) 100%)',
          opacity: 0.5,
          zIndex: -1,
        }}
      ></div>
      
      {/* Floating Shapes */}
      <div className="position-absolute" style={{ top: '10%', left: '5%', opacity: 0.1 }}>
        <i className="bi bi-hexagon-fill text-primary" style={{ fontSize: '200px' }}></i>
      </div>
      <div className="position-absolute" style={{ bottom: '10%', right: '5%', opacity: 0.1 }}>
        <i className="bi bi-circle-fill text-secondary" style={{ fontSize: '150px' }}></i>
      </div>

      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-6 mb-5 mb-lg-0">
            <div className="fade-in">
              <span className="badge bg-primary-subtle text-primary mb-3 px-3 py-2">
                🎓 #1 Student Networking Platform
              </span>
              <h1 className="display-3 fw-bold mb-4">
                Connect, Collaborate, and{' '}
                <span className="text-gradient">Grow Together</span>
              </h1>
              <p className="lead text-muted mb-4" style={{ maxWidth: '500px' }}>
                Join thousands of students building meaningful connections, 
                finding mentors, and collaborating on exciting projects. 
                Your professional journey starts here.
              </p>
              <div className="d-flex flex-wrap gap-3 mb-5">
                <Link to="/signup" className="btn btn-primary-custom btn-lg">
                  <i className="bi bi-rocket-takeoff me-2"></i>
                  Get Started Free
                </Link>
                <a href="#how-it-works" className="btn btn-outline-custom btn-lg">
                  <i className="bi bi-play-circle me-2"></i>
                  See How It Works
                </a>
              </div>
              
              {/* Trust Badges */}
              <div className="d-flex align-items-center gap-4 flex-wrap">
                <div className="d-flex align-items-center">
                  <div className="d-flex">
                    {[1, 2, 3, 4].map((i) => (
                      <img
                        key={i}
                        src={`https://i.pravatar.cc/40?img=${i + 10}`}
                        alt="User"
                        className="rounded-circle border border-2 border-white"
                        style={{ 
                          width: '36px', 
                          height: '36px', 
                          marginLeft: i > 1 ? '-10px' : '0' 
                        }}
                      />
                    ))}
                  </div>
                  <span className="ms-3 text-muted small">
                    <strong className="text-dark">10,000+</strong> students joined
                  </span>
                </div>
                <div className="d-flex align-items-center gap-1">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <i key={i} className="bi bi-star-fill text-warning"></i>
                  ))}
                  <span className="ms-2 text-muted small">4.9/5 rating</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="col-lg-6">
            <div className="slide-up">
              <div className="position-relative">
                {/* Main Card */}
                <div className="card card-custom p-4 shadow-lg">
                  <div className="d-flex align-items-center gap-3 mb-4">
                    <img
                      src="https://i.pravatar.cc/60?img=5"
                      alt="Profile"
                      className="rounded-circle"
                      style={{ width: '60px', height: '60px' }}
                    />
                    <div>
                      <h5 className="mb-0 fw-bold">Sarah Johnson</h5>
                      <p className="text-muted mb-0 small">Computer Science • Stanford</p>
                    </div>
                    <button className="btn btn-primary-custom btn-sm ms-auto">
                      Connect
                    </button>
                  </div>
                  <div className="d-flex flex-wrap gap-2 mb-3">
                    <span className="badge-custom">Machine Learning</span>
                    <span className="badge-custom">Python</span>
                    <span className="badge-custom">Data Science</span>
                  </div>
                  <p className="text-muted small mb-0">
                    "Looking for collaborators on an AI research project. 
                    Open to mentoring first-year students!"
                  </p>
                </div>
                
                {/* Floating Notification Card */}
                <div 
                  className="card card-custom p-3 position-absolute shadow"
                  style={{ bottom: '-30px', left: '-30px', maxWidth: '250px' }}
                >
                  <div className="d-flex align-items-center gap-2">
                    <div className="icon-box bg-success-subtle text-success">
                      <i className="bi bi-person-plus"></i>
                    </div>
                    <div>
                      <p className="mb-0 fw-medium small">New Connection!</p>
                      <p className="text-muted mb-0" style={{ fontSize: '12px' }}>
                        Alex accepted your request
                      </p>
                    </div>
                  </div>
                </div>
                
                {/* Floating Stats Card */}
                <div 
                  className="card card-custom p-3 position-absolute shadow"
                  style={{ top: '-20px', right: '-20px', maxWidth: '180px' }}
                >
                  <div className="text-center">
                    <div className="icon-box mx-auto mb-2 bg-primary-subtle">
                      <i className="bi bi-graph-up-arrow"></i>
                    </div>
                    <p className="mb-0 fw-bold">+127%</p>
                    <p className="text-muted mb-0 small">Profile Views</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * Features Section Component
 */
function FeaturesSection() {
  const features = [
    {
      icon: 'people',
      title: 'Smart Networking',
      description: 'Connect with students who share your interests, goals, and academic background through our intelligent matching algorithm.',
      color: 'primary',
    },
    {
      icon: 'mortarboard',
      title: 'Expert Mentorship',
      description: 'Find experienced mentors in your field who can guide you through academic challenges and career decisions.',
      color: 'success',
    },
    {
      icon: 'kanban',
      title: 'Project Collaboration',
      description: 'Team up on exciting projects, from research papers to startup ideas. Build your portfolio together.',
      color: 'warning',
    },
    {
      icon: 'calendar-event',
      title: 'Events & Workshops',
      description: 'Discover and join virtual events, workshops, and study groups organized by students and institutions.',
      color: 'info',
    },
    {
      icon: 'briefcase',
      title: 'Career Opportunities',
      description: 'Get exclusive access to internships, research positions, and job opportunities shared within the community.',
      color: 'danger',
    },
    {
      icon: 'shield-check',
      title: 'Safe & Verified',
      description: 'Connect with confidence. All users are verified students from accredited institutions worldwide.',
      color: 'secondary',
    },
  ];

  return (
    <section id="features" className="section-padding" style={{ backgroundColor: 'var(--cs-bg-primary)' }}>
      <div className="container">
        <div className="text-center mb-5">
          <span className="badge bg-primary-subtle text-primary mb-3 px-3 py-2">
            Features
          </span>
          <h2 className="section-heading">Everything You Need to Succeed</h2>
          <p className="section-subheading">
            Powerful tools and features designed to help students thrive academically 
            and professionally.
          </p>
        </div>
        
        <div className="row g-4">
          {features.map((feature, index) => (
            <div key={index} className="col-lg-4 col-md-6">
              <div className="card card-custom h-100 p-4 text-center hover-scale">
                <div className={`icon-box icon-box-lg mx-auto mb-4 bg-${feature.color}-subtle text-${feature.color}`}>
                  <i className={`bi bi-${feature.icon}`}></i>
                </div>
                <h5 className="fw-bold mb-3">{feature.title}</h5>
                <p className="text-muted mb-0">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/**
 * Stats Section Component
 */
function StatsSection() {
  const stats = [
    { number: '10K+', label: 'Active Students', icon: 'people' },
    { number: '500+', label: 'Universities', icon: 'building' },
    { number: '2K+', label: 'Mentors', icon: 'person-badge' },
    { number: '50K+', label: 'Connections Made', icon: 'link-45deg' },
  ];

  return (
    <section 
      className="py-5"
      style={{ 
        background: 'linear-gradient(135deg, var(--cs-primary) 0%, var(--cs-secondary) 100%)' 
      }}
    >
      <div className="container">
        <div className="row g-4">
          {stats.map((stat, index) => (
            <div key={index} className="col-6 col-lg-3 text-center text-white">
              <i className={`bi bi-${stat.icon} fs-1 mb-2 opacity-75`}></i>
              <h2 className="display-5 fw-bold mb-0">{stat.number}</h2>
              <p className="opacity-75 mb-0">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/**
 * How It Works Section Component
 */
function HowItWorksSection() {
  const steps = [
    {
      step: '01',
      title: 'Create Your Profile',
      description: 'Sign up and build your professional student profile. Showcase your skills, interests, and academic journey.',
      icon: 'person-plus',
    },
    {
      step: '02',
      title: 'Discover & Connect',
      description: 'Browse through students and mentors. Send connection requests to those who align with your goals.',
      icon: 'search',
    },
    {
      step: '03',
      title: 'Collaborate & Grow',
      description: 'Work together on projects, share knowledge, and grow your professional network while still in school.',
      icon: 'rocket-takeoff',
    },
  ];

  return (
    <section id="how-it-works" className="section-padding" style={{ backgroundColor: 'var(--cs-bg-secondary)' }}>
      <div className="container">
        <div className="text-center mb-5">
          <span className="badge bg-primary-subtle text-primary mb-3 px-3 py-2">
            How It Works
          </span>
          <h2 className="section-heading">Get Started in 3 Simple Steps</h2>
          <p className="section-subheading">
            Join our community and start building meaningful connections in minutes.
          </p>
        </div>
        
        <div className="row g-4 align-items-stretch">
          {steps.map((step, index) => (
            <div key={index} className="col-lg-4">
              <div className="card card-custom h-100 p-4 position-relative overflow-hidden">
                {/* Step Number Background */}
                <span 
                  className="position-absolute text-primary fw-bold"
                  style={{ 
                    top: '-20px', 
                    right: '20px', 
                    fontSize: '120px', 
                    opacity: 0.05,
                    lineHeight: 1,
                  }}
                >
                  {step.step}
                </span>
                
                <div className="d-flex align-items-center gap-3 mb-4">
                  <div className="icon-box icon-box-lg">
                    <i className={`bi bi-${step.icon}`}></i>
                  </div>
                  <span className="badge bg-primary text-white px-3 py-2">
                    Step {step.step}
                  </span>
                </div>
                <h4 className="fw-bold mb-3">{step.title}</h4>
                <p className="text-muted mb-0">{step.description}</p>
                
                {index < steps.length - 1 && (
                  <div className="d-none d-lg-block position-absolute" style={{ top: '50%', right: '-30px' }}>
                    <i className="bi bi-arrow-right text-primary fs-3"></i>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/**
 * Testimonials Section Component
 */
function TestimonialsSection() {
  const testimonials = [
    {
      name: 'Emily Chen',
      role: 'Computer Science, MIT',
      image: 'https://i.pravatar.cc/80?img=1',
      quote: 'CollabSphere helped me find an amazing mentor who guided me through my first research project. The connections I made here have been invaluable for my career.',
      rating: 5,
    },
    {
      name: 'Marcus Johnson',
      role: 'Business Admin, Harvard',
      image: 'https://i.pravatar.cc/80?img=3',
      quote: 'I found my startup co-founder on CollabSphere! The platform made it easy to connect with like-minded students who share my entrepreneurial vision.',
      rating: 5,
    },
    {
      name: 'Sofia Rodriguez',
      role: 'Data Science, Stanford',
      image: 'https://i.pravatar.cc/80?img=5',
      quote: 'The mentorship program is incredible. My mentor helped me land my dream internship at a top tech company. Highly recommend to all students!',
      rating: 5,
    },
  ];

  return (
    <section id="testimonials" className="section-padding" style={{ backgroundColor: 'var(--cs-bg-primary)' }}>
      <div className="container">
        <div className="text-center mb-5">
          <span className="badge bg-primary-subtle text-primary mb-3 px-3 py-2">
            Testimonials
          </span>
          <h2 className="section-heading">Loved by Students Worldwide</h2>
          <p className="section-subheading">
            See what our community members have to say about their experience.
          </p>
        </div>
        
        {/* Bootstrap Carousel */}
        <div id="testimonialCarousel" className="carousel slide" data-bs-ride="carousel">
          <div className="carousel-inner">
            {testimonials.map((testimonial, index) => (
              <div key={index} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
                <div className="row justify-content-center">
                  <div className="col-lg-8">
                    <div className="card card-custom p-5 text-center">
                      {/* Quote Icon */}
                      <i className="bi bi-quote text-primary mb-3" style={{ fontSize: '48px' }}></i>
                      
                      {/* Quote Text */}
                      <p className="lead mb-4" style={{ fontStyle: 'italic' }}>
                        "{testimonial.quote}"
                      </p>
                      
                      {/* Rating */}
                      <div className="d-flex justify-content-center gap-1 mb-4">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <i key={i} className="bi bi-star-fill text-warning"></i>
                        ))}
                      </div>
                      
                      {/* Author */}
                      <div className="d-flex align-items-center justify-content-center gap-3">
                        <img
                          src={testimonial.image}
                          alt={testimonial.name}
                          className="rounded-circle"
                          style={{ width: '60px', height: '60px' }}
                        />
                        <div className="text-start">
                          <h6 className="fw-bold mb-0">{testimonial.name}</h6>
                          <p className="text-muted mb-0 small">{testimonial.role}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Carousel Controls */}
          <button 
            className="carousel-control-prev" 
            type="button" 
            data-bs-target="#testimonialCarousel" 
            data-bs-slide="prev"
          >
            <span className="carousel-control-prev-icon bg-primary rounded-circle p-3" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button 
            className="carousel-control-next" 
            type="button" 
            data-bs-target="#testimonialCarousel" 
            data-bs-slide="next"
          >
            <span className="carousel-control-next-icon bg-primary rounded-circle p-3" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
          
          {/* Carousel Indicators */}
          <div className="carousel-indicators position-relative mt-4">
            {testimonials.map((_, index) => (
              <button
                key={index}
                type="button"
                data-bs-target="#testimonialCarousel"
                data-bs-slide-to={index}
                className={`bg-primary rounded-circle ${index === 0 ? 'active' : ''}`}
                style={{ width: '12px', height: '12px' }}
                aria-current={index === 0 ? 'true' : 'false'}
                aria-label={`Slide ${index + 1}`}
              ></button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * CTA Section Component
 */
function CTASection() {
  return (
    <section 
      className="section-padding position-relative overflow-hidden"
      style={{ 
        background: 'linear-gradient(135deg, var(--cs-primary) 0%, var(--cs-secondary) 100%)' 
      }}
    >
      {/* Background Pattern */}
      <div 
        className="position-absolute top-0 start-0 w-100 h-100"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      ></div>
      
      <div className="container position-relative">
        <div className="row justify-content-center">
          <div className="col-lg-8 text-center text-white">
            <h2 className="display-5 fw-bold mb-4">
              Ready to Start Your Journey?
            </h2>
            <p className="lead opacity-75 mb-5">
              Join thousands of students who are already building their future 
              through meaningful connections and mentorship.
            </p>
            <div className="d-flex flex-wrap justify-content-center gap-3">
              <Link 
                to="/signup" 
                className="btn btn-light btn-lg px-5 fw-semibold"
              >
                <i className="bi bi-rocket-takeoff me-2"></i>
                Get Started Free
              </Link>
              <Link 
                to="/login" 
                className="btn btn-outline-light btn-lg px-5"
              >
                Sign In
              </Link>
            </div>
            <p className="mt-4 opacity-75 small">
              <i className="bi bi-check-circle me-2"></i>
              No credit card required • Free forever plan available
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default LandingPage;
