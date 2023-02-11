const http = require("http");
const fs=require("fs");

var requests = require('requests');
const home=fs.readFileSync('home.html','utf-8');
const replaceVal=(tempval,orgval)=>{
  let temperature=tempval.replace("{%temp%}",orgval.main.temp);
  temperature=temperature.replace("{%maxtemp%}",orgval.main.temp_max);
  temperature=temperature.replace("{%mintemp%}",orgval.main.temp_min);
  temperature=temperature.replace("{%city%}",orgval.name);
  temperature=temperature.replace("{%country%}",orgval.sys.country);
  temperature=temperature.replace("{%temp%}",orgval.main.temp);

return temperature;
}
const server=http.createServer((req,res)=>{

    if (req.url=="/") {
        requests(
            "https://api.openweathermap.org/data/2.5/weather?q=Kendrapara&appid=96663b690160d16af0c168c21c760236"
            )
.on('data',  (chunk) =>{
  const object=JSON.parse(chunk);
  const arrdata=[object]
  const realdata=arrdata.map((val)=>replaceVal(home,val)).join("");
 console.log(realdata);
res.write(realdata);
})
.on('end', function (err) {
  if (err) return console.log('connection closed due to errors', err);
 
  console.log('end');
  res.end();
});
        
    }
});
server.listen(8010,"127.0.0.1");