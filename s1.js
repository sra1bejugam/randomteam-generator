let prompt = require('prompt');
const fs = require('fs');
prompt.start();
prompt.get(['Teamno','Filename'], function (err, result) {
    if (err) { return onErr(err); }
    fs.readFile(result.Filename,"utf8",function(err,contents){
    if (err) { return console.log(err);}
    let jsonContent = JSON.parse(contents);
    console.log('User Input has been Received');
    info = jsonContent.ASPIRIANTS.length;
    console.log(info);
    form = result.Teamno;
    if ( form == parseInt(form,10) && form > 0 && form < info){
    let value = 1;               
    let maximum = info/form;        
    let minimum = 1;                  
    let ctemp = 1;
    let z = info % form;
    aspList = jsonContent.ASPIRIANTS;
    let i;
    let f = aspList[i];
    if(z == 0){
        fs.writeFile('results.txt',value,function (err){
            if (err) throw err;
        });
        while ( value <= form ){
            console.log("team ")
            console.log( value )
            fs.appendFile("results.txt",'\nTeam'+value,function (err){
                if (err) throw err;
            });
            while ( minimum <= maximum ){
                let i = Math.floor(Math.random() * aspList.length);
                console.log( aspList[i] ); 
                fs.appendFile("results.txt",Object.keys(aspList[i]),function(err){
                    if (err) throw err;
                });
                aspList.splice(i, 1);                        
                minimum = minimum + 1;
                if ( minimum > maximum ){
                    minimum=1;
                    break;
                }
            }
            value = value + 1;
            if ( value > form ){
                value=1;
                break;
            }
        }
    }                                                       
    else{
        console.log( "teams cannot be divided equally reply :");
        prompt.get('input', function (err, result) {
        if (err) { return onErr(err);}
        let res= result.input;
        if ( res==="yes" ){
            while ( value <= form ){
                console.log( "team ");
                console.log( value);
                fs.appendFile("results.txt",'\nTeam'+value,function (err){
                    if (err) throw err;
                });
                while ( minimum <= maximum ){
                    let i = Math.floor(Math.random() * aspList.length);
                    console.log( aspList[i] );
                    let f = aspList[i];
                    fs.appendFile("results.txt",Object.keys(aspList[i]),function(err){
                        if (err) throw err;
                    });
                    aspList.splice(i, 1);
                    minimum = minimum + 1;
                    if (minimum > maximum ){
                        minimum=1;
                        break;
                        }
                }
                value = value + 1;
                if ( value> form ){
                    value=1;
                    break;
                }
            }
            while (value <= form ){
                let ctemp = 1;                
                while ( ctemp <= z ){
                    console.log( "team number:")
                    console.log( value)
                    fs.appendFile("results.txt",'\nTeam'+value+'\r\n',function (err){
                        if (err) throw err;
                    });
                    let i = Math.floor(Math.random() * aspList.length);
                    console.log( aspList[i] ); 
                    fs.appendFile("results.txt",Object.keys(aspList[i]),function(err){
                        if (err) throw err;
                    });
                    aspList.splice(i, 1);
                    ctemp = ctemp+1;
                    value = value+1;
                    if ( ( ctemp > z ) || ( value > form ) ){
                        break;
                    }
                }
                if ((ctemp>z)||(value>form)){
                    let ctemp=1;
                    break;
                }
            }   
        } 
        else{
            console.log ("Thank u !)");
        }
        }); 
    }
}
else{
    console.log(`Please enter integers between 1 and ${info}`);
    }
});
});