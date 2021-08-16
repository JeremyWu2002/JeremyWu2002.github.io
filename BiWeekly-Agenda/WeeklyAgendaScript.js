const reset = document.querySelector('.reset');
const dailyReset = document.querySelector('.dailyReset');
const dateElement = document.querySelector('.date');
const list = document.getElementById('list');
const extraList = document.getElementById('extraList');
const input = document.getElementById('input');
const dailyinput = document.getElementById('dailyInput');
const finished = document.querySelectorAll('input[type=checkbox]');
const add = document.querySelector('.btn');
const nav = document.querySelector('.nav');
const container = document.querySelector('.container');
const monday = document.querySelector('.monday');
const header = document.querySelector('.header');
const dailyContainer = document.querySelector('.dailyContainer');
const btnCloseContainer = document.querySelector('.btn--close-container');
const dailyDate = document.querySelector('.dailyDate');
const week = document.querySelectorAll('.daybox');

let eachDay = [];
week.forEach(element => eachDay.push(element.lastElementChild));
let currentDate;
let dailyList = [];
let daily;
let wordCurrentDate;

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const line_through = 'lineThrough';

const day = ['Monday,', 'Tuesday,', 'Wednesday,', 'Thursday,', 'Friday,', 'Saturday,', 'Sunday,'];
const month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const thirtyOneDays = ['1', '3', '5', '7', '8', '10', '12'];
const thirtyDays = ['4', '6', '9', '11'];
const february = '2';
let daysInMonth = 0;
let currently = 0;
let wantedDay = 0;

/* finding today's date and separating it into arrays*/
const options = { weekday: "long", month: "short", day: "numeric" };
const date = new Date();
dateElement.innerHTML = date.toLocaleDateString("en-US", options);
const words = date.toLocaleDateString("en-US", options);
let numericDate = date.toLocaleDateString();
const separatedToday = words.split(' ');
const separatedTodayNum = numericDate.split('/');
if (separatedTodayNum[1] < 10) {
    separatedTodayNum[1] = '0' + separatedTodayNum[1];
    numericDate = `${separatedTodayNum[0]}/${separatedTodayNum[1]}/${separatedTodayNum[2]}`;
}


//loading data for the current date
let itemList = [];
let id;

let data = localStorage.getItem(numericDate);
if (data) {
    itemList = JSON.parse(data);
    if (typeof itemList === "string") {
        itemList = [];
    }
    id = itemList.length;
    loadList(itemList, 'list');
}
else {
    itemList = [];
    id = 0;
}

function findDaysinMonth(currentMonth) {
    for (let p = 0; p < thirtyOneDays.length; p++) {
        if (thirtyOneDays[p] == currentMonth) {
            daysInMonth = 31;
        }
    }
    for (let p = 0; p < thirtyDays.length; p++) {
        if (thirtyDays[p] == currentMonth) {
            daysInMonth = 30;
        }
    }
    if (february == currentMonth) {
        daysInMonth = 28;
    }
    else if (february == currentMonth && parseInt(currentMonth) % 4 === 0) {
        daysInMonth = 29;
    }
}
/*find what day of the week it is*/
function findTodayindex() {
    for (let l = 0; l < day.length; l++) {
        if (day[l] === separatedToday[0]) {
            currently = l;
        }
    }
}
findTodayindex();

/* openning and closing the modal*/
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
    const day = chosenDay.split('-');
    if (day[0] == separatedTodayNum[2] && parseInt(day[1], 0) == parseInt(separatedTodayNum[0], 0) && day[2] == separatedTodayNum[1]) {
        id = newItem(toDo, 'list', itemList, numericDate, id);
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
        }
        else {
            chosenDayList = [];
            num = 0;
        }
        id = addingItemChosenDay(toDo, chosenDayList, addingDay, id);
        activity.value = '';
    }
    closeModal();
});

// when modal is open, enter closes the modal
document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
        closeModal();
    }
});

// adding item to the list
function addItem(item, number, done, listName) {
    const addingList = document.getElementById(listName);
    const line = done ? line_through : '';
    const required =
        `   <label class="thing ${line}"> ${item} 
                <input type="checkbox" id="${number}">
                <span class="box"></span>
            </label><br>
            <i class="fa fa-trash-o de" job="delete" id="${number}"></i>`;

    const position = 'beforeend';
    const container = '<li class="item">';

    addingList.insertAdjacentHTML(position, container);
    const newItem = addingList.querySelectorAll('.item');
    newItem[newItem.length - 1].insertAdjacentHTML(position, required);
};


