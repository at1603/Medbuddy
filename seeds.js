var mongoose = require("mongoose");
var User = require("./models/userSchema");

var data = [
	{
		firstName: "David",
		lastName: "Jones", 
		username: "davidjo012",
		password: "12345",
		phone:"9336108567",
		email:"davidjo012@gmail.com",
		avatar:"https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/800px-Image_created_with_a_mobile_phone.png",
		address:"462  Adams Drive",
		state: "Uttar Pradesh",
		city: "Kanpur",
		zip:"207009",
		role:"Patient",
		gender:"Male",	

	}
]

function seedDB(){
	User.deleteMany({},function(err){
		if(err)
			console.log(err);
		else{
			console.log("Removed Users !!");
			//add a user manually
			data.forEach(function(seed){
				User.create(seed,function(err,user){
					if(err)
						console.log(err);
					else{
						console.log("Added a user");
					}
				});	
			});
		}
	});	
}

module.exports = seedDB;