//------------------- UPLOAD PAGE -----------------------------------



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






