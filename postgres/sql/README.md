# SQL entrypoint

The SQL code is executed in the order of the file names. \
That means if you have a SQL code B that needs to executed before another one A, you have to rename the files accordingly so that B's name is before A's name in alphabetical order.

For instance, I have two SQL files (A) and (B) :

- (A) create_table_articles.sql
- (B) create_table_users.sql

I need to execute (B) before (A) because (A) contains of foreign key referencing a row in (A). \
Otherwise I will get an error while building the postgres Docker container.

So, the new file names will be :

- 1_create_table_users.sql
- 2_create_table_articles.sql
