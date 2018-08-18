require('dotenv').config();
var liri = {
	keys: require('./keys.js'),
	request: require('request'),
	moment: require('moment'),
	inquirer: require('inquirer'),
	fs: require('fs'),
	Spotify: require('node-spotify-api'),
	command: process.argv[2],
	input: '',
	prepareInput: function() {
		for(var i = 3; i < process.argv.length; i++) {
			this.input += process.argv[i] + ' ';
		}
		
		this.input = this.input.trim();
		this.input = this.input.replace(/ /g, '+');
		console.log(this.input);
	},
	prepareString(str) {
		var formattedStr = str.trim().replace(/ /g, '+');
		return formattedStr;
	},
	logCommand: function() {
		var log = this.command;
		if(this.input != '') {
// 			log += ',"' + this.input + '"';
			log += ',' + this.input;
		}
		this.fs.appendFile('log.txt', '\n' + log, function(err) {
		if(err) {
			console.log(err);
		}
	});
	},
	findConcerts: function() {
		if(process.argv[3]) {
			this.prepareInput();
		} else if(this.input != '') {
			//	no need to change input value (set before function is called)
		} else {
			this.input = 'Weezer';
		}
// 		var queryUrl = 'https://rest.bandsintown.com/artists/' + this.input + '?app_id=codingbootcamp';
		var queryUrl = 'https://rest.bandsintown.com/artists/' + this.input + '/events?app_id=codingbootcamp';
		
		this.request(queryUrl, function(error, response, body) {
			if(!error) {
				var concerts = JSON.parse(body);
				console.log('');
				console.log('----' + liri.input.replace(/\+/g, ' ') + '----');
				concerts.forEach(function(concert) {
					console.log('');
					console.log('Venue: ' + concert.venue.name);
					console.log('Location: ' + concert.venue.city + ', ' + concert.venue.region)
					console.log('Date: ' + liri.moment(concert.datetime).format('MM/DD/YYYY'));
				});
				if(liri.command != 'do-something-random') {
					liri.logCommand();
				}
			}
		});
	},
	findSong: function() {
		if(process.argv[3]) {
			this.prepareInput();
		} else if(this.input != '') {
			//	no need to change input value (set before function is called)
		} else {
			this.input = 'The+Sign+Ace+of+Base';
		}
		var spotify = new this.Spotify(this.keys.spotify);
		
		spotify.search({ type: 'track', query: this.input, limit: 1}, function(error, response) {
		    if (error) {
				console.log(error);
				return;
		    } else {
				var song = response.tracks.items[0];
				console.log('');
				console.log('----' + song.name + '----');
				console.log('Artist: ' + song.artists[0].name);
				console.log('Album: ' + song.album.name + ' -- ' + liri.moment(song.album.release_date, 'YYYY-MM-DD').format('YYYY'));
				console.log('Preview: ' + song.preview_url);
				console.log('');
				if(liri.command != 'do-something-random') {
					liri.logCommand();
				}
			}
		});
	},
	findMovie: function() {
		if(process.argv[3]) {
			this.prepareInput();
		} else if(this.input != '') {
			//	no need to change input value (set before function is called)
		} else {
			this.input = 'Mr. Nobody';
		}
		var queryUrl = 'http://www.omdbapi.com/?t=' + this.input + '&y=&plot=short&apikey=trilogy';
		
		this.request(queryUrl, function(error, response, body) {

		  if (!error && response.statusCode === 200) {
		
	//     console.log("The movie's rating is: " + JSON.parse(body).imdbRating);
			console.log('');
		    console.log('----' + JSON.parse(body).Title + '----');
		    console.log('Year: ' + JSON.parse(body).Year);
		    console.log('IMDB Rating: ' + JSON.parse(body).imdbRating + ' (' + JSON.parse(body).imdbVotes + ' votes)');
		    console.log('Rotten Tomatoes Rating: ' + JSON.parse(body).Ratings[1].Value);
		    console.log('Produced in: ' + JSON.parse(body).Country);
		    console.log('Language: ' + JSON.parse(body).Language);
		    console.log('Plot: ' + JSON.parse(body).Plot);
		    console.log('Actors: ' + JSON.parse(body).Actors);
		    console.log('');
		    if(liri.command != 'do-something-random') {
				liri.logCommand();
			}
		  }
		});
	},
	randomCommand: function() {
// 		var commandSets = [];
		this.fs.readFile('log.txt', 'utf8', function (error, response) {
			if (error) {
				console.log(error);
			} else {
				var commandSets = response.split('\n');
				var random = Math.floor(Math.random() * commandSets.length);
// 				console.log(commandSets[random]);
				var commandPair = commandSets[random].split(',');
				var command = commandPair[0];
				liri.input = commandPair[1];
// 				console.log(command);
// 				console.log(liri.input);
				switch(command) {
					case 'concert-this':
						liri.findConcerts();
						break;
					case 'spotify-this-song':
						liri.findSong();
						break;
					case 'movie-this':
						liri.findMovie();
						break;
					case 'do-something-random':
						liri.randomCommand();
						break;
					default:
						console.log('Sorry, random command not recognized.  Please try again.');
				}
			}
		});
	},
	initialize: function() {
		console.log('');
		console.log('');
		console.log('~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ')
		console.log('');
		console.log('               WELCOME TO LIRI!');
		console.log('');
		console.log('~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ')
		console.log('');
		setTimeout(function() {
			console.log('');
			console.log('Follow the command prompts to find concerts, songs, or movies. Happy hunting!');
			console.log('');
			setTimeout(function() {
				liri.prompt();
			}, 3000);
		}, 2000);
	},
	prompt: function() {
		console.log('');
		this.inquirer
		.prompt([
			{
				type: 'list',
				message: 'What would you like to look up?',
				choices: ['Concerts', 'Songs', 'Movies', 'Random', 'Nothing'],
				name: 'command'
			}
		]).then(function(answer) {
			switch(answer.command) {
				case 'Movies':
					console.log('');
					liri.inquirer.prompt([
						{
							name: 'name',
							message: 'What movie would you like to look up?'
						}
					]).then(function(movie) {
						console.log('');
						var formattedMovie = liri.prepareString(movie.name);
						liri.input = formattedMovie;
						liri.command = 'movie-this';
						liri.findMovie();
						console.log('');
						setTimeout(function() {
							liri.prompt();
						}, 3000);
					});
					break;
				case 'Concerts':
					console.log('');
					liri.inquirer.prompt([
						{
							name: 'name',
							message: 'What band\'s upcoming concerts would you like to look up?'
						}
					]).then(function(concert) {
						console.log('');
						var formattedConcert = liri.prepareString(concert.name);
						liri.input = formattedConcert;
						liri.command = 'concert-this';
						liri.findConcerts();
						console.log('');
						setTimeout(function() {
							liri.prompt();
						}, 3000);
					});
					break;
				case 'Songs':
					console.log('');
					liri.inquirer.prompt([
						{
							name: 'name',
							message: 'What song would you like to look up?'
						}
					]).then(function(song) {
						console.log('');
						var formattedSong = liri.prepareString(song.name);
						liri.input = formattedSong;
						liri.command = 'spotify-this-song';
						liri.findSong();
						console.log('');
						setTimeout(function() {
							liri.prompt();
						}, 3000);
					});
					break;
				case 'Random':
					liri.command = 'do-something-random';
					liri.randomCommand();
					console.log('');
					setTimeout(function() {
						liri.prompt();
					}, 3000);
					break;
				case 'Nothing':
					console.log('');
					console.log('GOODBYE!');
					console.log('');
					break;
			}
		});
	}
}

