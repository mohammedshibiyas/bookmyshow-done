import movie_schema from "./model/movie.model.js";
import user_schema from "./model/user.model.js"
import bcrypt from "bcrypt";
import pkg from "jsonwebtoken";
const {sign}=pkg;

export function addtask(req,res){
    try {
    const {...movies}=req.body
    console.log(req.body);
    res.status(201).send(movie_schema.create({...movies}));
        
    } catch (error) {
        res.status(404).send(error);
        
    }
    

}
export async function getdata(req,res){
    let task=await movie_schema.find()
        res.status(200).send(task)
    

}
export async function getDetails(req,res){
    const{id}=req.params;
    console.log(id);
    let movie= await movie_schema.findOne({_id:id});
    console.log(movie);
    res.status(200).send(movie)
}

export async function delMovie(req,res){
    const{id}=req.params;
    console.log(id);
    const data=movie_schema.deleteOne({_id:id})
    data.then((resp)=>{
        res.status(200).send(resp)
    }).catch((error)=>{
        res.status(404).send(error)
    })
}
export async function edit(req,res){
    const{id}=req.params;
    const{...movie}=req.body;
     await movie_schema.updateOne({_id:id},{$set:{...movie}});
    console.log(movie);
    res.status(200).send("updated")
}

export function addUser(req,res)
{
    
   try {
    const {name,user,password}=req.body;
    console.log(name,user,password);
    if(!(name&&user&&password))
    return res.status(404).send("fields are empty")

    bcrypt.hash(password,10)
    .then((hashedPwd)=>{
        user_schema.create({name,user,password:hashedPwd});
    })
    .then(()=>{
        res.status(201).send("sucessfully registered")
    })
  .catch((error)=>{
    res.status(500).send(error)
   })
    
   } catch (error) {
    console.log(error);
    
   }
    
}



export async function login(req, res) {
    try {
     console.log(req.body);
     const { user, password } = req.body;
     const usr = await user_schema.findOne({ user })
     console.log(usr);
     if (usr === null) return res.status(404).send("username or password doesnot exist");
     const success =await bcrypt.compare(password, usr.password)
     console.log(success);
     if (success !== true) return res.status(404).send("username or password doesnot exist");
     const token = await sign({ user }, process.env.JWT_KEY, { expiresIn: "24h" })
     console.log(token);
     res.status(200).send({ msg: "successfullly login", token })
     res.end();
     
    } catch (error) {
     console.log(error);
     
    }
   }

   
 export async function home(req,res){
    try {
      console.log(req.user);
      const username=req.user.user
      console.log(username);
      res.status(200).send({msg:`hello ${username}`})
      
    } catch (error) {
      res.status(404).send(error)
      
    }
  
   }


