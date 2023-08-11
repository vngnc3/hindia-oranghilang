// ██ main-v3.js ██████████████████████████████
// client-side js to deterministically randomize name/age/image output.

// ██ dependencies ████████████████████████████
// prngByTime.js to deterministically get a pseudo-random integer every 1-second-mark.
// available fn: prngByTime()
// getPerson.js to receive randomly generated names, age, and photo.
// available fn: getPerson(seed)

// ██ list all html elements ██████████████████
const numberPlaceholder = document.querySelector("#numberPlaceholder");
const nameString = document.querySelector("#name");
const ageString = document.querySelector("#ageString");

// ██ seed variable ███████████████████████████
let bufferedSeeds = 0;

// ██ epoch-related functions █████████████████
// epoch is an arbitrary unit of time.
// epoch defines the rate of update.
// epoch must be greater than 1 second.
// epoch must be a factor of 60,
// so it'd loop by the minute-mark.
const epochMs = 4000;

// Calculate the time since the last epoch
function timeSinceLastEpoch() {
    const now = new Date();
    return now.getTime() % epochMs;
}

// Calculate the time until the next epoch
function timeToNextEpoch() {
    return epochMs - timeSinceLastEpoch(epochMs);
}

// ██ looping quantized handler function ██████
function executeAtQuantizedEpoch(callback) {
  // Calculate the time remaining until the next epoch
  const nextEpoch = timeToNextEpoch();

  // Wait until the next epoch, then execute the callback
  setTimeout(() => {
    callback();
    setInterval(callback, epochMs);
  }, nextEpoch);
}

// ██ non-looping quantized handler function ██
function executeOnceAtQuantizedEpoch(callback) {
  // Calculate the time remaining until the next epoch
  const nextEpoch = timeToNextEpoch();

  // Wait until the next epoch, then execute the callback
  setTimeout(callback, nextEpoch);
}

function executeNowAndAtNextQuantizedEpoch(callback) {
  // Execute the callback immediately
  callback();

  // Calculate the time remaining until the next epoch
  const nextEpoch = timeToNextEpoch();

  // Wait until the next epoch, then execute the callback again
  setTimeout(callback, nextEpoch);
}

// ██ main functions ██████████████████████████
function updateSeed() {
    bufferedSeeds = prngByTime();
}

function updateElement(target, string) {
    target.textContent = string;
}

// ██ executions ██████████████████████████████
// Continuously update the seed every second,
// starting from the next second-mark.

executeAtQuantizedEpoch(() => {
    updateSeed();
    const person = getPerson(bufferedSeeds);
    const personName = person.firstName + ' ' + person.lastName;
    const personAge = person.age;
    updateElement(numberPlaceholder, bufferedSeeds);
    updateElement(nameString, personName);
    updateElement(ageString, personAge);
})