switch(liri.command) {
	case 'concert-this':
		liri.findConcerts();
		console.log('');
		break;
	case 'spotify-this-song':
		liri.findSong();
		console.log('');
		break;
	case 'movie-this':
		liri.findMovie();
		console.log('');
		break;
	case 'do-something-random':
		liri.randomCommand();
		console.log('');
		break;
	default:
		if(process.argv[2]) {
		console.log("-------------------------------------------------------------------");
		console.log('');
		console.log('		----Command not recognized----');
		console.log('');
		console.log('Please enter one of the commands below followed by any necessary parameters');
		console.log('');
		console.log("*	'concert-this' [band name]")
		console.log('');
		console.log('		-- displays a list of upcoming concerts for the band.');
		console.log('');
		console.log("*	'spotify-this-song' [song name]")
		console.log('');
		console.log('		-- displays information about the song');
		console.log('');
		console.log("*	'movie-this' [movie name]")
		console.log('');
		console.log('		-- displays information about the movie');
		console.log('');
		console.log("*	'do-something-random'");
		console.log('');
		console.log('		-- displays a random requests from a previous search.');
		console.log('');
		console.log('Alternatively, you can run the program without any additional commands to make multiple searches.')
		console.log('');
		console.log("-------------------------------------------------------------------");
		console.log('');
		} else {
			liri.initialize();
		}
}
