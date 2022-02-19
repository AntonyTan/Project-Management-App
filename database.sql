-- CREATE DATABASE tododb;

-- --download extension
-- -- create extension if not exists "uuid-ossp";
-- CREATE TABLE users(
--     user_id uuid     PRIMARY KEY DEFAULT uuid_generate_v4(),
--     user_name VARCHAR(255) NOT NULL,
--     user_password VARCHAR(255) NOT NULL
-- );

-- CREATE EXTENSION IF NOT EXISTS "uuid-ossp";


-- CREATE TABLE todos(
--     todo_id  SERIAL PRIMARY KEY,
--     description VARCHAR(255) NOT NULL,
--     iscomplete BOOLEAN NOT NULL,
--     user_id uuid NOT NULL,
--     FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
-- );


CREATE DATABASE projectdb;

CREATE TABLE users(
    user_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_name VARCHAR(255) NOT NULL,
    user_password VARCHAR(255) NOT NULL
);

CREATE TABLE projects(

    project_id VARCHAR(255) PRIMARY KEY NOT NULL,
    project_name VARCHAR(255) NOT NULL,
    project_description VARCHAR(255) NOT NULL,
    project_create_date VARCHAR(10) NOT NULL,
    project_deadline VARCHAR(10) NOT NULL,
    user_id uuid NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

CREATE TABLE tickets(
    ticket_id VARCHAR(255) PRIMARY KEY NOT NULL,
    ticket_name VARCHAR(255) NOT NULL,
    ticket_description VARCHAR(255) NOT NULL,
    ticket_is_complete BOOLEAN NOT NULL,
    project_id VARCHAR(255) NOT NULL,
    FOREIGN KEY (project_id) REFERENCES projects(project_id) ON DELETE CASCADE
);