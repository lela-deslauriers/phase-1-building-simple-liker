// Defining text characters for the empty and full hearts for you to use later.
const EMPTY_HEART = '♡'
const FULL_HEART = '♥'

// Getting all the heart buttons
// turn into an array with spread operator because iterator methods don't work on HTML collections (unless we use a For Loop) and iterate through it and add event listener to each item in array

let heartButtons = [...document.getElementsByClassName("like-glyph")]
let errorModal = document.getElementById("modal")
let errorParagraph = document.getElementById("modal-message")

// When the "server" returns a failure status:
// Respond to the error using a .catch(() => {}) block after your .then(() => {}) block.
// Only manipulate the DOM once the server request responds. Do not make the heart full until you're inside a successful .then block.
let respondToServer = (event) => {
  mimicServerCall()
  .then(() => handleResponse(event))
  .catch(error => errorHandler(error))
}

// Display the error modal by removing the .hidden class
// Display the server error message in the modal
// Use setTimeout to hide the modal after 3 seconds (add the .hidden class)
let errorHandler = (errorMessage) => {
  errorModal.classList.remove("hidden")
  let p = document.createElement("p")
  errorParagraph.innerText = errorMessage
  setTimeout(() => {
    errorModal.classList.add("hidden")
    errorParagraph.innerText.remove()
  } , 3000)
}

// When the "server" returns a success status:
// Change the heart to a full heart
// Add the .activated-heart class to make the heart appear red
let handleResponse = (event) => {
  if (event.target.textContent === EMPTY_HEART) {
    event.target.classList.add("activated-heart")
    event.target.textContent = FULL_HEART
  } else {
    event.target.classList.remove("activated-heart")
    event.target.textContent = EMPTY_HEART
  }
}


//   When a user clicks on an empty heart:
// Invoke mimicServerCall to simulate making a server request
// Make sure this works for all heart buttons
heartButtons.map(heartButton => {
  heartButton.addEventListener('click', respondToServer)
}) 




// When a user clicks on a full heart:
// Change the heart back to an empty heart
// Remove the .activated-heart class
// Keep all your styling rules entirely in style.css. Do not manipulate any .style properties.


  // heartButton.addEventListener('click', heartEventHandler); //do I need to add a loop?

  // function heartEventHandler(event) {
  //   mimicServerCall()
  //   .then(function(response) {
  //     event.target.classList.add = response[".activated-heart"];
  //   }
  //   .catch(function(error) => {
  //     //remove hidden CSS class

  //   })
  // }


//------------------------------------------------------------------------------
// Don't change the code below: this function mocks the server response
//------------------------------------------------------------------------------

function mimicServerCall(url="http://mimicServer.example.com", config={}) {
  console.log("clicked")
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      let isRandomFailure = Math.random() < .2
      if (isRandomFailure) {
        reject("Random server error. Try again.");
      } else {
        resolve("Pretend remote server notified of action!");
      }
    }, 300);
  });
}
