const reset = document.querySelector('.reset');
const dateElement = document.querySelector('.date');
const list = document.getElementById('list');
const input = document.getElementById('input');
const finished = document.querySelectorAll('input[type=checkbox]');

const line_through = 'lineThrough';

let itemList, id;

let data = localStorage.getItem("TODO");

try {
    itemList = JSON.parse(data);
    id = itemList.length;
    loadList(itemList);
}
catch (err) {
    itemList = [];
    id = 0;
}

const options = { weekday: "long", month: "short", day: "numeric" };
const date = new Date();

dateElement.innerHTML = date.toLocaleDateString("en-US", options);

function addItem(item, done) {
    const line = done ? line_through : '';
    const required =
        `   <label class="thing ${line}"> ${item} 
            <input type="checkbox" id = "${id}">
            <span class="box"></span>
            </label><br>
            <i class="fa fa-trash-o de" job="delete" id="${id}"></i>`;

    const position = 'beforeend';
    const container = '<li class="item">';

    list.insertAdjacentHTML(position, container);
    const newItem = document.querySelectorAll('.item');
    newItem[newItem.length - 1].insertAdjacentHTML(position, required);

};

const removeItem = function (element) {
    /*const position = element.parentNode.childNodes;
    const parent = position[1].removeChild(position[1].childNodes[0]);
    localStorage.removeItem("TODO", parent);*/
    element.parentNode.parentNode.removeChild(element.parentNode);
};

const completeItem = function (element) {
    element.parentNode.classList.toggle(line_through);
};

const clear = function () {
    localStorage.clear();
    location.reload();
};

function loadList(array) {
    array.forEach(element => addItem(element.name, element.finished));
};

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
});

reset.addEventListener('click', function (e) {
    clear();
});

document.addEventListener("keyup", function (even) {
    if (event.keyCode === 13) {
        const toDo = input.value;

        if (toDo) {
            addItem(toDo)
            itemList.push({
                name: toDo,
                id: id,
            })
            id++;
        }
        input.value = '';
    }
});




