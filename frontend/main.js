
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
const profileBookContainer = document.querySelector(".users-items");
const profileInfo = document.querySelector(".info-container");
const signInNavLink = document.querySelector(".sign-in-link");
const logoutButton = document.querySelector(".logout");
const header = document.querySelector(".header");
const headerBottom = document.querySelector(".bottom-header");
const shelfButton = document.querySelector(".shelf-button");

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

    console.log(data.user.id);
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
        signInNavLink.classList.remove("hideSignIn");
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
    header.classList.add("short-header");
    headerBottom.classList.add("hide-bottom-header");
    getUsersBooks();
})


let usersBooks;
let usersAudiobooks;

let getUsersBooks = async () => {

    usersBooks = [];
    usersAudiobooks = [];

    let books = await axios.get('http://localhost:1337/api/books?populate=*', {

        headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`
        }
    });


    let audiobooks = await axios.get('http://localhost:1337/api/audiobooks?populate=*', {

        headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`
        }
    });

    usersBooks = books.data.data.filter(book => book.attributes.users_permissions_user.data.id == sessionStorage.getItem("userId"));
    usersAudiobooks = audiobooks.data.data.filter(abook => abook.attributes.users_permissions_user.data.id == sessionStorage.getItem("userId"));

    getUser();
}




homepageNav.addEventListener("click", (e) => {
    mediaContainer.classList.remove("hideHomePage");
    profilePage.classList.add("hideProfile");
    header.classList.remove("short-header");
    headerBottom.classList.remove("hide-bottom-header");
})

