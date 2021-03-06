use testBase;

DROP TABLE IF EXISTS `followers`;
CREATE TABLE `followers` (
  `followerEmail` varchar(25) NOT NULL,
  `followeeEmail` varchar(25) NOT NULL,
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`)
) ENGINE=MEMORY DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `forum`;
CREATE TABLE `forum` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(34) NOT NULL,
  `shortname` varchar(35) NOT NULL,
  `userEmail` varchar(25) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `shortname_UNIQUE` (`shortname`),
  UNIQUE KEY `name_UNIQUE` (`name`)
) ENGINE=MEMORY DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `post`;
CREATE TABLE `post` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `isApproved` tinyint(1) NOT NULL DEFAULT '0',
  `isDeleted` tinyint(1) NOT NULL DEFAULT '0',
  `isEdited` tinyint(1) NOT NULL DEFAULT '0',
  `isHighlighted` tinyint(1) NOT NULL DEFAULT '1',
  `isSpam` tinyint(1) NOT NULL DEFAULT '0',
  `likes` int(11) NOT NULL DEFAULT '0',
  `message` varchar(250) NOT NULL,
  `parent` varchar(100) NOT NULL,
  `points` int(11) NOT NULL DEFAULT '0',
  `threadId` int(10) unsigned NOT NULL,
  `date` datetime NOT NULL,
  `forumShortname` varchar(35) NOT NULL,
  `userEmail` varchar(25) NOT NULL,
  `dislikes` int(11) NOT NULL DEFAULT '0',
  `materPath` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MEMORY DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `subscribes`;
CREATE TABLE `subscribes` (
  `userEmail` varchar(25) NOT NULL,
  `threadId` int(10) unsigned NOT NULL,
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`)
) ENGINE=MEMORY DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `thread`;
CREATE TABLE `thread` (
  `date` datetime NOT NULL,
  `dislikes` int(11) NOT NULL DEFAULT '0',
  `forumShortname` varchar(35) NOT NULL,
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `isClosed` tinyint(1) NOT NULL,
  `isDeleted` tinyint(1) NOT NULL,
  `likes` int(11) NOT NULL DEFAULT '0',
  `message` varchar(3900) NOT NULL,
  `points` int(11) NOT NULL DEFAULT '0',
  `posts` int(10) unsigned NOT NULL DEFAULT '0',
  `slug` varchar(35) NOT NULL,
  `title` varchar(50) NOT NULL,
  `userEmail` varchar(25) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MEMORY DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `email` varchar(25) NOT NULL,
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `about` varchar(4225) NOT NULL,
  `isAnonymous` tinyint(1) NOT NULL DEFAULT '0',
  `name` varchar(20) NOT NULL,
  `username` varchar(15) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


DROP TABLE IF EXISTS `userOnForum`;
CREATE TABLE `userOnForum` (
  `id` int(8) unsigned NOT NULL AUTO_INCREMENT,
  `userEmail` varchar(25) NOT NULL,
  `forumShortname` varchar(35) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `userEmail_UNIQUE` ( `forumShortname`, `userEmail`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
