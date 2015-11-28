# React Starter
### A barebones starter for react applications.

### Table of Contents
- [Getting Started](https://github.com/eanplatter/react-starter#getting-started)
- [Webpack](https://github.com/eanplatter/react-starter#webpack-webpackconfigjs)
- [NPM](https://github.com/eanplatter/react-starter#npm-scripts-packagejson)
- [HTML](https://github.com/eanplatter/react-starter#index-appindexhtml)
- [React](https://github.com/eanplatter/react-starter#reactappappjs)

## Getting Started
1. Clone the repo.
2. `npm install`
3. `npm start`
4. Navigate to http://localhost:8080/

## File Information

### Webpack (webpack.config.js)
[webpack.config.js](https://github.com/eanplatter/react-starter/blob/master/webpack.config.js) is where the webpack commands understand what to do. It tells webpack where to find application code, and what to do with it.

Let's disect the file:

**_webpack.config.js_**
``` javascript
var HtmlWebpackPlugin = require('html-webpack-plugin');
```
This is a third party module that allows us to generate our `index.html` file along with our react bundle file. It's not 100% necessary, but it's pretty handy.
``` javascript

module.exports = {
  entry: './app/App.js',
```
This is the entry point of the application. Webpack will start there, and then grab any code this file requires.
``` javascript
  output: {
    path: 'dist',
    filename: 'index_bundle.js',
  },
```
Once it's grabbed the code, it uses this `output` object to determine where to put the bundle. The path tells it what folder to place the code, and the filename is the name of the bundled file. This means once webpack finishes bundling, it is going to create a file in the dist folder named `index_bundle.js`. This file is usually pretty big, and unreadable.
``` javascript
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['babel?stage=0'],
        include: __dirname + '/app'
      },
    ]
  },
```
Loaders tell webpack what kind of code we'll be writing. If we're writing `ES6`, `ES7`, `React`, or whatever crazy stuff. Webpack goes through and converts files with the type of `.js` loads it through the [Babel](http://babeljs.io/) loader at `stage=0` (`ES7` stuff), and turns it into regular old `ES5`. 

In this isntance we're using the `include` property to tell the loader to only load `.js` files from the `app/` folder.

``` javascript
var HTMLWebpackPlugin = new HtmlWebpackPlugin({
  template: __dirname + '/app/index.html',
  hash: true,
  filename: 'index.html',
  inject: 'body'
});
```
This is where we use the `HTMLWebpackPlugin` to generate an `index.html` file. Normally one would just keep an `index.html` file in the `dist` directory, but I like to generate it so that everything in the `dist` is 100% generated code.

``` javascript
var HotReloader = new webpack.HotModuleReplacementPlugin();
```
We also need to instantiate an instance of webpack's `HotModuleReplacementPlugin` for live reloading.

We then add both the `HotReloader` and `HTMLWebpackPlugin` to the `plugins` section of the module.

``` javaScript
 plugins: [HTMLWebpackPlugin, HotReloader]
```

<hr>

### NPM scripts (package.json)
[package.json](https://github.com/eanplatter/react-starter/blob/master/package.json) is where npm modules are listed as dependencies (duh), but also where the webpack start script lives. Rather than using something like [Gulp](http://gulpjs.com/) we're gonna keep things simple and use npm scripts.

The main thing to note is the scripts property; when you run `npm start` it runs the prestart, which runs webpack. Once webpack has finished building all of the code, it runs `webpack-dev-server` (serving up the files to port 8080) with the `dist` directory as the `content-base`, otherwise `webpack-dev-server` would just look for the `index.html` in the root of the project:
``` javascript
  "scripts": {
    "prestart": "webpack",
    "start": "webpack-dev-server --content-base dist/"
  },
```

<hr>

### Index (app/index.html)
[index.html](https://github.com/eanplatter/react-starter/blob/master/app/index.html) is the application's main HTML file. You can use it for loading in CDNs, etc.

Also, it's where you'll hook React into the mix. Notice in the file we have a `div` with the `id` of `root`:
``` html
<div id='root'></div>
```
This is where we tell our bundle file to render all of it's code.

<hr>

### React(app/App.js)
[App.js](https://github.com/eanplatter/react-starter/blob/master/app/App.js) is the main file of the application. It's where the React code is injected into the `index.html`.

Let's look at the file:

**_webpack.config.js_**
``` javascript
import React, {Component} from 'react';
import {render} from 'react-dom';
```
These are `ES6` imports and destructurings. Essentially we're getting React and it's Component property from `react`, and a `render` property from something called `react-dom`.

``` javascript
class App extends Component {
  render() {
    return (
      <div>
        <h1>
          Welcome to the react starter.
        </h1>
      </div>
    );
  }
}
```
This bit is our actual UI. We're using an `ES6` class, but we could also do the same thing with `React.createClass()`. There's plenty of debate on the two, but what's important is that they both have `render` methods which return something called `JSX`. `JSX` is a lot like `HTML` but with a different flavor.

``` javascript
render(<App />, document.getElementById('root'));
```
Lastly, this piece is where we use that `render` property found in the `react-dom` library. In our case, this is telling Webpack where to put the `<App />` component we made (when we said `class App extends Component` we were creating a react component that could then be used like an `HTML` element: `<App />`). We're telling react to render our `<App />` inside the element with the ID `root`.

And that's it!
