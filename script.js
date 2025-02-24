const addNote=document.getElementById('add')
const notes=JSON.parse(localStorage.getItem('notes'))
addNote.addEventListener('click',()=>createNote())

if(notes){
    notes.forEach(note=>createNote())
}
function createNote(text=''){
    const note=document.createElement('div')
    note.classList.add('note')
    note.innerHTML=`<div class="tools">
            <button class="edit"> <i class="fas fa-edit"></i></button>
            <button class="delete"> <i class="fas fa-trash-alt"></i></button>
        </div>
        <div class="main ${text ? "":"hidden"}"></div>
        <textarea class="textarea ${text ? "hidden":""}"></textarea>`
  

        const editBtn = note.querySelector('.edit')
        const deleteBtn = note.querySelector('.delete')
        const main = note.querySelector('.main')
        const textArea = note.querySelector('textarea')

        textArea.value=text
        main.innerHTML=marked(text)

        deleteBtn.addEventListener('click',()=>{
            note.remove();
            updateLS()
        })
        editBtn.addEventListener('click',()=>{
            main.classList.toggle('hidden')
            textArea.classList.toggle('hidden')
        })
        textArea.addEventListener('input',(e)=>{
            const {value}=e.target;
            main.innerHTML=marked(value)
            updateLS()
        })
        document.body.appendChild(note)
}

function updateLS(){
    const notetext=document.querySelectorAll('textarea')
    const notes=[]
    notetext.forEach(note=>notes.push(note.value))
    localStorage.setItem('notes',JSON.stringify(notes))
}