function getUserData(){
    return new Promise((resolve)=>{
        setTimeout(()=>{
            resolve("Normal Data Fetched Successfully!");
        },3000)
    })
}

function getCommentData(){
    return new Promise((resolve)=>{
        setTimeout(()=>{
            resolve("Comment Data Fetched Successfully!");
        },2000)
    })
}
async function getData() {
    try{
        console.log("Fetching Data");
        // const normal_data=await getUserData();
        // const Comment_data=await getCommentData();
        const [normal_data,Comment_data]=await Promise.all([
            getUserData(),getCommentData()
        ]);
        console.log(normal_data);
        console.log(Comment_data);
        console.log("Data Fetched Successfully");
    }catch(error){
        console.error("Error While Fetching Data:",error);
    }
    
}
getData();
