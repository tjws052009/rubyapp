var getRedis = function(event) {
  event.preventDefault();
  console.debug("start getredis");

  var request = new XMLHttpRequest();
  var key = document.getElementById("getkey").value;
  console.debug("Key: " + key)
  request.open('GET', '/api/get?key=' + key, true);

  request.onload = function() {
    if (this.status >= 200 && this.status < 400) {
      // Success!
      var data = JSON.parse(this.response);
      console.info(data);
      if (data.data == null) {
        document.getElementById("result").innerHTML = '<div class="alert alert-warning">No data found</div>';

      } else {
        document.getElementById("result").innerHTML = '<div class="alert alert-success">' + data.data + '</div>';
      }
    } else {
      document.getElementById("result").innerHTML = '<div class="alert alert-danger">Something went wrong</div>';
    }
  };

  request.send();
};

var setRedis = function(event) {
  event.preventDefault();
  console.debug("start setredis");

  var request = new XMLHttpRequest();
  request.open('POST', '/api/set', true);
  request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
  var key = document.getElementById("setkey").value;
  var value = document.getElementById("setvalue").value;

  request.onload = function() {
    if (this.status >= 200 && this.status < 400) {
      // Success!
      var data = JSON.parse(this.response);
      console.info(data);
      document.getElementById("result").innerHTML = '<div class="alert alert-info">' + data.data + '</div>';
    } else {
      document.getElementById("result").innerHTML = '<div class="alert alert-danger">Something went wrong</div>';
    }
  };

  request.send('{"key":"' + key + '", "value": "' + value + '"}');
}

var getRedisForm = document.getElementById("getredis");
getRedisForm.addEventListener("submit", getRedis, false);

var setRedisForm = document.getElementById("setredis");
setRedisForm.addEventListener("submit", setRedis, false);