// removing item from the list
const removeItem = function (element, neededDate, neededArray) {
    /* be able to delete from itemList array to have localStorage work*/
    const position = element.parentNode.childNodes;
    const parent = position[1].removeChild(position[1].childNodes[0]);
    localStorage.removeItem(neededDate, parent);
    for (let l = 0; l < neededArray.length; l++) {
        if (element.id == neededArray[l].each) {
            const temp = neededArray.slice(l + 1, neededArray.length)
            neededArray = neededArray.slice(0, l);
            for (let m = 0; m < temp.length; m++) {
                neededArray.push(temp[m]);
            }
        }
    }
    element.parentNode.parentNode.removeChild(element.parentNode);
    return neededArray;
};

// adding line through to completed items
const completeItem = function (element, arrayName) {
    element.parentNode.classList.toggle(line_through);
    for (let u = 0; u < arrayName.length; u++) {
        if (element.id == arrayName[u].each) {
            if (arrayName[u].finished) {
                arrayName[u].finished = false;
            }
            else {
                arrayName[u].finished = true;
            }
        }
    }
    return arrayName;
};

//clearing the list
const clear = function (neededDate, listName) {
    for (let p = 0; p < listName.length; p++) {
        localStorage.removeItem(neededDate, listName[p].name);
    }
};

//loading list from the local storage
function loadList(array, listName) {
    if (array) {
        array.forEach(element => addItem(element.name, element.each, element.finished, listName));
    }
};

/* adding new item to the local storage*/
function newItem(adding, listName, neededList, neededDate, num) {
    if (adding) {
        addItem(adding, num, false, listName)
        neededList.push({
            name: adding,
            each: num,
            finished: false,
        })
        localStorage.setItem(neededDate, JSON.stringify(neededList));
        num++;
    }
    return num;
}

function addingItemChosenDay(adding, list, date, num) {
    if (adding) {
        list.push({
            name: adding,
            each: num,
            finished: false,
        })
        localStorage.setItem(date, JSON.stringify(list));
        num++;
    }
    return num;
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
        const tempArray = removeItem(element, numericDate, itemList);
        localStorage.setItem(numericDate, JSON.stringify(tempArray));
    }
    if (check && check === 'INPUT') {
        const tempArray = completeItem(element, itemList);
        localStorage.setItem(numericDate, JSON.stringify(tempArray));
    }
});
//clearing when the reset button is clicked
reset.addEventListener('click', function (e) {
    clear(numericDate, itemList);
    location.reload();
});

//adding item to the list when the enter key is hit
document.addEventListener("keyup", function (even) {
    if (event.keyCode === 13) {
        if (dailyContainer.classList.contains('hidden')) {
            const toDo = input.value;

            id = newItem(toDo, 'list', itemList, numericDate, id);
            input.value = '';
        }
    }
});

// change color on nav when hovered
const handleHover = function (e) {
    if (e.target.classList.contains('nav__link')) {
        const link = e.target;
        const sibling = link.closest('nav').querySelectorAll('.nav__link');

        sibling.forEach(el => {
            if (el !== link) el.style.opacity = this;
        })
    }
};

