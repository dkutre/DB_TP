DROP TABLE IF EXISTS subscribers;
DROP TABLE IF EXISTS posts;
DROP TABLE IF EXISTS threads;
DROP TABLE IF EXISTS followers;
DROP TABLE IF EXISTS forums;
DROP TABLE IF EXISTS users;

CREATE TABLE users (
  id       INT UNSIGNED AUTO_INCREMENT NOT NULL PRIMARY KEY,
  name     VARCHAR(50) NOT NULL  DEFAULT '',
  username VARCHAR(50) NOT NULL  DEFAULT '',
  email    VARCHAR(50) NOT NULL  DEFAULT '',
  about    TEXT NOT NULL  DEFAULT '',
  isAnonymous BOOLEAN NOT NULL DEFAULT 0,
  UNIQUE KEY(email)
)DEFAULT CHARSET=utf8;
/*=================================================*/
CREATE TABLE forums (
  id INT UNSIGNED AUTO_INCREMENT NOT NULL PRIMARY KEY,
  name        VARCHAR(50) NOT NULL DEFAULT '' UNIQUE KEY,
  short_name  VARCHAR(20) NOT NULL DEFAULT '' UNIQUE KEY,
  user        VARCHAR(50) NOT NULL DEFAULT ''
)DEFAULT CHARSET=utf8;
/*=================================================*/
CREATE TABLE threads (
    id                 INT UNSIGNED AUTO_INCREMENT NOT NULL PRIMARY KEY,
    forumShortName     VARCHAR(20) UNIQUE KEY,
    user               VARCHAR(50) NOT NULL DEFAULT '',
    title              VARCHAR(50) NOT NULL DEFAULT '',
    slug               VARCHAR(50) NOT NULL DEFAULT '',
    message            TEXT NOT NULL DEFAULT '',
    date               TIMESTAMP NOT NULL,
    likes              INT NOT NULL DEFAULT 0,
    dislikes           INT NOT NULL DEFAULT 0,
    isClosed           BOOLEAN NOT NULL DEFAULT 0,
    isDeleted          BOOLEAN NOT NULL DEFAULT 0,   
    FOREIGN KEY (user) REFERENCES users(email)
    ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (forumShortName) REFERENCES forums(short_name)
    ON DELETE CASCADE ON UPDATE CASCADE
)DEFAULT CHARSET=utf8;
/*=================================================*/
CREATE TABLE  posts (
    id             INT UNSIGNED AUTO_INCREMENT NOT NULL PRIMARY KEY,
    userEmail      VARCHAR(50) NOT NULL DEFAULT '',
    message        TEXT NOT NULL DEFAULT '',
    forumShortName VARCHAR(20) DEFAULT '',
    thread_id      INT UNSIGNED NOT NULL,
    parent         INT NULL DEFAULT NULL,
    date           TIMESTAMP NOT NULL,
    likes          INT NOT NULL DEFAULT 0,
    dislikes       INT NOT NULL DEFAULT 0,
    isApproved     BOOLEAN NOT NULL DEFAULT 0,
    isHighlighted  BOOLEAN NOT NULL DEFAULT 0,
    isEdited       BOOLEAN NOT NULL DEFAULT 0,
    isSpam         BOOLEAN NOT NULL DEFAULT 0,
    isDeleted      BOOLEAN NOT NULL DEFAULT 0,
    FOREIGN KEY (userEmail) REFERENCES users(email)
    ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (forumShortName) REFERENCES forums(short_name)
    ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (thread_id) REFERENCES threads(id)
    ON DELETE CASCADE ON UPDATE CASCADE
)DEFAULT CHARSET=utf8;
/*=================================================*/
CREATE TABLE followers (
    follower_email VARCHAR(50) NOT NULL  DEFAULT '',
    followee_email VARCHAR(50) NOT NULL  DEFAULT '',
    UNIQUE (followee_email, follower_email),
    FOREIGN KEY (follower_email) REFERENCES users(email),
    FOREIGN KEY (followee_email) REFERENCES users(email)
) DEFAULT CHARSET=utf8;
/*=================================================*/
CREATE TABLE subscribers (
    user_email VARCHAR(50) NOT NULL,
    thread_id  INT UNSIGNED  NOT NULL,
    UNIQUE (user_email, thread_id),
    FOREIGN KEY (user_email) REFERENCES users(email)
    ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (thread_id) REFERENCES threads(id)
) DEFAULT CHARSET=utf8;

