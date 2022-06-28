CREATE DATABASE jocal_todo
    WITH
    OWNER = postgres
    ENCODING = 'UTF8'
    LC_COLLATE = 'English_Sweden.1252'
    LC_CTYPE = 'English_Sweden.1252'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1;


CREATE TABLE todo_v1 (
    id SERIAL PRIMARY KEY,
    description VARCHAR(255)
);


CREATE TABLE todo (
    id SERIAL PRIMARY KEY,
    description VARCHAR(255),
    prio VARCHAR(15)
);


CREATE TABLE special_day (
    id SERIAL PRIMARY KEY,
    description VARCHAR(255),
    date DATE not NULL
);


CREATE TABLE event (
    id SERIAL PRIMARY KEY,
    description VARCHAR(255),
    date_start DATE not NULL,
    date_end DATE not NULL,
    time_start DATE,
    time_end DATE
);

CREATE TABLE user (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255),
    password VARCHAR(255)
);