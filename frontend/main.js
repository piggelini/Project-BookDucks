
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
const profilePage = document.querySelector(".profile-page")
const loginForm = document.querySelector(".sign-in");
const signUpForm = document.querySelector(".sign-up");
const profileItemContainer = document.querySelector(".users-items");
const profileInfo = document.querySelector(".info-container");
const signInNavLink = document.querySelector(".sign-in-link")
let articleArray = [];
const logoutButton = document.querySelector(".logout");

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

        article.classList.add(book.attributes.users_permissions_user.data.attributes.username + "-" + book.attributes.users_permissions_user.data.id)
        console.log(article.classList);

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

        articleArray.push(article);

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

        article.classList.add(audiobook.attributes.users_permissions_user.data.attributes.username + "-" + audiobook.attributes.users_permissions_user.data.id)

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

        let savedArticle = article;
        articleArray.push(savedArticle);

    });

}

getMedia();
checkIfLoggedIn();


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
    sessionStorage.setItem("user", user.value);

    userProfile.innerText = user.value;

    if (sessionStorage.getItem("token")) {
        userProfile.classList.remove("hide-user-link");
        userProfile.innerText = sessionStorage.getItem("user");
        logoutButton.innerText = "Logout";

        if (!signInNavLink.classList.contains("hideSignIn")) {
            signInNavLink.classList.add("hideSignIn");
        }
    }

}


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
        logoutButton.innerText = "";
    }
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
    let completedReg = document.querySelector(".complete-reg");
    completedReg.innerText = "Welcome " + registerUser.value + ". You can now sign in!";

}

userProfile.addEventListener("click", (e) => {

    mediaContainer.classList.add("hideHomePage");
    profilePage.classList.remove("hideProfile");
    getUserId();
})


let getUserId = () => {
    let user = "";
    articleArray.forEach(art => {

        if (art.classList[0].includes(userProfile.innerText)) {

            user = art.classList[0];
            profileItemContainer.appendChild(art);

        }
    })

    let id = user.replace(userProfile.innerText + "-", "");
    console.log(id);
    getUser(id);
}




homepageNav.addEventListener("click", (e) => {
    mediaContainer.classList.remove("hideHomePage");
    profilePage.classList.add("hideProfile");
})

let getUser = async (id) => {
    let user = await axios.get(`http://localhost:1337/api/users/${id}`, {

        //     headers: {
        //         Authorization: `Bearer ${sessionStorage.getItem("token")}`
        //     }
    });


    showProfile(user);

}

let showProfile = async (user) => {


    let regDate = user.data.createdAt.slice(0, 10);

    let profile = `
        <h2>${user.data.username}<h2>
        
        <p>Email: ${user.data.email}</p>
        <p>User id: ${user.data.id}</p>
        <p>Registered: ${regDate}</p>
    

        
        `;

    profileInfo.innerHTML = profile;




}

logoutButton.addEventListener("click", (e) => {
    sessionStorage.clear();
    userProfile.classList.add("hide-user-link");
    logoutButton.innerText = "";
});