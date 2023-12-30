// get the elements
let form = document.querySelector('#book-from');
let bookList = document.querySelector("#book");



// Book class

class Book {
    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;

    }
}
// fathima2026@gmail.com

// UI class 
class UI {

    static addToBooklist(book) {
        let list = document.querySelector('#book');
        let row = document.createElement('tr');
        row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href="#" class="delete">X</a></td> `;

        list.appendChild(row)
    }
    // clearfild(){
    //     document.querySelector('#title').value="";
    //     document.querySelector('#author').value="";
    //     document.querySelector('#isbn').value="";
    // }


    // class add proble

    
    static showAlert = (massage, className) => {
        let div = document.createElement('div');
        div.className = `alert ${massage}`;
        div.appendChild(document.createTextNode(massage));
        let container = document.querySelector('.container');
        // let form = document.querySelector("#book-from");
        container.insertBefore(div, form);
        setTimeout(() => {
            document.querySelector(".alert").remove()

        }, 3000)

    }

    static deleteformbook(target) {
        //console.log(target);
        if (target.hasAttribute('href')) {
            target.parentElement.parentElement.remove();
            store.removebook(target.parentElement.previousElementSibling.textContent.trim());

        }
    }
}
// store class
class store {
    static getbooks() {
        let books;
        if (localStorage.getItem("books")===null){
            books = [];
        } else {
            books = JSON.parse(localStorage.getItem("books"))
        }
        return books;

    }
    static addBooks(book) {
        let books = store.getbooks();
        books.push(book);
        localStorage.setItem("books", JSON.stringify(books))
    }

    static displaybooks() {
        let books = store.getbooks();
        books.forEach(book => {
            UI.addToBooklist(book)
        })
    }
    static removebook(isbn) {
        let books = store.getbooks();
        books.forEach((book, index) => {
            if (book.isbn === isbn) {
                books.splice(index, 1)
            }
            localStorage.setItem('books', JSON.stringify(books))
        })
    }
}




//add event listener

form.addEventListener('submit', newBook);
bookList.addEventListener("click", removeBook);
document.addEventListener('DOMContentLoaded', store.displaybooks());
function newBook(e) {
    let title = document.querySelector('#title').value,
        author = document.querySelector("#author").value,
        isbn = document.querySelector('#isbn').value;
    let book = new Book(title, author, isbn);


    let ui = new UI();

    if (title === "" || author === "" || isbn === "") {
        UI.showAlert("Please fill all the fild !", "error");
    } else {
        UI.addToBooklist(book);
        e.target.reset()
        // ui.clearfild()
        UI.showAlert("Book is added!", "success");
    }
    store.addBooks(book)


    e.preventDefault();
}

function removeBook(e) {
    // let ui=new UI();
    UI.deleteformbook(e.target);
    UI.showAlert('Book Remove!', "success")
}
