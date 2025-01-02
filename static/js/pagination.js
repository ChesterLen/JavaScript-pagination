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
        console.log('Fetched Data:', body);

        if (body.books && Array.isArray(body.books)) {
            rankList = body.books;
        } else {
            console.error('Unexpected data format:', body);
        }

        console.log('Populated rankList:', rankList);

        rankList.forEach((item, index) => {
            console.log(`Item ${index}:`, item);
        });

        if (rankList.length > 0) {
            displayIndexButtons();
        } else {
            $('.table table tbody').append('<tr><td colspan="5">No data available</td></tr>');
        }
    })
    .catch(error => {
        console.error('Error fetching data:', error);
        $('.table table tbody').append('<tr><td colspan="5">Failed to load data</td></tr>');
    });

function preLoadCalculations() {
    array = rankList;
    arrayLength = array.length;
    maxIndex = Math.ceil(arrayLength / tableSize);
}

function displayIndexButtons() {
    preLoadCalculations();

    $(".index_buttons button").remove();

    $(".index_buttons").append('<button>Previous</button>');

    for (let i = 1; i <= maxIndex; i++) {
        $(".index_buttons").append('<button index="' + i + '">' + i + '</button>');
    }

    // Add Next button
    $(".index_buttons").append('<button>Next</button>');

    highLightIndexButton();
}

function highLightIndexButton() {
    startIndex = ((currentIndex - 1) * tableSize) + 1;
    endIndex = Math.min(startIndex + tableSize - 1, arrayLength);

    // Update footer information
    $('.footer span').text(`Showing ${startIndex} to ${endIndex} of ${arrayLength} entries`);

    // Highlight the current index button
    $(".index_buttons button").removeClass('active');
    $(".index_buttons button[index='" + currentIndex + "']").addClass('active');

    displayTableRows();
}

function displayTableRows() {
    $('.table table tbody tr').remove();

    let tabStart = startIndex - 1;
    let tabEnd = endIndex;

    for (let i = tabStart; i < tabEnd; i++) {
        let student = array[i];

        if (!student) {
            console.warn(`Invalid student data at index ${i}:`, student);
            continue;
        }

        let tr = `
            <tr>
                <td>${student.rank || 'N/A'}</td>
                <td>${student.name || 'N/A'}</td>
                <td>${student.year || 'N/A'}</td>
                <td>${student.marks || 'N/A'}</td>
                <td>${student.percentage || 'N/A'}</td>
            </tr>`;

        $('.table table tbody').append(tr);
    }
}

$(document).on('click', '.index_buttons button', function () {
    let indexAttr = $(this).attr('index');

    if ($(this).text() === 'Previous') {
        currentIndex = Math.max(1, currentIndex - 1);
    } else if ($(this).text() === 'Next') {
        currentIndex = Math.min(maxIndex, currentIndex + 1);
    } else if (indexAttr) {
        currentIndex = parseInt(indexAttr, 10);
    }

    highLightIndexButton();
});
