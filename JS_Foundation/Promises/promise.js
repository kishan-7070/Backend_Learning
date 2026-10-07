//promise takes a callback 
function fetchData(){
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            let success=true;
            if(success){
                resolve("Data fetched");
            }else{
                reject("Error");
            }
        },3000)
    })
}

fetchData()
    .then((data)=>{
        console.log(data)
        return data.toLowerCase()
    })
    .then((value)=>{
        console.log(value)
    })
    .catch((err)=>console.error(err));