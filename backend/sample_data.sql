-- Insert sample students with various skills
-- Password for all users is: password123 (bcrypt hash)

-- Student 1: React & UI/UX Expert
INSERT INTO users (name, display_name, email, password, bio, major, university, year, role, is_active, email_verified, enabled, created_at, updated_at)
VALUES ('Sarah Johnson', 'Sarah Johnson', 'Sarah J.', 'sarah.johnson@university.edu', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 
'Passionate about creating beautiful and intuitive user interfaces. Love working with React and modern frontend technologies.', 
'Computer Science', 'Tech University', 3, 'USER', true, true, true, NOW(), NOW());

INSERT INTO user_skills (user_id, skill) VALUES 
((SELECT id FROM users WHERE email = 'sarah.johnson@university.edu'), 'React'),
((SELECT id FROM users WHERE email = 'sarah.johnson@university.edu'), 'UI/UX'),
((SELECT id FROM users WHERE email = 'sarah.johnson@university.edu'), 'JavaScript'),
((SELECT id FROM users WHERE email = 'sarah.johnson@university.edu'), 'TypeScript');

INSERT INTO user_interests (user_id, interest) VALUES 
((SELECT id FROM users WHERE email = 'sarah.johnson@university.edu'), 'Web Design'),
((SELECT id FROM users WHERE email = 'sarah.johnson@university.edu'), 'Frontend Development'),
((SELECT id FROM users WHERE email = 'sarah.johnson@university.edu'), 'User Experience');

-- Student 2: Full Stack Developer
INSERT INTO users (name, display_name, email, password, bio, major, university, year, role, is_active, email_verified, enabled, created_at, updated_at)
VALUES ('Michael Chen', 'Michael Chen', 'michael.chen@university.edu', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy',
'Full-stack developer with experience in React, Node.js, and databases. Love building scalable applications.',
'Software Engineering', 'Tech University', 4, 'USER', true, true, true, NOW(), NOW());

INSERT INTO user_skills (user_id, skill) VALUES 
((SELECT id FROM users WHERE email = 'michael.chen@university.edu'), 'React'),
((SELECT id FROM users WHERE email = 'michael.chen@university.edu'), 'Node.js'),
((SELECT id FROM users WHERE email = 'michael.chen@university.edu'), 'JavaScript'),
((SELECT id FROM users WHERE email = 'michael.chen@university.edu'), 'SQL'),
((SELECT id FROM users WHERE email = 'michael.chen@university.edu'), 'DevOps');

INSERT INTO user_interests (user_id, interest) VALUES 
((SELECT id FROM users WHERE email = 'michael.chen@university.edu'), 'Backend Development'),
((SELECT id FROM users WHERE email = 'michael.chen@university.edu'), 'Cloud Computing'),
((SELECT id FROM users WHERE email = 'michael.chen@university.edu'), 'Microservices');

-- Student 3: Python & ML Enthusiast
INSERT INTO users (name, display_name, email, password, bio, major, university, year, role, is_active, email_verified, enabled, created_at, updated_at)
VALUES ('Emily Rodriguez', 'Emily Rodriguez', 'emily.rodriguez@university.edu', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy',
'Machine learning enthusiast. Working on AI projects and data analysis. Python is my favorite language!',
'Data Science', 'Tech University', 3, 'USER', true, true, true, NOW(), NOW());

INSERT INTO user_skills (user_id, skill) VALUES 
((SELECT id FROM users WHERE email = 'emily.rodriguez@university.edu'), 'Python'),
((SELECT id FROM users WHERE email = 'emily.rodriguez@university.edu'), 'Machine Learning'),
((SELECT id FROM users WHERE email = 'emily.rodriguez@university.edu'), 'Data Science'),
((SELECT id FROM users WHERE email = 'emily.rodriguez@university.edu'), 'React');

INSERT INTO user_interests (user_id, interest) VALUES 
((SELECT id FROM users WHERE email = 'emily.rodriguez@university.edu'), 'Artificial Intelligence'),
((SELECT id FROM users WHERE email = 'emily.rodriguez@university.edu'), 'Deep Learning'),
((SELECT id FROM users WHERE email = 'emily.rodriguez@university.edu'), 'Neural Networks');

