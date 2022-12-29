


class Book {
    constructor (title, author, bookid) {
        this.title = title;
        this.author = author;
        this.bookid = bookid;
    }
}



class UI {
    static displayBooks() {
        let storedBooks = Store.getBooks()
        
        storedBooks.forEach((bookdetails) => UI.addBookToList(bookdetails))
    }
    static addBookToList(book) {
        let tbody = document.getElementById('tablebody');
        let tr = document.createElement('tr');
        console.log(book)
        tr.className = "text-center"
        tr.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.bookid}</td>
        <td><a href="" onclick="deletebtn(this)" class="btn btn-danger btn-sm delete">X</a></td>`
        tbody.appendChild(tr)  
    }
    static deletebook(e) {
        e.parentElement.parentElement.remove()
    }
    static clearBook() {
        document.getElementById('title').value = ""
        document.getElementById('author').value = ""
        document.getElementById('bookId').value = ""
    }
    static removeBook(bookid) {
        let books = Store.getBooks();
        books.forEach((book, index) => {
            if(book.bookid === bookid) {
                books.splice(index, 1)
            }
        })
        localStorage.setItem(JSON.stringify(books))
    }
    static randomindexnumber(){
            const characters = ["A","B","C","D","E","F","G","H","I","J"
            ,"K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","a","b"
            ,"c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u"
            ,"v","w","x","y","z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9","~","`"
            ,"@","#","$"];
            let randomindex = Math.floor(Math.random()*characters.length)
            return characters[randomindex] 
    }
    static randomId(){
        let id = ""
        for(let i = 0; i < 5; i++) {
            id += UI.randomindexnumber()
        }
        return id
    }
}
class Store {
    static getBooks() {
        let books;
        if(localStorage.getItem('books') === null) {
            books = []
        }else {
            books = JSON.parse(localStorage.getItem('books'))
        }
        return books;
    }
    static addBook(book) {
        const books = Store.getBooks();
        books.push(book);
        localStorage.setItem('books', JSON.stringify(books))

    }
    static removeBook(bookid) {
        let books = Store.getBooks()
        books.forEach((book, index) => {
            if(book.bookid === bookid) {
                books.splice(index, 1);
            }
        })
        localStorage.setItem('books', JSON.stringify(books))
    }
}
document.addEventListener('DOMContentLoaded',UI.displayBooks())


document.getElementById('formbook').addEventListener('submit' , (e) => {
    e.preventDefault()  
    let errormsg = document.getElementById('error_msg');
    let title = document.getElementById('title').value;
    let author = document.getElementById('author').value;
    let bookid = document.getElementById('bookId').value;
    if(title === "") {
        errormsg.className = "alert alert-warning"
        errormsg.innerHTML = "Title is required"
    }else if(author === ""){
        errormsg.className = "alert alert-warning"
        errormsg.innerHTML = "Author is required"
    }else if(bookid === "") {
        errormsg.className = "alert alert-warning"
        errormsg.innerHTML = "Book Id is required"
    }else{
        
        const book = new Book(title, author, bookid)
        console.log(book)
        UI.addBookToList(book)
        Store.addBook(book)
        UI.clearBook()
    }
})
let deletebtn = (e) => {
    UI.deletebook(e)
    console.log(e.parentElement.previousElementSibling.textContent)
    Store.removeBook(e.parentElement.previousElementSibling.textContent)
}
document.getElementById('tablebody').addEventListener('click', (e) => {

    e.preventDefault()
    
})

document.querySelector('.idbtn').addEventListener('click', (e) => {
    e.preventDefault()
    document.getElementById('bookId').value = UI.randomId()
})

