const ContactsURL = 'http://192.168.54.22:4000/contacts';
const message = document.getElementById('message');
const firstNameSearch = document.getElementById('firstNameSearch');

//////////  Connecting to Database and Retrieving Data
const getJSON = function (url, errorMsg = 'Something went wrong') {
  return fetch(url).then((response) => {
    if (!response.ok) throw new Error(`${errorMsg} (${response.status})`);
    return response.json();
  });
};

const showSearchList = function (JsonDB) {
  message.innerText = '';
  console.log(firstNameSearch.value.toLowerCase());
  for (let userData in JsonDB) {
    const searchingFirstName = JsonDB[
      userData
    ].FirstName.toLowerCase().includes(firstNameSearch.value.toLowerCase());

    const searchingLastName = JsonDB[userData].LastName.toLowerCase().includes(
      firstNameSearch.value.toLowerCase()
    );

    const searchingSpouseName = JsonDB[userData].SpouseName.includes(
      firstNameSearch.value
    );

    if (searchingFirstName || searchingLastName || searchingSpouseName) {
      message.innerText +=
        JsonDB[userData].FirstName +
        ' ' +
        JsonDB[userData].LastName +
        ' - ' +
        JsonDB[userData].id +
        '\n';
    }
  }
};

////////// Event Listener For First Name Search
firstNameSearch.addEventListener('keyup', function (e) {
  if (
    e.key !== 'Backspace' &&
    e.key !== 'Shift' &&
    e.key !== 'CapsLock' &&
    e.key !== 'Control' &&
    e.key !== 'Alt'
  ) {
    if (firstNameSearch.value.length > 3) {
      // console.log(e.key);
      getJSON(ContactsURL).then((data) => {
        showSearchList(data);
      });
    }
  }
});
