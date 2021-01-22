DROP TABLE IF EXISTS jwt;

-- Create table jwt
CREATE TABLE jwt(
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    user_id INT NOT NULL,
    token VARCHAR(200),
    created_at timestamp with time zone NOT NULL DEFAULT ( NOW() AT TIME ZONE 'UTC+1' ),
    CONSTRAINT fk_user
        FOREIGN KEY(user_id) 
	    REFERENCES users(id)
);

GRANT ALL PRIVILEGES ON TABLE jwt TO postgres;