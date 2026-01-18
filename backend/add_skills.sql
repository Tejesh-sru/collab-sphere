-- Add skills only
DELETE FROM user_skills WHERE user_id IN (SELECT id FROM users WHERE email LIKE '%@university.edu');
DELETE FROM user_interests WHERE user_id IN (SELECT id FROM users WHERE email LIKE '%@university.edu');

-- Sarah: React & UI/UX
INSERT INTO user_skills (user_id, skill) SELECT id, 'React' FROM users WHERE email = 'sarah.j@university.edu';
INSERT INTO user_skills (user_id, skill) SELECT id, 'UI/UX' FROM users WHERE email = 'sarah.j@university.edu';
INSERT INTO user_skills (user_id, skill) SELECT id, 'JavaScript' FROM users WHERE email = 'sarah.j@university.edu';
INSERT INTO user_interests (user_id, interest) SELECT id, 'Web Design' FROM users WHERE email = 'sarah.j@university.edu';

-- Michael: Full Stack
INSERT INTO user_skills (user_id, skill) SELECT id, 'React' FROM users WHERE email = 'michael.c@university.edu';
INSERT INTO user_skills (user_id, skill) SELECT id, 'Node.js' FROM users WHERE email = 'michael.c@university.edu';
INSERT INTO user_skills (user_id, skill) SELECT id, 'JavaScript' FROM users WHERE email = 'michael.c@university.edu';
INSERT INTO user_interests (user_id, interest) SELECT id, 'Backend' FROM users WHERE email = 'michael.c@university.edu';

-- Emily: Python & ML
INSERT INTO user_skills (user_id, skill) SELECT id, 'Python' FROM users WHERE email = 'emily.r@university.edu';
INSERT INTO user_skills (user_id, skill) SELECT id, 'Machine Learning' FROM users WHERE email = 'emily.r@university.edu';
INSERT INTO user_interests (user_id, interest) SELECT id, 'AI' FROM users WHERE email = 'emily.r@university.edu';

-- David: Mobile & React
INSERT INTO user_skills (user_id, skill) SELECT id, 'Mobile Dev' FROM users WHERE email = 'david.k@university.edu';
INSERT INTO user_skills (user_id, skill) SELECT id, 'React' FROM users WHERE email = 'david.k@university.edu';
INSERT INTO user_skills (user_id, skill) SELECT id, 'UI/UX' FROM users WHERE email = 'david.k@university.edu';
INSERT INTO user_interests (user_id, interest) SELECT id, 'Mobile Apps' FROM users WHERE email = 'david.k@university.edu';

-- Jessica: DevOps
INSERT INTO user_skills (user_id, skill) SELECT id, 'DevOps' FROM users WHERE email = 'jessica.b@university.edu';
INSERT INTO user_skills (user_id, skill) SELECT id, 'Cloud Computing' FROM users WHERE email = 'jessica.b@university.edu';
INSERT INTO user_interests (user_id, interest) SELECT id, 'Cloud' FROM users WHERE email = 'jessica.b@university.edu';

-- Alex: Cybersecurity
INSERT INTO user_skills (user_id, skill) SELECT id, 'Cybersecurity' FROM users WHERE email = 'alex.t@university.edu';
INSERT INTO user_skills (user_id, skill) SELECT id, 'Python' FROM users WHERE email = 'alex.t@university.edu';
INSERT INTO user_interests (user_id, interest) SELECT id, 'Security' FROM users WHERE email = 'alex.t@university.edu';

-- Priya: Java
INSERT INTO user_skills (user_id, skill) SELECT id, 'Java' FROM users WHERE email = 'priya.p@university.edu';
INSERT INTO user_skills (user_id, skill) SELECT id, 'SQL' FROM users WHERE email = 'priya.p@university.edu';
INSERT INTO user_interests (user_id, interest) SELECT id, 'Backend' FROM users WHERE email = 'priya.p@university.edu';

-- James: TypeScript & React
INSERT INTO user_skills (user_id, skill) SELECT id, 'TypeScript' FROM users WHERE email = 'james.w@university.edu';
INSERT INTO user_skills (user_id, skill) SELECT id, 'React' FROM users WHERE email = 'james.w@university.edu';
INSERT INTO user_skills (user_id, skill) SELECT id, 'UI/UX' FROM users WHERE email = 'james.w@university.edu';
INSERT INTO user_interests (user_id, interest) SELECT id, 'Frontend' FROM users WHERE email = 'james.w@university.edu';

-- Sophia: Blockchain
INSERT INTO user_skills (user_id, skill) SELECT id, 'Blockchain' FROM users WHERE email = 'sophia.l@university.edu';
INSERT INTO user_skills (user_id, skill) SELECT id, 'JavaScript' FROM users WHERE email = 'sophia.l@university.edu';
INSERT INTO user_interests (user_id, interest) SELECT id, 'Web3' FROM users WHERE email = 'sophia.l@university.edu';

-- Ryan: C++
INSERT INTO user_skills (user_id, skill) SELECT id, 'C++' FROM users WHERE email = 'ryan.m@university.edu';
INSERT INTO user_skills (user_id, skill) SELECT id, 'Python' FROM users WHERE email = 'ryan.m@university.edu';
INSERT INTO user_interests (user_id, interest) SELECT id, 'Systems' FROM users WHERE email = 'ryan.m@university.edu';

SELECT '✓ Skills added successfully!' as Status;
