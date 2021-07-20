const reset = document.querySelector('.reset');
const dateElement = document.querySelector('.date');
const list = document.getElementById('list');
const input = document.getElementById('input');
const finished = document.querySelectorAll('input[type=checkbox]');

const line_through = 'lineThrough';

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

const completeItem = function (element) {
    element.parentNode.classList.toggle(line_through);
    console.log(element);

    if (itemList[element.id].finished) {
        itemList[element.id].finished = false;
    }
    else {
        itemList[element.id].finished = true;
    }
};

const clear = function () {
    localStorage.clear();
    location.reload();
};

function loadList(array) {
    if (array) {
        array.forEach(element => addItem(element.name, element.each, element.finished));
    }
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
    localStorage.setItem("TODO", JSON.stringify(itemList));
});

reset.addEventListener('click', function (e) {
    clear();
});

document.addEventListener("keyup", function (even) {
    if (event.keyCode === 13) {
        const toDo = input.value;

        if (toDo) {
            addItem(toDo, id, false)
            itemList.push({
                name: toDo,
                each: id,
                finished: false,
            })
            localStorage.setItem("TODO", JSON.stringify(itemList));
            id++;
        }
        input.value = '';
    }
});
