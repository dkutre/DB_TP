use testBase;

DROP TABLE IF EXISTS `followers`;
CREATE TABLE `followers` (
  `followerEmail` varchar(100) NOT NULL,
  `followeeEmail` varchar(100) NOT NULL,
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `forum`;
CREATE TABLE `forum` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `shortname` varchar(100) NOT NULL,
  `userEmail` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `shortname_UNIQUE` (`shortname`),
  UNIQUE KEY `name_UNIQUE` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `post`;
CREATE TABLE `post` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `isApproved` tinyint(1) NOT NULL DEFAULT '0',
  `isDeleted` tinyint(1) NOT NULL DEFAULT '0',
  `isEdited` tinyint(1) NOT NULL DEFAULT '0',
  `isHighlighted` tinyint(1) NOT NULL DEFAULT '1',
  `isSpam` tinyint(1) NOT NULL DEFAULT '0',
  `likes` int(11) NOT NULL DEFAULT '0',
  `message` varchar(300) NOT NULL,
  `parent` varchar(100) NOT NULL,
  `points` int(11) NOT NULL DEFAULT '0',
  `threadId` int(10) unsigned NOT NULL,
  `date` datetime NOT NULL,
  `forumShortname` varchar(100) NOT NULL,
  `userEmail` varchar(100) NOT NULL,
  `dislikes` int(11) NOT NULL DEFAULT '0',
  `materPath` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE INDEX mathPath ON post(threadId, parent, materPath);
CREATE INDEX postByForum ON post(forumShortname, date);
CREATE INDEX postByThread ON post(threadId, date);
CREATE INDEX postByEmail ON post(userEmail, date);

DROP TABLE IF EXISTS `subscribes`;
CREATE TABLE `subscribes` (
  `userEmail` varchar(100) NOT NULL,
  `threadId` int(10) unsigned NOT NULL,
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `thread`;
CREATE TABLE `thread` (
  `date` datetime NOT NULL,
  `dislikes` int(11) NOT NULL DEFAULT '0',
  `forumShortname` varchar(100) NOT NULL,
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `isClosed` tinyint(1) NOT NULL,
  `isDeleted` tinyint(1) NOT NULL,
  `likes` int(11) NOT NULL DEFAULT '0',
  `message` varchar(5000) NOT NULL,
  `points` int(11) NOT NULL DEFAULT '0',
  `posts` int(10) unsigned NOT NULL DEFAULT '0',
  `slug` varchar(100) NOT NULL,
  `title` varchar(100) NOT NULL,
  `userEmail` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE INDEX threadByForum ON thread(forumShortname, date);
CREATE INDEX threadByEmail ON thread(userEmail, date);

DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `email` varchar(100) NOT NULL,
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `about` varchar(5000) NOT NULL,
  `isAnonymous` tinyint(1) NOT NULL DEFAULT '0',
  `name` varchar(100) NOT NULL,
  `username` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*
DROP TABLE IF EXISTS followers;
CREATE TABLE followers (
  followerEmail varchar(200) NOT NULL,
  followeeEmail varchar(200) NOT NULL,
  id int(10) unsigned NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


DROP TABLE IF EXISTS forum;
CREATE TABLE forum (
  id int(10) unsigned NOT NULL AUTO_INCREMENT,
  name varchar(200) NOT NULL,
  shortname varchar(200) NOT NULL,
  userEmail varchar(200) NOT NULL,
  PRIMARY KEY (id),
  UNIQUE KEY shortname_UNIQUE (shortname),
  UNIQUE KEY name_UNIQUE (name)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



DROP TABLE IF EXISTS post;
CREATE TABLE post (
  id int(10) unsigned NOT NULL AUTO_INCREMENT,
  isApproved tinyint(1) NOT NULL DEFAULT 0,
  isDeleted tinyint(1) NOT NULL DEFAULT 0,
  isEdited tinyint(1) NOT NULL DEFAULT 0,
  isHighlighted tinyint(1) NOT NULL DEFAULT 1,
  isSpam tinyint(1) NOT NULL DEFAULT 0,
  likes int(11) NOT NULL DEFAULT 0,
  message varchar(100) NOT NULL,
  parent varchar(200) NOT NULL,
  points int(11) NOT NULL DEFAULT 0,
  threadId int(10) unsigned NOT NULL,
  date datetime NOT NULL,
  forumShortname varchar(200) NOT NULL,
  userEmail varchar(200) NOT NULL,
  dislikes int(11) NOT NULL DEFAULT 0,
  materPath varchar(200) NOT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE INDEX mathPath ON post(threadId, parent, materPath);



DROP TABLE IF EXISTS subscribes;
CREATE TABLE subscribes (
  userEmail varchar(200) NOT NULL,
  threadId int(10) unsigned NOT NULL,
  id int(10) unsigned NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS thread;
CREATE TABLE thread (
  date datetime NOT NULL,
  dislikes int(11) NOT NULL DEFAULT 0,
  forumShortname varchar(200) NOT NULL,
  id int(10) unsigned NOT NULL AUTO_INCREMENT,
  isClosed tinyint(1) NOT NULL,
  isDeleted tinyint(1) NOT NULL,
  likes int(11) NOT NULL DEFAULT 0,
  message varchar(4000) NOT NULL,
  points int(11) NOT NULL DEFAULT 0,
  posts int(10) unsigned NOT NULL DEFAULT 0,
  slug varchar(200) NOT NULL,
  title varchar(200) NOT NULL,
  userEmail varchar(200) NOT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS user;
CREATE TABLE user (
  email varchar(200) NOT NULL,
  id int(10) unsigned NOT NULL AUTO_INCREMENT,
  about varchar(5000) NOT NULL,
  isAnonymous tinyint(1) NOT NULL DEFAULT 0,
  name varchar(200) NOT NULL,
  username varchar(200) NOT NULL,
  PRIMARY KEY (id),
  UNIQUE KEY email_UNIQUE (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;*/





