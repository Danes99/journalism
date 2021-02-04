DROP TABLE IF EXISTS users;

-- Create table users
CREATE TABLE users(
    id SERIAL,
    name VARCHAR(64) NOT NULL UNIQUE,
    url VARCHAR(64) NOT NULL UNIQUE,
    email VARCHAR(64) NOT NULL UNIQUE,
	password VARCHAR(150),
    created_at timestamp with time zone NOT NULL DEFAULT ( NOW() AT TIME ZONE 'UTC-1' )
);

GRANT ALL PRIVILEGES ON TABLE users TO postgres;