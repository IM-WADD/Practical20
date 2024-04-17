# Practical 20 (Week 10, Practical 2) - Further JS
This practical will give you practice with more advanced JavaScript syntax functionality. In Stage 1, you will translate pre-written functions from traditional syntax to arrow syntax and vice versa. In Stages 2 and 3, you will create an application to display artworks from the Chicago Art Institute, focusing on using anonymous arrow functions as callbacks in Stage 2, and array methods to process data in Stage 3. 

## Stage 1 - Traditional vs. arrow function syntax
Each exercise in this stage includes a function written in either traditional or arrow syntax. Your job is to translate from one syntax to the other. Write your code in  main.js in the stage1 folder included with this repo. The Javascript file includes pre-written tests that you can use to ensure your functions are 
correct. Run the code in your browser to see the test results.

## Exercise 1.1
Translate this traditional function to arrow function syntax:
```
function calculateAverage(...numbers) {
    if (numbers.length === 0) {
        return NaN;
    }
    let total = 0;
    for (const number of numbers) {
        total += number;
    }
    return total / numbers.length;
}
```

## Exercise 1.2
Translate this arrow function to traditional function syntax
```
const shout = message => `${message.toUpperCase()}!!!`;
```

## Exercise 1.3
Translate this traditional function to arrow function syntax
```
function doubleUp (array) {
    const length = array.length;
    for (let i = 0; i < length; i++) {
        array.push(array[i]);
    }
}
```

## Exercise 1.4
Translate this empty traditional function to arrow function syntax. There are no tests for this exercise.

```
function doesNothing() {

}
```
# Stage 2 - Using anonymous arrow functions as event handlers
In the stages2and3 folder, you will find a partially completed web application that will (eventually) fetch data from the [Chicago Art Institute API](https://api.artic.edu/docs/#introduction) and display it on the page.

Take a few minutes to look through the HTML and the JavaScript. In main.js, you will find three classes, which will be used to represent each artwork at the Art Institute (Stage 3), there are also some global variables and constants that you will need to use for the following steps.

## Step 2.1 - Add a click event handler to the submit button
Add a click event listener to the submit button. Write the event handler as an **anonymous arrow function**. Your event handler should have an `event` parameter. Inside the function call `event.preventDefault()` to prevent the page from reloading when the button is clicked. You will add more statements to the function in later steps.

Try to write your anonymous arrow function as succinctly as you can. Here are the arrow function shorthand rules:
- If your arrow function has exactly one parameter, you do not need to put brackets around the parameter name. In all other cases, you will need brackets around the parameter names.
- If your arrow function will contain exactly one line of code, you do not need curly braces around the function contents. If that one line of code returns a value, you also don't need to include the return keyword.

See the [help](help.md#markdown-header-2.1) for a completed example.

## Step 2.2 - Write a function to fetch data
Outline a function (arrow syntax encouraged!) called `getData` that does not take any parameters. Inside the function, use `fetch()` to get artwork data from the [Art Institute API](https://api.artic.edu/docs/#introduction). As the focus of this stage is arrow functions, use the Promise chaining approach rather than async / await and use anonymous arrow functions as the callbacks in the `then()` and `catch()` calls. 

The API URL is already stored as a constant in main.js.

When data is retrieved from the API (the second `.then()` call), print it to the console to see what's inside. Call `getData()` from the Chrome console. You should see a JSON object with a lot of properties.

For a reminder of how to work with `fetch()` and promise chaining, see the slides and examples from the second half of Week 9 (Lecture and Practical 18). There is a slide that gives you a code template using transitional function syntax, which you should be able to translate into arrow function syntax. A tiny bit more help is available on the [help](help.md#markdown-header-2.2) page.

## Step 2.3 - Extract just the artwork data
The JSON object returned by the API contains more properties than you need. In the console, you should see two properties at the top level of the JSON object: "pagination", which you can ignore, and "data", an array of JSON objects each representing an individual artwork.

On the line after you print the API response, create a variable or constant called `artworks` and use it to store just the value associated with the "data" property in the JSON object. Assuming the parameter for the callback function is called `data` as shown in the template, you can access the API response's "data" property using either dot notation with the property name (`data.data`) or square brackets (`data["data"]`).

Add another print statment to check that you have correctly selected the array of artworks from the API response.

If everything looks right, call your `getData()` function from the event handler function you wrote in step 2.1.

# Stage 3 - Array methods
In this stage, you will use array methods to convert the JSON data from the API into instances of the `Artwork` class already defined in main.js, then display them on the page. 

## Step 3.1 - Filter out "bad" data
The goal of this stage is to display some text and a thumbnail image for each artwork. However, some of the artworks don't have thumbnails, so you'll need to filter them out so you're left with only those that have associated images. 

Assuming you're still printing the `artworks` variable (step 2.3), take a look at one of the objects in the array it stores. You should see that there are a lot of properties, which are described in the [API documentation](https://api.artic.edu/docs/#collections-2). Each artwork has a property called "thumbnail" that either stores a nested JSON object or is `null`. You'll use this information to implement the filter——keep the artwork if its "thumbnail" property is not `null`.

Still inside the second `then()` callback function in the `getData()` function, use the [`filter()` array method](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter) to filter the `artworks` array so that only images with thumbnails are included. `filter()` returns a new array so you always need to assign its result to a variable or pass it to a function. In this case, assign the resulting array to the global `storedArtworks` variable that already exists in the main.js.

Use the [`filter()` documentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter) and the hints above to complete this step. The completed code for this step is on the [help](help.md#step-3.1) page.

## Step 3.2 - Convert the JSON objects to `Artwork` objects
Still inside the second `then()` callback function in the `getData()` function, use the [`map()` array method](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map) to convert each JSON object currently in `storedArtworks` to an instance of `Artwork`. Like `filter()`, `map()` returns a new array so you always need to assign its result to a variable or pass it to a function. The converted objects should be stored in `storedArtworks`. 

To create an instance of `Artwork`, you will first need to create an instance of `Artist`, and an instance of `Thumbnail`. Each constructor parameter in each class corresponds to a property found in an artwork JSON object. See the documentation for each class' constructor in main.js.

When you are done, print the `storedArtworks` array and check that it now contains `Artwork` instances instead of JSON objects.

Tip: you can chain array methods just like you chained promises in step 2.2. Each chained method will operate on the array returned by the previous method in the chain e.g.

```javascript
someArray.filter(...).map(...); // map will operate on the filtered array
```
As with the previous step, use the [documentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map) and the hints above to complete this step. If you get stuck, you can find partially completed code for this step on the [help](help.md#step-3.2) page.

## Step 3.3 - Display the artworks
The `Artwork` class contains a method called `getDisplayElement()` that returns a `div` with information about the artwork. The final step is to iterate through the `storedArtworks` array and use the `getDisplayElement()` method and your knowledge of DOM manipulation to display each artwork in the `div` with id "results".

You can use a for loop or try the [`forEach()` array method](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach).

## Optional step 3.4 - Allow the user to filter results
For an extra challenge, allow the user to filter the displayed artworks by searching a keyword e.g. "flower". Use array methods and anonymous arrow functions where they make sense.