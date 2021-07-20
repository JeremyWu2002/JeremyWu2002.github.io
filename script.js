const reset = document.querySelector('.reset');
const dateElement = document.querySelector('.date');
const list = document.getElementById('list');
const input = document.getElementById('input');
const finished = document.querySelectorAll('input[type=checkbox]');
const add = document.querySelector('.btn');

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const line_through = 'lineThrough';

const day = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

let itemList = [];
let id;

let data = localStorage.getItem("TODO");

if (data) {
    itemList = JSON.parse(data);
    if (typeof itemList === "string") {
        itemList = [];
    }
    id = itemList.length;
    loadList(itemList);
}
else {
    itemList = [];
    id = 0;
}

const options = { weekday: "long", month: "short", day: "numeric" };
const date = new Date();

dateElement.innerHTML = date.toLocaleDateString("en-US", options);
const numericDate = date.toLocaleDateString(options);
console.log(numericDate);

const openModal = function () {
    modal.classList.remove('hidden');
    overlay.classList.remove('hidden');
};

const closeModal = function () {
    modal.classList.add('hidden');
    overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);
add.addEventListener('click', function (e) {
    const toDo = activity.value;
    const chosenDay = address.value;

    newItem(toDo);
    activity.value = '';

    console.log(toDo, chosenDay);
    closeModal();
});

document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
        closeModal();
    }
});

// adding item to the list
function addItem(item, number, done) {
    const line = done ? line_through : '';
    const required =
        `   <label class="thing ${line}"> ${item} 
                <input type="checkbox" id="${number}">
                <span class="box"></span>
            </label><br>
            <i class="fa fa-trash-o de" job="delete" id="${number}"></i>`;

    const position = 'beforeend';
    const container = '<li class="item">';

    list.insertAdjacentHTML(position, container);
    const newItem = document.querySelectorAll('.item');
    newItem[newItem.length - 1].insertAdjacentHTML(position, required);

};

// removing item from the list
const removeItem = function (element) {
    /* be able to delete from itemList array to have localStorage work*/
    const position = element.parentNode.childNodes;
    const parent = position[1].removeChild(position[1].childNodes[0]);
    localStorage.removeItem("TODO", parent);
    for (let l = 0; l < itemList.length; l++) {
        if (element.id == itemList[l].each) {
            const temp = itemList.slice(l + 1, itemList.length)
            itemList = itemList.slice(0, l);
            for (let m = 0; m < temp.length; m++) {
                itemList.push(temp[m]);
            }
        }
    }
    element.parentNode.parentNode.removeChild(element.parentNode);
};

// adding line through to completed items
const completeItem = function (element) {
    element.parentNode.classList.toggle(line_through);

    for (let u = 0; u < itemList.length; u++) {
        if (element.id == itemList[u].each) {
            if (itemList[u].finished) {
                itemList[u].finished = false;
            }
            else {
                itemList[u].finished = true;
            }
        }
    }
};

//clearing the list
const clear = function () {
    localStorage.clear();
    location.reload();
};

//loading list from the local storage
function loadList(array) {
    if (array) {
        array.forEach(element => addItem(element.name, element.each, element.finished));
    }
};

function newItem(adding) {
    if (adding) {
        addItem(adding, id, false)
        itemList.push({
            name: adding,
            each: id,
            finished: false,
        })
        localStorage.setItem("TODO", JSON.stringify(itemList));
        id++;
    }
}
//linking clicks on items to functions
list.addEventListener('click', function (e) {
    const element = e.target;
    let job = '';
    let check = '';
    try {
        job = element.attributes.job.value;
    }
    catch (error) {
        check = element.tagName;
    }
    if (job && job === 'delete') {
        removeItem(element);
    }
    if (check && check === 'INPUT') {
        completeItem(element);
    }
    localStorage.setItem("TODO", JSON.stringify(itemList));
});

//clearing when the reset button is clicked
reset.addEventListener('click', function (e) {
    clear();
});

//adding list to the listem when the neter key is hit
document.addEventListener("keyup", function (even) {
    if (event.keyCode === 13) {
        const toDo = input.value;

        newItem(toDo);
        input.value = '';
    }
});


