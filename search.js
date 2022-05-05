const ContactsURL = 'http://192.168.54.22:4000/contacts';
const message = document.getElementById('message');
const firstNameSearch = document.getElementById('firstNameSearch');
const firstNameInput = document.getElementById('inputFirstName');
const lastNameInput = document.getElementById('inputLastName');
const addressInput = document.getElementById('inputAddress');
const cityInput = document.getElementById('inputCity');
const zipInput = document.getElementById('inputZip');
let list = document.getElementById('myList');
let rep = 0;
let count = 0;

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
    if (
      userData.FirstName.toLowerCase().slice(0, firstNameSearch.value.length) ==
        firstNameSearch.value.toLowerCase() ||
      userData.LastName.toLowerCase().slice(0, firstNameSearch.value.length) ==
        firstNameSearch.value.toLowerCase() ||
      userData.SpouseName.toLowerCase().slice(
        0,
        firstNameSearch.value.length
      ) == firstNameSearch.value.toLowerCase() ||
      FullName.toLowerCase().slice(0, firstNameSearch.value.length) ==
        firstNameSearch.value.toLowerCase()
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
            addressInput.value = userData.Address;
            cityInput.value = userData.City;
            zipInput.value = userData.Zip;
          });
        rep++;
      }
    }
  });

  firstNameSearch.value.length == 0
    ? (message.innerText = '')
    : (message.innerText += 'Found ' + count + ' results');
};

////////// Event Listener For First Name Search
firstNameSearch.addEventListener('keyup', function (e) {
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
