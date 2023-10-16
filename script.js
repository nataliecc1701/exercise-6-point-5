const gameContainer = document.getElementById("game");

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    // decision: I'm using a data type rather than a class here
    newDiv.dataset.color = (color);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

let lockOut = false;
function handleCardClick(event) {
  // you can use event.target to see which element was clicked
  const target = event.target;

  // sometimes we handle the event by doing nothing
  // one of those times is if we're in the lockout period
  if(lockOut) {return}
  // another of those times is if the target was already matched
  if (target.classList.contains('matched')) {return}

  // now that we moved colors to data we can use class to identify
  // flipped cards
  target.classList.toggle('flipped');
  if(target.classList.contains('flipped')) {
    target.style.backgroundColor = target.dataset.color;
  }
  // clicking a flipped card unflips it
  else {
    target.style.backgroundColor = 'white';
  }

  flippedCards = gameContainer.querySelectorAll('.flipped');
  console.log(flippedCards);
  if(flippedCards.length == 2) {
    if(flippedCards[0].dataset.color === flippedCards[1].dataset.color) {
      for(card of flippedCards) {
        // change the cards from flipped to matched
        card.classList.remove('flipped');
        card.classList.add('matched')
      }
    }
    else {
      // show both cards for one second, then flip them back
      // do not allow additional card flips in the mean time.
      lockOut = true;
      setTimeout(function(){
        for(card of flippedCards){
          card.style.backgroundColor = 'white';
          card.classList.remove('flipped');
          lockOut = false;
        }
      },1000)
    }
  }
  
}

// when the DOM loads
createDivsForColors(shuffledColors);
