var labelName = document.querySelector('#name');
var labelSite = document.getElementById('site');
var submite = document.getElementById('addbtn');
var bodyTable = document.getElementById('bodytable');
var messageEmpty = document.getElementById('empty');
var deleteItem = document.getElementById('deletebtn');
var validationMessage = document.getElementById('validation-name');
var validationUrl = document.getElementById('validation-url');
var searchInput = document.getElementById('search');
var darkThem = document.getElementById('dark-theme');
var allElemnts = document.querySelectorAll('.light-mode');
var logo = document.querySelector('.img');

var listSite = [];

if (JSON.parse(localStorage.getItem('sites')) != null) {
  // reAssing array to Get From Local Storge
  listSite = JSON.parse(localStorage.getItem('sites'));
  // Get Data IS founded In LocalStorge
  display();
  // Heddin MessageEmpty
  messageEmpty.style.display = 'none';
}
if (listSite.length <= 0) {
  messageEmpty.style.display = 'block';
}

// Function Add Item
submite.addEventListener('click', function () {
  if (validationName() && validationLink()) {
    var valueName = labelName.value;
    var valueSite = labelSite.value;

    var Item = {
      name: valueName,
      site: valueSite,
    };
    listSite.push(Item);

    // Add To Local Storge
    localStorage.setItem('sites', JSON.stringify(listSite));
    // Call Display
    display();
    messageEmpty.style.display = 'none';
    console.log(deleteItem);
  }
  // Clear Input Value
  clearForm();
});

// Function display Item
function display() {
  var cartona = '';
  for (var i = 0; i < listSite.length; i++) {
    cartona += `
     <tr>
              <td>${i + 1}</td>
              <td>${listSite[i].name}</td>
              <td>

                <button onclick="goToSite()" id="visit" 
                class="btn visit light-mode">
                <span>Visit</span>
                <i class="fa-solid fa-eye"></i>
                </button>
              </td>
              <td>
                <button  id="deletebtn" onclick="deltedItem(${i})" class="delete btn light-mode">
                  <span>Delete</span>
                  <i class="fa-solid fa-trash"></i>
                </button>
              </td>
            </tr>
   
   `;
  }
  bodyTable.innerHTML = cartona;
}
// Clear Data
function clearForm() {
  labelName.value = '';
  labelSite.value = '';
}
// Deleted Item
function deltedItem(index) {
  listSite.splice(index, 1);
  localStorage.setItem('sites', JSON.stringify(listSite));
  display();
  if (listSite.length === 0) {
    messageEmpty.style.display = 'block';
  }
}
// Go To Site
function goToSite() {
  var url = '';
  if (labelSite.value.includes('http')) {
    url = `${labelSite.value}`;
  } else url = `https://${labelSite.value}`;
  window.open(url, '_blank');
}

// Search For Char
function search() {
  var Char = searchInput.value;
  var cartona = '';
  // To check if the array was empty ? show massge
  var isEmpty = [];
  for (var i = 0; i < listSite.length; i++) {
    if (listSite[i].name.toLowerCase().includes(Char.toLowerCase())) {
      isEmpty.push(listSite[i]);
      cartona += `
       <tr>
                <td>${i + 1}</td>
                <td>${listSite[i].name}</td>
                <td>
                  <button onclick="goToSite()" id="visit" 
                  class="btn visit light-mode">
                  <span>Visit</span>
                  <i class="fa-solid fa-eye"></i>
                  </button>
                </td>
                <td>
                  <button  id="deletebtn" onclick="deltedItem(${i})" class="delete btn light-mode">
                    <span>Delete</span>
                    <i class="fa-solid fa-trash"></i>
                  </button>
                </td>
              </tr>
     
     `;
    }
  }
  if (isEmpty.length <= 0) {
    messageEmpty.style.display = 'block';
  } else {
    messageEmpty.style.display = 'none';
  }
  // Add Item To Show
  bodyTable.innerHTML = cartona;
}
// Validation Name
function validationName() {
  var regx = /^[A-Z][a-z]{3,9}$/;
  if (regx.test(labelName.value)) {
    labelName.classList.add('is-valid');
    labelName.classList.remove('is-invalid');
    validationMessage.classList.add('d-none');
    return true;
  } else {
    labelName.classList.remove('is-valid');
    labelName.classList.add('is-invalid');
    validationMessage.classList.remove('d-none');
    return false;
  }
}
// Validation URL
function validationLink() {
  var regx = /^(http)?s?(:\/\/)?(www.)?[a-z]{3,9}?\.(com|info|org|net)\/?\w*$/;

  if (regx.test(labelSite.value)) {
    labelSite.classList.add('is-valid');
    labelSite.classList.remove('is-invalid');
    validationUrl.classList.add('d-none');
    return true;
  } else {
    labelSite.classList.remove('is-valid');
    labelSite.classList.add('is-invalid');
    validationUrl.classList.remove('d-none');
    return false;
  }
}
// Start Dark Theme
darkThem.addEventListener('click', function (e) {
  if (e.target.classList.contains('fa-moon')) {
    e.target.classList.replace('fa-moon', 'fa-sun');
  } else e.target.classList.replace('fa-sun', 'fa-moon');
  for (var i = 0; i < allElemnts.length; i++) {
    if (allElemnts[i].classList.contains('light-mode')) {
      allElemnts[i].classList.replace('light-mode', 'dark-mode');
    } else allElemnts[i].classList.replace('dark-mode', 'light-mode');
  }
  for (i = 0; i < deletebtn.length; i++) {
    if (
      deletebtn[i].classList.contains('light-mode') &&
      visit[i].classList.contains('light-mode')
    ) {
      deletebtn[i].classList.replace('light-mode', 'dark-mode');
      visit[i].classList.replace('light-mode', 'dark-mode');
    } else {
      deletebtn[i].classList.replace('dark-mode', 'light-mode');
      visit[i].classList.replace('dark-mode', 'light-mode');
    }
  }
});
