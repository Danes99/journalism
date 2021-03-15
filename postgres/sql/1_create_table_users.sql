DROP TABLE IF EXISTS users;

-- Create table users
CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    name VARCHAR(64) NOT NULL UNIQUE,
    url VARCHAR(64) NOT NULL UNIQUE,
    description VARCHAR(5000) NOT NULL DEFAULT 'Hello, this is my description.',
    email VARCHAR(64) NOT NULL UNIQUE,
	password VARCHAR(150),
    created_at timestamp with time zone NOT NULL DEFAULT ( NOW() AT TIME ZONE 'UTC-1' ),
    updated_at timestamp with time zone NOT NULL DEFAULT ( NOW() AT TIME ZONE 'UTC-1' )
);

-- Create a Trigger function
-- to update "updated_at" when UPDATE the table "users"
-- https://www.dbrnd.com/2016/03/postgresql-update-the-timestamp-column-with-the-use-of-trigger/
CREATE OR REPLACE FUNCTION trg_fn_users_updated_at()
RETURNS TRIGGER AS $$
BEGIN
   NEW.updated_at = NOW() AT TIME ZONE 'UTC-1'; 
   RETURN NEW;
END;
$$ language 'plpgsql';

-- Create an UPDATE TRIGGER
CREATE TRIGGER trg_update_users BEFORE UPDATE
ON users FOR EACH ROW EXECUTE PROCEDURE 
trg_fn_users_updated_at();

-- 'UTC-1' is Paris (France) timezone

GRANT ALL PRIVILEGES ON TABLE users TO postgres;