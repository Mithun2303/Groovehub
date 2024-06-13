const router = require("express").Router();
const { getPopularArtist,
    getAlbum,
    getArtist,
    getTrendyAlbum } = require("../controllers/Songs");

router.get("/popular_artist", getPopularArtist)
router.get("/trendy_album", getTrendyAlbum)
router.get("/artist/:artist_name", getArtist)
router.get("/album/:album_name", getAlbum)

module.exports = router;