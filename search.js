const ContactsURL = 'http://192.168.54.22:4000/contacts';
const message = document.getElementById('message');
const contactSearch = document.getElementById('contactSearch');
let list = document.getElementById('myList');
let rep = 0;
let count = 0;

// Dynamically assigning Contact Fields to variable name and adding EventListener
const ContactFields = document
  .getElementById('ContactFields')
  .querySelectorAll('*');
for (let rep = 0; rep < ContactFields.length; rep++) {
  let ContactFieldsIDs = ContactFields[rep].id;
  if (ContactFieldsIDs) {
    console.log(ContactFieldsIDs);
    window['ContactFieldsIDs'] = document
      .getElementById(`${ContactFieldsIDs}`)
      .addEventListener('change', function (e) {
        let ContactFieldID = this.id;
        let ContactFieldValue = this.value;
        updateContactInfo(id.value, ContactFieldID, ContactFieldValue);
      });
  }
}

BK_UpperCase = (anyInput) => (anyInput = anyInput.toUpperCase());
BK_LowerCase = (anyInput) => (anyInput = anyInput.toLowerCase());

//////////  Connecting to Database and Retrieving Data
const getJSON = function (url, errorMsg = 'Something went wrong') {
  return fetch(url).then((response) => {
    if (!response.ok) throw new Error(`${errorMsg} (${response.status})`);
    return response.json();
  });
};

//////////  Adding Database and Retrieving Data
function updateContactInfo(contactID, updateThisKey, updateThisValue) {
  console.log(`${ContactsURL}/${contactID}`);

  fetch(`${ContactsURL}/${contactID}`, {
    method: 'PATCH',
    body: JSON.stringify({
      [updateThisKey]: updateThisValue,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.text())
    .then(() => {
      getJSON(ContactsURL).then((data) => {
        showSearchList(data);
      });
    });
}

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
      BK_LowerCase(userData.FirstName).slice(0, contactSearch.value.length) ==
        BK_LowerCase(contactSearch.value) ||
      BK_LowerCase(userData.LastName).slice(0, contactSearch.value.length) ==
        BK_LowerCase(contactSearch.value) ||
      BK_LowerCase(FullName).slice(0, contactSearch.value.length) ==
        BK_LowerCase(contactSearch.value) ||
      BK_LowerCase(userData.SpouseName).slice(0, contactSearch.value.length) ==
        BK_LowerCase(contactSearch.value) ||
      BK_LowerCase(userData.SpouseLastName).slice(
        0,
        contactSearch.value.length
      ) == BK_LowerCase(contactSearch.value) ||
      BK_LowerCase(SpouseFullName).slice(0, contactSearch.value.length) ==
        BK_LowerCase(contactSearch.value)
    ) {
      count++;
      if (rep < 10) {
        let li = document.createElement('li');
        li.setAttribute('id', `list${userData.id}`);
        li.innerText = userData.FirstName + ' ' + userData.LastName;
        list.appendChild(li);
        // this is an commented working version replaced by a dynamically loaded input values
        // document
        //   .getElementById(`${userData.id}`)
        //   .addEventListener('click', function () {
        //     console.log(`Contact ID from Search List: ${userData.id}`);
        //     id.value = userData.id;
        //     FirstName.value = userData.FirstName;
        //     LastName.value = userData.LastName;
        //     BirthDate.value = userData.BirthDate;
        //     SpouseName.value = userData.SpouseName;
        //     SpouseLastName.value = userData.SpouseLastName;
        //     SpouseBirthDate.value = userData.SpouseBirthDate;
        //     Address.value = userData.Address;
        //     Address2.value = userData.Address2;
        //     City.value = userData.City;
        //     State.value = BK_UpperCase(userData.State);
        //     Zip.value = userData.Zip;
        //     Phone.value = userData.Phone;
        //     Email.value = userData.Email;
        //   });

        window['list' + userData.id] = document
          .getElementById(`list${userData.id}`)
          .addEventListener('click', function () {
            console.log(`Contact ID from Search List: ${userData.id}`);
            for (
              let SecondRep = 0;
              SecondRep < ContactFields.length;
              SecondRep++
            ) {
              let ContactFieldsIDs = ContactFields[SecondRep].id;
              if (ContactFieldsIDs) {
                document.getElementById(
                  `${ContactFieldsIDs}`
                ).value = `${userData[ContactFieldsIDs]}`;
              }
            }
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
