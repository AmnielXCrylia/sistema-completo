const API_URL = 'http://localhost:3000/tasks';

const taskUpdate = async (id) =>{
    console.log(id);

    const response = await fetch(API_URL);
    const tasks = await response.json();
    const task = tasks.find((tarea) => tarea.id === id);

    document.getElementById('id').value = task.id;
    document.getElementById('title').value = task.title;
    document.getElementById('description').value = task.description;
    document.getElementById('status').value = task.status;
    
}

// Leer tareas
const fetchTasks = async () => {
    const res = await fetch(API_URL);
    const tasks = await res.json();

    
    const taskTable = document.getElementById('taskTable');
    
    tasks.forEach(task => {
        const row = document.createElement('tr');
        const statusColor = task.status === 'Completada'? 'bg-success bg-opacity-75 text-light' : (task.status === 'Pendiente'? 'bg-danger-subtle' : 'bg-warning-subtle');
        // if(task.status=== 'Completado'){

        // }
        row.innerHTML = `
            <tr>
                <th scope="row">${task.id}</th>
                <td>${task.title}</td>
                <td>${task.description}</td>
                <td>
                <button class= "btn ${statusColor}" >${task.status}</button>
                <td>
                    <button class="btn btn-warning" data-bs-toggle="modal" data-bs-target="#staticBackdrop" onclick="taskUpdate(${task.id})">Editar</button>
                    <button class="btn btn-danger" onclick="deleteTask(${task.id})">Eliminar</button>
                </td>
            </tr>
        `;
        
        taskTable.appendChild(row);
    });
    
    
    
};

// Crear/editar tarea
document.getElementById('taskForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const id = document.getElementById('id').value;
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const status = document.getElementById('status').value;

    if(id){
        console.log('es update');
        await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, description, status }),
    });
    } else{
        console.log('es create');
        await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title, description, status })
        });

    }

    e.target.reset();
});

// Editar tarea

// document.getElementById('taskFormUpdate').addEventListener('submit', async (e) => {
//     e.preventDefault();
//     console.log(idTask)

//     const title = document.getElementById('titleUpdate').value;
//     const description = document.getElementById('descriptionUpdate').value;
//     const status = document.getElementById('statusUpdate').value;
    
//     console.log(id)
//     // await fetch(`${API_URL}/${id}, {method:'DELETE' }`);
//     await fetch(`${API_URL}/${id}`, {
//         method: 'PUT',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ title, description, status }),
//     });
// })
// const updateTask = (id) => {

//     fetchTasks();
// };

// Eliminar tarea
const deleteTask = async (id) => {
    console.log(id)
    // await fetch(`${API_URL}/${id}, {method:'DELETE' }`);
    await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
    });
    // fetchTasks();
};

// Cargar tareas al inicio
fetchTasks();