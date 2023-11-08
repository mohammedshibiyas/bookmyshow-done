import mongoose from "mongoose";
const movie_schema=new mongoose.Schema({
    Movie_Title:{type:String},
    Category:{type:String},
    Rating:{type:String},
    Release_Date:{type:String},
    Languages:{type:String},
    Description:{type:String},
    Movie_banner:{type:String},
    Movie_poster:{type:String}
        
})
export default mongoose.model.movies||mongoose.model("movie",movie_schema)
