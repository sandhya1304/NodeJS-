const fs=require('fs');
const http=require('http');

http.createServer((req,res)=>{
    console.log('server created')

    // read file

    // fs.readFile('index.html', (err,data)=>{
    //     res.writeHead(200,{'content-type':'text/html'});  //for showing output of html used html
    //     res.write(data);
    //     return res.end();
    // })

    // append file
    // fs.appendFile('index.htm','<h1>This is append file</h1>',(err,data)=>{
    //    if(err)throw err
    //    console.log("file updated");
    //    return res.end();

    // })

    // delete
    // fs.unlink('index.htm', (err)=>{     //deleting index.htm file and unlink is used to delete
    //     if(err) throw error
    //     console.log("file deleted");
    //     return res.end();

    // })

    //open
    // fs.open('server.js','r',(err)=>{
    //     if(err) throw err
    //     console.log("file open");
    //     return res.end();
    // })

    //below the open file if we want to perform another operation like read file or append file then we do next to open
    //and write instead of 'r' used 'w' to write the another operation

    // fs.writeFile('file1.txt',"this is writefile method",(err)=>{  //used to insert data also we can used append to insert data
    //     if(err)throw err
    //     console.log("file updated");
    //     return res.end();
    // })

    //rename
    fs.rename('file1.txt','file.txt',(err)=>{  //used to insert data also we can used append to insert data
            if(err)throw err
            console.log("file updated");
             return res.end();
         })

}).listen(4000)