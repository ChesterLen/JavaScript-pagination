let styles = document.documentElement.style;

let rankList = [];
let array = [];
let arrayLength = 0;
let tableSize = 10;
let startIndex = 1;
let endIndex = 0;
let currentIndex = 1;
let maxIndex = 0;
let sortCol = 'rank';
let ascOrder = true;

fetch('api_view/')
    .then(res => res.json())
    .then(body => {
        let bodyValues = body.books || [];

        bodyValues.forEach(item => {
            rankList.push(item);
        });

        displayIndexButtons();
    });

function preLoadCalculations() {
    filterRankList();
    sortRankList();
    arrayLength = array.length;
    maxIndex = Math.ceil(arrayLength / tableSize);
}

function filterRankList() {
    let tab_filter_text = document.getElementById('tab_filter_text').value;
    console.log(tab_filter_text);

    if (tab_filter_text !== '') {
        let temp_array = rankList.filter((object) => {
            return object.rank.toString().includes(tab_filter_text)
                || object.name.toUpperCase().includes(tab_filter_text.toUpperCase())
                || object.marks.toString().includes(tab_filter_text)
                || object.year.toString().includes(tab_filter_text)
                || object.percentage.toString().includes(tab_filter_text);
        });
        array = temp_array;
    } else {
        array = rankList;
    }
}

function sortRankList() {
    array.sort((a, b) => {
        if (ascOrder) {
            return (a[sortCol] > b[sortCol]) ? 1 : (a[sortCol] < b[sortCol]) ? -1 : 0;
        } else {
            return (a[sortCol] < b[sortCol]) ? 1 : (a[sortCol] > b[sortCol]) ? -1 : 0;
        }
    });

    // Remove sort indication class from all headers
    document.querySelectorAll('.table th').forEach(element => {
        element.classList.remove('sort_indication', 'asc', 'desc');
    });

    // Add sort indication class to the active column
    document.querySelectorAll(`.table th[colName='${sortCol}']`).forEach(element => {
        element.classList.add('sort_indication');
        element.classList.add(ascOrder ? 'asc' : 'desc');
    });

    if (ascOrder) {
        styles.setProperty('--up_arrow_color', '#ffffff');
        styles.setProperty('--up_arrow_shadow', '0px 0px 10px #fff');
        styles.setProperty('--down_arrow_color', '#ffffff49');
        styles.setProperty('--down_arrow_shadow', '0px 0px 0px rgba(250, 250, 250, 0)');
    } else {
        styles.setProperty('--up_arrow_color', '#ffffff49');
        styles.setProperty('--down_arrow_shadow', '0px 0px 0px rgba(250, 250, 250, 0)');
        styles.setProperty('--down_arrow_color', '#ffffff');
        styles.setProperty('--down_arrow_shadow', '0px 0px 10px #fff');
    }
}

function displayIndexButtons() {
    preLoadCalculations();

    document.querySelectorAll(".index_buttons button").forEach(button => button.remove());

    const previousButton = document.createElement("button");
    previousButton.textContent = "Previous";
    previousButton.addEventListener("click", previous);
    document.querySelector(".index_buttons").appendChild(previousButton);

    for (let i = 1; i <= maxIndex; i++) {
        const button = document.createElement("button");
        button.textContent = i;
        button.setAttribute("index", i);
        button.addEventListener("click", () => {
            currentIndex = i;
            highLightIndexButton();
        });
        document.querySelector(".index_buttons").appendChild(button);
    }

    const nextButton = document.createElement("button");
    nextButton.textContent = "Next";
    nextButton.addEventListener("click", next);
    document.querySelector(".index_buttons").appendChild(nextButton);

    highLightIndexButton();
}

function highLightIndexButton() {
    startIndex = ((currentIndex - 1) * tableSize) + 1;
    endIndex = startIndex + tableSize - 1;

    if (endIndex > arrayLength) {
        endIndex = arrayLength;
    }

    document.querySelector('.footer span').textContent = `Showing ${startIndex} to ${endIndex} of ${arrayLength} entries`;

    document.querySelectorAll(".index_buttons button").forEach(button => button.classList.remove('active'));
    const activeButton = document.querySelector(`.index_buttons button[index='${currentIndex}']`);
    if (activeButton) {
        activeButton.classList.add('active');
    }

    displayTableRows();
}

function displayTableRows() {
    document.querySelectorAll('.table table tbody tr').forEach(row => row.remove());

    let tabStart = startIndex - 1;
    let tabEnd = endIndex;

    for (let i = tabStart; i < tabEnd; i++) {
        const student = array[i];

        if (student && student.rank && student.name && student.year && student.marks && student.percentage) {
            const tr = document.createElement("tr");
            tr.innerHTML = `
                <td>${student.rank}</td>
                <td>${student.name}</td>
                <td>${student.year}</td>
                <td>${student.marks}</td>
                <td>${student.percentage}</td>
            `;
            document.querySelector('.table table tbody').appendChild(tr);
        } else {
            console.error("Invalid student data at index", i, student);
        }
    }
}

function next() {
    if (currentIndex < maxIndex) {
        currentIndex++;
        highLightIndexButton();
    }
}

function previous() {
    if (currentIndex > 1) {
        currentIndex--;
        highLightIndexButton();
    }
}

document.getElementById('table_size').addEventListener('change', function() {
    tableSize = parseInt(this.value);
    currentIndex = 1;
    startIndex = 1;
    displayIndexButtons();
});

document.getElementById('tab_filter_btn').addEventListener('click', () => {
    currentIndex = 1;
    startIndex = 1;
    filterRankList();
    displayIndexButtons();
});

document.querySelectorAll('.table th').forEach(th => {
    th.addEventListener('click', function() {
        let colName = th.getAttribute('colName');
        if (sortCol === colName) {
            ascOrder = !ascOrder;
        } else {
            sortCol = colName;
            ascOrder = true;
        }
        currentIndex = 1;
        startIndex = 1;
        displayIndexButtons();
    });
});
