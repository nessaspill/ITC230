'use strict'
const http = require("http") , fs = require('fs'), qs = require("querystring");
const pet = require("./lib/pets.js");

function serveStatic(res, path, contentType, responseCode){
  if(!responseCode) responseCode = 200;
  
  fs.readFile(__dirname + '/' + path, function(err, data){
      if(err){
        res.writeHead(500, {'Content-Type': 'text/plain'});
        res.end('Internal Server Error: ' + err.toString());
      }
      else{
        res.writeHead(responseCode, {'Content-Type': contentType});
        res.end(data);
      }
  });
}


http.createServer((req, res) => {
	const url = req.url.split("?");
	const query = qs.parse(url[1]);
	const path = url[0].toLowerCase();
	
	try {
	
		switch(path)
		{
			case '/':
				serveStatic(res, 'public/home.html', 'text/html');
				break;
			case '/about':
				res.writeHead(200, {'Content-Type': 'text/plain'});
				res.end('Information about my first Node App');
				break;
			case '/getall': {
				const pets = pet.getAll();
				res.writeHead(200, {'Content-Type': 'text/plain'});
				
				const result = JSON.stringify(pets, null, 2);
				
				res.end('All my petsies: \n' + result);
				break;
			}
			case '/get':
				
				let found = pet.get(query.name); 
				
				res.writeHead(200, {'Content-Type': 'text/plain'});
				
				const results = (found) ? JSON.stringify(found) : "Not found";
				
				res.end('Results for ' + query.name + "\n" + results);
				break;
			case '/delete': {
				const deleted = pet.remove(query.name);
			
				res.writeHead(200, {'Content-Type': 'text/plain'});
				
				const result = deleted ? "removed" : "not removed";
				
				const pets = pet.getAll();
				const allPets = JSON.stringify(pets, null, 2);
				
				res.end(query.name + ": " + result + "\nAll pets remaining: \n" + allPets);
				break;
			}
			case '/add':
				const add = pet.add(query.name,query.type,query.age);
				res.writeHead(200, {'Content-Type': 'text/plain'});
				const pets = pet.getAll();
				const result = JSON.stringify(pets, null, 2);
				res.end('All my petsies: \n' + result);
				break;

			default:
				res.writeHead(404, {'Content-Type': 'text/plain'});
				res.end('404 Page not found');
				break;
			}
	} catch (err) {
        res.writeHead(500, {'Content-Type': 'text/plain'});
        res.end('Internal Server Error: ' + err.toString());
	}
}).listen(process.env.PORT || 3000);