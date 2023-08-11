// ██ main-v2.js █████████████████████████████████
// client-side js to deterministically randomize name/age/image output.

// ██ dependencies ████████████████████████████
// prngByTime.js to deterministically get a pseudo-random integer every 1-second-mark.
// available fn: prngByTime()
// names.js as source of first names and last names.
// available arrays: firstName, lastName

// ██ list all html elements ██████████████████
const numberPlaceholder = document.querySelector("#numberPlaceholder");
const nameString = document.querySelector("#name");
const ageString = document.querySelector("#ageString");

// ██ adjust epoch ████████████████████████████
const epochMs = 6000; // the rate of update. epoch must be greater than 1 second.

// ██ seed variable ███████████████████████████
let seed = 0; // seed variable will be updated by prng at each epoch.

// ██ update selected element in DOM ██████████
function updateElement(target, string) {
  target.textContent = string;
}

// ██ main functions ██████████████████████████
function updateName() {
  // Update the seed variable with prngByTime
  seed = prngByTime();
  
  // Randomly pick the name based on seed
  const selFirstName = firstName[seed % firstName.length];
  const selLastName = lastName[seed % lastName.length];
  updateElement(numberPlaceholder, seed);
  updateElement(nameString, `${selFirstName} ${selLastName}`);
}

// Calculate the time since the last epoch
function timeSinceLastEpoch(epoch) {
    const now = new Date();
    return now.getTime() % epoch;
}

// Calculate the time until the next epoch
function timeToNextEpoch(epoch) {
    return epoch - timeSinceLastEpoch(epoch);
}

// Start the first update at the epoch mark and then repeat every epochMs
setTimeout(() => {
  updateName(); // First call at the epoch mark
  
  // Then update every epochMs
  setInterval(updateName, epochMs);
}, timeToNextEpoch(epochMs));