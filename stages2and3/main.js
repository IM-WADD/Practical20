class Artist {
    #name; 
    #id; 
    #displayText;

    /**
     * Create a new artist
     * @param {string} name API field: artist_title
     * @param {string} id API field: artist_id
     * @param {string} displayText API field: artist_display
     */
    constructor(name, id, displayText) {
        this.#name = name;
        this.#id = id;
        this.#displayText = displayText;
    }

    /**
     * Gets the display text as a paragraph element
     * @returns {HTMLParagraphElement} A paragraph with the artist's display text and class "artist"
     */
    getDisplayElement() {
        const p = document.createElement("p");
        p.setAttribute("class", "artist");
        p.innerText = this.#displayText;
        return p;
    }
}

class Thumbnail {
    #imageId; 
    #altText;

    /**
     * Create a new Thumbnail for an artwork
     * @param {string} imageId API field: image_id
     * @param {string} altText API field: thumbnail.alt_text
     */
    constructor(imageId, altText) {
        this.#imageId = imageId;
        this.#altText = altText;
    }

    /**
     * Creates an HTML image to display the thumbnail
     * @returns {HTMLImageElement} An image element with class "thumbnail"
     */
    getDisplayElement() {
        const img = document.createElement("img");
        img.setAttribute("alt", this.#altText);
        img.setAttribute("class", "thumbnail");
        img.setAttribute("src", `https://www.artic.edu/iiif/2/${this.#imageId}/full/843,/0/default.jpg`);
        return img;
    }
}

class Artwork {
    #title; 
    #artist;
    #date;
    #description;
    #keywords;
    #thumbnail;

    /**
     * Creates a new Artwork
     * @param {string} title API field: title
     * @param {Artist} artist an Artist object
     * @param {string} date API field: date_display
     * @param {string} description API field: short_description
     * @param {string[]} keywords API field: term_titles
     * @param {Thumbnail} thumbnail a Thumbnail object
     */
    constructor(title, artist, date, description, keywords, thumbnail) {
        this.#title = title;
        this.#artist = artist;
        this.#date = date;
        this.#description = description;
        this.#keywords = keywords;
        this.#thumbnail = thumbnail;
    }

    /**
     * Creates a div containing information about the artwork
     * @returns {HTMLDivElement} A div containing all text about the artwork
     */
    #getDescription() {
        const div = document.createElement("div");
        div.setAttribute("class", "info");
        const title = document.createElement("h3");
        title.innerText = this.#title;
        const date = document.createElement("p");
        date.setAttribute("class", "date");
        date.innerText = this.#date;
        const artist = this.#artist.getDisplayElement();
        const p = document.createElement("p");
        p.innerText = this.#description;
        div.appendChild(title);
        div.appendChild(date);
        div.appendChild(artist);
        div.appendChild(p);
        return div;
    }

    /**
     * Creates an HTML element to display the artwork
     * @returns {HTMLDivElement} A div with class "artwork"
     */
    getDisplayElement() {
        const container = document.createElement("div");
        container.setAttribute("class", "artwork");
        container.appendChild(this.#getDescription());
        container.appendChild(this.#thumbnail.getDisplayElement());
        return container;
    }

    matchesKeyword(search) {
        for (const term of this.#keywords) {
            if (term.toLowerCase().includes(search)) {
                return true;
            }
        }
        return false;
    }
}

const API = "https://api.artic.edu/api/v1/artworks?limit=100";
const submitButton = document.getElementById("submit");
const queryInput = document.getElementById("query");
const resultsDiv = document.getElementById("results");
let storedArtworks = [];
