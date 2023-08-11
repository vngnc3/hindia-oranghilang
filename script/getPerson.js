// ██ getPerson.js ██████████████████████████████
// generate pseudo-random elements from a given seed.
// gender, first name + last name, age based on range, image url.
// returns person{} object.

// ██ dependencies ████████████████████████████
// lib/names.js for list of names.
// available arrays: firstNamesM[], firstNamesF[], lastNamesM[], lastNamesF[]

const ageRange = [18, 35];

class Person {
  constructor() {
    this.gender = 0; // 0 for masculine, 1 for feminine
    this.firstName = "Baskara";
    this.lastName = "Putra";
    this.age = 27;
    this.imageUrl = "";
  }
}

function getPerson(seed) {
  let person = new Person();
  person.gender = seed % 2;
  person.age = getAge(seed);
  if (person.gender == 0) {
    person.firstName = firstNamesM[seed % firstNamesM.length];
    person.lastName = lastNamesM[seed % lastNamesM.length];
    // person.imageUrl is sourced from masculine photo repo
  } else {
    person.firstName = firstNamesF[seed % firstNamesF.length];
    person.lastName = lastNamesF[seed % lastNamesF.length];
    // person.imageUrl is sourced from masculine photo repo
  }
  return person;
}

function getAge(seed) {
    const zeroedAgeRange = ageRange[1] - ageRange[0];
    const prngAge = seed % zeroedAgeRange;
    const seededAge = ageRange[0] + Number(prngAge);
    return seededAge;
}