-- Student 4: Mobile Developer
INSERT INTO users (name, display_name, email, password, bio, major, university, year, role, is_active, email_verified, enabled, created_at, updated_at)
VALUES ('David Kim', 'David Kim', 'david.kim@university.edu', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy',
'Mobile app developer specializing in cross-platform development. Love creating smooth mobile experiences.',
'Computer Science', 'Tech University', 2, 'USER', true, true, true, NOW(), NOW());

INSERT INTO user_skills (user_id, skill) VALUES 
((SELECT id FROM users WHERE email = 'david.kim@university.edu'), 'Mobile Dev'),
((SELECT id FROM users WHERE email = 'david.kim@university.edu'), 'React'),
((SELECT id FROM users WHERE email = 'david.kim@university.edu'), 'JavaScript'),
((SELECT id FROM users WHERE email = 'david.kim@university.edu'), 'UI/UX');

INSERT INTO user_interests (user_id, interest) VALUES 
((SELECT id FROM users WHERE email = 'david.kim@university.edu'), 'Mobile Apps'),
((SELECT id FROM users WHERE email = 'david.kim@university.edu'), 'React Native'),
((SELECT id FROM users WHERE email = 'david.kim@university.edu'), 'App Design');

-- Student 5: Backend & DevOps Specialist
INSERT INTO users (name, display_name, email, password, bio, major, university, year, role, is_active, email_verified, enabled, created_at, updated_at)
VALUES ('Jessica Brown', 'Jessica Brown', 'jessica.brown@university.edu', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy',
'Backend developer passionate about cloud infrastructure and DevOps practices. Love automating everything!',
'Information Systems', 'Tech University', 4, 'USER', true, true, true, NOW(), NOW());

INSERT INTO user_skills (user_id, skill) VALUES 
((SELECT id FROM users WHERE email = 'jessica.brown@university.edu'), 'Node.js'),
((SELECT id FROM users WHERE email = 'jessica.brown@university.edu'), 'DevOps'),
((SELECT id FROM users WHERE email = 'jessica.brown@university.edu'), 'Cloud Computing'),
((SELECT id FROM users WHERE email = 'jessica.brown@university.edu'), 'Java');

INSERT INTO user_interests (user_id, interest) VALUES 
((SELECT id FROM users WHERE email = 'jessica.brown@university.edu'), 'Cloud Architecture'),
((SELECT id FROM users WHERE email = 'jessica.brown@university.edu'), 'CI/CD'),
((SELECT id FROM users WHERE email = 'jessica.brown@university.edu'), 'Docker');

-- Student 6: Cybersecurity Specialist
INSERT INTO users (name, display_name, email, password, bio, major, university, year, role, is_active, email_verified, enabled, created_at, updated_at)
VALUES ('Alex Turner', 'Alex Turner', 'alex.turner@university.edu', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy',
'Cybersecurity enthusiast with a focus on application security and penetration testing.',
'Cybersecurity', 'Tech University', 3, 'USER', true, true, true, NOW(), NOW());

INSERT INTO user_skills (user_id, skill) VALUES 
((SELECT id FROM users WHERE email = 'alex.turner@university.edu'), 'Cybersecurity'),
((SELECT id FROM users WHERE email = 'alex.turner@university.edu'), 'Python'),
((SELECT id FROM users WHERE email = 'alex.turner@university.edu'), 'JavaScript');

INSERT INTO user_interests (user_id, interest) VALUES 
((SELECT id FROM users WHERE email = 'alex.turner@university.edu'), 'Security'),
((SELECT id FROM users WHERE email = 'alex.turner@university.edu'), 'Ethical Hacking'),
((SELECT id FROM users WHERE email = 'alex.turner@university.edu'), 'Network Security');

-- Student 7: Java & Backend Expert
INSERT INTO users (name, display_name, email, password, bio, major, university, year, role, is_active, email_verified, enabled, created_at, updated_at)
VALUES ('Priya Patel', 'Priya Patel', 'priya.patel@university.edu', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy',
'Java developer with expertise in Spring Boot and microservices architecture. Love building robust backend systems.',
'Computer Engineering', 'Tech University', 4, 'USER', true, true, true, NOW(), NOW());

