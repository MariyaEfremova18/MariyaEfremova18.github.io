const doings = document.querySelector('.input-window');
const listElement = document.querySelector('li');
// const listElement = document.querySelector('ul');
const pagination = document.querySelector('footer');
const filterBlock = document.querySelector('.filter');

let doingsList = [];
const size = 4;
let currentPage = 1;

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

function displayDoing () {
    let doingsElements = '';
    doingsList.forEach((item) => {{
        doingsElements += `
            <div class="element-of-list">
                <div class="element-content">
                    <input type="checkbox" class="checked-doings" id="checkable" />
                    <label for="checkable">${item}</label>
                </div>
                <button class="delete-doing"></button>
            </div>`;
        }
    }); 

    listElement.innerHTML = doingsElements;

    if (doingsList.length > 3) {
        pagination.innerHTML = `
        <div class="pagination">
        <a href="#">&laquo;</a>
        <a href="#">1</a>
        <a href="#secondPage">2</a>
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

