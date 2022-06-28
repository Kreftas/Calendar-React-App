SELECT id, description, datestart::VARCHAR(255), timestart::VARCHAR(255), timeend::VARCHAR(255) FROM  event WHERE datestart > now() ORDER BY datestart, timestart LIMIT 3;

