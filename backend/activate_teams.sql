-- Make all existing teams ACTIVE for testing
UPDATE teams SET status = 'ACTIVE' WHERE status IN ('FORMING', 'READY');

-- Update all team members to ACCEPTED status
UPDATE team_members SET status = 'ACCEPTED' WHERE status = 'PENDING';

-- Check the results
SELECT t.id, t.name, t.status, COUNT(tm.id) as member_count
FROM teams t
LEFT JOIN team_members tm ON t.id = tm.team_id
GROUP BY t.id, t.name, t.status;
