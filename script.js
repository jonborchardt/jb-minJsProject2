
// on load
window.onload = function () {
  document.getElementById("button2").onclick = function () { myFunction2(document.getElementById("demo"), "Hello Again"); };

  getCurTemp('seattle');
}

function myFunction() {
  document.getElementById("demo").innerHTML = "Hello JavaScript";
}

function myFunction2(el, text) {
  el.innerHTML = text;
}

// HTTP GET
function getCurTemp() {
  const url = "https://query.yahooapis.com/v1/public/yql?q=select * from weather.forecast where woeid in (select woeid from geo.places(1) where text='seattle, wa')&format=json";
  httpGET(url, function (response) {
    console.log(response.query.results.channel.item.condition.temp);
    let el = document.createElement('div');
    el.innerHTML = `Seattle temp: ${response.query.results.channel.item.condition.temp} degrees`;
    document.getElementById('seattleTemp').appendChild(el);
  });
}
function httpGET(url, success) {
  var oReq = new XMLHttpRequest();
  oReq.onload = function () {
    console.log('Inside the onload event');
    success(oReq.response);
  };
  oReq.onreadystatechange = function () {
    console.log('Inside the onreadystatechange event with readyState: ', oReq.readyState);
  };
  oReq.open('GET', url, true);
  oReq.responseType = 'json';
  oReq.send();
};
