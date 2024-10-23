const robot1 = document.getElementById('robot1');
const robot2 = document.getElementById('robot2');

// Initial positions
robot1.style.left = '100px';
robot1.style.top = '100px';

robot2.style.left = '200px';
robot2.style.top = '200px';

// Function to check for conjunction and update colors
function checkConjunction() {
  const rect1 = robot1.getBoundingClientRect();
  const rect2 = robot2.getBoundingClientRect();

  if (
    rect1.right >= rect2.left &&
    rect1.left <= rect2.right &&
    rect1.bottom >= rect2.top &&
    rect1.top <= rect2.bottom
  ) {
    robot1.style.backgroundColor = 'blue';
    robot2.style.backgroundColor = 'green';
  } else {
    robot1.style.backgroundColor = 'red';
    robot2.style.backgroundColor = 'yellow';
  }
}

// Add event listeners for dragging the robots
robot1.addEventListener('mousedown', handleDragStart);
robot2.addEventListener('mousedown', handleDragStart);

let isDragging = false;
let initialX, initialY;

function handleDragStart(event) {
  isDragging = true;
  initialX = event.clientX;
  initialY = event.clientY;
}

document.addEventListener('mousemove', handleDragMove);
document.addEventListener('mouseup', handleDragEnd);

function handleDragMove(event) {
  if (isDragging) {
    const dx = event.clientX - initialX;
    const dy = event.clientY - initialY;

    if (event.target === robot1) {
      robot1.style.left = `${robot1.offsetLeft + dx}px`;
      robot1.style.top = `${robot1.offsetTop + dy}px`;
    } else if (event.target === robot2) {
      robot2.style.left = `${robot2.offsetLeft + dx}px`;
      robot2.style.top = `${robot2.offsetTop + dy}px`;
    }

    initialX = event.clientX;
    initialY = event.clientY;

    checkConjunction(); // Check conjunction after each move
  }
}

function handleDragEnd() {
  isDragging = false;
}

// Check conjunction initially and every 100 milliseconds
checkConjunction();
setInterval(checkConjunction, 100);
