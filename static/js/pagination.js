let rankList = [];

let array = [];
let arrayLength = 0;
let tableSize = 10;
let startIndex = 1;
let endIndex = 0;
let currentIndex = 1;
let maxIndex = 0;

fetch('api_view/')
    .then(res => res.json())
    .then(body => {
        let bodyValues = body.books || [];

        bodyValues.forEach(item => {
            rankList.push(item);
        });

        console.log("Fetched Data:", body);
        console.log("Populated rankList:", rankList);

        displayIndexButtons();
    });

function preLoadCalculations() {
    array = rankList;
    arrayLength = array.length;
    maxIndex = Math.ceil(arrayLength / tableSize);

    console.log('Array Length:', arrayLength);
    console.log('Max Index:', maxIndex);
}

function displayIndexButtons() {
    preLoadCalculations();

    document.querySelectorAll(".index_buttons button").forEach(button => button.remove());

    const previousButton = document.createElement("button");
    previousButton.textContent = "Previous";
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
