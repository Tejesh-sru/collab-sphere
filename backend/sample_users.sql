-- Sample students with skills for testing
-- Password: password123

INSERT INTO users (name, display_name, email, password, bio, major, university, year, role, is_active, email_verified, enabled, created_at, updated_at) VALUES 
('Sarah Johnson', 'Sarah J.', 'sarah.j@university.edu', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'React & UI/UX Expert. Love creating beautiful interfaces!', 'Computer Science', 'Tech University', 3, 'USER', 1, 1, 1, NOW(), NOW()),
('Michael Chen', 'Michael C.', 'michael.c@university.edu', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'Full-stack developer with React and Node.js experience.', 'Software Engineering', 'Tech University', 4, 'USER', 1, 1, 1, NOW(), NOW()),
('Emily Rodriguez', 'Emily R.', 'emily.r@university.edu', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'ML enthusiast. Python is my favorite language!', 'Data Science', 'Tech University', 3, 'USER', 1, 1, 1, NOW(), NOW()),
('David Kim', 'David K.', 'david.k@university.edu', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'Mobile app developer. Love React Native!', 'Computer Science', 'Tech University', 2, 'USER', 1, 1, 1, NOW(), NOW()),
('Jessica Brown', 'Jessica B.', 'jessica.b@university.edu', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'DevOps specialist. Automating everything!', 'Information Systems', 'Tech University', 4, 'USER', 1, 1, 1, NOW(), NOW()),
('Alex Turner', 'Alex T.', 'alex.t@university.edu', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'Cybersecurity expert with Python skills.', 'Cybersecurity', 'Tech University', 3, 'USER', 1, 1, 1, NOW(), NOW()),
('Priya Patel', 'Priya P.', 'priya.p@university.edu', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'Java & Spring Boot expert. Backend is my passion!', 'Computer Engineering', 'Tech University', 4, 'USER', 1, 1, 1, NOW(), NOW()),
('James Wilson', 'James W.', 'james.w@university.edu', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'TypeScript advocate. Type-safe code is clean code!', 'Software Development', 'Tech University', 2, 'USER', 1, 1, 1, NOW(), NOW()),
('Sophia Lee', 'Sophia L.', 'sophia.l@university.edu', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'Blockchain developer. Web3 is the future!', 'Computer Science', 'Tech University', 3, 'USER', 1, 1, 1, NOW(), NOW()),
('Ryan Martinez', 'Ryan M.', 'ryan.m@university.edu', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'C++ systems programmer. Performance matters!', 'Computer Engineering', 'Tech University', 4, 'USER', 1, 1, 1, NOW(), NOW());

-- Add skills
INSERT INTO user_skills (user_id, skill) SELECT id, 'React' FROM users WHERE email = 'sarah.j@university.edu';
INSERT INTO user_skills (user_id, skill) SELECT id, 'UI/UX' FROM users WHERE email = 'sarah.j@university.edu';
INSERT INTO user_skills (user_id, skill) SELECT id, 'JavaScript' FROM users WHERE email = 'sarah.j@university.edu';
INSERT INTO user_skills (user_id, skill) SELECT id, 'TypeScript' FROM users WHERE email = 'sarah.j@university.edu';

INSERT INTO user_skills (user_id, skill) SELECT id, 'React' FROM users WHERE email = 'michael.c@university.edu';
INSERT INTO user_skills (user_id, skill) SELECT id, 'Node.js' FROM users WHERE email = 'michael.c@university.edu';
INSERT INTO user_skills (user_id, skill) SELECT id, 'JavaScript' FROM users WHERE email = 'michael.c@university.edu';
INSERT INTO user_skills (user_id, skill) SELECT id, 'SQL' FROM users WHERE email = 'michael.c@university.edu';

INSERT INTO user_skills (user_id, skill) SELECT id, 'Python' FROM users WHERE email = 'emily.r@university.edu';
INSERT INTO user_skills (user_id, skill) SELECT id, 'Machine Learning' FROM users WHERE email = 'emily.r@university.edu';
INSERT INTO user_skills (user_id, skill) SELECT id, 'Data Science' FROM users WHERE email = 'emily.r@university.edu';
INSERT INTO user_skills (user_id, skill) SELECT id, 'React' FROM users WHERE email = 'emily.r@university.edu';

INSERT INTO user_skills (user_id, skill) SELECT id, 'Mobile Dev' FROM users WHERE email = 'david.k@university.edu';
INSERT INTO user_skills (user_id, skill) SELECT id, 'React' FROM users WHERE email = 'david.k@university.edu';
INSERT INTO user_skills (user_id, skill) SELECT id, 'JavaScript' FROM users WHERE email = 'david.k@university.edu';
INSERT INTO user_skills (user_id, skill) SELECT id, 'UI/UX' FROM users WHERE email = 'david.k@university.edu';

