// ██ getPerson.js ██████████████████████████████
// generate pseudo-random elements from a given seed.
// gender, first name + last name, age based on range, image url.
// returns person{} object.

// ██ dependencies ████████████████████████████
// lib/names.js for list of names.
// available arrays: firstNamesM[], firstNamesF[], lastNamesM[], lastNamesF[]

const ageRange = [18, 35];
const malePhotoCount = 98;
const femalePhotoCount = 79;
const baseImageUrl = "images/"; // relative to index.html

class Person {
  constructor() {
    this.gender = 0; // 0 for masculine, 1 for feminine
    this.firstName = "Baskara";
    this.lastName = "Putra";
    this.age = 27;
    this.imageUrl = "";
  }
}

let generatedNames = [];

function getPerson(seed) {
  let person = new Person();
  person.gender = seed % 2;
  person.age = getAge(seed);
  if (person.gender == 0) {
    person.firstName = firstNamesM[seed % firstNamesM.length];
    person.lastName = lastNamesM[seed % lastNamesM.length];
  } else {
    person.firstName = firstNamesF[seed % firstNamesF.length];
    person.lastName = lastNamesF[seed % lastNamesF.length];
  }
  person.imageUrl = getImageUrl(seed, person.gender);
  const newPersonName = person.firstName + " " + person.lastName;
  checkDupe(newPersonName);
  generatedNames.push(newPersonName);
  return person;
}

function getAge(seed) {
  const zeroedAgeRange = ageRange[1] - ageRange[0];
  const prngAge = seed % zeroedAgeRange;
  const seededAge = ageRange[0] + Number(prngAge);
  return seededAge;
}

function getImageUrl(seed, gender) {
  let g = "m";
  let length = 0;
  if (gender == 0) {
    g = "m";
    length = malePhotoCount;
  } else {
    g = "f";
    length = femalePhotoCount;
  }

  const prngImgIndex = (seed % length) + 1;
  const completeImageUrl = baseImageUrl + g + "/" + prngImgIndex + ".jpg";
  return completeImageUrl;
}

function getPermutations() {
  const agePerm = ageRange[1] - ageRange[0];
  const perm =
    firstNamesM.length * lastNamesM.length * malePhotoCount * agePerm +
    firstNamesF.length * lastNamesF.length * femalePhotoCount * agePerm;
  return perm;
}

function checkDupe(nameString) {
  const exist = generatedNames.includes(nameString);
  if (exist == true) {
    return console.error(
      `getPerson.js: Name ${nameString} has one duplicate or more.`
    );
  } else {
    return null;
  }
}

console.log(`Total unique missing person: ${getPermutations()}`);