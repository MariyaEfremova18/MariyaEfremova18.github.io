const doings = document.querySelector('.input-window');
const list = document.querySelector('.doings-list');
const listElement = document.querySelector('li');
const pagination = document.querySelector('footer');
const filterBlock = document.querySelector('.filter');
const deleteButton = document.querySelector('.delete-doing');


let doingsList = [];
const size = 4;
let currentPage = 1;

const displayDoing = () => {
    let doingsElements = '';
    doingsList.forEach((item, index) => {
        doingsElements += `
            <div class="element-of-list" id="${index}">
                <div class="element-content">
                    <input type="checkbox" class="checked-doings" id="checkable" />
                    <label for="checkable">${item}</label>
                </div>
                <button class="delete-doing" id="${index}"></button>
            </div>`;
    }); 

    listElement.innerHTML = doingsElements;

    if (doingsList.length > 3) {
        pagination.innerHTML = `
        <div class="pagination">
        <a href="#">&laquo;</a>
        <a href="#">1</a>
        <a href="#">2</a>
        <a href="#">&raquo;</a>
        </div>
        `
    };

    if (doingsList.length > 0) {
        filterBlock.innerHTML = `
            <button class="allElements">All</button>
            <button class="doneElements">Done</button>
            <button class="undoneElements">Undone</button>
        `
    };
};

if (localStorage.getItem('doingsList')) {
    doingsList = JSON.parse(localStorage.getItem('doingsList'));
    displayDoing ();
};

document.addEventListener('keypress', (event) => {
    if (event.key === 'Enter' && doings.value != '') {
        doingsList.push(doings.value);

        displayDoing ();

        doings.value = '';

        localStorage.setItem('doingsList', JSON.stringify(doingsList));
    }
});

list.addEventListener('click', (event) => {
    if (event.target.className == 'delete-doing') {
        const targetIndex = event.target.id;
        const targetParent = event.target.parentElement;
        const targetParentId = targetParent.id;

        console.log(targetParent);

        if (targetParentId == targetIndex) {
            targetParent.outerHTML = '';
        }
    };
    localStorage.setItem('doingsList', JSON.stringify(doingsList));
});

// if (doingsList.length > 0) {
//     const deleteButtons = document.getElementsByClassName('delete-doing');
//     console.log(deleteButtons);
//     const button = [];
    
//     doingsList.forEach((item) => {
//         button.push(deleteButtons[item]);
//     });

//     console.log(button);
    
//     button.forEach((item) => {
//         document.addEventListener('click', (event) => {
//         if (event.target === item) {
//             console.log(1);
//             event.target.parentElement = '';
//         }
//     });
//     })
// };