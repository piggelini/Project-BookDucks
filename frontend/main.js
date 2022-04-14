
const user = document.querySelector("#user")
const password = document.querySelector("#password");
const loginButton = document.getElementById("login");
const registerUser = document.querySelector("#register-user");
const registerEmail = document.querySelector("#register-email");
const registerPassword = document.querySelector("#register-password");
const registerButton = document.getElementById("register");
const loggedInUser = document.getElementById("logged-in-user");
const mediaContainer = document.querySelector(".media-container");
const homepageNav = document.getElementById("homepage-nav");


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

// 
async function renderData(books, audiobooks) {


    books.data.data.forEach((book) => {
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

        let audiobookTitle = document.createElement("h4");
        let audiobookPublished = document.createElement("p");
        let audiobookHours = document.createElement("p");
        let audiobookRating = document.createElement("p");
        let userName = document.createElement("p");
        let userEmail = document.createElement("p");
        let audiobookGenres = document.createElement("p");
        let audiobookInfo = document.createElement("section");
        let audiobookCover = document.createElement("img");
        let article = document.createElement("article");

        audiobookTitle.innerText = audiobook.attributes.title;
        audiobookPublished.innerText = "Published: " + audiobook.attributes.published;
        audiobookHours.innerText = "Length: " + audiobook.attributes.hours + " hours";
        audiobookRating.innerText = "Rating: " + audiobook.attributes.rating;
        userName.innerText = "Owner: " + audiobook.attributes.users_permissions_user.data.attributes.username;
        userEmail.innerText = "Email: " + audiobook.attributes.users_permissions_user.data.attributes.email;
        audiobookCover.src = "http://localhost:1337" + audiobook.attributes.cover.data.attributes.url;
        audiobookGenres.innerText = "Genre: "

        audiobook.attributes.genres.data.forEach(genre => {
            audiobookGenres.innerText += genre.attributes.name + " ";
        })


        mediaContainer.appendChild(article);
        article.appendChild(audiobookCover);
        article.appendChild(audiobookTitle);
        article.appendChild(audiobookInfo);
        audiobookInfo.appendChild(audiobookPublished);
        audiobookInfo.appendChild(audiobookGenres);
        audiobookInfo.appendChild(audiobookHours);
        audiobookInfo.appendChild(audiobookRating);
        audiobookInfo.appendChild(userName);
        audiobookInfo.appendChild(userEmail);


    });

}

getMedia();


loginButton.addEventListener("click", (e) => {
    e.preventDefault();
    login();
});

let login = async () => {
    let { data } = await axios.post("http://localhost:1337/api/auth/local",
        {
            identifier: user.value,
            password: password.value
        });

    let token = data.jwt;
    sessionStorage.setItem("token", token);
    sessionStorage.setItem("user", user.value, "blue", "horse");
    loggedInUser.innerText = user.value;
}

if (sessionStorage.getItem("token")) {
    loggedInUser.innerText = sessionStorage.getItem("user");
}



registerButton.addEventListener("click", (e) => {
    e.preventDefault();
    register();
})

let register = async () => {

    let response = await axios.post("http://localhost:1337/api/auth/local/register",
        {
            username: registerUser.value,
            email: registerEmail.value,
            password: registerPassword.value
        });
    console.log("Registered!", response);

    // let token = response.data.jwt;

    // console.log("Got the JWT!", token);

    // sessionStorage.setItem("token", token);
    loggedInUser.innerText = "Welcome " + registerUser.value + ". You can now sign in!";

}

loggedInUser.addEventListener("click", (e) => {

    mediaContainer.classList.add("hideHomePage");
    showProfile();
})

homepageNav.addEventListener("click", (e) => {
    mediaContainer.classList.remove("hideHomePage");
})

let showProfile = async () => {
    let users = await axios.get('http://localhost:1337/api/users?populate=*', {

        // headers: {
        //     Authorization: `Bearer ${sessionStorage.getItem("token")}`
        // }
    });

    users.data.forEach(user => {
        if (user.username == sessionStorage.getItem("user"))
            console.log(user.username);
    })
    console.log(users);

}
