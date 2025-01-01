let array = [];
let arrayLength = 0;
let tableSize = 10;
let startIndex = 1;
let endIndex = 0;
let currentIndex = 1;
let maxIndex = 0;


function preLoadCalculations() {
    array = rankList;
    arrayLength = array.length;
    maxIndex = arrayLength / tableSize;

    if ((arrayLength % tableSize) > 0) {
        maxIndex++;
    }
}

function displayIndexButtons() {
    preLoadCalculations();
    $(".index_buttons button").remove();
    $(".index_buttons").append('<button>Previous</button>');

    for (let i = 1; i <= maxIndex; i++) {
        $(".index_buttons").append('<button index="' + i + '">' + i + '</button>')
    }

    $(".index_buttons").append('<button>Next</button>');
    highLightIndexButton();
}

function highLightIndexButton() {
    startIndex = ((currentIndex - 1) * tableSize) + 1;
    endIndex = (startIndex + tableSize) - 1;

    if (endIndex > arrayLength) {
        endIndex = arrayLength;
    }

    $('.footer span').text('Showing ' + startIndex + ' to ' + endIndex + ' of ' + arrayLength + ' entries');
    $(".index_buttons button").removeClass('active');
    $(".index_buttons button[index='" + currentIndex + "']").addClass('active');

    displayTableRows();
}

function displayTableRows() {
    $('.table table tbody tr').remove();
}

displayIndexButtons();