const router = require("express").Router();
const {getLikedSongs,
    getProfilePicture,
    getRecentlyPlayed,
    getSpace,
    postLike,
    postListen,
    postSpace,
    postUnlike,
    postSong} = require("../controllers/User");

router.get("/profile/:username",getProfilePicture)
router.get("/space/:space_id",getSpace)
router.get("/likedsongs",getLikedSongs)
router.get("/recentlyplayed/:limit",getRecentlyPlayed)

router.post("/space",postSpace)
router.post("/listen",postListen)
router.post("/song", postSong)
router.post("/like",postLike)
router.post("/unlike",postUnlike)

module.exports = router;