nav.addEventListener('mouseover', handleHover.bind(0.5));
nav.addEventListener('mouseout', handleHover.bind(1));

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
    let add = 14 - currently;
    let subtract = 0 + currently;
    findDaysinMonth(parseInt(separatedTodayNum[0]));
    for (let l = 1; l < add; l++) {
        let dayDate = parseInt(separatedTodayNum[1]) + l;
        let monthDate = separatedTodayNum[0];
        let yearDate = separatedTodayNum[2];
        if (dayDate > daysInMonth) {
            dayDate = dayDate - daysInMonth;
            if (monthDate == '12') {
                findDaysinMonth(1);
                monthDate = 1;
                yearDate++;
            }
            else {
                findDaysinMonth(parseInt(separatedTodayNum[0]) + 1);
                monthDate++;
            }
        }
        if (dayDate < 10) {
            dayDate = '0' + dayDate;
        }
        const todayDate = `${monthDate}/${dayDate}/${yearDate}`;
        let chosenDayList = [];
        let num;
        let info = localStorage.getItem(todayDate);

        const dayBoxId = 'day' + (currently + l + 1);
        const neededDay = document.getElementById(dayBoxId);
        if (info) {
            chosenDayList = JSON.parse(info);
            if (typeof chosenDayList === "string") {
                chosenDayList = [];
            }
            num = chosenDayList.length;
        }
        else {
            chosenDayList = [];
            num = 0;
        }
        if (chosenDayList.length === 0) {
            neededDay.insertAdjacentHTML('afterbegin', '<h3 id="display">Nothing to do</h3>');
        }
        else {
            neededDay.insertAdjacentHTML('afterbegin', `<h5 id="display">${chosenDayList.length} thing(s) to do</h2>`);
        }

    }
    for (let l = 0; l <= subtract; l++) {
        let dayDate = parseInt(separatedTodayNum[1]) - l;
        let monthDate = separatedTodayNum[0];
        let yearDate = separatedTodayNum[2];
        if (dayDate < 1) {
            if (separatedTodayNum[0] == '1') {
                yearDate--;
                findDaysinMonth(12);
                monthDate = 12;
            }
            else {
                findDaysinMonth(monthDate - 1);
                monthDate--;
            }
            dayDate = daysInMonth + dayDate;
        }
        if (dayDate < 10) {
            dayDate = '0' + dayDate;
        }
        const todayDate = `${monthDate}/${dayDate}/${yearDate}`;
        let chosenDayList = [];
        let num;

        const dayBoxId = 'day' + (currently - l + 1)
        const neededDay = document.getElementById(dayBoxId);
        let info = localStorage.getItem(todayDate);
        if (info) {
            chosenDayList = JSON.parse(info);
            if (typeof chosenDayList === "string") {
                chosenDayList = [];
            }
            num = chosenDayList.length;
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

eachDay.forEach(btn => btn.addEventListener('click', function (e) {
    openContainer();
    const btnNum = parseInt(e.target.className.split('view')[1]);
    containerContent(btnNum);
}));

dailyReset.addEventListener('click', function (e) {
    clear(currentDate, dailyList);
    const information = ['true', wordCurrentDate, currentDate];
    localStorage.setItem('dailyContainer', information);
    location.reload();
});
overlay.addEventListener('click', closeContainer);
btnCloseContainer.addEventListener('click', closeContainer);

function closeContainer() {
    overlay.classList.add('hidden');
    dailyContainer.classList.add('hidden');
    const information = ['false', wordCurrentDate, currentDate];
    localStorage.setItem('dailyContainer', information);
    location.reload();
}

function openContainer() {
    overlay.classList.remove('hidden');
    dailyContainer.classList.remove('hidden');
}

function containerContent(btnNum) {
    const change = btnNum - (currently + 1);
    let dayDate = parseInt(separatedTodayNum[1]) + change;
    let monthDate = separatedTodayNum[0];
    let yearDate = separatedTodayNum[2];
    if (dayDate > daysInMonth) {
        dayDate = dayDate - daysInMonth;
        if (monthDate == '12') {
            findDaysinMonth(1);
            monthDate = 1;
            yearDate++;
        }
        else {
            findDaysinMonth(parseInt(separatedTodayNum[0]) + 1);
            monthDate++;
        }
    }
    else if (dayDate < 1) {
        if (separatedTodayNum[0] == '1') {
            yearDate--;
            findDaysinMonth(12);
            monthDate = 12;
        }
        else {
            findDaysinMonth(monthDate - 1);
            monthDate--;
        }
        dayDate = daysInMonth + dayDate;
    }
    let findDay = currently + change;
    if (findDay > 6) {
        findDay = findDay - 7;
    }
    const dayClicked = day[findDay];
    const monthClicked = month[monthDate - 1];
    wordCurrentDate = `${dayClicked} ${monthClicked} ${dayDate}`;
    dailyDate.innerHTML = wordCurrentDate;
    if (dayDate < 10) {
        dayDate = '0' + dayDate;
    }
    currentDate = `${monthDate}/${dayDate}/${yearDate}`;

    let dailyData = localStorage.getItem(currentDate);
    if (dailyData) {
        dailyList = JSON.parse(dailyData);
        if (typeof dailyList === "string") {
            dailyList = [];
        }
        daily = dailyList.length;
        loadList(dailyList, 'extraList');
    }
    else {
        dailyList = [];
        daily = 0;
    }

}

document.addEventListener("keyup", function (even) {
    if (event.keyCode === 13) {
        if (!dailyContainer.classList.contains('hidden')) {
            const toDo = dailyInput.value;
            daily = newItem(toDo, 'extraList', dailyList, currentDate, daily);
            dailyInput.value = '';
        }
    }
});

extraList.addEventListener('click', function (e) {
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
        const tempArray = removeItem(element, currentDate, dailyList);
        localStorage.setItem(currentDate, JSON.stringify(tempArray));
    }
    if (check && check === 'INPUT') {
        const tempArray = completeItem(element, dailyList);
        localStorage.setItem(currentDate, JSON.stringify(tempArray));
    }
});

const check = localStorage.getItem('dailyContainer');
let test = [];
if (check) {
    test = check.split(',');
    if (test[0] == 'true') {
        openContainer();
        dailyDate.innerHTML = test[1] + test[2];
    }

}

