var request = require('request');

// modify this variable with your server details (ip/port, name, project id).
var requestDataJSON = { 
"ip": "server-ip", 
"port": 25565, 
"invite-only": 0, 
"name": "server-name", 
"projectid": "project-id",
"version": 2
}


var haveSecret = false;

console.log(requestDataJSON);

var url = "https://api.creeper.host/serverlist/update"

function sendRequest(){
	// the first request, send a request and get the secret.
	if(!haveSecret){
		request({
			url: url,
			method: "POST",
			headers: {
			    "content-type": "application/json",
			},
			json: true,
			body: requestDataJSON
			}, function (error, response, body) {
			if (!error && response.statusCode === 200) {
			    console.log(body)
			    requestDataJSON.secret = body.secret; //add the secret to our requestdata
			    haveSecret = true;
			}
			else {

			    console.log("error: " + error)
			    console.log("response.statusCode: " + response.statusCode)
			    console.log("response.statusText: " + response.statusText)
			}
		});
	} else {
		// we have a secret, send it with the request!
		console.log(requestDataJSON);
		request({
			url: url,
			method: "POST",
			headers: {
			    "content-type": "application/json",
			},
			json: true,
			body: requestDataJSON
			}, function (error, response, body) {
			if (!error && response.statusCode === 200) {
			    console.log(body)
			}
			else {

			    console.log("error: " + error)
			    console.log("response.statusCode: " + response.statusCode)
			    console.log("response.statusText: " + response.statusText)
			}
		});
	}

}

sendRequest();
setInterval(sendRequest, 90000); // send our request every 90 seconds.


