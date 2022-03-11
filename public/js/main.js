const protocol = window.location.protocol
const host = window.location.host

const displayAccountItem = document.querySelector("#displayAccountItem")

displayAccountItem.addEventListener("click", async(e) => {
    e.preventDefault()

    console.log('Fetching Account Details')

    const token = localStorage.getItem("token")

    //const url = "http://localhost:3001/users/me"
    const url = 'https://csci-430-login-api-pfuentes.herokuapp.com/users/me'

    const options = {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }

    let response = await fetch(url, options)

    if (response.ok) {
        if (response.status === 200) {
            const data = await response.json()

            const contentArea = document.querySelector("#contentArea")
            contentArea.innerHTML = `<div class="container">
                <p>Name: ${data.name} <br>Email: ${data.email}</p>
                </div>`
        }
    } else {
        console.log("HTTP-Error: " + response.status)
    }
})



logoutAccountItem.addEventListener("click", async(e) => {
    e.preventDefault()

    console.log('Logging user out')

    const token = localStorage.getItem("token")

    //const url = "http://localhost:3001/users/logout"
    const url = 'https://csci-430-login-api-pfuentes.herokuapp.com/users/logout'

    const options = {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }

    let response = await fetch(url, options)

    if (response.ok) {
        if (response.status === 200) {
            //const data = await response.json()

            const newUrl = `${protocol}//${host}/#`
            window.location.replace(newUrl)
        }
    } else {
        console.log("HTTP-Error: " + response.status)
    }
})



deleteAccountItem.addEventListener("click", async(e) => {
    e.preventDefault()

    console.log('Deleting User')

    const token = localStorage.getItem("token")
    if(confirm("Are you sure you want to delete your account?")) {
        //const url = "http://localhost:3001/users/me"
        const url = 'https://csci-430-login-api-pfuentes.herokuapp.com/users/me'

        const options = {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }

        let response = await fetch(url, options)

        if (response.ok) {
            if (response.status === 200) {
                //const data = await response.json()

                const newUrl = `${protocol}//${host}/#`
                window.location.replace(newUrl)
                alert("Account successfully deleted")
            }
        } else {
            console.log("HTTP-Error: " + response.status)
        }
    } else {
        console.log('Cancelling deletion.')
    }
})