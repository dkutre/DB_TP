
module.exports.clear  = require('./clear');
module.exports.status = require('./status');
//forum
module.exports.forumCreate      = require('./forum/create');
module.exports.forumDetails     = require('./forum/details');
module.exports.forumListPosts   = require('./forum/listPosts');
module.exports.forumListThreads = require('./forum/listThreads');
module.exports.forumListUsers   = require('./forum/listUsers');
//post
module.exports.postCreate  = require('./post/create');
module.exports.postDetails = require('./post/details');
module.exports.postList    = require('./post/list');
module.exports.postRemove  = require('./post/remove');
module.exports.postRestore = require('./post/restore');
module.exports.postUpdate  = require('./post/update');
module.exports.postVote    = require('./post/vote');
//thread
module.exports.threadClose       = require('./thread/close');
module.exports.threadCreate      = require('./thread/create');
module.exports.threadDetails     = require('./thread/details');
module.exports.threadList        = require('./thread/list');
module.exports.threadListPost    = require('./thread/listPosts');
module.exports.threadOpen        = require('./thread/open');
module.exports.threadRemove      = require('./thread/remove');
module.exports.threadRestore     = require('./thread/restore');
module.exports.threadSubscribe   = require('./thread/subscribe');
module.exports.threadUnsubscribe = require('./thread/unsubscribe');
module.exports.threadUpdate      = require('./thread/update');
module.exports.threadVote        = require('./thread/vote');
//user
module.exports.userCreate        = require('./user/create');
module.exports.userDetails       = require('./user/details');
module.exports.userFollow        = require('./user/follow');
module.exports.userListFollowers = require('./user/listFollowers');
module.exports.userListFollowing = require('./user/listFollowing');
module.exports.userListPosts     = require('./user/listPosts');
module.exports.userUnfollow      = require('./user/unfollow');
module.exports.userupdateProf    = require('./user/updateProfile');
// загрузка базы
//module.exports.loadUserData = require('./user/loadUserData');
















