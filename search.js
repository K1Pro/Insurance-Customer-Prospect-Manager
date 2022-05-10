const ContactsURL = 'http://192.168.54.22:4000/contacts';
const BartkaTestButton = document.getElementById('BartkaTestButton');
const message = document.getElementById('message');
const contactSearch = document.getElementById('contactSearch');
const Hours = document.getElementById('Hours');
let list = document.getElementById('myList');
let rep = 0;
let count = 0;
BK_UpperCase = (anyInput) => (anyInput = anyInput.toUpperCase());
BK_LowerCase = (anyInput) => (anyInput = anyInput.toLowerCase());
// let controller = null;
controller = new AbortController();
let datesAgain = '5/25/2022';

getJSON(ContactsURL).then((data) => {
  showSearchList(data);
  // console.log(data);
  // console.log(`Checking if JSON is an Array: ${Array.isArray(data)}`);
  // console.log(
  //   `Checking if First in JSON is an Array: ${Array.isArray(data[0])}`
  // );

  // for (const contactsAgain of data) {
  //   // console.log(
  //   //   `Perhaps this will work: ${JSON.stringify(contactsAgain.CalendarEvents)}`
  //   // );
  //   for (let key in contactsAgain.CalendarEvents) {
  //     console.log(contactsAgain.CalendarEvents[key]);
  //   }
  //   // if (datesAgain.includes(contactsAgain)) {
  //   //   console.log(`Perhaps this will work: ${contactsAgain.Date}`);
  //   // }
  // }
});

// let DB = {
//   products: [
//     { id: 0, name: 'aaa', price: 10 },
//     { id: 1, name: 'bbb', price: 20 },
//     { id: 2, name: 'ccc', price: 50 },
//     { id: 3, name: 'ddd', price: 1 },
//   ],
// };
// let cartItemsIds = [0, 3];
// console.log(`Checking typeof of sample DB: ${typeof DB}`);
// console.log(`Checking what sample DB is: ${DB}`);
// console.log(DB);
// // console.log(`products?id=${cartItemsIds.join('&id=')}`);

// for (const product of DB.products) {
//   if (cartItemsIds.includes(product.id)) {
//     console.log(`What is in product: ${product.id}`);
//   }
// }

let nav = 0;
let clicked = null;
const calendar = document.getElementById('calendar');
const weekdays = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

// Programmatically assigning Contact Fields to variable name and adding EventListener
const ContactFields = document
  .getElementById('ContactFields')
  .querySelectorAll('*');
// Example: FirstName = document.getElementById('FirstName').addEventListener('change, function(e){...});
for (let rep = 0; rep < ContactFields.length; rep++) {
  let ContactFieldsIDs = ContactFields[rep].id;
  if (ContactFieldsIDs) {
    // console.log(ContactFieldsIDs);
    window['ContactFieldsIDs'] = document
      .getElementById(`${ContactFieldsIDs}`)
      .addEventListener('change', function (e) {
        let ContactFieldID = this.id;
        let ContactFieldValue = this.value;
        updateContactInfo(id.value, ContactFieldID, ContactFieldValue);
      });
  }
}

//////////  Connecting to Database and Retrieving Data
// const getJSON = function (url, errorMsg = 'Something went wrong') {
//   return fetch(url, { signal: controller.signal }).then((response) => {
//     if (!response.ok) throw new Error(`${errorMsg} (${response.status})`);
//     return response.json();
//   });
// };

// Async / Await;
async function getJSON(url, errorMsg = 'Something went wrong') {
  try {
    const response = await fetch(url, { signal: controller.signal });
    const contactData = await response.json();
    return contactData;
  } catch (error) {
    console.log(errorMsg);
  }
}

//////////  Adding Database and Retrieving Data
function updateContactInfo(contactID, updateThisKey, updateThisValue) {
  console.log(`${ContactsURL}/${contactID}`);

  fetch(`${ContactsURL}/${contactID}`, {
    method: 'PATCH',
    body: JSON.stringify({
      // This creates a key-value pair to be patached, ex: "FirstName": Bart
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
        // programmatically userData inserted into Contact Fields, ex: document.getElementByID(FirstName).value = userData.FirstName
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
      // controller.abort();
    });
  }
});

// function BartkaTestFunction() {
//   // alert('hi');
//   controller.abort();
// }
// BartkaTestButton.addEventListener('click', BartkaTestFunction);

