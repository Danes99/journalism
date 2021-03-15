DROP TABLE IF EXISTS jwt;

-- Create table jwt
CREATE TABLE jwt(
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    token VARCHAR(200) NOT NULL,
    created_at timestamp with time zone NOT NULL DEFAULT ( NOW() AT TIME ZONE 'UTC-1' ),
    expired_at timestamp with time zone NOT NULL,
    CONSTRAINT fk_user
        FOREIGN KEY(user_id) 
	    REFERENCES users(id)
);

GRANT ALL PRIVILEGES ON TABLE jwt TO postgres;

-- Create a Trigger function
-- to DELETE old JSON Web Token (JWT) before each SELECT
-- https://www.dbrnd.com/2016/03/postgresql-update-the-timestamp-column-with-the-use-of-trigger/

CREATE OR REPLACE FUNCTION trg_fn_jwt_delete_old()
RETURNS TRIGGER AS $$
BEGIN
    DELETE from jwt 
        WHERE created_at < NOW() AT TIME ZONE 'UTC-1' - INTERVAL '12 hours';
    RETURN null;
END;
$$ language 'plpgsql';

-- Create an UPDATE TRIGGER
CREATE TRIGGER trg_delete_old_jwt BEFORE INSERT
ON jwt EXECUTE PROCEDURE trg_fn_jwt_delete_old();