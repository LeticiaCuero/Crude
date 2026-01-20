const users = [];
const userList = document.getElementById("userList");

function renderUsers() {
    userList.innerHTML = '';

    users.forEach((name, index) => {
        const userRow = document.createElement("div");
        userRow.className = "border rounded p-2 d-flex justify-content-between align-items-center";
        userRow.innerHTML = `
        <span id="name-${index}" class="flex-grow-1">${name}</span>
        <div class="d-flex gap-2">
        <button class="btn btn-sm btn-warning" onclick="editUser(${index})">Editar</button>
        <button class="btn btn-sm btn-danger" onclick="deleteUser(${index})">Excluir</button>
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
        input.value = '';
        renderUsers();
        showAlert('alert-add');
    }
}

function editUser(index) {
    const nameSpan = document.getElementById(`name-${index}`);
    const currentName = users[index];

    nameSpan.innerHTML = `
    <input type="text" id="editInput-${index}" class="form-control form-control-sm" value="${currentName}">
    `;
    const actions = nameSpan.nextElementSibling;
    actions.innerHTML = `
    <button class="btn btn-sm btn-success mt-1" onclick="saveEdit(${index})">Salvar</button>
    `;
}

function showAlert(targetId) {
    const alertBox = document.querySelector('.alert');
    ['alert-add', 'alert-edit', 'alert-delete'].forEach(id => {
        document.getElementById(id).classList.toggle('d-none', id !== targetId);
    });
    alertBox.classList.remove('d-none');
    setTimeout(() => {
        alertBox.classList.add('d-none');
    }, 2000);
}

function saveEdit(index) {
    const newName = document.getElementById(`editInput-${index}`).value.trim();
    if (newName !== '') {
        users[index] = newName;
        renderUsers();
        showAlert('alert-edit');
    }
}

function deleteUser(index) {
    users.splice(index, 1);
    renderUsers();
    showAlert('alert-delete');
}
renderUsers();

