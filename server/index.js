const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require('cookie-parser');
const http = require("http");
const { Server } = require("socket.io");
const { getProfile } = require("./crud/Auth");

const Home = require("./apis/Home");
const Auth = require("./apis/Auth");
const User = require("./apis/User");

const mongoose = require("mongoose");
const SongModel = require("./models/Songs");

//Database
mongoose.connect("mongodb://localhost:27017/Groovehub")

app.use(cors({
    origin: ['http://127.0.0.1:3000'],
    credentials: true
}));
app.use(express.json())
app.use("/api", Home)
app.use("/api/auth", Auth)
app.use("/api/user", User)

app.use(cookieParser())

const server = http.createServer(app)

const io = new Server(server, {
    cors: {
        origin: "http://127.0.0.1:3000",
    }
})

io.on("connection", async (socket) => {
    // console.log(socket.id);
    socket.on("join_space", async (data) => {
        socket.join(data.space_id);
        console.log(data);
        // const dp = await getProfile(data.username);
        socket.to(data.space_id).emit("recieve_message", { dp: data.dp, from: data.username, message: `${data.username} has joined the space` })
    });

    socket.on("send_message", async (data) => {
        const dp = "data:image/jpeg;base64,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";
        const play = /\\play .*/
        const pause = /\\pause/
        const resume= /^\\play$/

        console.log(data);
        if (data.message.match(play)) {
            const song_name = data.message.slice(6);
            const response = await SongModel.find({ title: { $regex: new RegExp("^" + song_name.toLowerCase(), "i") } });
            console.log(response);
            if(response.length>0){
                socket.to(data.space_id)
                .emit("play",
                {
                    dp: response[0].album.cover,
                    link: response[0].link,
                    from: "Groovy",
                    message: `Playing ${song_name} by ${response[0].artists[0].name}`,
                    song: response[0]
                }
            )
        }
        else{
            socket.to(data.space_id)
                .emit("recieve_message",
                {
                    dp: dp,
                    from: "Groovy",
                    message: `Sorry! The song ${song_name} is not found in the library`,
                }
            )
        }
        }
        else if (data.message.match(pause)) {
            socket.to(data.space_id)
                .emit("pause",
                    {
                        dp: dp,
                        from: "Groovy",
                        message: `Pausing ${data.song.title} by ${data.song.artists[0].name}`,
                        song:data.song
                    }
                )
        }
        else if (data.message.match(resume)) {
            socket.to(data.space_id)
                .emit("play",
                {
                    dp: data.song.album.cover,
                    link:data.song.link,
                    from: "Groovy",
                    message: `Playing ${data.song.title} by ${data.song.artists[0].name}`,
                    song: data.song
                }
                )
        }
        else {
            console.log("else:", data);
            socket.to(data.space_id).emit("recieve_message", { dp: data.dp, from: data.from, message: data.message })
        }
    })
})
server.listen(8000, async () => {
    console.log("Listening on port 8000");
})