function openModal() {
  console.log('Lets do some magic here');
  console.log(`${dayString}`);
}

function events() {
  for (let repEvents = 7; repEvents <= 17; repEvents++) {
    let li = document.createElement('li');
    li.textContent = `${repEvents}:00`;
    if (repEvents % 2) {
      li.classList.add(`EventAlternate`);
    }
    li.classList.add(`EventEvery`);

    Hours.appendChild(li);
  }
}
events();

function load() {
  getJSON(ContactsURL).then((data) => {
    const dt = new Date();
    if (nav !== 0) {
      dt.setMonth(new Date().getMonth() + nav);
    }
    let nextMonth = 1;
    const day = dt.getDate();
    const month = dt.getMonth();
    const year = dt.getFullYear();
    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfPreviousMonth = new Date(year, month, 0).getDate();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const dateString = firstDayOfMonth.toLocaleDateString('en-us', {
      weekday: 'long',
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
    });
    const paddingDays = weekdays.indexOf(dateString.split(', ')[0]);

    document.getElementById(
      'monthDisplay'
    ).innerText = `${dt.toLocaleDateString('en-us', {
      month: 'long',
    })} ${day}, ${year}`;

    calendar.innerHTML = '';

    for (let i = 1; i <= 42; i++) {
      // original: for (let i = 1; i <= paddingDays + daysInMonth; i++) {
      const daySquare = document.createElement('div');
      daySquare.classList.add('day');
      const dayString = `${month + 1}/${i - paddingDays}/${year}`;

      if (i <= paddingDays) {
        daySquare.classList.add('notActiveDay');
        daySquare.innerText = lastDayOfPreviousMonth + i - paddingDays;
      }

      if (i > paddingDays) {
        daySquare.classList.add('ActiveDay');
        daySquare.innerText = i - paddingDays;
        const eventForDay = data.filter((e) => e.CalendarEvents);

        // .filter((c) => c.CalendarEvents.Date === dayString);
        // console.log(`${i}: `);
        // console.log(eventForDay);
        for (const againtwo of eventForDay) {
          for (let keyagain in againtwo.CalendarEvents) {
            if (againtwo.CalendarEvents[keyagain].Date === dayString) {
              console.log(againtwo.FirstName);
              console.log(againtwo.CalendarEvents[keyagain].Date);
              console.log(againtwo.CalendarEvents[keyagain].Description);
              bartkaEvent = againtwo.CalendarEvents[keyagain].Description;

              if (eventForDay) {
                const eventDiv = document.createElement('div');
                eventDiv.classList.add('event');
                eventDiv.innerText = againtwo.LastName;
                //original:  eventDiv.innerText = eventForDay.Title;
                daySquare.appendChild(eventDiv);
              }
            }
          }
        }

        // console.log(eventForDay[0]?.CalendarEvent1.Date);
        // console.log(eventForDay[1]?.CalendarEvent2.Date);

        // console.log(eventForDay.length);
        // console.log(eventForDay[2].CalendarEvents.Date);

        // let eventForDay = data
        //   ?.filter(
        //     (g) => g.CalendarEvents.filter((c) => c.Date === dayString)[0]
        //   )[0]
        //   .CalendarEvents.filter((c) => c.Date === dayString)[0];

        //original:  const eventForDay = data?.find((e) => e.Date === dayString);

        if (i - paddingDays === day && nav === 0) {
          daySquare.id = 'currentDay';
        }

        daySquare.addEventListener('click', () => {
          // openModal(dayString, myLocalJSONDatabase)
          // openModal()
          console.log('Lets do some magic here');
          console.log(`${dayString}`);

          document.getElementById('monthDisplay').innerText = `${dayString}`;
        });
        // } else {
        //   daySquare.classList.add('padding');
      }

      if (i > paddingDays + daysInMonth) {
        daySquare.innerText = nextMonth;
        daySquare.classList.add('notActiveDay');
        nextMonth++;
      }
      calendar.appendChild(daySquare);
    }
  });
}
function initButtons() {
  document.getElementById('nextButton').addEventListener('click', () => {
    nav++;
    // fetchRequest();
    load();
  });

  document.getElementById('backButton').addEventListener('click', () => {
    nav--;
    // fetchRequest();
    load();
  });
}

initButtons();
load();