let getUser = async () => {
    let user = await axios.get(`http://localhost:1337/api/users/${sessionStorage.getItem("userId")}`, {

        headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`
        }
    });


    showProfile(user);

}


let showProfile = async (user) => {
    console.log(user);

    let regDate = user.data.createdAt.slice(0, 10);

    let profile = `
                <h2>${user.data.username}<h2>
                
                <p>Email: ${user.data.email}</p>
                <p>User id: ${user.data.id}</p>
                <p>Registered: ${regDate}</p>
        
                <button class="add-book-button">Add books to your shelf</button>
            
        
                
                `;

    profileInfo.innerHTML = profile;





    //------------------- UPLOAD PAGE -----------------------------------
    const uploadBookButton = document.querySelector(".add-book-button");
    const uploadPage = document.querySelector(".upload-page");



    uploadBookButton.addEventListener("click", (e) => {
        profilePage.classList.add("hideProfile");
        uploadPage.classList.remove("hide-upload-page");

        let twoButtons = `
                    <button class="uploadBookBtn">Upload book</button>
                    <button class="uploadAudiobookBtn">Upload audiobook</button>
                `;

        uploadPage.innerHTML = twoButtons;


        bookButton = document.querySelector(".uploadBookBtn");
        audiobookButton = document.querySelector(".uploadAudiobookBtn");

        bookButton.addEventListener("click", (e) => {

            let uploadForm = `
                    <h2>Upload book</h2>
                <label for="title">Title</label>
                <input type="text" id="title">

                <label for="author">Author</label>
                <input type="text" id="author">

                <label for="pages">Pages</label>
                <input type="number" id="pages">

                <label for="rating">Rating (1-5)</label>
                <input type="number" id="rating" min="1" max="5">

                <h3>Choose genre or genres</h3>
                <label for="horror">Horror</label>
                <input type="checkbox" name="horror" value = "1" />
                
                <label for="sciencef">Science Fiction</label>
                <input type="checkbox" name="sciencef" value = "2" />
        
                <label for="comedy">Comedy</label>
                <input type="checkbox" name="comedy" value = "3" />

                <label for="action">Action and Adventure</label>
                <input type="checkbox" name="action" value = "4" />

                <label for="fantasy">Fantasy</label>
                <input type="checkbox" name="fantasy" value = "6" />

                <label for="crime">Crime</label>
                <input type="checkbox" name="crime" value = "5" />

                <label for="childrens">Childrens</label>
                <input type="checkbox" name="childrens" value = "8" />

                <label for="classics">Classics</label>
                <input type="checkbox" name="classics" value = "9" />

                <label for="romance">Romance</label>
                <input type="checkbox" name="romance" value = "10" />

                <label for="mystery">Mystery</label>
                <input type="checkbox" name="mystery" value = "11" />

                <label for="cover">Upload image</label>
                <input type="file" id="cover">

                <button id="uploadButton" onClick= "addBook()" >Add book</button>`

            uploadPage.innerHTML = uploadForm;



        })

        audiobookButton.addEventListener("click", (e) => {

            let uploadForm = `
                <h2>Upload book</h2>
            <label for="title">Title</label>
            <input type="text" id="title">

            <label for="hours">Hours</label>
            <input type="text" id="hours">

            <label for="published">Published</label>
            <input type="date" id="published">

            <label for="rating">Rating (1-5)</label>
            <input type="number" id="rating" min="1" max="5">

            <h3>Choose genre or genres</h3>
            <label for="horror">Horror</label>
            <input type="checkbox" name="horror" value = "1" />
            
            <label for="sciencef">Science Fiction</label>
            <input type="checkbox" name="sciencef" value = "2" />
    
            <label for="comedy">Comedy</label>
            <input type="checkbox" name="comedy" value = "3" />

            <label for="action">Action and Adventure</label>
            <input type="checkbox" name="action" value = "4" />

            <label for="fantasy">Fantasy</label>
            <input type="checkbox" name="fantasy" value = "6" />

            <label for="crime">Crime</label>
            <input type="checkbox" name="crime" value = "5" />

            <label for="childrens">Childrens</label>
            <input type="checkbox" name="childrens" value = "8" />

            <label for="classics">Classics</label>
            <input type="checkbox" name="classics" value = "9" />

            <label for="romance">Romance</label>
            <input type="checkbox" name="romance" value = "10" />

            <label for="mystery">Mystery</label>
            <input type="checkbox" name="mystery" value = "11" />

            <label for="cover">Upload image</label>
            <input type="file" id="cover">

            <button id="uploadButton" onClick="addAudiobook()" >Add audiobook</button>`
            uploadPage.innerHTML = uploadForm;

        })

    })

}





logoutButton.addEventListener("click", (e) => {
    sessionStorage.clear();
    userProfile.classList.add("hide-user-link");
    logoutButton.innerText = "";
    signInNavLink.classList.remove("hideSignIn");
});



shelfButton.addEventListener("click", (e) => {

    window.scrollTo(0, 600);
})




let addBook = async () => {
    let title = document.querySelector("#title").value;
    let author = document.querySelector("#author").value;
    let pages = document.querySelector("#pages").value;
    let rating = document.querySelector("#rating").value;
    let genres = [];
    let checkboxes = document.querySelectorAll(("[type='checkbox']"));
    let userId = sessionStorage.getItem("userId");

    checkboxes.forEach(checkbox => {
        if (checkbox.checked) {
            genres.push(checkbox.value);
        }

    })


    let img = document.querySelector("#cover").files;
    let imgData = new FormData();
    imgData.append("files", img[0])


    await axios.post("http://localhost:1337/api/upload", imgData, {

        headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`
        }
    }).then((response) => {

        axios.post("http://localhost:1337/api/books", {
            data: {
                title,
                author,
                pages,
                rating,
                genres: genres,
                cover: response.data[0].id,
                users_permissions_user: userId
            },

            headers: {
                Authorization: `Bearer ${sessionStorage.getItem("token")}`
            }

        })
    })
    console.log("Book uploaded");
}

let addAudiobook = async () => {
    let title = document.querySelector("#title").value;
    let hours = document.querySelector("#hours").value;
    let published = document.querySelector("#published").value;
    let rating = document.querySelector("#rating").value;
    let genres = [];
    let checkboxes = document.querySelectorAll(("[type='checkbox']"));
    let userId = sessionStorage.getItem("userId");

    checkboxes.forEach(checkbox => {
        if (checkbox.checked) {
            genres.push(checkbox.value);
        }

    })


    let img = document.querySelector("#cover").files;
    let imgData = new FormData();
    imgData.append("files", img[0])


    await axios.post("http://localhost:1337/api/upload", imgData, {

        headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`
        }
    }).then((response) => {

        axios.post("http://localhost:1337/api/audiobooks", {
            data: {
                title,
                hours,
                published,
                rating,
                genres: genres,
                cover: response.data[0].id,
                users_permissions_user: userId
            },

            headers: {
                Authorization: `Bearer ${sessionStorage.getItem("token")}`
            }

        })
    })
    console.log("audiobook uploaded");
}




