const profilePage = document.querySelector(".profile-page")
const profileBookContainer = document.querySelector(".users-items");
const profileInfo = document.querySelector(".info-container");
const uploadPage = document.querySelector(".upload-page");


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
    console.log(usersBooks);
    getUser();
}





let getUser = async () => {
    let user = await axios.get(`http://localhost:1337/api/users/${sessionStorage.getItem("userId")}`, {

        headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`
        }
    });


    showProfile(user);

}


let showProfile = async (user) => {
    profileBookContainer.innerHTML = "";
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

    profileBooksHeading = `<h2>My bookshelf</h2>`;

    profileBookContainer.innerHTML += profileBooksHeading;

    const profileBooks = document.createElement("div");
    profileBookContainer.appendChild(profileBooks);

    usersBooks.forEach(book => {

        let profileBook = `
            <article class="profile-books"> 
            <img src="http://localhost:1337${book.attributes.cover.data.attributes.url}" alt="image of book">
            <p>${book.attributes.title}</p>
            <p>${book.attributes.author}</p>
            
            </article>
    

    `

        profileBooks.innerHTML += profileBook;
    })

    usersAudiobooks.forEach(abook => {

        let profileBook = `
            <article class="profile-books"> 
            <img src="http://localhost:1337${abook.attributes.cover.data.attributes.url}" alt="image of book">
            <p>${abook.attributes.title}</p>
            <p>Published: ${abook.attributes.published}</p>
            
            </article>
    

    `

        profileBooks.innerHTML += profileBook;
    })





    //------------------- UPLOAD PAGE -----------------------------------
    const uploadBookButton = document.querySelector(".add-book-button");



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
                
                <div class= "checkboxContainer">
            
                <input type="checkbox" name="horror" id="horror" value = "1" />
                <label for="horror">Horror</label>
                
                <input type="checkbox" name="sciencef" id="sciencef" value = "2" />
                <label for="sciencef">Science Fiction</label>
                
                <input type="checkbox" name="comedy" id="comedy" value = "3" />
                <label for="comedy">Comedy</label>

                <br>
                
                <input type="checkbox" name="action" id="action" value = "4" />
                <label for="action">Action and Adventure</label>
    
                <input type="checkbox" name="fantasy" id="fantasy" value = "6" />
                <label for="fantasy">Fantasy</label>

                <br>
                
                <input type="checkbox" name="crime" id="crime" value = "5" />
                <label for="crime">Crime</label>
                
                <input type="checkbox" name="childrens" id="childrens" value = "8" />
                <label for="childrens">Childrens</label>
                
                <input type="checkbox" name="classics" id="classics" value = "9" />
                <label for="classics">Classics</label>
    
                <br>

                <input type="checkbox" name="romance" id="romance" value = "10" />
                <label for="romance">Romance</label>
    
                <input type="checkbox" name="mystery" id="mystery" value = "11" />
                <label for="mystery">Mystery</label>
                </div>

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

             <div class= "checkboxContainer">
            
                <input type="checkbox" name="horror" id="horror" value = "1" />
                <label for="horror">Horror</label>
                
                <input type="checkbox" name="sciencef" id="sciencef" value = "2" />
                <label for="sciencef">Science Fiction</label>
                
                <input type="checkbox" name="comedy" id="comedy" value = "3" />
                <label for="comedy">Comedy</label>

                <br>
                
                <input type="checkbox" name="action" id="action" value = "4" />
                <label for="action">Action and Adventure</label>
    
                <input type="checkbox" name="fantasy" id="fantasy" value = "6" />
                <label for="fantasy">Fantasy</label>

                <br>
                
                <input type="checkbox" name="crime" id="crime" value = "5" />
                <label for="crime">Crime</label>
                
                <input type="checkbox" name="childrens" id="childrens" value = "8" />
                <label for="childrens">Childrens</label>
                
                <input type="checkbox" name="classics" id="classics" value = "9" />
                <label for="classics">Classics</label>
    
                <br>
                
                <input type="checkbox" name="romance" id="romance" value = "10" />
                <label for="romance">Romance</label>
    
                <input type="checkbox" name="mystery" id="mystery" value = "11" />
                <label for="mystery">Mystery</label>
                </div>
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




