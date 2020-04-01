### New York Times Article Searcher
Built using React JS with help of NYT API. The api docs can be found https://developer.nytimes.com/apis , a live demo of this application can be viewed at https://mnazari95.github.io/pubapiapp/ . This was tested/developed for the latest version of chrome web browser and have not been tested for browsers such as safari/opera/etc.. (there might be a slight visual differences if these other browsers are used)

### Features
By default the page is loaded with NYT Rss feed(the image resolutions displayed are limited due to the rss feed only providing a small image) to display recent news. Users can search for any news using the search bar at the top of the application. Users can also activate filtered search by expanding the search by clicking on the arrow down to display the filtered search feature. If the user does not want to use the filtered search feature they may de-activate it by simply clicking on the arrow up.
1. Most popular api
    - displays current most viewed articles of the day (essentially presented as user first visits the app)
2. Article Searcher
    - using the search bar within the app, users can search for anything that NYT has published
3. Filtered Search
    - if users would like to filter their results, they simply can open the filter search by clicking onto the arrow down button.
    -to disable filtered search they simply need to collapse the filtered search panel by clicking onto arrow up button

### Possible Issues
there might be a chance when the live demo won't work, in that case the api key may have reached it's monthly quota

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.
