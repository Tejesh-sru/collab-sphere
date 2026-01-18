-- Simple sample users (password: password123)

INSERT INTO users (email, name, display_name, password, role, enabled, is_active, email_verified, created_at, updated_at) VALUES 
('sarah.j@university.edu', 'Sarah Johnson', 'Sarah J.', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'USER', 1, 1, 1, NOW(), NOW()),
('michael.c@university.edu', 'Michael Chen', 'Michael C.', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'USER', 1, 1, 1, NOW(), NOW()),
('emily.r@university.edu', 'Emily Rodriguez', 'Emily R.', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'USER', 1, 1, 1, NOW(), NOW()),
('david.k@university.edu', 'David Kim', 'David K.', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'USER', 1, 1, 1, NOW(), NOW()),
('jessica.b@university.edu', 'Jessica Brown', 'Jessica B.', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'USER', 1, 1, 1, NOW(), NOW()),
('alex.t@university.edu', 'Alex Turner', 'Alex T.', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'USER', 1, 1, 1, NOW(), NOW()),
('priya.p@university.edu', 'Priya Patel', 'Priya P.', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'USER', 1, 1, 1, NOW(), NOW()),
('james.w@university.edu', 'James Wilson', 'James W.', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'USER', 1, 1, 1, NOW(), NOW()),
('sophia.l@university.edu', 'Sophia Lee', 'Sophia L.', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'USER', 1, 1, 1, NOW(), NOW()),
('ryan.m@university.edu', 'Ryan Martinez', 'Ryan M.', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'USER', 1, 1, 1, NOW(), NOW());

-- Skills for Sarah (React & UI/UX)
INSERT INTO user_skills (user_id, skill) SELECT id, 'React' FROM users WHERE email = 'sarah.j@university.edu';
INSERT INTO user_skills (user_id, skill) SELECT id, 'UI/UX' FROM users WHERE email = 'sarah.j@university.edu';
INSERT INTO user_skills (user_id, skill) SELECT id, 'JavaScript' FROM users WHERE email = 'sarah.j@university.edu';
INSERT INTO user_skills (user_id, skill) SELECT id, 'TypeScript' FROM users WHERE email = 'sarah.j@university.edu';

-- Skills for Michael (Full Stack)
INSERT INTO user_skills (user_id, skill) SELECT id, 'React' FROM users WHERE email = 'michael.c@university.edu';
INSERT INTO user_skills (user_id, skill) SELECT id, 'Node.js' FROM users WHERE email = 'michael.c@university.edu';
INSERT INTO user_skills (user_id, skill) SELECT id, 'JavaScript' FROM users WHERE email = 'michael.c@university.edu';

-- Skills for Emily (Python & ML)
INSERT INTO user_skills (user_id, skill) SELECT id, 'Python' FROM users WHERE email = 'emily.r@university.edu';
INSERT INTO user_skills (user_id, skill) SELECT id, 'Machine Learning' FROM users WHERE email = 'emily.r@university.edu';
INSERT INTO user_skills (user_id, skill) SELECT id, 'Data Science' FROM users WHERE email = 'emily.r@university.edu';

-- Skills for David (Mobile)
INSERT INTO user_skills (user_id, skill) SELECT id, 'Mobile Dev' FROM users WHERE email = 'david.k@university.edu';
INSERT INTO user_skills (user_id, skill) SELECT id, 'React' FROM users WHERE email = 'david.k@university.edu';
INSERT INTO user_skills (user_id, skill) SELECT id, 'UI/UX' FROM users WHERE email = 'david.k@university.edu';

-- Skills for Jessica (DevOps)
INSERT INTO user_skills (user_id, skill) SELECT id, 'DevOps' FROM users WHERE email = 'jessica.b@university.edu';
INSERT INTO user_skills (user_id, skill) SELECT id, 'Node.js' FROM users WHERE email = 'jessica.b@university.edu';
INSERT INTO user_skills (user_id, skill) SELECT id, 'Cloud Computing' FROM users WHERE email = 'jessica.b@university.edu';

-- Skills for Alex (Cybersecurity)
INSERT INTO user_skills (user_id, skill) SELECT id, 'Cybersecurity' FROM users WHERE email = 'alex.t@university.edu';
INSERT INTO user_skills (user_id, skill) SELECT id, 'Python' FROM users WHERE email = 'alex.t@university.edu';

-- Skills for Priya (Java)
INSERT INTO user_skills (user_id, skill) SELECT id, 'Java' FROM users WHERE email = 'priya.p@university.edu';
INSERT INTO user_skills (user_id, skill) SELECT id, 'SQL' FROM users WHERE email = 'priya.p@university.edu';

-- Skills for James (TypeScript)
INSERT INTO user_skills (user_id, skill) SELECT id, 'TypeScript' FROM users WHERE email = 'james.w@university.edu';
INSERT INTO user_skills (user_id, skill) SELECT id, 'React' FROM users WHERE email = 'james.w@university.edu';
INSERT INTO user_skills (user_id, skill) SELECT id, 'UI/UX' FROM users WHERE email = 'james.w@university.edu';

-- Skills for Sophia (Blockchain)
INSERT INTO user_skills (user_id, skill) SELECT id, 'Blockchain' FROM users WHERE email = 'sophia.l@university.edu';
INSERT INTO user_skills (user_id, skill) SELECT id, 'JavaScript' FROM users WHERE email = 'sophia.l@university.edu';

-- Skills for Ryan (C++)
INSERT INTO user_skills (user_id, skill) SELECT id, 'C++' FROM users WHERE email = 'ryan.m@university.edu';
INSERT INTO user_skills (user_id, skill) SELECT id, 'Python' FROM users WHERE email = 'ryan.m@university.edu';

-- Interests
INSERT INTO user_interests (user_id, interest) SELECT id, 'Web Design' FROM users WHERE email = 'sarah.j@university.edu';
INSERT INTO user_interests (user_id, interest) SELECT id, 'Frontend' FROM users WHERE email = 'sarah.j@university.edu';
INSERT INTO user_interests (user_id, interest) SELECT id, 'Backend' FROM users WHERE email = 'michael.c@university.edu';
INSERT INTO user_interests (user_id, interest) SELECT id, 'AI' FROM users WHERE email = 'emily.r@university.edu';
INSERT INTO user_interests (user_id, interest) SELECT id, 'Mobile Apps' FROM users WHERE email = 'david.k@university.edu';
INSERT INTO user_interests (user_id, interest) SELECT id, 'DevOps' FROM users WHERE email = 'jessica.b@university.edu';

SELECT CONCAT('✓ Added ', COUNT(*), ' students with skills!') as Status FROM users WHERE email LIKE '%@university.edu';
