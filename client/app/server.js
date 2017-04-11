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
        cb(JSON.parse(xhr.responseText));
    });
}
