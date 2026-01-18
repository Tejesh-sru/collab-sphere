-- Add skills with profile_id
DELETE FROM user_skills WHERE user_id IN (SELECT id FROM users WHERE email LIKE '%@university.edu');
DELETE FROM user_interests WHERE user_id IN (SELECT id FROM users WHERE email LIKE '%@university.edu');

-- Sarah: React & UI/UX
INSERT INTO user_skills (user_id, profile_id, skill) SELECT u.id, p.id, 'React' FROM users u JOIN profiles p ON u.id = p.user_id WHERE u.email = 'sarah.j@university.edu';
INSERT INTO user_skills (user_id, profile_id, skill) SELECT u.id, p.id, 'UI/UX' FROM users u JOIN profiles p ON u.id = p.user_id WHERE u.email = 'sarah.j@university.edu';
INSERT INTO user_skills (user_id, profile_id, skill) SELECT u.id, p.id, 'JavaScript' FROM users u JOIN profiles p ON u.id = p.user_id WHERE u.email = 'sarah.j@university.edu';
INSERT INTO user_interests (user_id, profile_id, interest) SELECT u.id, p.id, 'Web Design' FROM users u JOIN profiles p ON u.id = p.user_id WHERE u.email = 'sarah.j@university.edu';

-- Michael: Full Stack
INSERT INTO user_skills (user_id, profile_id, skill) SELECT u.id, p.id, 'React' FROM users u JOIN profiles p ON u.id = p.user_id WHERE u.email = 'michael.c@university.edu';
INSERT INTO user_skills (user_id, profile_id, skill) SELECT u.id, p.id, 'Node.js' FROM users u JOIN profiles p ON u.id = p.user_id WHERE u.email = 'michael.c@university.edu';
INSERT INTO user_skills (user_id, profile_id, skill) SELECT u.id, p.id, 'JavaScript' FROM users u JOIN profiles p ON u.id = p.user_id WHERE u.email = 'michael.c@university.edu';

-- Emily: Python & ML
INSERT INTO user_skills (user_id, profile_id, skill) SELECT u.id, p.id, 'Python' FROM users u JOIN profiles p ON u.id = p.user_id WHERE u.email = 'emily.r@university.edu';
INSERT INTO user_skills (user_id, profile_id, skill) SELECT u.id, p.id, 'Machine Learning' FROM users u JOIN profiles p ON u.id = p.user_id WHERE u.email = 'emily.r@university.edu';

-- David: Mobile & React
INSERT INTO user_skills (user_id, profile_id, skill) SELECT u.id, p.id, 'Mobile Dev' FROM users u JOIN profiles p ON u.id = p.user_id WHERE u.email = 'david.k@university.edu';
INSERT INTO user_skills (user_id, profile_id, skill) SELECT u.id, p.id, 'React' FROM users u JOIN profiles p ON u.id = p.user_id WHERE u.email = 'david.k@university.edu';
INSERT INTO user_skills (user_id, profile_id, skill) SELECT u.id, p.id, 'UI/UX' FROM users u JOIN profiles p ON u.id = p.user_id WHERE u.email = 'david.k@university.edu';

-- Jessica: DevOps
INSERT INTO user_skills (user_id, profile_id, skill) SELECT u.id, p.id, 'DevOps' FROM users u JOIN profiles p ON u.id = p.user_id WHERE u.email = 'jessica.b@university.edu';
INSERT INTO user_skills (user_id, profile_id, skill) SELECT u.id, p.id, 'Cloud Computing' FROM users u JOIN profiles p ON u.id = p.user_id WHERE u.email = 'jessica.b@university.edu';

-- Alex: Cybersecurity
INSERT INTO user_skills (user_id, profile_id, skill) SELECT u.id, p.id, 'Cybersecurity' FROM users u JOIN profiles p ON u.id = p.user_id WHERE u.email = 'alex.t@university.edu';
INSERT INTO user_skills (user_id, profile_id, skill) SELECT u.id, p.id, 'Python' FROM users u JOIN profiles p ON u.id = p.user_id WHERE u.email = 'alex.t@university.edu';

-- Priya: Java
INSERT INTO user_skills (user_id, profile_id, skill) SELECT u.id, p.id, 'Java' FROM users u JOIN profiles p ON u.id = p.user_id WHERE u.email = 'priya.p@university.edu';
INSERT INTO user_skills (user_id, profile_id, skill) SELECT u.id, p.id, 'SQL' FROM users u JOIN profiles p ON u.id = p.user_id WHERE u.email = 'priya.p@university.edu';

-- James: TypeScript & React
INSERT INTO user_skills (user_id, profile_id, skill) SELECT u.id, p.id, 'TypeScript' FROM users u JOIN profiles p ON u.id = p.user_id WHERE u.email = 'james.w@university.edu';
INSERT INTO user_skills (user_id, profile_id, skill) SELECT u.id, p.id, 'React' FROM users u JOIN profiles p ON u.id = p.user_id WHERE u.email = 'james.w@university.edu';
INSERT INTO user_skills (user_id, profile_id, skill) SELECT u.id, p.id, 'UI/UX' FROM users u JOIN profiles p ON u.id = p.user_id WHERE u.email = 'james.w@university.edu';

-- Sophia: Blockchain
INSERT INTO user_skills (user_id, profile_id, skill) SELECT u.id, p.id, 'Blockchain' FROM users u JOIN profiles p ON u.id = p.user_id WHERE u.email = 'sophia.l@university.edu';
INSERT INTO user_skills (user_id, profile_id, skill) SELECT u.id, p.id, 'JavaScript' FROM users u JOIN profiles p ON u.id = p.user_id WHERE u.email = 'sophia.l@university.edu';

-- Ryan: C++
INSERT INTO user_skills (user_id, profile_id, skill) SELECT u.id, p.id, 'C++' FROM users u JOIN profiles p ON u.id = p.user_id WHERE u.email = 'ryan.m@university.edu';
INSERT INTO user_skills (user_id, profile_id, skill) SELECT u.id, p.id, 'Python' FROM users u JOIN profiles p ON u.id = p.user_id WHERE u.email = 'ryan.m@university.edu';

-- Interests
INSERT INTO user_interests (user_id, profile_id, interest) SELECT u.id, p.id, 'Web Design' FROM users u JOIN profiles p ON u.id = p.user_id WHERE u.email = 'sarah.j@university.edu';
INSERT INTO user_interests (user_id, profile_id, interest) SELECT u.id, p.id, 'Backend' FROM users u JOIN profiles p ON u.id = p.user_id WHERE u.email = 'michael.c@university.edu';
INSERT INTO user_interests (user_id, profile_id, interest) SELECT u.id, p.id, 'AI' FROM users u JOIN profiles p ON u.id = p.user_id WHERE u.email = 'emily.r@university.edu';
INSERT INTO user_interests (user_id, profile_id, interest) SELECT u.id, p.id, 'Mobile Apps' FROM users u JOIN profiles p ON u.id = p.user_id WHERE u.email = 'david.k@university.edu';

SELECT '✓ Skills & interests added successfully!' as Status;
