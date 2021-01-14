DROP TABLE IF EXISTS articles;

-- Create table articles
CREATE TABLE articles (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    user_id INT NOT NULL,
    title VARCHAR(300) NOT NULL,
    content VARCHAR(30000) NOT NULL,
    isCompleted boolean NOT NULL DEFAULT false,
    updated_at timestamp with time zone NOT NULL DEFAULT ( NOW() AT TIME ZONE 'UTC+2' ),
    created_at timestamp with time zone NOT NULL DEFAULT ( NOW() AT TIME ZONE 'UTC+2' )
);

GRANT ALL PRIVILEGES ON TABLE articles TO postgres;