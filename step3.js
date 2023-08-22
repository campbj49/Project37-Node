const fs = require('fs');
const axios = require('axios');

async function cat(path, enableConsole){
    let res;
    res = await fs.readFileSync(path,'utf8',(err,data)=>{
        if(err){
            console.log(err);
            process.exit(1);
        }
        else{
            return data;
        }
    })
    if(enableConsole) console.log(res)
    return res
}

async function webCat(path, enableConsole){
    try {
        res = await axios.get(path);
        if(enableConsole) console.log(res);
        return res.data;
    }
    catch(err){
        console.log("Error with the request:");
        console.log(err.code);
        process.exit(1);
    }
}

if(process.argv.length === 3){
    let path = process.argv[2];
    if(path.includes("http")) webCat(path, true);
    else cat(path, true);
}

else if(process.argv[2] ==="--out" && process.argv[4]){
    let path = process.argv[3];
    let target = process.argv[4];
    if(path.includes("http")) sendResToTarget(path, target, webCat)
    else sendResToTarget(path, target, cat)
}

else{
    console.log("Invalid arguments");
    process.exit(1);
}

async function sendResToTarget(path, target, catFunc){
    let data = await catFunc(path);
    fs.writeFile(target, data, "utf8", (error) =>{
        if (error) {
          console.error(error);
          process.exit(1);
        }
    });
}