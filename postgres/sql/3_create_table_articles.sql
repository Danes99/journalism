DROP TABLE IF EXISTS articles;

-- Create table articles
CREATE TABLE articles (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    user_id INT NOT NULL,
    title VARCHAR(300) NOT NULL,
    content VARCHAR(30000) NOT NULL,
    isCompleted boolean NOT NULL DEFAULT false,
    updated_at timestamp with time zone NOT NULL DEFAULT ( NOW() AT TIME ZONE 'UTC-1' ),
    created_at timestamp with time zone NOT NULL DEFAULT ( NOW() AT TIME ZONE 'UTC-1' )
);

-- Create a Trigger function
-- to update "updated_at" when UPDATE the table "articles"
-- https://www.dbrnd.com/2016/03/postgresql-update-the-timestamp-column-with-the-use-of-trigger/
CREATE OR REPLACE FUNCTION trg_fn_articles_updated_at()
RETURNS TRIGGER AS $$
BEGIN
   NEW.updated_at = NOW() AT TIME ZONE 'UTC-1'; 
   RETURN NEW;
END;
$$ language 'plpgsql';

-- Create an UPDATE TRIGGER
CREATE TRIGGER trg_update_articles BEFORE UPDATE
ON articles FOR EACH ROW EXECUTE PROCEDURE 
trg_fn_articles_updated_at();

GRANT ALL PRIVILEGES ON TABLE articles TO postgres;