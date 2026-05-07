const cl = console.log;
const stdContainer = document.getElementById('stdContainer');
const stdForm = document.getElementById('stdForm');
const addStdBtn = document.getElementById('addStdBtn');
const updateStdBtn = document.getElementById('updateStdBtn');
const fnameControl = document.getElementById('fname');
const lnameControl = document.getElementById('lname');
const emailControl = document.getElementById('email');
const stdTable = document.getElementById('stdTable');
const noStdMsg = document.getElementById('noStdMsg');
const contactControl = document.getElementById('contact');

//DB
let stdArr = [
  {
    fname: 'Jhon',
    lname: 'Doe',
    email: 'jd@gmail.com',
    contact: '1234567890',
    stdId: '6edf782c-2bad-4fc8-b013-5468a45891fb'
  },
  {
    fname: 'May',
    lname: 'Doe',
    email: 'may@gmail.com',
    contact: '7895642310',
    stdId: '6789789789c-2bad-4fc8-b013-5468a45891fb'
  },
  {
    fname: 'June',
    lname: 'Doe',
    email: 'june@gmail.com',
    contact: '9876542310',
    stdId: 'ee688e59-7c9e-40dd-9b92-2b69db8f9db7'
  }
];

// newly added
function toggleView() {
  if (stdArr.length === 0) {
    stdTable.classList.add('d-none');
    noStdMsg.classList.remove('d-none');
  } else {
    stdTable.classList.remove('d-none');
    noStdMsg.classList.add('d-none');
  }
}

function createTrs(arr) {
  let result = '';  // undefind
  arr.forEach((std, i) => {
    result += `
      <tr id="${std.stdId}">
        <td>${i + 1}</td>
        <td>${std.fname} ${std.lname}</td>
        <td>${std.email}</td>
        <td>${std.contact}</td>

        <td>
          <i onclick="onStdEdit(this )"
            role="button"
            class="fa-solid fa-pen-to-square fa-2x text-success">
          </i>
        </td>

        <td>
          <i onclick="onStdRemove(this)"
            role="button"
            class="fa-solid fa-trash fa-2x text-danger">
          </i>
        </td>
      </tr>
    `;
  });

  stdContainer.innerHTML = result;
}

createTrs(stdArr);

toggleView(); // newly added

function onStdRemove(ele) {
    let REMOVED_ID = ele.closest('tr').id;
    let getConfirm = confirm(
      `Are you sure, you want to remove the Student with ID ${REMOVED_ID} ?`
    )
    if (getConfirm) {
    let getIndex = stdArr.findIndex(std => {
        return std.stdId === REMOVED_ID;
    });

    let REMOVED_STD = stdArr.splice(getIndex, 1);
    ele.closest('tr').remove();
    let allTrs = [...document.querySelectorAll('#stdContainer tr')]
    allTrs.forEach((tr,i) => {
      tr.firstElementChild.innerText = i + 1 
    })

    toggleView(); // newly added

    Swal.fire({
            icon: 'success',
            title: `The student ${REMOVED_STD[0].fname} ${REMOVED_STD[0].lname} Removed successfully !!!`,
            timer: 3000
        });

    }
}
 
let EDIT_ID
function onStdEdit (ele) {
  EDIT_ID = ele.closest('tr').id
  let EDIT_OBJ = stdArr.find(std => {
    return std.stdId === EDIT_ID
  })

  fnameControl.value = EDIT_OBJ.fname
  lnameControl.value = EDIT_OBJ.lname
  emailControl.value = EDIT_OBJ.email
  contactControl.value = EDIT_OBJ.contact

  addStdBtn.classList.add('d-none')
  updateStdBtn.classList.remove('d-none')
}


function onStdSubmit(eve) {
    eve.preventDefault();
    let NEW_STD = {
        fname: fnameControl.value,
        lname: lnameControl.value,
        email: emailControl.value,
        contact: contactControl.value,
        stdId: Date.now().toString()
    };
    cl(NEW_STD);
    // added new OBJ in DB
    stdArr.push(NEW_STD);

    stdForm.reset();

    // createTrs(stdArr);

    // we will crete a new tr and append it in the tbody
    let tr = document.createElement('tr');
    tr.id = NEW_STD.stdId;
    tr.innerHTML = `
        <td>${stdArr.length}</td>
        <td>${NEW_STD.fname} ${NEW_STD.lname}</td>
        <td>${NEW_STD.email}</td>
        <td>${NEW_STD.contact}</td>

        <td>
          <i onclick="onStdEdit(this)"
            role="button"
            class="fa-solid fa-pen-to-square fa-2x text-success">
          </i>
        </td>

        <td>
          <i onclick="onStdRemove(this)"
            role="button"
            class="fa-solid fa-trash fa-2x text-danger">
          </i>
        </td>
      
    `

    stdContainer.append(tr);

    toggleView();   // newly added

    Swal.fire({
      icon: 'success',
      title: `The new student ${NEW_STD.fname} ${NEW_STD.lname} has been added successfully.`,
      timer: 3000
    });
}

function onStdUpdate() {
  // update_ID
  let UPDATE_ID = EDIT_ID

  // update_OBJ
  let UPDATE_OBJ = {
    fname: fnameControl.value,
    lname: lnameControl.value,
    email: emailControl.value,
    contact: contactControl.value,
    stdId: UPDATE_ID
  }

  stdForm.reset();
  // update in DB (in stdArr)
  let getIndex = stdArr.findIndex(std => std.stdId === UPDATE_ID);
  stdArr[getIndex] = UPDATE_OBJ;

  // update TR (only one) in UI
  let tr = document.getElementById(UPDATE_ID).children
  tr[1].innerText = `${UPDATE_OBJ.fname} ${UPDATE_OBJ.lname}`
  tr[2].innerText = `${UPDATE_OBJ.email}`
  tr[3].innerText = `${UPDATE_OBJ.contact}`
  // hide update btn and show add btn

  addStdBtn.classList.remove('d-none')
  updateStdBtn.classList.add('d-none')

  Swal.fire({
    title: `The student ${UPDATE_OBJ.fname} ${UPDATE_OBJ.lname} updated successfully !!!`,
    icon: 'success',
    timer: 3000
  });
}

stdForm.addEventListener('submit', onStdSubmit);
updateStdBtn.addEventListener('click', onStdUpdate)


