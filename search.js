const ContactsURL = 'http://192.168.54.22:4000/contacts';
const BartkaTestButton = document.getElementById('BartkaTestButton');
const message = document.getElementById('message');
const contactSearch = document.getElementById('contactSearch');
const TaskList = document.getElementById('TaskList');
let list = document.getElementById('myList');
let rep = 0;
let count = 0;
controller = new AbortController();
let nav = 0;
let clicked = null;
const calendar = document.getElementById('calendar');
// prettier-ignore
const weekdays = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday',];
// Programmatically assigning Contact Fields to variable name and adding EventListener
// prettier-ignore
const ContactFields = document.getElementById('ContactFields').querySelectorAll('*');

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

// Connecting to Database and Retrieving Data with Async / Await;
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
  message.innerText = '';
  list.innerText = '';
  rep = 0;
  count = 0;

  JsonDB.filter((userData) => {
    let FullName = userData.FirstName + ' ' + userData.LastName;
    let SpouseFullName = userData.SpouseName + ' ' + userData.SpouseLastName;
    if (
      // prettier-ignore
      userData.FirstName?.toLowerCase().slice(0, contactSearch.value.length) == contactSearch.value.toLowerCase() ||
      // prettier-ignore
      userData.LastName?.toLowerCase().slice(0, contactSearch.value.length) == contactSearch.value.toLowerCase() ||
      // prettier-ignore
      FullName?.toLowerCase().slice(0, contactSearch.value.length) == contactSearch.value.toLowerCase() ||
      // prettier-ignore
      userData.SpouseName?.toLowerCase().slice(0, contactSearch.value.length) == contactSearch.value.toLowerCase() ||
      // prettier-ignore
      userData.SpouseLastName?.toLowerCase().slice(0, contactSearch.value.length) == contactSearch.value.toLowerCase() ||
      // prettier-ignore
      SpouseFullName?.toLowerCase().slice(0, contactSearch.value.length) ==contactSearch.value.toLowerCase()
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
                document.getElementById(`${ContactFieldsIDs}`).value = userData[
                  ContactFieldsIDs
                ]
                  ? `${userData[ContactFieldsIDs]}`
                  : '';
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

function dailyEvents() {
  for (let timeSlots = 7; timeSlots <= 19; timeSlots++) {
    let li = document.createElement('li');
    li.textContent = `${timeSlots}:00`;
    if (timeSlots % 2) {
      li.classList.add(`EventAlternate`);
    }
    li.classList.add(`EventEvery`);
    TaskList.appendChild(li);
  }
}

function loadCalendar() {
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

  document.getElementById('monthDisplay').innerText = `${dt.toLocaleDateString(
    'en-us',
    { month: 'long' }
  )} ${day}, ${year}`;
  calendar.innerHTML = '';

  getJSON(ContactsURL).then((data) => {
    for (let rep = 1; rep <= 42; rep++) {
      // original: for (let i = 1; i <= paddingDays + daysInMonth; i++) {
      const daySquare = document.createElement('div');
      daySquare.classList.add('day');
      const dayString = `${month + 1}/${rep - paddingDays}/${year}`;

      if (rep <= paddingDays) {
        daySquare.classList.add('notActiveDay');
        daySquare.innerText = lastDayOfPreviousMonth + rep - paddingDays;
      }

      if (rep > paddingDays) {
        daySquare.classList.add('ActiveDay');
        daySquare.innerText = rep - paddingDays;
        const eventsForDay = data.filter((e) => e.CalendarEvents);

        for (const eventForDay of eventsForDay) {
          for (let eventDetails in eventForDay.CalendarEvents) {
            if (eventForDay.CalendarEvents[eventDetails].Date === dayString) {
              //original:  const eventsForDay = data?.find((e) => e.Date === dayString);
              console.log(eventForDay.FirstName);
              console.log(eventForDay.CalendarEvents[eventDetails].Date);
              console.log(eventForDay.CalendarEvents[eventDetails].Description);
              bartkaEvent =
                eventForDay.CalendarEvents[eventDetails].Description;

              if (eventsForDay) {
                const eventDiv = document.createElement('div');
                eventDiv.classList.add('event');
                eventDiv.innerText = eventForDay.LastName;
                //original:  eventDiv.innerText = eventsForDay.Title;
                daySquare.appendChild(eventDiv);
              }
            }
          }
        }

        if (rep - paddingDays === day && nav === 0) {
          daySquare.id = 'currentDay';
        }

        daySquare.addEventListener('click', () => {
          console.log('Lets do some magic here');
          console.log(`${dayString}`);

          document.getElementById('monthDisplay').innerText = `${dayString}`;
        });
        // } else {
        //   daySquare.classList.add('padding');
      }

      if (rep > paddingDays + daysInMonth) {
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
    loadCalendar();
  });

  document.getElementById('backButton').addEventListener('click', () => {
    nav--;
    loadCalendar();
  });
}
loadCalendar();
initButtons();
dailyEvents();
