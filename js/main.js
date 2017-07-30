// sbse pehla kaam app ko properly initialize krna
var hungrybee = angular.module('hungrybeeApp',['ngRoute']);
//Route dena start kia
hungrybee.config(function ($routeProvider) {
	$routeProvider
	//default route home p lejayega
	.when('/',{
		templateUrl: 'pages/home.html',
		controller: 'homeController'
	})
	.when('/login',{
		templateUrl: 'pages/login.html',
		controller: 'loginController'
	})
	.when('/delivery',{
		templateUrl:'pages/delivery.html',
		controller:'mainController'
	})
	.when('/signup',{
		templateUrl:'pages/signup.html',
		controller:'signupController'
	})
	// jis restaurant pe click karenge us k info page p land krenge depending on the id
	.when('/restaurant/:id',{
		templateUrl:'pages/restaurant.html',
		controller:'restaurantController'
	})
	.when('/favouritesfoodlist',{
		templateUrl:'pages/favorites.html',
		controller:'foodListController'
	})
})
hungrybee.controller('restaurantController',function($scope,$routeParams,$http){
	$scope.ingredients = [];
	$scope.getIngredients = function(url) {
	var data = '{"inputs":[{"data":{"image":{"url":"' + url + '"}}}]}' //passing 3 strings very intelligetnly :)
	//clarifai ka define kiya hua format ^
	//$.ajax ki jaga $http use kia... $http angualr ka argument h
	$http({
		// type is replaced with method
		'method': 'POST',
		'url': 'https://api.clarifai.com/v2/models/bd367be194cf45149e75f01d59f77ba7/outputs',
		'headers': {
			'Authorization': 'Key b8c3e76005914949bf0a12c25e052abe',
			'Content-Type': 'application/json'
		},
		'data': data //yahaan se chaining concept use hua h.. first function success k liye aur second failure k liye
	}).then(function (response) {
			var ingredients = response.data.outputs[0].data.concepts;//object(response) k andar k object(data) k andar k object(outputs) k andar k araay-ka-first-index([0]) k andar k object(data) kandar k object(concepts) ko access kiya h
  			var list = '';
  			for (var i =0;i<ingredients.length;i++)
				{
					// console.log(response.data.outputs[0].data.concepts[i].name);
					//object(response) k andar k object(data) k andar k object(outputs) k andar k araay-ka-first-index([0]) k andar k object(data) kandar k object(concepts) ke ek ek index  k object(name) ko liya
					$scope.ingredients.push(ingredients[i].name); //aur usko isme push kiya one-by-one
  			}
        }, function (xhr) {
        	console.log(xhr);
        })
	}
	//ek ek resturant ki details ek object m..
	$scope.restaurantId = $routeParams.id;
	var restaurants = [{
		// restaurant 01
		name: 'American Grill & Bar',
		address: 'Flat 48, Ground Floor, Opposite Vengal Rao Park, Road 1, Banjara Hills, Hyderabad',
		location: 'Banjara Hills',
		category: 'Casual Dining, Bar',
		vote: '4.9',
		cuisines: 'Mexican,American',
		cost: '2200',
		hours: '12 Noon to 11 AM (Mon-Sun)',
		votesNum:'2625 votes',
		reviews:'2253 reviews',
		image:'https://b.zmtcdn.com/data/pictures/chains/7/90847/2cc208fed5aacb60c5165cfca98ec0b6_featured_v2.jpg',
		// isi image kko fit krke delivery pagee m use kiya h just by changing the url ^
		bestDish: {
			name: 'Fajitas',
			image: 'https://img.grouponcdn.com/deal/iJVvZzL5wXt2WdwKgQhLgN/186347703-3642x2185/v1/c700x420.jpg'
		},
		photo1:'https://b.zmtcdn.com/data/pictures/4/97824/45c776510afb4a22801f817cd2545d82.jpg?fit=around%7C200%3A200&crop=200%3A200%3B%2A%2C%2A',
		photo2:'https://b.zmtcdn.com/data/pictures/4/97824/cf95b081469e67998290289ed40a1a82.jpg?fit=around%7C200%3A200&crop=200%3A200%3B%2A%2C%2A',
		photo3:'https://b.zmtcdn.com/data/pictures/4/97824/8f635e45cced380f593b884d2d382b5b.jpg?fit=around%7C200%3A200&crop=200%3A200%3B%2A%2C%2A',
		photo4:'https://b.zmtcdn.com/data/pictures/chains/7/90847/f18b58698f07cdf6ae51482082401797.png?fit=around%7C200%3A200&crop=200%3A200%3B%2A%2C%2A',
		comment1:{
			reviewName:'Gopal Bhargav',
			reviewImg:'https://b.zmtcdn.com/data/user_profile_pictures/977/77bfc1784d79aad4b9ed35097263d977.jpg?fit=around%7C100%3A100&crop=100%3A100%3B%2A%2C%2A',
			reviewTime:'5 days ago',
			reviewPara:'Oh man! This is one restaurant everyone should visit. It was my birthday today. And I can not ask for a much better place to end my day. Went for dinner and came out with all smiles. The staff celebrated my birthday too by singing a birthday song. Thank u guys for making my day.'
		},
		comment2:{
			reviewName:'Harish',
			reviewImg:'https://b.zmtcdn.com/data/user_profile_pictures/886/e69889afc9a73d072776890578973886.jpg?fit=around%7C100%3A100&crop=100%3A100%3B%2A%2C%2A',
			reviewTime:'last week',
			reviewPara:'Dinner tonight at Chilis, Banjara hills. Ordered for beers, iced teas, chicken n bacon quesadillas, veg and cheese quesadillas. Excellent food and drinks, and very good service by Rockstar Ramesh. He gave us a choco chip paradise pie complimentary as they were out of Molten chocolava cake, and it was my sons birth day.'
		},
		comment3:{
			reviewName:'Pushyami Reddy',
			reviewImg:'https://b.zmtcdn.com/data/user_profile_pictures/370/2e3faa86446014c909b9c2bc1a388370.jpg?fit=around%7C100%3A100&crop=100%3A100%3B%2A%2C%2A',
			reviewTime:'23 days ago',
			reviewPara:'Ordered food from swiggy, which was a combo of paneer tikka and vegetable biryani... quality was very good... loved the taste... paneer was very soft and very tasty ... delicious combo for vegetarians ☺️'
		}
	},{
		// restaurant 02
		name: 'Paradise',
		address: ' Plot 22-23, Vinayaknagar, Gachibowli Main Road, Gachibowli, Hyderabad',
		location: 'Gachibowli',
		category: 'Casual Dining',
		vote: '4.6',
		cuisines: 'Biryani,Chinese',
		cost: '950',
		hours: '11 AM to 11 PM (Mon-Sun)',
		votesNum:'881 votes',
		reviews:'692 reviews',
		image:'https://b.zmtcdn.com/data/pictures/chains/2/91662/6cafcbe3bb5f4478f6015cd38addd31f_featured_v2.jpg',
		compliment:{
			para1:'the best place to dine at',
			paraHold1:'The HINDU',
			para2:'Absolutely fantastic place to hangout',
			paraHold2:'The Chime',
			para3:'awesome awesome awesome awesome',
			paraHold3:'The awesome',
		},
		photo1:'https://b.zmtcdn.com/data/pictures/2/91662/d363971085b79b7a14ea66697c3d742d.png?fit=around%7C200%3A200&crop=200%3A200%3B%2A%2C%2A',
		photo2:'https://b.zmtcdn.com/data/pictures/2/91662/9ac1d96ff9e64f499c61a59e6186eb67.jpg?fit=around%7C200%3A200&crop=200%3A200%3B%2A%2C%2A',
		photo3:'https://b.zmtcdn.com/data/pictures/chains/2/91662/5017c915483193bf6123c21b66a66f5c.png?fit=around%7C200%3A200&crop=200%3A200%3B%2A%2C%2A',
		photo4:'https://b.zmtcdn.com/data/pictures/chains/2/91662/2b15600da92873638e82eb9f50785dc2.jpg?fit=around%7C200%3A200&crop=200%3A200%3B%2A%2C%2A',
		comment1:{
			reviewName:'Souvik Patra',
			reviewImg:'https://b.zmtcdn.com/data/user_profile_pictures/b8b/fb35f85bc0d3d41e931ca10a56d01b8b.jpg?fit=around%7C100%3A100&crop=100%3A100%3B%2A%2C%2A',
			reviewTime:'4 days ago',
			reviewPara:' Genuinely, I didn not expect something magical here. This place is good, of you want your large family or friends to dine together peacefully. Actually, it is the story of every Paradise​ outlet. The Biriyani we ordered here was the family pack one and it was sufficient in quantity. And its value for money too. The ambience is good and the service needs to be faster though.'
		},
		comment2:{
			reviewName:'Pushyami Reddy',
			reviewImg:'https://b.zmtcdn.com/data/user_profile_pictures/370/2e3faa86446014c909b9c2bc1a388370.jpg?fit=around%7C100%3A100&crop=100%3A100%3B%2A%2C%2A',
			reviewTime:'23 days ago',
			reviewPara:'Ordered food from swiggy, which was a combo of paneer tikka and vegetable biryani... quality was very good... loved the taste... paneer was very soft and very tasty ... delicious combo for vegetarians ☺️'
		}
	},{
		// restaurant 03
		name: 'Tatva',
		address: '1st Floor,SL Jubilee, Road 36, Jubilee Hills, Hyderabad',
		location: 'Jubilee Hills',
		category: 'Casual Dining',
		vote: '4.4',
		cuisines: 'Continental,Italian',
		cost: '1200',
		hours: '12 Noon to 3:30 PM (Mon-Sun)',
		votesNum:'251 votes',
		reviews:'181 reviews',
		image:'https://b.zmtcdn.com/data/pictures/3/18385313/ebebc05df55c7752db379cffe3e90a00_featured_v2.jpg',
		compliment:{
			para1:'the best place to dine at',
			paraHold1:'The HINDU',
			para2:'Absolutely fantastic place to hangout',
			paraHold2:'The Chime',
			para3:'awesome awesome awesome awesome',
			paraHold3:'The awesome',
		},
		photo1:'https://b.zmtcdn.com/data/pictures/3/18385313/49c97c354cbb30393dd90db30e3fbc6c.jpg?fit=around%7C200%3A200&crop=200%3A200%3B%2A%2C%2A',
		photo2:'https://b.zmtcdn.com/data/pictures/3/18385313/80f6cfc6e3ccbe7a93c532365a643b12.jpg?fit=around%7C200%3A200&crop=200%3A200%3B%2A%2C%2A',
		photo3:'https://b.zmtcdn.com/data/pictures/3/18385313/bc7f2ab941743796c83739ca300b543b.jpg?fit=around%7C200%3A200&crop=200%3A200%3B%2A%2C%2A',
		photo4:'https://b.zmtcdn.com/data/pictures/chains/3/18385313/ceff0ba3cc7586b735190e11d38db567.jpg?fit=around%7C200%3A200&crop=200%3A200%3B%2A%2C%2A',
		comment2:{
			reviewName:'Harish',
			reviewImg:'https://b.zmtcdn.com/data/user_profile_pictures/886/e69889afc9a73d072776890578973886.jpg?fit=around%7C100%3A100&crop=100%3A100%3B%2A%2C%2A',
			reviewTime:'last week',
			reviewPara:'Dinner tonight. Ordered for iced teas, chicken n bacon quesadillas, veg and cheese quesadillas. Excellent food and drinks, and very good service by Rockstar Ramesh. He gave us a choco chip paradise pie complimentary as they were out of Molten chocolava cake, and it was my sons birth day.'
		}
	},{
		// restaurant 04
		name: 'Autumn Leaf Cafe',
		address: 'Plot 823, Road 41, Jubilee Hills, Hyderabad',
		location: 'Jubilee Hills',
		category: 'Café',
		vote: '4.2',
		cuisines: 'Cafe',
		cost: '1000',
		hours: '12 Noon to 10:30 PM (Mon-Sun)',
		votesNum:'333 votes',
		reviews:'261 reviews',
		image:'https://b.zmtcdn.com/data/pictures/1/18312961/e7b277fe90c919538dfe81d9c59dd177_featured_v2.jpg',
		bestDish: {
			name: 'German Pastries',
			image: 'https://img.grouponcdn.com/deal/uvzXjairBk34ASNJGeTn/DT-700x420/v1/c700x420.jpg'
		},
		photo1:'https://b.zmtcdn.com/data/pictures/1/18312961/75c32f572061c3b5f69e179c4d60b997.jpg?fit=around%7C200%3A200&crop=200%3A200%3B%2A%2C%2A',
		photo2:'https://b.zmtcdn.com/data/reviews_photos/c29/1d61f19fac7c76579ebec9c234fa2c29_1499155658.jpg?fit=around%7C200%3A200&crop=200%3A200%3B%2A%2C%2A',
		photo3:'https://b.zmtcdn.com/data/pictures/chains/1/18312961/cb43254a1ae6f7cd54b01b43f2c3c6ad.jpg?fit=around%7C200%3A200&crop=200%3A200%3B%2A%2C%2A',
		photo4:'https://b.zmtcdn.com/data/pictures/chains/1/18312961/f91f76dc64eee5c54dd77a922d9b1287.jpg?fit=around%7C200%3A200&crop=200%3A200%3B%2A%2C%2A',
		comment1:{
			reviewName:'Souvik Patra',
			reviewImg:'https://b.zmtcdn.com/data/user_profile_pictures/b8b/fb35f85bc0d3d41e931ca10a56d01b8b.jpg?fit=around%7C100%3A100&crop=100%3A100%3B%2A%2C%2A',
			reviewTime:'4 days ago',
			reviewPara:' Genuinely, I didn not expect something magical here. This place is good, of you want your large family or friends to dine together peacefully. Actually, it is the story of every Paradise​ outlet. The Biriyani we ordered here was the family pack one and it was sufficient in quantity. And its value for money too. The ambience is good and the service needs to be faster though.'
		},
		comment2:{
			reviewName:'Pushyami Reddy',
			reviewImg:'https://b.zmtcdn.com/data/user_profile_pictures/370/2e3faa86446014c909b9c2bc1a388370.jpg?fit=around%7C100%3A100&crop=100%3A100%3B%2A%2C%2A',
			reviewTime:'23 days ago',
			reviewPara:'Ordered food from swiggy, which was a combo of paneer tikka and vegetable biryani... quality was very good... loved the taste... paneer was very soft and very tasty ... delicious combo for vegetarians ☺️'
		}
	},{
		// restaurant 05
		name: 'Ciclo Cafe',
		address: '801, Road 36, Jubilee Hills, Hyderabad',
		location: 'Jubilee Hills',
		category: 'Café',
		vote: '4.0',
		cuisines: 'Cafe,Continental',
		cost: '1300',
		hours: '11 AM to 11:30 PM (Mon-Fri), 7:30 AM to 11:30 PM (Sat-Sun)',
		votesNum:'333 votes',
		reviews:'261 reviews',
		image:'https://b.zmtcdn.com/data/pictures/3/18427283/3423f246256791f356d97a9e7585dcb8_featured_v2.jpg',
		bestDish: {
			name: 'Banana split vanilla icecream',
			image: 'http://mediaresources.idiva.com/media/photogallery/2012/Dec/banana_split_vanilla_ice_cream1_320x240.jpg'
		},
		photo1:'https://b.zmtcdn.com/data/pictures/3/18427283/3a0acdf1b64224bd58d47aab70eaa831.jpg?fit=around%7C200%3A200&crop=200%3A200%3B%2A%2C%2A',
		photo2:'https://b.zmtcdn.com/data/pictures/3/18427283/e6d638d716bd698815df320600fef72a.jpg?fit=around%7C200%3A200&crop=200%3A200%3B%2A%2C%2A',
		photo3:'https://b.zmtcdn.com/data/reviews_photos/f1b/20af18ef80fe183ef553005dbf166f1b_1500624573.jpg?fit=around%7C200%3A200&crop=200%3A200%3B%2A%2C%2A',
		photo4:'https://b.zmtcdn.com/data/reviews_photos/432/4e9a08b305d4495cb43e0b160bfb0432_1500268100.jpg?fit=around%7C200%3A200&crop=200%3A200%3B%2A%2C%2A',
		comment1:{
			reviewName:'Gopal Bhargav',
			reviewImg:'https://b.zmtcdn.com/data/user_profile_pictures/977/77bfc1784d79aad4b9ed35097263d977.jpg?fit=around%7C100%3A100&crop=100%3A100%3B%2A%2C%2A',
			reviewTime:'5 days ago',
			reviewPara:'Oh man! This is one restaurant everyone should visit. It was my birthday today. And I can not ask for a much better place to end my day. Went for dinner and came out with all smiles. The staff celebrated my birthday too by singing a birthday song. Thank u guys for making my day.'
		},
		comment2:{
			reviewName:'Harish',
			reviewImg:'https://b.zmtcdn.com/data/user_profile_pictures/886/e69889afc9a73d072776890578973886.jpg?fit=around%7C100%3A100&crop=100%3A100%3B%2A%2C%2A',
			reviewTime:'last week',
			reviewPara:'Dinner tonight at Chilis, Banjara hills. Ordered for beers, iced teas, chicken n bacon quesadillas, veg and cheese quesadillas. Excellent food and drinks, and very good service by Rockstar Ramesh. He gave us a choco chip paradise pie complimentary as they were out of Molten chocolava cake, and it was my sons birth day.'
		},
		comment3:{
			reviewName:'Pushyami Reddy',
			reviewImg:'https://b.zmtcdn.com/data/user_profile_pictures/370/2e3faa86446014c909b9c2bc1a388370.jpg?fit=around%7C100%3A100&crop=100%3A100%3B%2A%2C%2A',
			reviewTime:'23 days ago',
			reviewPara:'Ordered food from swiggy, which was a combo of paneer tikka and vegetable biryani... quality was very good... loved the taste... paneer was very soft and very tasty ... delicious combo for vegetarians ☺️'
		}
	},{
		// restaurant 06
		name: 'Vera Pizzeria',
		address: ' 41, Silicon Valley, Image Garden Road, Madhapur, Hyderabad',
		location: 'Madhapur',
		category: 'Casual Dining',
		vote: '4.0',
		cuisines: 'Pizza,Italian',
		cost: '1000',
		hours: '11 AM to 11 PM (Mon-Sun)',
		votesNum:'635 votes',
		reviews:'481 reviews',
		image:'https://b.zmtcdn.com/data/pictures/2/18312992/32dbdf5cf30d0c5fe36c7efcec60247f_featured_v2.jpg',
		compliment:{
			para1:'the best place to dine at',
			paraHold1:'The HINDU',
			para2:'Absolutely fantastic place to hangout',
			paraHold2:'The Chime',
			para3:'awesome awesome awesome awesome',
			paraHold3:'The awesome',
		},
		photo1:'https://b.zmtcdn.com/data/pictures/2/18312992/62c4b033ad9967974eea8fb337ac5968.jpg?fit=around%7C200%3A200&crop=200%3A200%3B%2A%2C%2A',
		photo2:'https://b.zmtcdn.com/data/pictures/2/18312992/01c28c73a3cedfae2409c1a20465d681.jpg?fit=around%7C200%3A200&crop=200%3A200%3B%2A%2C%2A',
		photo3:'https://b.zmtcdn.com/data/pictures/chains/2/18312992/f47d9a74602fc7f9fc6bd7a737f47c4f.jpg?fit=around%7C200%3A200&crop=200%3A200%3B%2A%2C%2A',
		photo4:'https://b.zmtcdn.com/data/pictures/chains/2/18312992/3ce3e855d9089fcc8b6c41f5e22d6869.jpg?fit=around%7C200%3A200&crop=200%3A200%3B%2A%2C%2A',
		comment3:{
			reviewName:'Riha Dhawan',
			reviewImg:'https://b.zmtcdn.com/data/user_profile_pictures/5eb/22f252d51815728863092e144d8bf5eb.jpg?fit=around%7C100%3A100&crop=100%3A100%3B%2A%2C%2A',
			reviewTime:'4 days ago',
			reviewPara:'I went here with a couple of friends and we had great time having the pizzas there. Going in group helps you in tasting a lot of dishes. We ordered some garlic bread with cheese sticks and it was yummmm. For pizzas we tried their Arabic range and it was also up to the mark. For pasta I tried their Alfredo and it was ok but the quantity was a little less then what I expected. '
		}
	}]
	$scope.restaurant = restaurants[$routeParams.id - 1];
	// restaurant k id k according uska object use krna
});
hungrybee.controller('loginController',function($scope,$location){
$scope.takeOff = function(){
	// kind of validation
	var loginName = $('.loginName').val();
	var loginPassword = $('.loginPassword').val();
	// agar local storage me username aur password saved h tho uss se bhi login kr skte h ya phir jo fixed id aur pass word h wo use kr skte h
	if(((localStorage.newUserName === loginName) && (localStorage.newUserPassword === loginPassword)) ||(loginName === 'test@acadview.com')&&( loginPassword === 'supersecret') ){
		$('#errorReport').text('');
		$location.url('delivery') // successfully login ho gya tho next page p le jao
	}
	else{
		alert('Username or password is incorrect') //clue
		$('#errorReport').text('if you have registered please use the latest id and password else use ID: test@acadview.com Password: supersecret')
	}
}
$scope.backHome= function(){
	$location.url('/') //close button k liye
}
$scope.forgot = function(){
	// agar local storage me username aur password save nhi hue h tb ye karo
	if(localStorage.newUserName === '' ||localStorage.newUserPassword === ''){
		$('#errorReport').text('if you have registered please use the latest id and password else use ID: test@acadview.com Password: supersecret')
	}
	else{
		// save hogye h tho user ko wo values show karo
	alert('your id is '+localStorage.newUserName+' and Password is '+localStorage.newUserPassword)
}
}
});
hungrybee.controller('signupController',function($scope,$location){
$scope.backHome= function(){
	$location.url('/')
}
$scope.register = function(){
	var userName = $('#inputEmail3').val(); //userId ko store krliye userName variable m
	var userPassword = $('#inputPassword3').val(); //userPassword store krliya useerPassword variable m
	if(localStorage.newUserName === userName){
		// agar user id local storage m stored h tho ye message show karo
		$('#testCase').text('Email ID is already registered. Please try with a new ID.')
		console.log('existing')
	}
	else{
		localStorage.setItem('newUserName',userName); //agar jo id dala h wo pehle se store nhi kiya h tho usko store karlo
		localStorage.setItem('newUserPassword',userPassword); //same jo id k saath kiya
		// console.log(userName);
		// console.log(userPassword);
		$location.url('delivery')// aur next page p lejao
	}
}

});
hungrybee.controller('homeController',function($scope,$location){
	$(window).on('scroll',function(){
		// halka sa animation dia 2 images ko
		var wScroll = $(this).scrollTop()
		var w1 = document.querySelector('.sushi');
		var w2 = document.querySelector('.cocktail');
		w1.style.left=wScroll*0.1+'px';//jo position relative kia h css m uska left 0 pe h.. usko alter karenge..
		w2.style.left=180-wScroll*0.1+'px';// same yahaan bhi but ye halka  sa late se hoga kyunki ye neeche h.. tho visibility m aane k liye time lgta h
		//warna poora chala jayega side m aur user ko dikhegabhi nhi
	});
	$scope.loginland = function(){
		$location.url('login');
	}
	$scope.signupland = function(){
		$location.url('signup');
	}
});


