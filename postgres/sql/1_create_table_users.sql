DROP TABLE IF EXISTS users;

-- Create table users
CREATE TABLE users(
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name VARCHAR(64),
	password VARCHAR(150),
    signup_date timestamp with time zone NOT NULL DEFAULT ( NOW() AT TIME ZONE 'UTC+2' )
);

GRANT ALL PRIVILEGES ON TABLE users TO postgres;