const fs = require('fs');
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

if(process.argv.length != 3){
    console.log("This program requires exactly 1 argument")
    process.exit(1)
}

cat(process.argv[2]);