INSERT INTO user_skills (user_id, skill) VALUES 
((SELECT id FROM users WHERE email = 'priya.patel@university.edu'), 'Java'),
((SELECT id FROM users WHERE email = 'priya.patel@university.edu'), 'SQL'),
((SELECT id FROM users WHERE email = 'priya.patel@university.edu'), 'Cloud Computing');

INSERT INTO user_interests (user_id, interest) VALUES 
((SELECT id FROM users WHERE email = 'priya.patel@university.edu'), 'Backend Development'),
((SELECT id FROM users WHERE email = 'priya.patel@university.edu'), 'Microservices'),
((SELECT id FROM users WHERE email = 'priya.patel@university.edu'), 'Spring Framework');

-- Student 8: TypeScript & Modern Web
INSERT INTO users (name, display_name, email, password, bio, major, university, year, role, is_active, email_verified, enabled, created_at, updated_at)
VALUES ('James Wilson', 'James Wilson', 'james.wilson@university.edu', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy',
'TypeScript advocate and modern web development enthusiast. Building type-safe applications is my passion.',
'Software Development', 'Tech University', 2, 'USER', true, true, true, NOW(), NOW());

INSERT INTO user_skills (user_id, skill) VALUES 
((SELECT id FROM users WHERE email = 'james.wilson@university.edu'), 'TypeScript'),
((SELECT id FROM users WHERE email = 'james.wilson@university.edu'), 'React'),
((SELECT id FROM users WHERE email = 'james.wilson@university.edu'), 'Node.js'),
((SELECT id FROM users WHERE email = 'james.wilson@university.edu'), 'UI/UX');

INSERT INTO user_interests (user_id, interest) VALUES 
((SELECT id FROM users WHERE email = 'james.wilson@university.edu'), 'Web Development'),
((SELECT id FROM users WHERE email = 'james.wilson@university.edu'), 'Type Safety'),
((SELECT id FROM users WHERE email = 'james.wilson@university.edu'), 'Modern JS');

-- Student 9: Blockchain Developer
INSERT INTO users (name, display_name, email, password, bio, major, university, year, role, is_active, email_verified, enabled, created_at, updated_at)
VALUES ('Sophia Lee', 'Sophia Lee', 'sophia.lee@university.edu', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy',
'Blockchain and Web3 developer. Interested in decentralized applications and smart contracts.',
'Computer Science', 'Tech University', 3, 'USER', true, true, true, NOW(), NOW());

INSERT INTO user_skills (user_id, skill) VALUES 
((SELECT id FROM users WHERE email = 'sophia.lee@university.edu'), 'Blockchain'),
((SELECT id FROM users WHERE email = 'sophia.lee@university.edu'), 'JavaScript'),
((SELECT id FROM users WHERE email = 'sophia.lee@university.edu'), 'React');

INSERT INTO user_interests (user_id, interest) VALUES 
((SELECT id FROM users WHERE email = 'sophia.lee@university.edu'), 'Web3'),
((SELECT id FROM users WHERE email = 'sophia.lee@university.edu'), 'Smart Contracts'),
((SELECT id FROM users WHERE email = 'sophia.lee@university.edu'), 'DeFi');

-- Student 10: C++ & Systems Programming
INSERT INTO users (name, display_name, email, password, bio, major, university, year, role, is_active, email_verified, enabled, created_at, updated_at)
VALUES ('Ryan Martinez', 'Ryan Martinez', 'ryan.martinez@university.edu', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy',
'Systems programmer with expertise in C++ and low-level optimization. Performance is key!',
'Computer Engineering', 'Tech University', 4, 'USER', true, true, true, NOW(), NOW());

INSERT INTO user_skills (user_id, skill) VALUES 
((SELECT id FROM users WHERE email = 'ryan.martinez@university.edu'), 'C++'),
((SELECT id FROM users WHERE email = 'ryan.martinez@university.edu'), 'Python');

INSERT INTO user_interests (user_id, interest) VALUES 
((SELECT id FROM users WHERE email = 'ryan.martinez@university.edu'), 'Systems Programming'),
((SELECT id FROM users WHERE email = 'ryan.martinez@university.edu'), 'Performance Optimization'),
((SELECT id FROM users WHERE email = 'ryan.martinez@university.edu'), 'Game Development');

SELECT 'Sample data inserted successfully!' as message;

