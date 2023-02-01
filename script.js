const addButton = document.querySelector("#add");

const updateLSdata = () => {
    
    const textareaData = document.querySelectorAll('textarea');
    const notes = [];

    textareaData.forEach((note) => {
        return notes.push(note.value);
    }) 

    localStorage.setItem('notes', JSON.stringify(notes));
}

const addNewNote = (text = '') => {
    
const note = document.createElement('div');
note.classList.add('note');
const htmlDAta = `
        <div class="operation">
            <button class="edit"><i class="fas fa-edit"></i></button>
            <button class="delete"><i class="fas fa-trash-alt"></i></i></button>
        </div>
        <div class="main ${text ? "" : "hidden"}"> </div>
            <textarea class="${text ? "hidden" : ""}"></textarea>`;
note.insertAdjacentHTML('afterbegin',htmlDAta);

const edit = note.querySelector('.edit');
const del = note.querySelector('.delete');
const main = note.querySelector('.main');
const textarea = note.querySelector('textarea');

del.addEventListener('click', () => {
    note.remove();
    updateLSdata();
})

textarea.value = text;
main.innerHTML = text;

edit.addEventListener('click', () => {
    main.classList.toggle('hidden');
    textarea.classList.toggle('hidden');
})
textarea.addEventListener('change', (event) => {
    const value = event.target.value;
    main.innerHTML = value;

    updateLSdata();
})

document.body.appendChild(note);
}

const notes = JSON.parse(localStorage.getItem('notes'));
if(notes) {
    notes.forEach((note) => {
        addNewNote(note);
    })
}

addButton.addEventListener('click', () => addNewNote());