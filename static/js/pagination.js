let arrayLength = 60;
let tableSize = 10;
let startIndex = 1;
let endIndex = 10;
let currentIndex = 1;
let maxIndex = 6;


function displayIndexButtons() {
    $(".index_buttons button").remove();
    $(".index_buttons").append('<button>Previous</button>');

    for(let i=1; i <=maxIndex; i++) {
        $(".index_buttons").append('<button index="'+i+'">'+i+'</button>')
    }

    $(".index_buttons").append('<button>Next</button>');
    highLightIndexButton();
}

displayIndexButtons();

function highLightIndexButton() {
    startIndex = ((currentIndex - 1) * tableSize) + 1;
    endIndex = (startIndex + tableSize) - 1;

    if(endIndex > arrayLength) {
        endIndex = arrayLength;
    }

    $('.footer span').text('Showing '+startIndex+' to '+endIndex+' of '+arrayLength+' entries');
    $(".index_buttons button").removeClass('active');
    $(".index_buttons button[index='"+currentIndex+"']").addClass('active');
}