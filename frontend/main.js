//Hämta böckerna från backend
//Hämta ljudböcker från backend

async function getMedia() {
    let books = await axios.get('http://localhost:1337/api/books?populate=*', {

        // headers: {
        //     Authorization: `Bearer ${sessionStorage.getItem("token")}`
        // }
    });
    let audiobooks = await axios.get('http://localhost:1337/api/audiobooks?populate=*', {

        // headers: {
        //     Authorization: `Bearer ${sessionStorage.getItem("token")}`
        // }
    });

    renderData(books, audiobooks)

}


async function renderData(books, audiobooks) {
    let mediaContainer = document.getElementById("media-container");


    books.data.data.forEach((book) => {
        console.log(book);
        let bookTitle = document.createElement("h4");
        let bookAuthor = document.createElement("p");
        let bookPages = document.createElement("p");
        let bookRating = document.createElement("p");
        let userName = document.createElement("p");
        let userEmail = document.createElement("p");
        let bookGenres = document.createElement("p");
        let bookInfo = document.createElement("section");
        let bookCover = document.createElement("img");
        let article = document.createElement("article");

        bookTitle.innerText = book.attributes.title;
        bookAuthor.innerText = book.attributes.author;
        bookPages.innerText = "Number of pages: " + book.attributes.pages;
        bookRating.innerText = "Rating: " + book.attributes.rating;
        userName.innerText = "Owner: " + book.attributes.users_permissions_user.data.attributes.username;
        userEmail.innerText = "Email: " + book.attributes.users_permissions_user.data.attributes.email;
        bookCover.src = "http://localhost:1337" + book.attributes.cover.data.attributes.url;
        bookGenres.innerText = "Genre: "

        book.attributes.genres.data.forEach(genre => {
            bookGenres.innerText += genre.attributes.name + " ";
        })



        mediaContainer.appendChild(article);
        article.appendChild(bookCover);
        article.appendChild(bookTitle);
        article.appendChild(bookInfo);
        bookInfo.appendChild(bookAuthor);
        bookInfo.appendChild(bookGenres);
        bookInfo.appendChild(bookPages);
        bookInfo.appendChild(bookRating);
        bookInfo.appendChild(userName);
        bookInfo.appendChild(userEmail);


    });

    audiobooks.data.data.forEach((audiobook) => {
        console.log(audiobook);
        // let bookTitle = document.createElement("h4");
        // let bookAuthor = document.createElement("p");
        // let bookPages = document.createElement("p");
        // let bookRating = document.createElement("p");
        // let userName = document.createElement("p");
        // let userEmail = document.createElement("p");
        // let bookInfo = document.createElement("section");
        // let bookCover = document.createElement("img");
        // let article = document.createElement("article");

        // bookTitle.innerText = book.attributes.title;
        // bookAuthor.innerText = book.attributes.author;
        // bookPages.innerText = "Number of pages: " + book.attributes.pages;
        // bookRating.innerText = "Rating: " + book.attributes.rating;
        // userName.innerText = "Owner: " + book.attributes.users_permissions_user.data.attributes.username;
        // userEmail.innerText = "Email: " + book.attributes.users_permissions_user.data.attributes.email;
        // bookCover.src = "http://localhost:1337" + book.attributes.cover.data.attributes.url;

        // mediaContainer.appendChild(article);
        // article.appendChild(bookCover);
        // article.appendChild(bookTitle);
        // article.appendChild(bookInfo);
        // bookInfo.appendChild(bookAuthor);
        // bookInfo.appendChild(bookPages);
        // bookInfo.appendChild(bookRating);
        // bookInfo.appendChild(userName);
        // bookInfo.appendChild(userEmail);


    });

}

getMedia();