const users = JSON.parse(localStorage.getItem("users")) || [];
const userList = document.getElementById("userList");

function saveToLocalStorage() {
    localStorage.setItem("users", JSON.stringify(users));
}

function renderUsers() {
    userList.innerHTML = '<h3 class="h3">Usuários:</h3>';

    users.forEach((name, index) => {
        const userRow = document.createElement("div");
        userRow.className = "listItem";
        userRow.innerHTML = `
            <span id="name-${index}" class="listName">${name}</span>
            <div class="listAction">
                <button class="btn-edit" onclick="editUser(${index})">Editar</button>
                <button class="btn-delete" onclick="deleteUser(${index})">Excluir</button>
            </div>
        `;
        userList.appendChild(userRow);
    });
}

function addUser() {
    const input = document.getElementById("newUser");
    const newName = input.value.trim();

    if (newName !== '') {
        users.push(newName);
        saveToLocalStorage();
        input.value = '';
        renderUsers();
    }
}

function editUser(index) {
    const nameSpan = document.getElementById(`name-${index}`);
    const currentName = users[index];

    nameSpan.innerHTML = `
    <input type="text" id="editInput-${index}" class="formUser" value="${currentName}">
    `;
    const actions = nameSpan.nextElementSibling;
    actions.innerHTML = `
    <button class="btn-primary" onclick="saveEdit(${index})">Salvar</button>
    `;
}

function saveEdit(index) {
    const newName = document.getElementById(`editInput-${index}`).value.trim();
    if (newName !== '') {
        users[index] = newName;
        saveToLocalStorage();
        renderUsers();
    }
}

function deleteUser(index) {
    users.splice(index, 1);
    renderUsers();
}

renderUsers();