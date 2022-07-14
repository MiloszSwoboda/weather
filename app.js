const express = require('express');
const https = require('https');
const bodyParser = require("body-parser")


const app = express();
app.use(bodyParser.urlencoded({extended: true}));


app.get("/", function(req,res){
  res.sendFile(__dirname + "/index.html")
})

app.post("/",function(req, res){
  console.log(req.body.cityName);
  const query = req.body.cityName
   const url = "https://api.openweathermap.org/data/2.5/weather?q="+query +"&units=metric&appid=997721b6cc28e0e7a8be2d6c8237bdd9";
  https.get(url, function(response){
    console.log(response.statusCode);

    response.on("data", function(data){  //Przetrzymywanie danych z response, Szukamy w API danych
      const weatherData = JSON.parse(data); // Zmiana danych w obiekt js i zapisanie danych w stałej
      console.log(weatherData);

      const temp = weatherData.main.temp; // Szukamy danych z weatherData w main/temp.
      console.log(temp);

      const description = weatherData.weather[0].description;
      console.log(description);

      const icon = weatherData.weather[0].icon;
      const iconImg = "http://openweathermap.org/img/wn/" + icon +"@2x.png";

      res.write("<p> Weather is "+ description + "</p>");
      res.write("<h1> Temp in "+query +" is " + temp + "degrees </h1>");
      res.write("<img src =" + iconImg + ">");
      res.send();
    })

  })
})


// app.get("/", function(req, res){      // Gdy user wejdzie na główny rout strony, ma się stać:
//
//
//
// })





app.listen(3000, function(){
  console.log("Server is running on port 3000");
})
