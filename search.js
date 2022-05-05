const ContactsURL = 'http://192.168.54.22:4000/contacts';
const message = document.getElementById('message');
const contactSearch = document.getElementById('contactSearch');
const firstNameInput = document.getElementById('inputFirstName');
const lastNameInput = document.getElementById('inputLastName');
const spouseFirstNameInput = document.getElementById('inputSpouseFirstName');
const spouseLastNameInput = document.getElementById('inputSpouseLastName');
const birthDateInput = document.getElementById('inputBirthDate');
const spouseBirthDateInput = document.getElementById('inputSpouseBirthDate');
const addressInput = document.getElementById('inputAddress');
const address2Input = document.getElementById('inputAddress2');
const cityInput = document.getElementById('inputCity');
const stateInput = document.getElementById('inputState');
const zipInput = document.getElementById('inputZip');
const phoneInput = document.getElementById('inputPhone');
const emailInput = document.getElementById('inputEmail');
let list = document.getElementById('myList');
let rep = 0;
let count = 0;

function BK_UpperCase(anyInput) {
  anyInput = anyInput.toUpperCase();
  return anyInput;
}

//////////  Connecting to Database and Retrieving Data
const getJSON = function (url, errorMsg = 'Something went wrong') {
  return fetch(url).then((response) => {
    if (!response.ok) throw new Error(`${errorMsg} (${response.status})`);
    return response.json();
  });
};

const showSearchList = function (JsonDB) {
  // prints the entire array: console.log(JsonDB);

  message.innerText = '';
  list.innerText = '';
  rep = 0;
  count = 0;

  JsonDB.filter((userData) => {
    let FullName = userData.FirstName + ' ' + userData.LastName;
    let SpouseFullName = userData.SpouseName + ' ' + userData.SpouseLastName;
    if (
      userData.FirstName.toLowerCase().slice(0, contactSearch.value.length) ==
        contactSearch.value.toLowerCase() ||
      userData.LastName.toLowerCase().slice(0, contactSearch.value.length) ==
        contactSearch.value.toLowerCase() ||
      FullName.toLowerCase().slice(0, contactSearch.value.length) ==
        contactSearch.value.toLowerCase() ||
      userData.SpouseName.toLowerCase().slice(0, contactSearch.value.length) ==
        contactSearch.value.toLowerCase() ||
      userData.SpouseLastName.toLowerCase().slice(
        0,
        contactSearch.value.length
      ) == contactSearch.value.toLowerCase() ||
      SpouseFullName.toLowerCase().slice(0, contactSearch.value.length) ==
        contactSearch.value.toLowerCase()
    ) {
      count++;
      if (rep < 10) {
        let li = document.createElement('li');
        li.setAttribute('id', userData.id);
        li.innerText = userData.FirstName + ' ' + userData.LastName;
        list.appendChild(li);
        document
          .getElementById(`${userData.id}`)
          .addEventListener('click', function () {
            console.log(userData.id);
            firstNameInput.value = userData.FirstName;
            lastNameInput.value = userData.LastName;
            birthDateInput.value = userData.BirthDate;
            spouseFirstNameInput.value = userData.SpouseName;
            spouseLastNameInput.value = userData.SpouseLastName;
            spouseBirthDateInput.value = userData.SpouseBirthDate;
            addressInput.value = userData.Address;
            address2Input.value = userData.Address2;
            cityInput.value = userData.City;
            stateInput.value = BK_UpperCase(userData.State);
            zipInput.value = userData.Zip;
            phoneInput.value = userData.Phone;
            emailInput.value = userData.Email;
          });
        rep++;
      }
    }
  });

  contactSearch.value.length == 0
    ? (message.innerText = '')
    : (message.innerText += 'Found ' + count + ' results');
};

////////// Event Listener For First Name Search
contactSearch.addEventListener('keyup', function (e) {
  if (
    // e.key !== 'Backspace' &&
    e.key !== 'Shift' &&
    e.key !== 'CapsLock' &&
    e.key !== 'Control' &&
    e.key !== 'Alt'
  ) {
    getJSON(ContactsURL).then((data) => {
      showSearchList(data);
    });
  }
});

// contactSearch.addEventListener('keyup', function (e) {
