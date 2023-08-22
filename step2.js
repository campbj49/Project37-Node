const fs = require('fs');
const axios = require('axios');

function cat(path){
    fs.readFile(path,'utf8',(err,data)=>{
        if(err){
            console.log(err);
            process.exit(1);
        }
        else{
            console.log(data);
        }
    })
}

async function webCat(path){
    try {
        res = await axios.get(path);
        console.log(res);
    }
    catch(err){
        console.log("Error with the request:");
        console.log(err.code);
        process.exit(1);
    }
}

if(process.argv.length != 3){
    console.log("This program requires exactly 1 argument")
    process.exit(1)
}

let path = process.argv[2];

if(path.includes("http")) webCat(path);
else cat(process.argv[2]);