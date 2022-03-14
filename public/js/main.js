const protocol = window.location.protocol
const host = window.location.host
const modifyAccountModalSaveButton = document.querySelector("#modifyAccountModalSaveButton")
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
            document.getElementById("modifyAccountButton").style.display = "block"
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



modifyAccountModalSaveButton.addEventListener("click", async(e) => {
    e.preventDefault()

    const token = localStorage.getItem("token")

    //const url = "http://localhost:3001/users/me"
    const url = 'https://csci-430-login-api-pfuentes.herokuapp.com/users/me'

    const nameInput = document.querySelector("#nameInput")
    const passwordInput = document.querySelector("#passwordInput")
    const name = nameInput.value
    const password = passwordInput.value
    const requestData = {...name && { name }, ...password && { password } }
    //console.log(requestData)
    console.log("Patching Account Details")
    const options = {
        method: "PATCH",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
    }

    let response = await fetch(url, options)

    if (response.status === 200) {
        const contentArea = document.querySelector("#contentArea")
        contentArea.innerHTML = `<div class=container"><p>Saved successful.</p></div>`
    } else {
        console.log("HTTP-Error: " + response.status)
    }

    const modal = document.querySelector("#modifyAccountModal")
    bootstrap.Modal.getInstance(modal).hide()
    document.getElementById("modifyAccountButton").style.display = "none"
    const form = document.querySelector("#modifyAccountForm").reset()
})