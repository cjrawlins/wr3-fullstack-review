# WR3 Fake Reddit Review
</hr>

### MVP
- users can create an account
- users can login
- users can view posts
- users can upvote/downvote posts
- users can add post
- users can edit posts
- users can view their profile to see their posts and karma
</br>
</br>
***icebox***
- users can comment on posts
- users can upvote/downvote posts

#### Database
- Schemas:

users
```SQL
CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    first_name TEXT,
    last_name TEXT,
    email VARCHAR(60),
    password TEXT,
    users_karma_score INT
);
```

posts
```SQL
CREATE TABLE posts (
    post_id SERIAL PRIMARY KEY,
    body TEXT,
    img TEXT,
    post_karma_score INT,
    user_id INT REFERENCES users(user_id)
);
```

comments
```SQL
CREATE TABLE comments (
    comment_id SERIAL PRIMARY KEY,
    body TEXT,
    comment_karma_score INT,
    post_id INT REFERENCES posts(post_id),
    user_id INT REFERENCES users(user_id)
);
```

#### Server
- Dependencies:
    - express
    - massive
    - bcrypt
    - dotenv
    - express-session
- File Structure:
    - server/
        - index.js
        - controllers/
            - authController.js
            - postController.js

#### Front-end
- Dependencies: 
    - axios
    - redux
    - react-redux
    - redux-promise-middleware
    - react-router-dom
- File Strucutre:
    - src/
    - App.js
    - App.css
    - reset.css
    - redux/
        - store.js
        - reducer.js
    - components/
        - Header.js
        - Login.js
        - Profile.js
        - FrontPage.js