
const pets = [
 { name:'Buddy', type:'dog', age: 2 },
 { name:'Tommy', type:'cat', age: 1 },
 { name:'Felix', type:'cat', age: 5 },
 { name:'Max', type:'dog', age: 7 },
 { name:'Blue', type:'bird', age: 1 }
];


exports.getAll = () => pets;

exports.get = (petName) => {
	console.log('Find an specific key');
	let found = pets.find((pet) => {
		return pet.name === petName;
	});
	console.log(found);
	
	return found;
};
exports.remove = (petName) => {
	console.log('find index of an specific key');
	let foundIndex = pets.findIndex((pet) => {
		return pet.name === petName;
	});
	
	if (foundIndex === -1) {
		return false;
	}
	
	console.log(foundIndex);
	//remove an specific index
	let pos = foundIndex, n = 1;
	let deleted = pets.splice(pos, n);
	console.log(deleted);
	
	console.log('Shows the size of the array');
	console.log(pets.length);
	
	return true;
};

exports.add = (petName,petType,petAge) => {
	let add = pets.push({name:petName, type:petType, age:petAge});
};



