document.getElementById("submit-btn").addEventListener("click",(e)=>{
    e.preventDefault();
    let name=document.getElementById("name").value;
    let user=document.getElementById("username").value;
    let password=document.getElementById("password").value;


    fetch("http://localhost:3004/api/adduser",{
        method:"POST",
        headers:{"content-type":"application/json"},
        body:JSON.stringify({
           name,user,password
        })
    })
    .then((res)=>{
        console.log(res.status);
        if(res.status==201)
        {
            alert("Registration successful")
        }
        else{
            alert("Registration failed")
        }
    })
    .catch((error)=>{
        alert("server not connected")
    })
})