const protocol = window.location.protocol
const host = window.location.host

const loginForm = document.querySelector('#loginForm')
const emailInput = document.querySelector('#email')
const passwordInput = document.querySelector('#password')

loginForm.addEventListener('submit', async (e) => {
    e.preventDefault()

    const email = emailInput.value;
    const password = passwordInput.value;

    const url = `${protocol}//${host}/login?email=${email}&password=${password}`

    let response = await fetch(url)

    if (response.status === 401) {
        const message = document.querySelector('#message')
        message.textContent = "Invalid email or password."
    } 
    else if (response.status === 200){
        const data = await response.json()
        
        const newUrl = `${protocol}//${host}/main?token=${data.token}`
        window.location.replace(newUrl);
    }
})