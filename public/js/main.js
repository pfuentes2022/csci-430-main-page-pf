const protocol = window.location.protocol
const host = window.location.host
const modifyAccountModalSaveButton = document.querySelector("#modifyAccountModalSaveButton")
const displayAccountItem = document.querySelector("#displayAccountItem")

var x = 0;
var z = 0;

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

            document.getElementById("contentArea").style.borderRadius = "4px"
            document.getElementById("contentArea").style.backgroundColor = "#121624"
            document.getElementById("contentArea").style.padding = "1em 1em 0.3em 1em"
            document.getElementById("contentArea").style.margin = "0em 2em 0.7em 2em"
            
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




getTaskList.addEventListener("click", async(e) => {     ///////////////// Start getting task list//////////////////////
    e.preventDefault()
    
    console.log('Fetching Task List')

    const token = localStorage.getItem("token")
    
    //const url = "http://localhost:3001/tasks?skip="+x+"&limit=3"
    const url = "https://csci-430-login-api-pfuentes.herokuapp.com/tasks?skip="+x+"&limit=3"
    
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
            if(data.length === 0) {
                console.log("No more data to print")
                return
            } else {
                const contentArea = document.querySelector("#taskList")
                contentArea.innerHTML=``
                
                document.getElementById("navTask").style.display = "flex"
                document.getElementById("getTaskList").style.display = "none"
                document.getElementById("getTaskListLeft").style.display = "block"
                document.getElementById("getTaskListRight").style.display = "block"


                data.forEach(element => {
                    var taskStatus = (element.completed)? "Complete":"Incomplete"
                    contentArea.innerHTML += `<div class="container task-card">
                    <p>Task Name:  ${element.title}<br>
                        Description: ${element.description}<br><br>
                        Status: ${taskStatus}</p>
                    
                    <div class="taskbtn">
                        <button class="btn mod-task-btn" id="editTaskBtn" data-bs-toggle="modal" data-bs-target="#modifyTaskModal"
                            data-task-id=${element._id}>
                         Edit Task</button>
                         <button class="btn del-task-btn" id="delTaskBtn" data-task-id=${element._id} data-bs-toggle="modal"
                            data-bs-target="#deleteTaskModal">Delete</button>
                         </div>
                    </div>`

                });
                const editTaskBtn = document.querySelector("#editTaskBtn")
                editTaskBtn.addEventListener('click', function(e){
                    localStorage.setItem('taskID', e.target.dataset.taskId)
                });


                const delTaskBtn = document.querySelector("#delTaskBtn")
                delTaskBtn.addEventListener('click', function(e){
                    console.log(e.target.dataset.taskId)
                    localStorage.setItem('taskID', e.target.dataset.taskId)
                });

            }
        }
    } else {
        console.log("HTTP-Error: " + response.status)
    }
})



getTaskListRight.addEventListener("click", async(e) => {     ///////////////// Move right//////////////////////
    e.preventDefault()
    
    const token = localStorage.getItem("token")
    x+=3
    //const url = "http://localhost:3001/tasks?skip="+x+"&limit=3"
    const url = "https://csci-430-login-api-pfuentes.herokuapp.com/tasks?skip="+x+"&limit=3"
    
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
            if(data.length === 0) {
                console.log("No more data to print")
                x=z
                return
            } else {
                const contentArea = document.querySelector("#taskList")
                contentArea.innerHTML=``

                z=x
                data.forEach(element => {
                    var taskStatus = (element.completed)? "Complete":"Incomplete"
                    contentArea.innerHTML += `<div class="container task-card">
                    <p>Task Name:  ${element.title}<br>
                        Description: ${element.description}<br><br>
                        Status: ${taskStatus}</p>

                        <div class="taskbtn">
                        <button class="btn mod-task-btn" id="editTaskBtn" data-bs-toggle="modal" data-bs-target="#modifyTaskModal"
                            data-task-id=${element._id}>
                         Edit Task</button>
                         <button class="btn del-task-btn" id="delTaskBtn" data-task-id=${element._id}>Delete</button>
                         </div>
                    </div>`

                });
                const editTaskBtn = document.querySelector("#editTaskBtn")
                editTaskBtn.addEventListener('click', function(e){
                    console.log(e.target.dataset.taskId)
                    localStorage.setItem('taskID', e.target.dataset.taskId)
                })
            }
        }
    } else {
        console.log("HTTP-Error: " + response.status)
    }
})                                                              //######        End Move right      ######//


