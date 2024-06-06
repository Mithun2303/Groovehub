const mongoose = require( "mongoose" );

const SongsSchema = new mongoose.Schema({
         title : String  ,
         artists : [
          {
             name :  String ,
             cover :  String
          }
        ],
         album : {
           name : String ,
           cover :  String
        },
         lyrics : String,
         duration :  String ,
         language :String ,
         link :  String ,
         plays : Number,
         genre : [
           String
        ]
});

const SongModel = mongoose.model("songs",SongsSchema)
module.exports = SongModel;