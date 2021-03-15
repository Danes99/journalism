DROP TABLE IF EXISTS users;

-- Create table users
CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    name VARCHAR(64) NOT NULL UNIQUE,
    url VARCHAR(64) NOT NULL UNIQUE,
    description VARCHAR(5000) NOT NULL DEFAULT 'Hello, this is my description.',
    email VARCHAR(64) NOT NULL UNIQUE,
	password VARCHAR(150),
    created_at timestamp with time zone NOT NULL DEFAULT ( NOW() AT TIME ZONE 'UTC-1' )
);

-- 'UTC-1' is Paris (France) timezone

GRANT ALL PRIVILEGES ON TABLE users TO postgres;