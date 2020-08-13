CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    first_name TEXT,
    last_name TEXT,
    email VARCHAR(60),
    password TEXT,
    users_karma_score INT
);

CREATE TABLE posts (
    post_id SERIAL PRIMARY KEY,
    body TEXT,
    img TEXT,
    post_karma_score INT,
    user_id INT REFERENCES users(user_id)
);


CREATE TABLE comments (
    comment_id SERIAL PRIMARY KEY,
    body TEXT,
    comment_karma_score INT,
    post_id INT REFERENCES posts(post_id),
    user_id INT REFERENCES users(user_id)
);

-- Best Practice Add Dummy Data --