hungrybee.controller('mainController',function($scope){
	//ye delivery page ka controller h
	//alag hotels for alag details
	$scope.restaurants=[{
		name: 'American Grill & Bar',
		address: 'Flat 48, Ground Floor, Opposite Vengal Rao Park, Road 1, Banjara Hills, Hyderabad',
		location: 'Banjara Hills',
		category: 'Casual Dining, Bar',
		vote: '4.9',
		id:1,//isi ko use krke respective restaurant ki info page p land krte h
		cuisines: 'Mexican,American',
		cost: '2200',
		hours: '12 Noon to 11 AM (Mon-Sun)',
		votesNum:'2625 votes',
		reviews:'2253 reviews',
		image:'https://b.zmtcdn.com/data/pictures/chains/7/90847/2cc208fed5aacb60c5165cfca98ec0b6_featured_v2.jpg?fit=around%7C200%3A200&crop=200%3A200%3B%2A%2C%2A'
	},{
		name: 'Paradise',
		address: ' Plot 22-23, Vinayaknagar, Gachibowli Main Road, Gachibowli, Hyderabad',
		location: 'Gachibowli',
		category: 'Casual Dining',
		vote: '4.6',
		id:2,
		cuisines: 'Biryani,Chinese',
		cost: '950',
		hours: '11 AM to 11 PM (Mon-Sun)',
		votesNum:'881 votes',
		reviews:'692 reviews',
		image:'https://b.zmtcdn.com/data/pictures/chains/2/91662/6cafcbe3bb5f4478f6015cd38addd31f_featured_v2.jpg?fit=around%7C200%3A200&crop=200%3A200%3B%2A%2C%2A'
	},{
		name: 'Tatva',
		address: '1st Floor,SL Jubilee, Road 36, Jubilee Hills, Hyderabad',
		location: 'Jubilee Hills',
		category: 'Casual Dining',
		vote: '4.4',
		id:3,
		cuisines: 'Continental,Italian',
		cost: '1200',
		hours: '12 Noon to 3:30 PM (Mon-Sun)',
		votesNum:'251 votes',
		reviews:'181 reviews',
		image:'https://b.zmtcdn.com/data/pictures/3/18385313/ebebc05df55c7752db379cffe3e90a00_featured_v2.jpg?fit=around%7C200%3A200&crop=200%3A200%3B%2A%2C%2A'
	},{
		name: 'Autumn Leaf Cafe',
		address: 'Plot 823, Road 41, Jubilee Hills, Hyderabad',
		location: 'Jubilee Hills',
		category: 'Café',
		vote: '4.2',
		id:4,
		cuisines: 'Cafe',
		cost: '1000',
		hours: '12 Noon to 10:30 PM (Mon-Sun)',
		votesNum:'333 votes',
		reviews:'261 reviews',
		image:'https://b.zmtcdn.com/data/pictures/1/18312961/e7b277fe90c919538dfe81d9c59dd177_featured_v2.jpg?fit=around%7C200%3A200&crop=200%3A200%3B%2A%2C%2A'
	},{
		name: 'Ciclo Cafe',
		address: '801, Road 36, Jubilee Hills, Hyderabad',
		location: 'Jubilee Hills',
		category: 'Café',
		vote: '4.0',
		id:5,
		cuisines: 'Cafe,Continental',
		cost: '1300',
		hours: '11 AM to 11:30 PM (Mon-Fri), 7:30 AM to 11:30 PM (Sat-Sun)',
		votesNum:'333 votes',
		reviews:'261 reviews',
		image:'https://b.zmtcdn.com/data/pictures/3/18427283/3423f246256791f356d97a9e7585dcb8_featured_v2.jpg?fit=around%7C200%3A200&crop=200%3A200%3B%2A%2C%2A'
	},{
		name: 'Vera Pizzeria',
		address: ' 41, Silicon Valley, Image Garden Road, Madhapur, Hyderabad',
		location: 'Madhapur',
		category: 'Casual Dining',
		vote: '4.0',
		id:6,
		cuisines: 'Pizza,Italian',
		cost: '1000',
		hours: '11 AM to 11 PM (Mon-Sun)',
		votesNum:'635 votes',
		reviews:'481 reviews',
		image:'https://b.zmtcdn.com/data/pictures/2/18312992/32dbdf5cf30d0c5fe36c7efcec60247f_featured_v2.jpg?fit=around%7C200%3A200&crop=200%3A200%3B%2A%2C%2A'
	}]
});

