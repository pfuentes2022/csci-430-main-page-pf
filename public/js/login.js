const protocol = window.location.protocol
const host = window.location.host

const loginForm = document.querySelector('#loginForm')
const emailInput = document.querySelector('#email')
const passwordInput = document.querySelector('#password')



loginForm.addEventListener('submit', async (e) => {
    e.preventDefault()

    console.log('Beginning login')

    const email = emailInput.value
    const password = passwordInput.value

    const data = { email, password }

    //const url = "http://localhost:3001/users/login"
    const url = 'https://csci-430-login-api-pfuentes.herokuapp.com/users/login'

    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    }
        console.log('Credentials sent')

    let response = await fetch(url, options)
        console.log('Response received')

    if (response.status === 400) {
        const message = document.querySelector("#message")
        message.textContent = "Invalid email or password."
    } 
    else if (response.status === 200) {
        const data = await response.json()
        console.log('Token Stored')
        localStorage.setItem("token", data.token)
        alert(data.token)

        const newUrl = `${protocol}//${host}/main`
        window.location.replace(newUrl)
    }
    else {
        console.log('Something went wrong')
    }
})