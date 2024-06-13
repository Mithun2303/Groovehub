const mongoose = require("mongoose");
const UserModel = require("../models/Users");
const SongModel = require("../models/Songs");

const getPopularArtist = async (req, res) => {
    SongModel.aggregate([
        { $unwind: "$artists" }, // Deconstruct the artists array
        {
            $group: {
                _id: "$artists.name", // Group by artist name to get distinct values
                cover: { $first: "$artists.cover" } // Retain the cover of the first document in the group
            }
        },
        { $project: { _id: 0, name: "$_id", cover: 1 } },
        { $sort: { name: -1 } } // Project the name and cover fields without _id
    ]).then(artists => {
        // console.log(artists);
        res.json(artists);
    });
}

const getTrendyAlbum = async (req, res) => {
    SongModel.distinct("album"
    ).sort().then(albums => {
        // console.log(albums);
        res.json(albums)
    })
}

const getArtist = async (req, res) => {
    const { artist_name } = req.params;
    SongModel.find({ "artists.name": artist_name }).then((element) => {
        // console.log(element);
        res.json(element);
    })
    // console.log(artist_name);
}

const getAlbum = async (req, res) => {
    const { album_name } = req.params;
    SongModel.find({ "album.name": album_name }).then((element) => {
        // console.log(element);
        res.json(element);
    })
    // console.log(album_name);
}

module.exports = {
    getPopularArtist,
    getAlbum,
    getArtist,
    getTrendyAlbum
}