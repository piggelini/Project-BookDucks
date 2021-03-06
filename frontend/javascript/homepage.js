const user = document.querySelector("#user")
const password = document.querySelector("#password");
const loginButton = document.getElementById("login");
const registerUser = document.querySelector("#register-user");
const registerEmail = document.querySelector("#register-email");
const registerPassword = document.querySelector("#register-password");
const registerButton = document.getElementById("register");
const userProfile = document.getElementById("logged-in-user");
const mediaContainer = document.querySelector(".media-container");
const homepageNav = document.getElementById("homepage-nav");
const loginForm = document.querySelector(".sign-in");
const signUpForm = document.querySelector(".sign-up");
const signInNavLink = document.querySelector(".sign-in-link");
const logoutButton = document.querySelector(".logout");
const header = document.querySelector(".header");
const headerBottom = document.querySelector(".bottom-header");
const shelfButton = document.querySelector(".shelf-button");



//Gets all the books from the api
async function getMedia() {
    let books = await axios.get('http://localhost:1337/api/books?populate=*', {

    });
    let audiobooks = await axios.get('http://localhost:1337/api/audiobooks?populate=*', {


    });

    renderData(books, audiobooks)

}

//Shows all of the available books and audiobooks
async function renderData(books, audiobooks) {

    let allBooks = document.createElement("div");
    let shelfHeading = document.createElement("h2");
    shelfHeading.innerText = "Bookshelf";
    mediaContainer.appendChild(shelfHeading);
    mediaContainer.appendChild(allBooks);


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


        allBooks.appendChild(article);
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


        allBooks.appendChild(article);
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
checkIfLoggedIn();



homepageNav.addEventListener("click", (e) => {
    mediaContainer.classList.remove("hideHomePage");
    profilePage.classList.add("hideProfile");
    header.classList.remove("short-header");
    headerBottom.classList.remove("hide-bottom-header");
    uploadPage.classList.add("hide-upload-page");
})


loginButton.addEventListener("click", (e) => {
    e.preventDefault();
    login();
});



let login = async () => {
    let errorMessage = document.querySelector(".error-login");
    errorMessage.innerText = "";
    await axios.post("http://localhost:1337/api/auth/local",
        {
            identifier: user.value,
            password: password.value
        }).then(({ data }) => {
            errorMessage.innerText = "";
            let token = data.jwt;
            sessionStorage.setItem("token", token);
            sessionStorage.setItem("user", data.user.username);
            sessionStorage.setItem("userId", data.user.id);

            userProfile.innerText = user.value;

            if (sessionStorage.getItem("token")) {
                userProfile.classList.remove("hide-user-link");
                userProfile.innerText = sessionStorage.getItem("user");
                logoutButton.innerText = "Logout";

                if (!signInNavLink.classList.contains("hideSignIn")) {
                    signInNavLink.classList.add("hideSignIn");
                }
            }

            document.getElementById("closeLoginModal").click();
        }).catch(() => {
            errorMessage.innerText = "Error: failed to login, please try again.";
        })




}

//Checks in sessionstorage if loggedin
function checkIfLoggedIn() {
    if (sessionStorage.getItem("token")) {
        userProfile.classList.remove("hide-user-link");
        userProfile.innerText = sessionStorage.getItem("user");
        logoutButton.innerText = "Logout";

        if (!signInNavLink.classList.contains("hideSignIn")) {
            signInNavLink.classList.add("hideSignIn");
        }

    } else {
        userProfile.classList.add("hide-user-link");
        signInNavLink.classList.remove("hideSignIn");
        logoutButton.innerText = "";
    }
}



registerButton.addEventListener("click", (e) => {
    e.preventDefault();
    register();
})

//Registers a new member
let register = async () => {
    let completedReg = document.querySelector(".complete-reg");
    completedReg.innerText = "";

    await axios.post("http://localhost:1337/api/auth/local/register",
        {
            username: registerUser.value,
            email: registerEmail.value,
            password: registerPassword.value
        })
        .then(function (response) {
            console.log("Registered!", response);

            completedReg.innerText = "Welcome " + registerUser.value + ". You can now sign in!";

        })
        .catch(function (error) {
            console.log(error);
            completedReg.innerText = "Error: please fill in all fields correctly";
        })


}



userProfile.addEventListener("click", (e) => {
    mediaContainer.classList.add("hideHomePage");
    profilePage.classList.remove("hideProfile");
    header.classList.add("short-header");
    headerBottom.classList.add("hide-bottom-header");
    uploadPage.classList.add("hide-upload-page");
    getUsersBooks();
})


shelfButton.addEventListener("click", (e) => {
    window.scrollTo(0, 600);
})
