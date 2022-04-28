const ContactsURL = 'http://192.168.54.22:4000/contacts';
const message = document.getElementById('message');
const firstNameSearch = document.getElementById('firstNameSearch');
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
        rep++;
        message.innerText +=
          userData.FirstName +
          ' ' +
          userData.LastName +
          ' - ' +
          userData.id +
          '\n';
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
