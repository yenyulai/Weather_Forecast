// alert ("Hello World");

var a = moment().format('dddd, DD MMMM YYYY');
var city = "Winnipeg"
getCurrentWeather(city);
getForescast(city);

var citySearchList = [];

//Change City
function changeCity(){
    if (city == null){
        // getCurrentWeather(city);
        // getForescast(city);
    }else {
        let city = document.getElementById("cityName").value;
        getCurrentWeather(city);
        getForescast(city);
        
    }
}


//Get Current Weather Function
function getCurrentWeather(city) {
    let requestUrl = 'http://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=3aff99068f124a3c036e27cd0706382b';
    
    fetch(requestUrl)
      .then(function (response) {
          console.log('response status is = ', response.status);
          if (response.status === 200){
              // do something if it is good.
            //   alert('request successful');
          } else {
              // do something else if request failed.
              alert('error ' + response.status);
          }
          return response.json();
      })
      .then(function (data) {
          //Check City input correct or not
          if(data !=null){

            // Check City not Repeat
            if(!citySearchList.includes(city)){
                //If City is new, Adding in check list
                citySearchList.push(city);

                // Add city to Page 'li'
                var theDiv = document.getElementById("historyQuery");
                var tag = document.createElement('li');
                tag.setAttribute("class", "list-group-item");
                tag.textContent = city;
                theDiv.appendChild(tag);
            }
          }
        // console.log("!!!!! Current Weather:    !!!!!" + data);
        document.getElementById('currentCity').textContent ="City Name: " + data.name + " " + a;
        document.getElementById('currentTemp').textContent = "Current Temp: "+ data.main.temp;
        document.getElementById('currentFellTemp').textContent ="Feel Temp: " + data.main.feels_like;
        document.getElementById('humidity').textContent = "Humidity: " + data.main.humidity;
        // console.log(data.list[0].main.temp)

        // for(i=0;i<=data.list.length;i++)
        // {
        //     console.log(data.list[i].main.temp)
        // }
      });
  }


//Get Forecast Function
function getForescast(city) {
    let requestUrl = 'http://api.openweathermap.org/data/2.5/forecast?q=' + city + '&cnt=40&exclude=hourly&appid=3aff99068f124a3c036e27cd0706382b';
    fetch(requestUrl)
      .then(function (response) {
          console.log('response status is = ', response.status);
          if (response.status === 200){
              // do something if it is good.
            //   alert('request successful');
          } else {
              // do something else if request failed.
              alert('error ' + response.status);
          }
          return response.json();
      })
      .then(function (data) {
          
        console.log("!!!!! Forecast:    !!!!!" + data);

        let dateFlag = 0;
        for(i=0;i<=data.list.length;i++)
        {
            let dailyData = data.list[i]
            let d = new Date(dailyData.dt_txt);
           
            
            if(d.getHours() == 0){
                console.log(d.getHours());
                $("#dayBlock" + [dateFlag]).html(
                    "Date: " + d.getFullYear() + "-" + d.getMonth() + "-" + d.getDate() +
                    "<br>" + 
                    "Temperature: " + dailyData.main.temp +
                    "<br>" +
                    "Humidity: " + dailyData.main.humidity
                    );
                dateFlag ++;
            }
            
            // console.log(dailyData)
        }
      });
  }