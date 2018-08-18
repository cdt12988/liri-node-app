# LIRI

LIRI is a Node.js command line application that accepts two different methods of user input to perform various API calls and return information back to the user.

## Getting Started

### Installation

To install LIRI, simply download or clone the Git Repository to your computer.  Then in your command line application, ensure you are within the repo directory and issue the following command to install all of the necessary packages for the app to run properly. Note that you must already have Node.js installed on your machine for this to work.

```
npm install
```

### Setup

Because this app uses the Node-Spotify-API, a unique Spotify ID and Secret is required to use the Spotify portion of the app.  If you do not already have these, you will need to follow the steps listed below.  If you already have these, you can skip to Creating Local Environment Variables

#### Obtaining Spotify ID/Secret

* Go to <https://developer.spotify.com/my-applications/#!/>

* Login with an existing Spotify account or create a new one (the free account is perfectly fine).

* Once logged in, navigate to <https://developer.spotify.com/my-applications/#!/applications/create> to register a new application to be used with the Spotify API. You can fill in whatever you'd like for these fields. When finished, click the "complete" button.

* On the next screen, scroll down to where you see your client id and client secret. Copy these values down somewhere, you'll need them to use the Spotify API and the [node-spotify-api package](https://www.npmjs.com/package/node-spotify-api).

#### Creating Local Environment Variables

Once you have your Spotify ID and Secret, you will need to go ahead and create a new file within the repository called '.env' and copy the following code into the file:

```js
# Spotify API keys

SPOTIFY_ID=<your-spotify-id>
SPOTIFY_SECRET=<your-spotify-secret>
```

Replace '\<your-spotify-id\>' and '\<your-spotify-secret\>' with your own Spotify ID and Spotify Secret so that it looks more like this:

```js
# Spotify API keys

SPOTIFY_ID=1a2bc3def4ghij5klmno6pqrstu7vwxyz
SPOTIFY_SECRET=7zyxwvut6srqpon5mljihf4gfed3bcba
```

You are now ready to run the app!

## Using the App

## User Input

LIRI accepts two methods of user input: command line arguments and inquirer prompts.  Essentially, there are just two ways of using the app.

### Command Line Arguments

This first method of using the app allows the user to input specific command arguments after running the app to quickly perform a single search.

These commands are predefined and the user must know them and the proper syntax ahead of time in order for them to return the desired results.

#### Commands

##### concert-this

The 'concert-this' command searches for a particular band and returns that band's upcoming concerts.  The band name is entered as a separate argument after the 'concert-this' command.

```
node liri.js concert-this Weezer
```

##### spotify-this

The 'spotify-this' command searches for a particular song and returns set information about that song.  The song name is entered as a separate argument after the 'concert-this' command.

```
node liri.js spotify-this Under the Bridge
```

##### movie-this

The 'movie-this' command searches for a particular movie and returns set information about that movie.  The movie name is entered as a separate argument after the 'concert-this' command.

```
node liri.js movie-this Forrest Gump
```

##### do-something-random

This command is different from the others in that it takes no additional arguments after the command.  The command will check the commands log for all previously issued commands and perform one of them at random.  Note that commands issued via 'do-something-random' do not get added to the commands log, so they will not add repeat commands when called.

```
node liri.js do-something-random
```

### Inquirer Prompts

Alternatively to command line arguments, the app can be ran without any commands or arguments at all.  Doing so will walk the user through a series of prompts that allows them to simply select various commands from a list and then type in any additional arguments the selected command may require.

Using the app in this manner also allows the user to perform as many searches as they would like before ending the app.

To end the program, select 'Nothing' within the list of commands.

## Developer Notes

### Languages and Packages

LIRI is written in Node.js and uses the following Node.js Packages:

* inquirer

* request

* dotenv

* moment

* node-spotify-api

### Contributors

Cody Thompson is the only contributor thus far.