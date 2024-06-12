const router = require("express").Router();
const { parseCookies } = require("../crud/Auth")
const mongoose = require("mongoose");
const UserModel = require("../models/Users");
const SongModel = require("../models/Songs");
const psql = require("../database");
const { verify_token,getProfile } = require("../crud/Auth");
const { response } = require("express");

router.get("/profile/:username",async (req,res)=>{
    try {
        const {username} = req.params;
        const profile = await getProfile(username);
        // console.log(profile.rows[0].display_picture);
        res.status(200).json({profile:profile.rows[0].display_picture});

    } catch (error) {
        res.status(404).jsonp("Not Found");
        
    }
})
router.get("/space/:space_id",async (req,res)=>{
    try {
        const {space_id} = req.params;
        // console.log(space_id)
        const { cookie } = await parseCookies(req.headers.cookie);
        const { username } = await verify_token(cookie);
        // console.log(username);
        space_exist = await psql.query("select * from user_space_dimension where space_id=$1",[space_id]);
        if(space_exist.rowCount>0){
            const response = await psql.query("insert into user_space_dimension(username,space_id,owner_name) values($1,$2,$3) returning *"
            ,[username,space_id,space_exist.rows[0].owner_name],(err)=>{
                if (err) throw(err);
                else res.status(200).json({message:"Success"})
            })
        }
        else{
            throw("Invalid space id")
        }
    } catch (error) {
        if(error.message=='duplicate key value violates unique constraint "user_space_dimension_pkey"'){
            res.status(200).json({message:"Success"})
        }
        // console.log(error)
        res.status(404).json({message:error})
        
    }
})


router.post("/space",async (req,res)=>{
    // console.log(req.headers); 
    try {
        const { cookie } = await parseCookies(req.headers.cookie);
        // console.log(cookie);
        const { username } = await verify_token(cookie);
        const space_id = Math.random().toString(36).substring(2,8);
        psql.query(`insert into user_space_dimension(username,space_id,owner_name) values($1,$2,$3) returning *`,
        [username,space_id,username],
        (error,result)=>{
            if(error) throw(error);
            else{
                // console.log(result);
                res.status(201).json(result.rows[0]);
            }
        });
    } catch (error) {
        
    }
})


router.post("/listen", async (req, res) => {
    console.log(req.body);
    const { cookie } = await parseCookies(req.headers.cookie);
    const { username } = await verify_token(cookie);
    // console.log(cookie)
    const { song } = req.body;
    await SongModel.findOneAndUpdate({ title: song.title }, { $inc: { plays: 1 } });
    psql.query("insert into user_history values($1,$2,$3) RETURNING *",
        [username, song._id, new Date()],
        (err, result) => {
            if (err) console.log(err);
            // console.log(result);

        })
})

router.get("/recentlyplayed/:limit", async (req, res) => { 
    const { cookie } = await parseCookies(req.headers.cookie);
    // console.log(12345);
    const { username } = await verify_token(cookie);
    let song_ids = [];
    const { limit } = req.params;
    psql.query("select (song_id) from (select song_id,ts from user_history where username=$1 order by ts desc) sq limit $2",
        [username, limit],
        async (err, result) => {
            if (err) console.log(err);
            // console.log(result);
            result.rows.forEach((element)=>{
                song_ids.push(element.song_id);
            })
            // console.log(song_ids);
            const response = await Promise.all(song_ids.map(async (element) => {
                let temp = await SongModel.find({ _id: element });
                return temp[0];
            }));
            console.log(response);
            // const response = await SongModel.find({ _id: { $in: song_ids } });
            res.json(response);
        }
    )


})
router.post("/song", async (req, res) => {
    const { likedSongs } = req.body;
    // console.log(req.body);
    const result = await SongModel.find({ _id: { $in: likedSongs } });
    // console.log(result);
    res.json(result)
})

router.post("/like", async (req, res) => {
    // console.log(req.body);
    const { cookie } = await parseCookies(req.headers.cookie);
    const { song } = req.body;
    // console.log(cookie);
    const { username } = await verify_token(cookie);
    // console.log(song._id);
    psql.query(`insert into user_likes_dimension(username,song_id) values($1,$2) RETURNING *`,
        [username, song._id],
        (error, result) => {
            if (error) console.log(error);
            res.json({ song: result })
        })
})
router.post("/unlike", async (req, res) => {
    // console.log(req.body);
    const { cookie } = await parseCookies(req.headers.cookie);
    const { song } = req.body;
    // console.log(cookie);
    const { username } = await verify_token(cookie);
    // console.log(song._id);
    psql.query(`delete from user_likes_dimension where username=$1 and song_id=$2`,
        [username, song._id],
        (error, result) => {
            if (error) console.log(error);
            // console.log(result);
        })
})

router.get("/likedsongs", async (req, res) => {
    // console.log(req.body);
    try {
        
        const { cookie } = await parseCookies(req.headers.cookie);
        // console.log(cookie);
        const { username } = await verify_token(cookie);
        psql.query("select song_id from user_likes_dimension where username=$1",
        [username],
        (err, result) => {
            if (err) console.log(err);
            // console.log(result);
            res.json({ ids: result.rows })
        })
    } catch (error) {
        res.json(error)
    }
})
module.exports = router;