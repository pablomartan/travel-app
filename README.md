# Travel App
This project consists of a travel app. It is the final project of Udacity Frontend Web Development.
The basic functionality as of jan 17 2023 is just a basic 'trip notebook',
where you input the city you want to go to and the dates you plan to go and the
app creates a card with:
- the city name,
- a picture gotten from [Pixabay](https://pixabay.com),
- the start and end dates,
- some weather information (max and min temp averages for *current week* and
  the weather of *today*; the weatherbit API free plan is so limited that you
  can't query for the dates of the trip)

## How to use it
You will need to instal the dependencies and the build the project. First, you
will need to clone the repo:
```
git clone https://github.com/pablomartan/travel-app
```
Then, install the dependencies. This project requires [node.js]() and [npm]()
to run. When you have those installed on your system, open a terminal in the
folder you cloned the repo into and run: `npm install`. This will create a
`node_modules` folder.

Before you can use the app, you will need API keys for [Geonames API](),
[Weatherbit API]() and [Pixabay API](). Once you have all the API keys, you
have to place them in a file named `.env` inside the root directory (the folder
you cloned the project into). You have to store them with the following names:
```
GEONAMES_API_KEY="YOURAPIKEY"
WEATHER_API_KEY="YOURAPIKEY"
PIXABAY_API_KEY="YOURAPIKEY"
```
The last bit of previous setup consists of adding the environment variable
`PORT` into this same file. It has to be different from `8080`, because the
webpack dev server uses it and in case they used the same one it would yield an
error. 

After that you have two options. If you want a production ready app, you can
run `npm run build-prod`, which will create a `dist` folder with an
`index.html` file and several other files, mostly javascript. If however you
would like to tweak the app, you can run `npm run build-dev` to get a
hot-reloading webapp, that updates the moment you write a change into any of
the project's files (the ones imported into the [webpack entry point](), which is
`src/client/index.js` in this project).

Whichever option you chose, you will need to run `npm start` in a different
terminal so that the server is reachable and the client can retrieve the API
keys.

# License
This project is licensed under the [MIT](./LICENSE).
