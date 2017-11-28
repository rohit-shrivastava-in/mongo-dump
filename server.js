

const fs = require('fs');
const child_process = require('child_process');
var date=new Date().getDate();
var month=new Date().getMonth();
var year=new Date().getFullYear();
var output='F:/auto-backup/';
child_process.exec('mongodump --db Interio --out ' + output + year+'-'+month+'-'+date, function (err, res) {
    console.log('Dump taken on '+ year+'-'+month+'-'+date)
    console.log(output)
    fs.readdir(output,function(error,files){
        // console.log("files", files);
        // console.log("error", error);
        files.forEach(function(file){
            console.log(file);
            if(file.match(date)){
                console.log(date-1)
                // deleteFolderRecursive('./DumpMaster/'+file);
            }
        })
    })
   
});
