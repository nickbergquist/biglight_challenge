# Biglight challenge

## GENERATE FILES

In a CLI run the following in the same path as the package.json file:

Compile *.scss files to CSS 
```javascript
$ npm run build
```

Watch for *.scss file changes and recompile files
```javascript
$ npm run watch
```


NB. 
1. CSS files generated contain selector properties automatically vendor-prefixed where required using [autoprefixer](https://www.npmjs.com/package/autoprefixer) 
2. as this is a development deployment CSS files are not minified and are generated with map files for cross-reference back to the source SASS files in user-agent developer tools.


## SERVER

Start server on port 7000 by running the following in a new CLI in the same path as above:
```javascript
$ node index.js
```


## BROWSER SETUP

1. Install [Code Injector](https://chrome.google.com/webstore/detail/code-injector/jgcallaoodbhagkaoobenaabockcejmc) extension for Chrome browser.

2. In extension add URL pattern for Challenge 1:
   + https://www.amazon.co.uk/Echo-Dot-3rd-Gen-Charcoal/dp/B07PJV3JPR/ref=sr_1_2

3. And add URLs for resource files being served locally, i.e.  

   + http://localhost:7000/css/challenge-1.css
   + http://localhost:7000/js/challenge-1.js

4. Repeat for Challenge 2 using a further URL pattern:
   + https://www.amazon.co.uk/s\?k=Amazon

5. And add further resource file paths, i.e.  

   + http://localhost:7000/css/challenge-2.css
   + http://localhost:7000/js/challenge-2.js

NB.
In the Code Injector extension ensure that for each Challenge the CSS file is loaded *before* the Javascript file.


## BROWSER RENDER

Load either URL pattern (above) using Chrome to view the challenge variations.


