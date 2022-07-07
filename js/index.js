const doings = document.querySelector('.input-window');
const list = document.querySelector('.doings-list');
const listElement = document.querySelector('li');
const pagination = document.querySelector('footer');
const filterBlock = document.querySelector('.filter');
const deleteButton = document.querySelector('.delete-doing');
const sort = document.querySelector('.dataSort');
const message = document.querySelector('.done-message');

let doingsList = [];
let doneDoingsList = [];
let undoneDoingsList = [];

if (localStorage.getItem('doingsList')) {
    doingsList = JSON.parse(localStorage.getItem('doingsList'));
    displayDoing (doingsList);
};

function displayDoing (arr) {
    let doingsElements = '';
    arr.forEach((item, index) => {
        const date = new Date();
        const currentDate = date.getDate();
        const currentMonth = date.getMonth();
        const currentYear = date.getFullYear();
        const strDate = `${currentDate}/${currentMonth}/${currentYear}`;

        doingsElements += `
            <div class="element-of-list" id="${index}">
                <div class="element-content">
                    <input type="checkbox" class="checked-doings" id="checkable" />
                    <label for="checkable">${item.todo}</label>
                </div>
                <span>${strDate}</span>
                <button class="delete-doing" id="${index}"></button>
            </div>`;
        }); 

        listElement.innerHTML = doingsElements;

        if (doingsList.length > 3 || doneDoingsList.length > 3 || undoneDoingsList.length > 3) {
            pagination.innerHTML = `
            <div class="pagination">
            <a href="#">&laquo;</a>
            <a href="#">1</a>
            <a href="#">2</a>
            <a href="#">&raquo;</a>
            </div>
            `
        };

        if (doingsList.length > 0 || doneDoingsList.length > 0 || undoneDoingsList.length > 0) {
            filterBlock.innerHTML = `
                <button class="allElements">All</button>
                <button class="doneElements">Done</button>
                <button class="undoneElements">Undone</button>
            `
            sort.innerHTML = `
                <p>Sort by Date
                <button class="up"></button>
                <button class="down"></button>
                </p>
            `
        } else {
            filterBlock.innerHTML = '';
            sort.innerHTML = '';
            pagination.innerHTML = '';
        };
};

document.addEventListener('keypress', (event) => {
    if (event.key === 'Enter' && doings.value != '') {

        const doingObj = {
            todo: doings.value,
            done: false,
        };

        doingsList.push(doingObj);

        displayDoing (doingsList);

        doings.value = '';

        localStorage.setItem('doingsList', JSON.stringify(doingsList));
    }
});

list.addEventListener('click', (event) => {
    if (event.target.className == 'delete-doing') {
        const targetIndex = event.target.id;
        const targetParent = event.target.parentElement;
        const targetParentId = targetParent.id;

        if (targetParentId === targetIndex) {
            targetParent.outerHTML = '';
            doingsList.splice(targetIndex, 1);
            displayDoing (doingsList);
        }
    } else if (event.target.className == 'checked-doings') {
        const checkedButton = document.querySelector('.checked-doings');
        const itemId = event.target.parentElement.parentElement.id;
        doingsList[itemId].done = !doingsList[itemId].done;
        doneDoingsList.push(doingsList[itemId]);

        doingsList.forEach((item) => {
            if (!doneDoingsList.includes(item)) {
            undoneDoingsList.push(item);
        }
        })
        
        if (doingsList[itemId].done === true) {
            event.target.setAttribute('checked','');
        } else {
            event.target.removeAttribute('checked',''); 
        }
    };
    localStorage.setItem('doingsList', JSON.stringify(doingsList));
});

filterBlock.addEventListener('click', (event) => {
    const all = document.querySelector('.allElements');
    const done = document.querySelector('.doneElements');
    const undone = document.querySelector('.undoneElements');

    if (event.target == done) {
        displayDoing (doneDoingsList);
        } else if (event.target == all) {
            displayDoing (doingsList)
        } else if (event.target == undone) {
            displayDoing (undoneDoingsList)
        }
});