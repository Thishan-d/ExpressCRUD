
function getStudent()
{
    if(checkFormValidity())
    {
        getStudentData();
    }

        return false;
}

async function getStudentData()
{
    let notificationId =  document.getElementById('notificationId');
    let resultsFormId =  document.getElementById('resultsFormId');
    let formId =  document.getElementById('formId');

    let resName =  document.getElementById('resName');

    //hide form
    formId.classList.add('d-none');

    let RollNumber =  document.getElementById('rollNumber').value;
    let DOB= document.getElementById('date').value;
    let response = await fetch('http://localhost:3000/api/getStudentByRollNumber/'+RollNumber+'/'+DOB,{
        method: 'GET',
        headers:{
        'Content-Type': 'application/json'
        },
        body:null
        })
    let studentData =  await response.json()
    if(studentData.length>0)
    {
        console.log(studentData);
        resultsFormId.classList.remove('d-none');
        notificationId.classList.add('d-none');
        var allCustomInputs =  document.querySelectorAll('input.customInput');
        console.log(allCustomInputs.length);
        console.log(allCustomInputs);
        allCustomInputs[0].value = studentData[0].Name;
        allCustomInputs[1].value = studentData[0].RollNumber;
        allCustomInputs[2].valueAsDate = new Date(studentData[0].DOB);
        allCustomInputs[3].value = studentData[0].Score;

        //valueAsDate = new Date(student.DOB);
    }
    else
    {
        resultsFormId.classList.add('d-none');
        notificationId.classList.remove('d-none');
        console.log('no data');
    }
}

function closeBtnClicked()
{
    let notificationId =  document.getElementById('notificationId');
    let resultsFormId =  document.getElementById('resultsFormId');
    let formId =  document.getElementById('formId');

    notificationId.classList.add('d-none');
    resultsFormId.classList.add('d-none');
    formId.classList.remove('d-none');
}


function checkFormValidity()
{
    var validForm = allnumeric1() && checkDate();
    if(validForm)
    {
        return true;
    }
    else
    {
        allnumeric1();
        checkDate();
        alert('Please fill the form properly!');
        return false;
    }
}


function allnumeric1()
{
 var inputTxt = document.getElementById('rollNumber');
 var message = document.getElementById('rollNumberMsg');
 var numbers = /^[0-9]+$/;
 return regxCheck(numbers,inputTxt,message);
} 

function checkDate()
{
 var inputDate = document.getElementById('date');
 var message = document.getElementById('dateMsg');
 if(inputDate.value)
 {
     message.classList.add('d-none');
     inputDate.classList.remove('is-invalid');
     return true;
 }
 else
 {
     message.classList.remove('d-none');
     inputDate.classList.add('is-invalid');
     return false;
 }
}


function regxCheck(regx,inputTxt,message)
{
 if(inputTxt.value.match(regx))
 {
   message.classList.add('d-none');
   inputTxt.classList.remove('is-invalid');
   return true;
 }
 else
 {
   message.classList.remove('d-none');
   inputTxt.classList.add('is-invalid');
   return false;
 }
}

function logout()
{
  window.localStorage.removeItem('studentId');
  window.location.href = "./Index.html";
}
