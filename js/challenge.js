function initialize() {

  // Handle pausing the counter
  const pause = document.querySelector("#pause");
  pause.addEventListener("click", handlePause);

  // Handle leading a comment
  const form = document.querySelector("#comment-form");
  form.addEventListener("submit", e => {
    e.preventDefault();
    handleComment(e);
  });

  // Handle liking a number
  const heart = document.querySelector("#heart");
  heart.addEventListener("click", handleLike);

  // Handle plus
  const plus = document.querySelector("#plus");
  plus.addEventListener("click", () => {
    const counter = document.querySelector("#counter");
    counter.innerText = (parseInt(counter.innerText) + 1).toString()
  })
  // Handle minus
  const minus = document.querySelector("#minus");
  minus.addEventListener("click", () => {
    const counter = document.querySelector("#counter");
    counter.innerText = (parseInt(counter.innerText) - 1).toString()
  })
}

function handlePause() {
  const pause = document.getElementById("pause")

  if (pause.textContent === " pause ") {
    document.getElementById("minus").disabled = true;
    document.getElementById("plus").disabled = true;
    document.getElementById("heart").disabled = true;
    document.getElementById("pause").textContent = " resume ";
  } else {   
    document.getElementById("minus").disabled = false;
    document.getElementById("plus").disabled = false;
    document.getElementById("heart").disabled = false;
    document.getElementById("pause").textContent = " pause ";
  }
}

function handleComment(e) {
  // Finds the comment section
  const commentSection = document.querySelector("#list");
  
  // Creates a new list element and adds the comment
  const li = document.createElement("li")
  li.textContent = e.target["comment-input"].value;
  // Adds the list element to the DOM
  commentSection.appendChild(li);
  
  // Resets the form
  e.target.reset();
}

function handleLike() {
  // Find the like section
  const counter = document.querySelector("#counter").innerText;
  const likeSection = document.querySelector(".likes");
  
  // Create a new list element and grab the current number
  if (likeSection.childElementCount === 0) {
    const li = document.createElement("li");
    // If there are no li elements in the like section, start
    // it off with the proper sentence structure
    li.textContent = `${counter} has been liked 1 time`
    // li.textContent = `I've has been liked 1 time`
    likeSection.appendChild(li);
  } else {
    // Dissect the last node that was entered so we can see if
    // it matches the current ticker
    const likeArray = likeSection.lastChild.textContent.split(" ");
    // If the counter in the last like comment matches the current
    // counter
    if (likeArray[0] == counter) {
      // Add 1 to the counter
      likeArray[likeArray.length - 2] = (parseInt(likeArray[likeArray.length - 2]) + 1).toString();
      likeArray[likeArray.length - 1] = 'times';
      // Change the 'time' to 'times'
      likeSection.lastChild.textContent = likeArray.join(" ");
    } else {
      // Create a new tag if the latest li tag wasn't related 
      // to the current counter
      const li = document.createElement("li");
      li.textContent = `${counter} has been liked 1 time`
      // li.textContent = `I've has been liked 1 time`
      likeSection.appendChild(li);
    }
  }
}

// This should run at all times
let intervalID = setInterval(() => {
  const pause = document.querySelector("#pause")
  if (pause.innerText === "pause") {
    let counter = document.querySelector("#counter");
    counter.innerText = (parseInt(counter.innerText) + 1).toString();
  }}, 1000);

document.addEventListener("DOMContentLoaded", () => {
  initialize();
});