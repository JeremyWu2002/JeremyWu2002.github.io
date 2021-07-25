const reset = document.querySelector('.reset');
const dateElement = document.querySelector('.date');
const list = document.getElementById('list');
const input = document.getElementById('input');
const finished = document.querySelectorAll('input[type=checkbox]');
const add = document.querySelector('.btn');
<<<<<<< HEAD
const nav = document.querySelector('.nav');
const container = document.querySelector('.container');
const monday = document.querySelector('.monday');
const header = document.querySelector('.header');
const display = document.getElementById('display');
=======
>>>>>>> parent of 0d8894b (add to do button working)

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const line_through = 'lineThrough';

const day = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

//loading data for the current date
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
<<<<<<< HEAD
    const day = chosenDay.split('-');
    if (day[0] == separatedTodayNum[2] && parseInt(day[1], 0) == parseInt(separatedTodayNum[0], 0) && day[2] == separatedTodayNum[1]) {
        console.log('entered')
        newItem(toDo);
    }
    else {
        const addingDay = `${parseInt(day[1], 0)}/${day[2]}/${day[0]}`;

        let chosenDayList = [];
        let num;

        let info = localStorage.getItem(addingDay);
        if (info) {
            chosenDayList = JSON.parse(info);
            if (typeof chosenDayList === "string") {
                chosenDayList = [];
            }
            num = chosenDayList.length;
            loadList(chosenDayList);
        }
        else {
            chosenDayList = [];
            num = 0;
        }
        addingItemChosenDay(toDo, chosenDayList, addingDay, num);
        console.log(chosenDayList);
        activity.value = '';
=======

    newItem(toDo);
    activity.value = '';
>>>>>>> parent of 0d8894b (add to do button working)

        console.log(toDo, chosenDay);
    }
    closeModal();
});

<<<<<<< HEAD
// when modal is open, enter closes the modal
=======
>>>>>>> parent of 0d8894b (add to do button working)
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


<<<<<<< HEAD
// allows the nav to direct to the correct location
document.querySelector('.nav__links').addEventListener('click', function (e) {
    e.preventDefault();
    if (e.target.classList.contains('nav__link')) {
        const id = e.target.getAttribute('href');
        if (id !== '#') {
            document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
        }
    }
});

const navheight = nav.getBoundingClientRect().height;

/* adding a sticky navigtion header*/
const stickyNav = function (entries) {
    const [entry] = entries;
    if (!entry.isIntersecting) {
        nav.classList.add('sticky');
    }
    else {
        nav.classList.remove('sticky');
    }
};

const headerObserver = new IntersectionObserver(stickyNav, {
    root: null,
    threshold: 0,
    rootMargin: `-${navheight}px`,
});
headerObserver.observe(header);

//showing the number of things to do in the week
function printWeek() {
    let add = 7 - currently;
    let subtract = 0 + currently;

    for (let l = 1; l < add; l++) {
        const currentDate = `${separatedTodayNum[0]}/${parseInt(separatedTodayNum[1]) + l}/${separatedTodayNum[2]}`;
        let chosenDayList = [];
        let num;
        let info = localStorage.getItem(currentDate);

        const dayBoxId = 'day' + (currently + l)
        const neededDay = document.getElementById(dayBoxId);

        if (info) {
            chosenDayList = JSON.parse(info);
            if (typeof chosenDayList === "string") {
                chosenDayList = [];
            }
            num = chosenDayList.length;
            loadList(chosenDayList);
        }
        else {
            chosenDayList = [];
            num = 0;
        }
        if (chosenDayList.length === 0) {
            neededDay.insertAdjacentHTML('afterbegin', '<h3 id="display">Nothing to do</h3>');
        }
        else {
            neededDay.insertAdjacentHTML('afterbegin', `<h2 id="display">${chosenDayList.length} thing(s) to do</h2>`);
        }

    }
    for (let l = 0; l <= subtract; l++) {
        const currentDate = `${separatedTodayNum[0]}/${parseInt(separatedTodayNum[1]) - l}/${separatedTodayNum[2]}`;
        let chosenDayList = [];
        let num;

        const dayBoxId = 'day' + (currently - l + 1)
        const neededDay = document.getElementById(dayBoxId);

        let info = localStorage.getItem(currentDate);
        if (info) {
            chosenDayList = JSON.parse(info);
            if (typeof chosenDayList === "string") {
                chosenDayList = [];
            }
            num = chosenDayList.length;
            loadList(chosenDayList);
        }
        else {
            chosenDayList = [];
            num = 0;
        }
        if (chosenDayList.length === 0) {
            neededDay.insertAdjacentHTML('afterbegin', '<h3 id="display">Nothing to do</h3>');
        }
        else {
            neededDay.insertAdjacentHTML('afterbegin', `<h5 id="display">${chosenDayList.length} thing(s) to do</h5>`);
        }
    }
}

printWeek();
function addNothing(daily, date) {


}

function addSomething() {

}
=======
>>>>>>> parent of 0d8894b (add to do button working)
