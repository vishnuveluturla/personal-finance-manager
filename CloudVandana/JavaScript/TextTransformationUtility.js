// A. Reverse Words in a Sentence
function reverseWords(sentence) {
    // Split the sentence into words
    let words = sentence.split(' ');

    // Reverse each word
    let reversedWords = words.map(reverseWord);

    // Join the reversed words back into a sentence
    let reversedSentence = reversedWords.join(' ');

    return reversedSentence;
}

function reverseWord(word) {
    // Reverse a word using a loop
    let reversed = '';
    for (let i = word.length - 1; i >= 0; i--) {
        reversed += word[i];
    }
    return reversed;
}

// Example usage with user input
let inputSentence = prompt("Enter a sentence:");

// Check if input is null or empty
if (inputSentence !== null && inputSentence.trim() !== '') {
    let reversedSentence = reverseWords(inputSentence);
    console.log("Reversed Sentence:", reversedSentence);
} else {
    console.log("Invalid input. Please enter a valid sentence.");
}

// B. Sorting an Array in Descending Order
function sortArrayDescending(arr) {
    // Perform a simple bubble sort in descending order
    for (let i = 0; i < arr.length - 1; i++) {
        for (let j = 0; j < arr.length - 1 - i; j++) {
            if (arr[j] < arr[j + 1]) {
                // Swap elements if they are in the wrong order
                let temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
    }
}

// Example usage with user input
let inputArray = prompt("Enter numbers separated by commas:");

// Check if input is null or empty
if (inputArray !== null && inputArray.trim() !== '') {
    let numberArray = inputArray.split(',').map(Number);
    console.log("Original Array:", numberArray);

    // Sort the array in descending order
    sortArrayDescending(numberArray);
    console.log("Sorted Array (Descending):", numberArray);
} else {
    console.log("Invalid input. Please enter a valid list of numbers.");
}
