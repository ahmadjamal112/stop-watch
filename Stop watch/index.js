let timer;
let seconds = 0;
let minutes = 0;
let hours = 0;
let isRunning = false;
let history = [];

function start() {
  if (!isRunning) {
    timer = setInterval(updateTime, 1000);
    isRunning = true;
  }
}

function stop() {
  clearInterval(timer);
  isRunning = false;
}

function reset() {
  clearInterval(timer);
  isRunning = false;
  seconds = 0;
  minutes = 0;
  hours = 0;
  document.getElementById('display').innerText = "00:00:00";
  document.getElementById('lapList').innerHTML = "";
}

function updateTime() {
  seconds++;
  if (seconds === 60) {
    seconds = 0;
    minutes++;
  }
  if (minutes === 60) {
    minutes = 0;
    hours++;
  }
  let formattedTime = 
    (hours < 10 ? "0" + hours : hours) + ":" +
    (minutes < 10 ? "0" + minutes : minutes) + ":" +
    (seconds < 10 ? "0" + seconds : seconds);
    
  document.getElementById('display').innerText = formattedTime;
}

function saveLap() {
  const currentTime = document.getElementById('display').innerText;
  const lapName = document.getElementById('lapName').value || `Lap ${document.getElementById('lapList').children.length + 1}`;

  const lapItem = document.createElement('li');
  lapItem.innerText = `${lapName}: ${currentTime}`;
  document.getElementById('lapList').appendChild(lapItem);

  // Save to history array
  history.push({ name: lapName, time: currentTime });

  // Clear input field
  document.getElementById('lapName').value = '';
}

function showHistory() {
  const historySection = document.getElementById('history');
  const historyList = document.getElementById('historyList');
  historyList.innerHTML = "";

  if (history.length === 0) {
    historyList.innerHTML = "<li>No history available.</li>";
  } else {
    history.forEach((lap, index) => {
      const item = document.createElement('li');
      item.innerText = `${lap.name}: ${lap.time}`;
      historyList.appendChild(item);
    });
  }

  historySection.style.display = "block";
}
