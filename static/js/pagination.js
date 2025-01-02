let rankList = []; // To hold fetched data
let array = [];
let arrayLength = 0;
let tableSize = 10;
let startIndex = 1;
let endIndex = 0;
let currentIndex = 1;
let maxIndex = 0;

// Fetch data from the API and initialize everything
fetch('api_view/')
    .then(res => res.json())
    .then(body => {
        console.log('Fetched Data:', body); // Inspect the raw response

        // Populate rankList based on the response structure
        if (body.books && Array.isArray(body.books)) {
            rankList = body.books; // Directly assign the books array
        } else {
            console.error('Unexpected data format:', body);
        }

        console.log('Populated rankList:', rankList); // Verify rankList contents

        // Log individual items to inspect structure
        rankList.forEach((item, index) => {
            console.log(`Item ${index}:`, item);
        });

        // Initialize table and buttons only after data is ready
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
    array = rankList; // Use the populated rankList
    arrayLength = array.length;
    maxIndex = Math.ceil(arrayLength / tableSize); // Calculate the number of pages
}

function displayIndexButtons() {
    preLoadCalculations();

    // Remove existing buttons
    $(".index_buttons button").remove();

    // Add Previous button
    $(".index_buttons").append('<button>Previous</button>');

    // Add index buttons dynamically
    for (let i = 1; i <= maxIndex; i++) {
        $(".index_buttons").append('<button index="' + i + '">' + i + '</button>');
    }

    // Add Next button
    $(".index_buttons").append('<button>Next</button>');

    // Highlight the current index button
    highLightIndexButton();
}

function highLightIndexButton() {
    // Calculate the start and end index for the table
    startIndex = ((currentIndex - 1) * tableSize) + 1;
    endIndex = Math.min(startIndex + tableSize - 1, arrayLength);

    // Update footer information
    $('.footer span').text(`Showing ${startIndex} to ${endIndex} of ${arrayLength} entries`);

    // Highlight the current index button
    $(".index_buttons button").removeClass('active');
    $(".index_buttons button[index='" + currentIndex + "']").addClass('active');

    // Display table rows for the current page
    displayTableRows();
}

function displayTableRows() {
    // Clear the existing table rows
    $('.table table tbody tr').remove();

    let tabStart = startIndex - 1;
    let tabEnd = endIndex;

    for (let i = tabStart; i < tabEnd; i++) {
        let student = array[i];

        // Handle missing data gracefully
        if (!student) {
            console.warn(`Invalid student data at index ${i}:`, student);
            continue;
        }

        // Create a table row with the student's data
        let tr = `
            <tr>
                <td>${student.rank || 'N/A'}</td>
                <td>${student.name || 'N/A'}</td>
                <td>${student.year || 'N/A'}</td>
                <td>${student.marks || 'N/A'}</td>
                <td>${student.percentage || 'N/A'}</td>
            </tr>`;

        // Append the row to the table
        $('.table table tbody').append(tr);
    }
}

// Attach event listeners for navigation buttons
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
