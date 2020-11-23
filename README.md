# Biglight challenge

## GENERATE FILES

In a CLI run the following in the same path as the package.json file:  

Build dependencies 
```javascript
$ npm install
```  

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



## BUGS

### Challenge 1:
In the original add to basket mechanism if 2 items are added to the basket and in the basket they are both deleted then if the user returns to the product display view by using the browser back button the visible pseudo `<select>` element is set to 1 item yet the modal popup remains on 2 items and the actual hidden HTML `<select>` still has a form submission value of 2. If the user selects 2 from the pseudo `<select>` element the quantity does not change to 2. The user can change to 2 by first selecting 1 unit then 2 units. This is a pre-existing feature.

This problem can be avoided by using the link provided back to the product display view instead of using the back button. However, this will then result in the product being displayed under a different URL which does not match the Challenge 1 test URL pattern. Further consideration of the test environment would be needed in this area to ensure that the user is bucketed into the test based on exact requirements.



## WORKAROUNDS

### Challenge 1:
On page load there is a section of HTML for the modal quantity selection popup missing from the DOM. This is only generated when the visible pseudo `<select>` element for item quantity is selected but its presence is required so that elements within it can be programmatically controlled by events attached to `#basketAddQuick`, the fixed-position test element.  
The fix has been to execute a click event to generate the needed markup and to temporarily hide the resulting modal quantity control and its associated background filling the viewport. This approach, though functional, is not ideal and would benefit from peer-review and a second run-through of the code to investigate alternatives.


