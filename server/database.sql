DROP TABLE if EXISTS user_likes_dimension;
DROP table if EXISTS user_dimension;
CREATE TABLE IF NOT EXISTS user_dimension(
    user_id VARCHAR(255),
    username VARCHAR(255),
    email VARCHAR(255),
    password VARCHAR(255),
    display_picture VARCHAR(255),
    access_token VARCHAR(1024),
    PRIMARY KEY (username)
);
CREATE TABLE IF NOT EXISTS user_space_dimension(
    username VARCHAR(255),
    space_id VARCHAR(255),
    owner_name VARCHAR(255),
    FOREIGN KEY (username) REFERENCES user_dimension (username),
    FOREIGN KEY (owner_name) REFERENCES user_dimension (username),
    PRIMARY KEY (username,space_id)
);
CREATE TABLE IF NOT EXISTS user_likes_dimension(
    id BIGSERIAL,
    username VARCHAR(255),
    song_id VARCHAR(255),
    FOREIGN KEY (username) REFERENCES user_dimension (username),
    PRIMARY KEY (username,song_id)

);

CREATE TABLE IF NOT EXISTs user_history(
    username VARCHAR(255),
    song_id VARCHAR(255),
    ts timestamp,
    PRIMARY KEY (username,song_id,ts),
    FOREIGN KEY (username) REFERENCES user_dimension(username)
);


insert into user_dimension("user_id","username","email","password","access_token","display_picture") VALUES('5fa55db5-bdb6-4d4a-9907-6d2a27d9492d','johndoe','johndoe@john.com','$2b$12$gdnaAkProFHOukrwTSmh4.Nld/xOj20pgF2BB3LkCIhv8Bs9M/IbW','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNWZhNTVkYjUtYmRiNi00ZDRhLTk5MDctNmQyYTI3ZDk0OTJkIiwidXNlcm5hbWUiOiJqb2huZG9lIiwiZW1haWwiOiJqb2huZG9lQGpvaG4uY29tIiwiaWF0IjoxNzE2MDIyNDk3LCJleHAiOjE3MTYwMjI1MDd9.rl7Q3wWC56kxEteQIUq5lfsJsawmLy4ocI8AseKTsZk','https://firebasestorage.googleapis.com/v0/b/groovehub-c074d.appspot.com/o/images%2Ficons8-user-96.png?alt=media&token=dd454866-a584-486f-b67f-7e55a90f9aa0');
\x
select * from user_dimension;
select * from user_likes_dimension