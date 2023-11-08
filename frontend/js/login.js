document.getElementById("submit-btn").addEventListener("click",(e)=>{
    e.preventDefault();
    let user=document.getElementById("username").value;
    let  password=document.getElementById("password").value;


    fetch("http://localhost:3004/api/login",{
        method:"POST",
        headers:{"content-type":"application/json"},
        body:JSON.stringify({
            user, password
        })
    })
    .then(async(res)=>{
        console.log(res.status);
        const data=await res.json();
        let token=data.token
        localStorage.setItem("token",JSON.stringify(token))
        if(res.status==200)
        {
            // alert("Login successful")
            window.location.href="../index.html"
        }
        else{
            alert("login failed")
        }
    })
    .catch((error)=>{
        alert("server not connected")
    })
})