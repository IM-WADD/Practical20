# Help / further guidance for stages 2 and 3
See below for help with some of the steps in stages 2 and 3. Try not each step on your own first!

## Step 2.1
Your completed function should look like this:
```javascript
submitButton.addEventListener("click", event => {
    event.preventDefault();
});
```

The anonymous arrow event handler has exactly one parameter so it does not need to be surrounded with brackets. It only contains one line of code at the moment but more will be added so curly braces are needed.

## Step 2.2
Find the template for fetching data from an API using promise chaining in the slides for lecture 18, and type it in to your `getData` function. The template uses traditional function syntax for the callback functions - translate this into arrow function syntax as follow:
- delete the function keyword
- put an arrow symbol (`=>`) between the brackets for the parameters and the opening curly brace

E.g.:
```javascript
function () {

}
```
becomes
```javascript
() => {

}
```
If all goes well, you should have two calls to `then()`. Print the API response, a JSON object inside the callback function for the *second* `then()`.

## Step 3.1
The completed code for this step should look something like this:
```javascript
storedArtworks = artworks.filter(art => art.thumbnail !== null)
```

In the code above, the parameter `art` is an individual item in the `artworks` array. JavaScript will automatically call the callback function passed to `filter()` for each item. The body of the callback function should return `true` if `art` should be included in the resulting array, or `false` if it should be left out. In the example above, only one line is needed so there are no curly braces or `return` keyword. The value of `art.thumbnail !== null` will automatically be returned. This statement is equivalent to:

```javascript
if (art.thumbnail !== null) {
    return true
} else {
    return false
}
```

## Step 3.2
Here is the partially complete code for this step. Fill in the missing pieces using the existing code as a guide.

```javascript
storedArtworks = artworks.filter(art => art.thumbnail !== null).map(art => {
                    // Create the Artist
                    const artist = new Artist(art.artist_title, art.artist_id, art.artist_display);
                    // Create the Thumbnail
                    
                    // Create the Artwork
                    
                    // return the Artwork
                });
```
Take a close look at the arguments passed to the `Artist` constructor. Notice that the property names match the API fields given in the documentation for the `Artist` constructor.