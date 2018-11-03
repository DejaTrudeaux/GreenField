
// Paths = {
//     Title: this.items[0].volumeInfo.title;

//     Authors: this.items[0].volumeInfo.authors
// !!!(this is an array) !!!

//     Description: this.items[0].volumeInfo.description

// ISBN: this.items[0].volumeInfo.industryIdentifiers[0].identifier
// !!!(if this is isbn_13) !!!

//     ISBN: this.items[0].volumeInfo.industryIdentifiers[1].identifier
// !!!(if this is isbn_10) !!!

//     PageCount: this.items[0].volumeInfo.pageCount;

// Genres: this.items[0].volumeInfo.categories
// !!!(this is an array) !!!

//     ImageLinks: this.items[0].volumeInfo.imageLinks
// !!!(.smallThumbnail || .thumbnail)

// GoogleInfoLink: this.items[0].volumeInfo.infoLink
// }

const title = mockData.items[0].volumeInfo.title;
const authors = mockData.items[0].volumeInfo.authors;
const description = mockData.items[0].volumeInfo.description;
const generes = mockData.items[0].volumeInfo.categories[0];
const imageLinks = mockData.items[0].volumeInfo.imageLinks.smallThumbnail;

const dbhack = function(mockData) {

}