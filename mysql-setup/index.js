const books = require('./books.json');
const authors = require('./authors.json');
const escape = require('sql-escape');

// create languages SQL
function languages(){
  Array.from(books.reduce((set, x) =>{
    set.add(x.language);
    return set;
  }, new Set))
    .map(lang => {
      console.log(`INSERT INTO Languages (name) VALUES('${lang}');`)
    })
}
// // create authors SQL
function author(){
  Array.from(books.reduce((set, x) =>{
    set.add(x.author);
    return set;
  }, new Set))
    .map(lang => {
      console.log(`INSERT INTO Authors (name) VALUES('${escape(lang)}');`)
    })
}
// authors();
// // create books SQL
function book(){
  books
    .map(book => {
      book.author_id = authors.indexOf(book.author);
      if(book.author_id === -1){
        console.log('MISSING AUTHOR');
        console.log(book);
      }
      console.log(`
      INSERT INTO Books (id, title, thumbnail, author_id, language_id, filepath) VALUES(
        ${book.id},
        '${escape(book.title)}',
        '${book.thumbnail}',
        ${book.author_id},
        ${book.language_id},
        '${escape(book.filepath)}'
      );
      `.replace(/\n\s*/g, " ").trim())
    })
}
book();