hungrybee.controller('foodListController',function($scope,$http){
// first reequest using apl
	$scope.list1 = [];
	var data = '{"inputs":[{"data":{"image":{"url":"' +'https://img.grouponcdn.com/deal/iJVvZzL5wXt2WdwKgQhLgN/186347703-3642x2185/v1/c700x420.jpg'+ '"}}}]}'
	$http({
		'method' : 'POST',
		'url': 'https://api.clarifai.com/v2/models/bd367be194cf45149e75f01d59f77ba7/outputs',
		'headers': {
			'Authorization': 'Key b8c3e76005914949bf0a12c25e052abe',
			'Content-Type': 'application/json'
		},
		'data': data
	}).then(function (response){
		var ingredients = response.data.outputs[0].data.concepts;
		var list = '';
		for (var i =0;i<ingredients.length;i++)
		{
			$scope.list1.push(ingredients[i].name);
			// console.log(ingredients[i].name)
		}

	},function (xhr){
		console.log(xhr)
	})
// 	console.log('list1')
// console.log($scope.list1)
// second request
	$scope.list2 = [];
	var data = '{"inputs":[{"data":{"image":{"url":"' +'http://www.blendspice6.com/images/2.jpg'+ '"}}}]}'
	$http({
		'method' : 'POST',
		'url': 'https://api.clarifai.com/v2/models/bd367be194cf45149e75f01d59f77ba7/outputs',
		'headers': {
			'Authorization': 'Key b8c3e76005914949bf0a12c25e052abe',
			'Content-Type': 'application/json'
		},
		'data': data
	}).then(function (response){
		var ingredients = response.data.outputs[0].data.concepts;
		for (var i =0;i<ingredients.length;i++)
		{
			$scope.list2.push(ingredients[i].name);
			// console.log(ingredients[i].name)
		}
	},function (xhr){
		console.log(xhr)
	})
	// console.log('list2')
	// console.log($scope.list2)
// Third request
	$scope.list3 = [];
	var data = '{"inputs":[{"data":{"image":{"url":"' +'https://img.grouponcdn.com/deal/uvzXjairBk34ASNJGeTn/DT-700x420/v1/c700x420.jpg'+ '"}}}]}'
	$http({
		'method' : 'POST',
		'url': 'https://api.clarifai.com/v2/models/bd367be194cf45149e75f01d59f77ba7/outputs',
		'headers': {
			'Authorization': 'Key b8c3e76005914949bf0a12c25e052abe',
			'Content-Type': 'application/json'
		},
		'data': data
	}).then(function (response){
		var ingredients = response.data.outputs[0].data.concepts;
		var list = '';
		for (var i =0;i<ingredients.length;i++)
		{
			$scope.list3.push(ingredients[i].name);
			// console.log(ingredients[i].name)
		}
	},function (xhr){
		console.log(xhr)
	})
	// console.log('list3')
	// console.log($scope.list3)
// Fourth reequest
	$scope.list4 = [];
	var data = '{"inputs":[{"data":{"image":{"url":"' +'https://img.grouponcdn.com/deal/iJVvZzL5wXt2WdwKgQhLgN/186347703-3642x2185/v1/c700x420.jpg'+ '"}}}]}'
	$http({
		'method' : 'POST',
		'url': 'https://api.clarifai.com/v2/models/bd367be194cf45149e75f01d59f77ba7/outputs',
		'headers': {
			'Authorization': 'Key b8c3e76005914949bf0a12c25e052abe',
			'Content-Type': 'application/json'
		},
		'data': data
	}).then(function (response){
		var ingredients = response.data.outputs[0].data.concepts;
		var list = '';
		for (var i =0;i<ingredients.length;i++)
		{
			$scope.list4.push(ingredients[i].name);
			// console.log(ingredients[i].name)
		}
	},function (xhr){
		console.log(xhr)
	})
	// console.log('list4')
	// console.log($scope.list4)

// Fifth request
	$scope.list5 = [];
	var data = '{"inputs":[{"data":{"image":{"url":"' +'https://img.grouponcdn.com/deal/iJVvZzL5wXt2WdwKgQhLgN/186347703-3642x2185/v1/c700x420.jpg'+ '"}}}]}'
	$http({
		'method' : 'POST',
		'url': 'https://api.clarifai.com/v2/models/bd367be194cf45149e75f01d59f77ba7/outputs',
		'headers': {
			'Authorization': 'Key b8c3e76005914949bf0a12c25e052abe',
			'Content-Type': 'application/json'
		},
		'data': data
	}).then(function (response){
		var ingredients = response.data.outputs[0].data.concepts;
		var list = '';
		for (var i =0;i<ingredients.length;i++)
		{
			$scope.list5.push(ingredients[i].name);
			// console.log(ingredients[i].name)
		}
	},function (xhr){
		console.log(xhr)
	})
	// console.log('list5')
	// console.log($scope.list5)

// click event
$('#subButton').on('click',function(){

	var n1 = $('#ig0').prop("checked");
	var n2 = $('#ig1').prop("checked");
	var n3 = $('#ig2').prop("checked");
	var n4 = $('#ig3').prop("checked");
	var n5 = $('#ig4').prop("checked");
	var n6 = $('#ig5').prop("checked");
	var n7 = $('#ig6').prop("checked");
	var n8 = $('#ig7').prop("checked");
	var n9 = $('#ig8').prop("checked");
	var n10 = $('#ig9').prop("checked");
	var n11 = $('#ig10').prop("checked");
	var n12 = $('#ig11').prop("checked");
	var n13 = $('#ig12').prop("checked");
	var n14 = $('#ig13').prop("checked");
	var n15 = $('#ig14').prop("checked");
	var n16 = $('#ig15').prop("checked");
	var n17 = $('#ig16').prop("checked");
	var n18 = $('#ig17').prop("checked");
	var n19 = $('#ig18').prop("checked");
	var n20 = $('#ig19').prop("checked");
	var n21 = $('#ig20').prop("checked");
	var n22 = $('#ig21').prop("checked");
	var n23 = $('#ig22').prop("checked");
	var n24 = $('#ig23').prop("checked");
	var n25 = $('#ig24').prop("checked");
	var n26 = $('#ig25').prop("checked");
	var n27 = $('#ig26').prop("checked");
	var n28 = $('#ig27').prop("checked");
	var n29 = $('#ig28').prop("checked");
	var n30 = $('#ig29').prop("checked");

	var dummylist0 =[n1,n2,n3,n4,n5,n6,n7,n8,n9,n10,n11,n12,n13,n14,n15,n16,n17,n18,n19,n20,n21,n22,n23,n24,n25,n26,n27,n28,n29,n30]
	// var listx=['apple','banana','tomato','carrot','beans']
	// console.log('listX is '+listx)
	// var listy=['potato','tomato','onion','carrot','brinjal']
	// console.log('listY is '+listy)

	var selectList1 =[];
	var selectList2 =[];
	for(var i=0 ;i<dummylist0.length;i++)
	{
		if(dummylist0[i] === true){
			var id = '#ig'+i
			selectList1.push($(id).val())
		}
		else{
			var id = '#ig'+i
			selectList2.push($(id).val())
		}
	}
	console.log('Selected ingredients '+selectList1)
	console.log('left out ingredients '+selectList2)
	var count1=0;
	var count2=0;
	var count3=0;
	var count4=0;
	var count5=0;
	for(var i=0;i<selectList1.length;i++)
	{
		for(var j=0;j<$scope.list1.length;j++)
		{
			// console.log('searching for '+selectList1[i])
			if(selectList1[i] == $scope.list1[j]){
				// console.log(selectList1[i]+' found on '+ j +' index of $scope.list1')
				count1++;
			}
		}
	}
	// console.log(count1+' matched in $scope.list1')
	for(var i=0;i<selectList1.length;i++)
	{
		for(var j=0;j<$scope.list2.length;j++)
		{
			// console.log('searching for '+selectList1[i])
			if(selectList1[i] == $scope.list2[j]){
				// console.log(selectList1[i]+' found on '+ j +' index of $scope.list2')
				count2++;
			}
		}
	}
	// console.log(count2 +' matched in $scope.list2')
	for(var i=0;i<selectList1.length;i++)
	{
		for(var j=0;j<$scope.list3.length;j++)
		{
			// console.log('searching for '+selectList1[i])
			if(selectList1[i] == $scope.list3[j]){
				// console.log(selectList1[i]+' found on '+ j +' index of $scope.list3')
				count3++;
			}
		}
	}
	// console.log(count3 +' matched in $scope.list3')
	if(count1>count2 && count1>count3){
		console.log('image1')
	}
	else if(count2>count1 && count2>count3){
		console.log('image2')
	}
	else if(count3>count1 && count3>count2){
		console.log('image3')
	}
	else{
		console.log('seems to be an issue')
	}
});

});