INSERT INTO user_skills (user_id, skill) SELECT id, 'DevOps' FROM users WHERE email = 'jessica.b@university.edu';
INSERT INTO user_skills (user_id, skill) SELECT id, 'Node.js' FROM users WHERE email = 'jessica.b@university.edu';
INSERT INTO user_skills (user_id, skill) SELECT id, 'Cloud Computing' FROM users WHERE email = 'jessica.b@university.edu';
INSERT INTO user_skills (user_id, skill) SELECT id, 'Java' FROM users WHERE email = 'jessica.b@university.edu';

INSERT INTO user_skills (user_id, skill) SELECT id, 'Cybersecurity' FROM users WHERE email = 'alex.t@university.edu';
INSERT INTO user_skills (user_id, skill) SELECT id, 'Python' FROM users WHERE email = 'alex.t@university.edu';
INSERT INTO user_skills (user_id, skill) SELECT id, 'JavaScript' FROM users WHERE email = 'alex.t@university.edu';

INSERT INTO user_skills (user_id, skill) SELECT id, 'Java' FROM users WHERE email = 'priya.p@university.edu';
INSERT INTO user_skills (user_id, skill) SELECT id, 'SQL' FROM users WHERE email = 'priya.p@university.edu';
INSERT INTO user_skills (user_id, skill) SELECT id, 'Cloud Computing' FROM users WHERE email = 'priya.p@university.edu';

INSERT INTO user_skills (user_id, skill) SELECT id, 'TypeScript' FROM users WHERE email = 'james.w@university.edu';
INSERT INTO user_skills (user_id, skill) SELECT id, 'React' FROM users WHERE email = 'james.w@university.edu';
INSERT INTO user_skills (user_id, skill) SELECT id, 'Node.js' FROM users WHERE email = 'james.w@university.edu';
INSERT INTO user_skills (user_id, skill) SELECT id, 'UI/UX' FROM users WHERE email = 'james.w@university.edu';

INSERT INTO user_skills (user_id, skill) SELECT id, 'Blockchain' FROM users WHERE email = 'sophia.l@university.edu';
INSERT INTO user_skills (user_id, skill) SELECT id, 'JavaScript' FROM users WHERE email = 'sophia.l@university.edu';
INSERT INTO user_skills (user_id, skill) SELECT id, 'React' FROM users WHERE email = 'sophia.l@university.edu';

INSERT INTO user_skills (user_id, skill) SELECT id, 'C++' FROM users WHERE email = 'ryan.m@university.edu';
INSERT INTO user_skills (user_id, skill) SELECT id, 'Python' FROM users WHERE email = 'ryan.m@university.edu';

-- Add interests
INSERT INTO user_interests (user_id, interest) SELECT id, 'Web Design' FROM users WHERE email = 'sarah.j@university.edu';
INSERT INTO user_interests (user_id, interest) SELECT id, 'Frontend' FROM users WHERE email = 'sarah.j@university.edu';
INSERT INTO user_interests (user_id, interest) SELECT id, 'UX Research' FROM users WHERE email = 'sarah.j@university.edu';

INSERT INTO user_interests (user_id, interest) SELECT id, 'Backend' FROM users WHERE email = 'michael.c@university.edu';
INSERT INTO user_interests (user_id, interest) SELECT id, 'Cloud' FROM users WHERE email = 'michael.c@university.edu';
INSERT INTO user_interests (user_id, interest) SELECT id, 'APIs' FROM users WHERE email = 'michael.c@university.edu';

INSERT INTO user_interests (user_id, interest) SELECT id, 'AI' FROM users WHERE email = 'emily.r@university.edu';
INSERT INTO user_interests (user_id, interest) SELECT id, 'Deep Learning' FROM users WHERE email = 'emily.r@university.edu';
INSERT INTO user_interests (user_id, interest) SELECT id, 'Data Analysis' FROM users WHERE email = 'emily.r@university.edu';

INSERT INTO user_interests (user_id, interest) SELECT id, 'Mobile Apps' FROM users WHERE email = 'david.k@university.edu';
INSERT INTO user_interests (user_id, interest) SELECT id, 'React Native' FROM users WHERE email = 'david.k@university.edu';
INSERT INTO user_interests (user_id, interest) SELECT id, 'App Design' FROM users WHERE email = 'david.k@university.edu';

INSERT INTO user_interests (user_id, interest) SELECT id, 'CI/CD' FROM users WHERE email = 'jessica.b@university.edu';
INSERT INTO user_interests (user_id, interest) SELECT id, 'Docker' FROM users WHERE email = 'jessica.b@university.edu';
INSERT INTO user_interests (user_id, interest) SELECT id, 'Automation' FROM users WHERE email = 'jessica.b@university.edu';

INSERT INTO user_interests (user_id, interest) SELECT id, 'Security' FROM users WHERE email = 'alex.t@university.edu';
INSERT INTO user_interests (user_id, interest) SELECT id, 'Penetration Testing' FROM users WHERE email = 'alex.t@university.edu';
INSERT INTO user_interests (user_id, interest) SELECT id, 'Cryptography' FROM users WHERE email = 'alex.t@university.edu';

SELECT 'Sample data inserted successfully! 10 students added.' as message;
