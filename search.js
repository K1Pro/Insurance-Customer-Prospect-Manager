const Demo = document.getElementById('Demo');
DemoTwo = Demo.querySelectorAll('*');
for (let ii = 0; ii < DemoTwo.length; ii++) {
  let childId = DemoTwo[ii].id;
  if (childId) {
    console.log(childId);
    // eval('let ' + childId + '=' + 'document.getElementById(' + childId + ');');
    window['childId'] = document
      .getElementById(`${childId}`)
      .addEventListener('change', function (e) {
        let thisID = this.id;
        let thisValue = this.value;
        console.log('now we are here');
        updateContactInfo(id.value, thisID, thisValue);
      });
  }
}

const ContactsURL = 'http://192.168.54.22:4000/contacts';
const message = document.getElementById('message');
const contactSearch = document.getElementById('contactSearch');

// const id = document.getElementById('id');
// const FirstName = document.getElementById('FirstName');
// const LastName = document.getElementById('LastName');
// const SpouseName = document.getElementById('SpouseName');
// const SpouseLastName = document.getElementById('SpouseLastName');
// const BirthDate = document.getElementById('BirthDate');
// const SpouseBirthDate = document.getElementById('SpouseBirthDate');
// const Address = document.getElementById('Address');
// const Address2 = document.getElementById('Address2');
// const City = document.getElementById('City');
// const State = document.getElementById('State');
// const Zip = document.getElementById('Zip');
// const Phone = document.getElementById('Phone');
// const Email = document.getElementById('Email');

let list = document.getElementById('myList');
let rep = 0;
let count = 0;

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
        li.setAttribute('id', userData.id);
        li.innerText = userData.FirstName + ' ' + userData.LastName;
        list.appendChild(li);
        document
          .getElementById(`${userData.id}`)
          .addEventListener('click', function () {
            console.log(userData.id);
            id.value = userData.id;
            FirstName.value = userData.FirstName;
            LastName.value = userData.LastName;
            BirthDate.value = userData.BirthDate;
            SpouseName.value = userData.SpouseName;
            SpouseLastName.value = userData.SpouseLastName;
            SpouseBirthDate.value = userData.SpouseBirthDate;
            Address.value = userData.Address;
            Address2.value = userData.Address2;
            City.value = userData.City;
            State.value = BK_UpperCase(userData.State);
            Zip.value = userData.Zip;
            Phone.value = userData.Phone;
            Email.value = userData.Email;
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
// This is no longer needed, is being loaded dynamically
// FirstName.addEventListener('change', function (e) {
//   let thisID = this.id;
//   let thisValue = this.value;
//   updateContactInfo(id.value, thisID, thisValue);
// });
// SpouseName.addEventListener('change', function (e) {
//   let thisID = this.id;
//   let thisValue = this.value;
//   updateContactInfo(id.value, thisID, thisValue);
// });
