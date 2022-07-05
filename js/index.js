const doings = document.querySelector('.input-window');
const listElement = document.querySelector('li');

const doingsList = [];

document.addEventListener('keypress', (event) => {
    if (event.key === 'Enter' && doings.value != '') {
        
        doingsList.push(doings.value);

        doings.value = '';

        displayDoing ();

        localStorage.setItem('doingsList', JSON.stringify(doingsList));
    }
});

function displayDoing () {
    let contentElement = '';
    doingsList.forEach((item) => {
        contentElement += `
            <div class="element-of-list">
                <div class="element-content">
                    <input type="checkbox" class="checked-doings" id="checkable" />
                    <label for="checkable">${item}
                        <button class="delete-doing">
                        <img
                            src="../img/2931151_close_delete_exit_remove_x_icon.png"
                            alt="delete"
                        />
                        </button>
                    </label>
                </div>
            </div>`; 
    })

    listElement.innerHTML = contentElement; 
};

