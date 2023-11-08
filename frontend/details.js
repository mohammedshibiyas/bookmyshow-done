

async function getDetails(){
    
    let url= window.location.href;
    var urlparams= new URLSearchParams(url.split("?")[1]);
    var id= urlparams.get("id");

    fetch(`http://localhost:3004/api/moviedetails/${id}`,
    {method:"POST"})
    .then((res)=>res.json())
    .then((data)=>{
        console.log(data);

        s="";
        s+=`     <img src="../images/leo.jpg" alt="" class="background-image">
        <div class="movie-details-content">
           <div class="movei-content-left">
            <div class="poster-cap"><img src="${data.Movie_poster}"></div>
           </div>
           <div class="movei-content-right">
            <h1 class="movie-name">${data.Movie_Title}</h1>
            <i class="fa fa-star" aria-hidden="true"></i> <span class="rating">${data.Rating}/10</span> <span class="vote">331.6K  Votes <i class="fa fa-angle-right" aria-hidden="true"></i></span>

            <div class="add-yourrating-box">
                <div class="add-yourrating-box-left">
                    <p class="add-rating-text">Add your rating & review</p>
                    <p class="no-matter-text">Your ratings matter</p>
                </div>
                <div class="add-yourrating-box-right">
                    <a href="">Rate now</a>
                </div>
            </div>
            <div class="languages"><span>2D,IMAX 2D</span> <SPAN>${data.Languages}</SPAN></div>
            <div class="duration">2h 44m • ${data.Category} • UA • ${data.Release_Date}</div>
           <a href="../index.html" onclick="delMovie('${data._id}')">Delete </a>

            <a href="./edit-movie.html?id=${data._id}">Edit movie</a>
           </div>
        </div>`
        document.getElementById("banners").innerHTML=s;
    })
    .catch((error)=>{
        console.log(error);
    })
}
getDetails();


function delMovie(id){
    console.log(id);
    fetch(`http://localhost:3004/api/deltask/${id}`,{
        method:"DELETE"

    }).then((data)=>{
        if(data.status==200){
            alert("you want to delete movie?")
        }
        else{
            alert("error")
        }
        getDetails();
    }).catch((error)=>{
        console.log(error);
    })
}