function fetchUserData(){
    return new Promise((resolve,reject)=>[
        setTimeout(()=>{
            resolve({name:"kishan"});
        },3000)
    ])
}


///Async Await 

async function getUserData(){
    try{
        console.log("Fetching User Data...");
        const userData=await fetchUserData();
        console.log("Fetched Successfully!");
        console.log("UserData: ",userData);
    } catch(error){
        console.log("Error Fetching Data:",error);
    }
}
getUserData();