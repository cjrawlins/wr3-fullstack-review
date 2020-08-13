INSERT INTO users
(first_name, last_name, email, password, users_karma_score)
VALUES
($1, $2, $3, $4, 0)
RETURNING *;