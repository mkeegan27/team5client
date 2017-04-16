var fakeDatabase = {
  "sys1":{
    "red": 150,
    "green": 87,
    "blue": 87,
    data:[20,30,10,40,60,50,70],
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July']
  },
  "sys2":{
    "red": 75,
    "green": 192,
    "blue": 192,
    data:[35,15,75,45,65,5,25],
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July']
  },
  "sys3":{
    "red": 30,
    "green": 200,
    "blue": 30,
    data:[40,15,20,20,30,25,35],
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July']
  }
}

export function getSampleDataSystem(sysNum, cb){
  cb(fakeDatabase["sys" + sysNum]);
}

export function getTotalWritesLifetime(server, cb){ //server should always be the string squidboy for alpha
    sendXHR('GET', 'squidboy/totalwrites', undefined, (xhr) => {
        cb(xhr.responseText);
    });
}

function sendXHR(verb, resource, body, cb) {
  var xhr = new XMLHttpRequest();
  xhr.open(verb, resource);
  xhr.setRequestHeader('Authorization', 'Bearer ' + 'test');
  // The below comment tells ESLint that FacebookError is a global.
  // Otherwise, ESLint would complain about it! (See what happens in Atom if
  // you remove the comment...)
  /* global FacebookError */
  // Response received from server. It could be a failure, though!
  xhr.addEventListener('load', function() {
    var statusCode = xhr.status;
    var statusText = xhr.statusText;
    if (statusCode >= 200 && statusCode < 300) {
      // Success: Status code is in the [200, 300) range.
      // Call the callback with the final XHR object.
      cb(xhr);
    } else {
      // Client or server error.
      // The server may have included some response text with details concerning
      // the error.
      var responseText = xhr.responseText;
      // FacebookError('Could not ' + verb + " " + resource + ": Received " +
      // statusCode + " " + statusText + ": " + responseText);
    }
  });
  // Time out the request if it takes longer than 10,000
  // milliseconds (10 seconds)
  xhr.timeout = 10000;
  // Network failure: Could not connect to server.
  xhr.addEventListener('error', function() {
    FacebookError('Could not ' + verb + " " + resource +
    ": Could not connect to the server.");
  });
  // Network failure: request took too long to complete.
  xhr.addEventListener('timeout', function() {
    FacebookError('Could not ' + verb + " " + resource +
    ": Request timed out.");
  });
  switch (typeof(body)) {
    case 'undefined':
    // No body to send.
    xhr.send();
    break;
    case 'string':
    // Tell the server we are sending text.
    xhr.setRequestHeader("Content-Type", "text/plain;charset=UTF-8");
    xhr.send(body);
    break;
    case 'object':
    // Tell the server we are sending JSON.
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    // Convert body into a JSON string.
    xhr.send(JSON.stringify(body));
    break;
    default:
    throw new Error('Unknown body type: ' + typeof(body));
  }
}
