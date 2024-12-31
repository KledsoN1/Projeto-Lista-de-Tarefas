const form = document.querySelector('#todo-form');
const taskTitleInput = document.querySelector('#task-title-input');
const toDoListUl = document.querySelector('#todo-list');

let task = [];

form.addEventListener('submit', (evento) => {
    evento.preventDefault(); // Evita o comportamento padrão de recarregar a página ao submeter o formulário

    const taskTitlle = taskTitleInput.value;
    console.log(taskTitlle);

    if (taskTitlle.length < 3) {
        alert('Sua lista precisa de pelo menos 3(três) caracteres.');
        return;
    }

    task.push({
        tittle: taskTitlle,
        done: false,
    });
    localStorage.setItem('tasks', JSON.stringify(task)); // Corrigido para 'task'

    const li = document.createElement('li');

    const input = document.createElement('input');
    input.setAttribute('type', 'checkbox');
    input.addEventListener('change', (evento) => {
        const liToToggle = evento.target.parentElement;
        const spanToToggle = liToToggle.querySelector('span');

        const done = evento.target.checked;
        if (done) {
            spanToToggle.style.textDecoration = 'line-through';
        } else {
            spanToToggle.style.textDecoration = 'none';
        }

        // Atualizar o estado no array `task`
        task = task.map(t => {
            if (t.tittle === spanToToggle.textContent) {
                return {
                    tittle: t.tittle,
                    done: done // Atualiza o estado de `done`
                };
            }
            return t;
        });
        localStorage.setItem('tasks', JSON.stringify(task)); // Corrigido para 'task'
    });

    const span = document.createElement('span');
    span.textContent = taskTitlle;

    const button = document.createElement('button');
    button.textContent = 'Remover';
    button.addEventListener('click', (evento) => {
        const liToRemove = evento.target.parentElement;
        const titleToRemove = liToRemove.querySelector('span').textContent;

        // Remove do array `task`
        task = task.filter(t => t.tittle !== titleToRemove);
        localStorage.setItem('tasks', JSON.stringify(task)); // Corrigido para 'task'
        toDoListUl.removeChild(liToRemove);
    });

    li.appendChild(input);
    li.appendChild(span);
    li.appendChild(button);

    toDoListUl.appendChild(li);

    taskTitleInput.value = '';
});