getTaskListLeft.addEventListener("click", async(e) => {         //#######       Move Left          ########//
    e.preventDefault()
    
    const token = localStorage.getItem("token")
    x-=3;
    if(x < 0){
        console.log("Reached beginning of list")
        x=0
        return
    }
    //const url = "http://localhost:3001/tasks?skip="+x+"&limit=3"
    const url = "https://csci-430-login-api-pfuentes.herokuapp.com/tasks?skip="+x+"&limit=3"
    
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
            const contentArea = document.querySelector("#taskList")
            contentArea.innerHTML=``

            z=x
            data.forEach(element => {
                var taskStatus = (element.completed)? "Complete":"Incomplete"
                contentArea.innerHTML += `<div class="container task-card">
                <p>Task Name:  ${element.title}<br>
                    Description: ${element.description}<br><br>
                    Status: ${taskStatus}</p>

                    <div class="taskbtn">
                        <button class="btn mod-task-btn" id="editTaskBtn" data-bs-toggle="modal" data-bs-target="#modifyTaskModal"
                            data-task-id=${element._id}>
                        Edit Task</button>
                        <button class="btn del-task-btn" id="delTaskBtn" data-task-id=${element._id}>Delete</button>
                        </div>
                </div>`
                
            });
            const editTaskBtn = document.querySelector("#editTaskBtn")
            editTaskBtn.addEventListener('click', function(e){
                console.log(e.target.dataset.taskId)
                localStorage.setItem('taskID', e.target.dataset.taskId)
            })
            
        }
    } else {
        console.log("HTTP-Error: " + response.status)
    }
})
                                                                    //###       End move left       #######//



modifyTaskModalSaveButton.addEventListener("click", async(e) => {   //########      MODIFY TASK     #######//
    e.preventDefault()

    const token = localStorage.getItem("token")

    //const url = "http://localhost:3001/tasks"
    const url = 'https://csci-430-login-api-pfuentes.herokuapp.com/tasks'

    const titleInput = document.querySelector("#titleInput")
    const descInput = document.querySelector("#descInput")
    const completed = document.getElementById('statInput').checked
    const _id = localStorage.getItem('taskID')
    const title = titleInput.value
    const description = descInput.value


    const requestData = {_id, ...title && { title }, ...description && { description }, completed}


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
        alert("Task Updated\n\nPlease refresh the task to view changes")

    } else {
        alert("Failed to update task")
        console.log("HTTP-Error: " + response.status)
    }

    const modal = document.querySelector("#modifyTaskModal")
    bootstrap.Modal.getInstance(modal).hide()
    const form = document.querySelector("#modifyTaskForm").reset()
})                  //######        End Modify Task Handler     ######//




addNewTaskShow.addEventListener("click" , async(e) => {             // Show form to add new task //
    e.preventDefault()
    document.getElementById("taskForm").style.display = "block"
    document.getElementById("addNewTaskShow").style.display = "none"

})


addTaskBtn.addEventListener("click", async(e) => {
    e.preventDefault()

    const newTitleInput = document.querySelector('#newTitle')
    const newDescInput = document.querySelector('#newDesc')
    const title = newTitleInput.value
    const description = newDescInput.value
    let data = {title, description}

    const token = localStorage.getItem("token")
    
    //const url = 'http://localhost:3001/tasks'
    const url = 'https://csci-430-login-api-pfuentes.herokuapp.com/tasks'

    const options = {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    }

    let response = await fetch(url, options)
    data = await response.json()

    if (response.status === 400) {
        alert("Failed to create task")
        console.log("HTTP-Error: " + response.status)
    } 
    else if (response.status === 201) {
        alert("New task created")
        document.getElementById("taskForm").style.display = "none"
        document.getElementById("addNewTaskShow").style.display = "block"
        const form = document.querySelector("#taskForm").reset()
    }
})


deleteTaskModalButton.addEventListener("click" , async(e) => {
    e.preventDefault()

    const token = localStorage.getItem("token")

    //const url = "http://localhost:3001/tasks"
    const url = 'https://csci-430-login-api-pfuentes.herokuapp.com/tasks'
    const _id = localStorage.getItem('taskID')

    const requestData = {_id}


    const options = {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
    }

    let response = await fetch(url, options)

    if (response.status === 200) {
        alert("Task Deleted\n\nPlease refresh the task to view changes")

    } else {
        alert("Failed to delete task")
        console.log("HTTP-Error: " + response.status)
    }

    const modal = document.querySelector("#deleteTaskModal")
    bootstrap.Modal.getInstance(modal).hide()
})