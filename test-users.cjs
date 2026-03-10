const http = require('https');

http.get('https://firestore.googleapis.com/v1/projects/climatech-c7392/databases/(default)/documents/users', (res) => {
  let data = '';
  res.on('data', (chunk) => { data += chunk; });
  res.on('end', () => {
    console.log(JSON.stringify(JSON.parse(data), null, 2));
  });
}).on('error', (err) => {
  console.log('Error: ' + err.message);
});
