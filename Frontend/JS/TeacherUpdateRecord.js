window.onload = function() {
    var studentId = window.localStorage.getItem('studentId');
    if(studentId)
    {
          getStudent(studentId).then(
          (student)=>
          {
            document.getElementById('rollNumber').value = student.RollNumber;
            document.getElementById('name').value = student.Name;
            document.getElementById('score').value = student.Score;
            document.getElementById('date').valueAsDate = new Date(student.DOB);
          }
      );
    }
  };


  async function getStudent(studentId)
  {
    var studentId = window.localStorage.getItem('studentId');
    const response = await fetch('http://localhost:3000/api/student/'+studentId);
    const res = await response.json();
    let student = res[0];
    return student;
  }

function updateStudentOnSubmit()
  {
    if(checkFormValidity()) 
    {
      try
      {
        updatedStudent = 
        {
            Id: window.localStorage.getItem('studentId'),
            RollNumber: document.getElementById('rollNumber').value,
            Name: document.getElementById('name').value,
            Score: document.getElementById('score').value,
            DOB: document.getElementById('date').value,
        };
      updateStudent(updatedStudent);
        return true;
      }
      catch(ex)
      {
        alert('error occured!!');
        return false;
      }
    }
      return false;
  }


  async function updateStudent(updatedStudent)
  {
    await fetch('http://localhost:3000/api/updateStudent',{
      method: 'PUT',
      headers:{
      'Content-Type': 'application/json'
      },
      body:JSON.stringify({
        Id:  updatedStudent.Id,
        RollNumber: updatedStudent.RollNumber,
        Name: updatedStudent.Name,
        DOB: updatedStudent.DOB,
        Score: updatedStudent.Score
    })
    })
  }



  //could import following methods but i could not find a way to do that
  function checkFormValidity()
{
    var validForm = allnumeric1() && allnumeric2() && allLetters() && checkDate();
    if(validForm)
    {
        return true;

    }
    else
    {
        allnumeric1();
        allnumeric2();
        allLetters();
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

function allLetters()
{
var inputTxt = document.getElementById('name');
var message = document.getElementById('nameMsg');
//[^\s]*
var letters = /^[A-Za-z\s]*$/;
return regxCheck(letters,inputTxt,message);
}

function allnumeric2()
{
var inputTxt = document.getElementById('score');
var message = document.getElementById('scoreMsg');
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
  //window.localStorage.clear();
  window.localStorage.removeItem('studentId');
  window.location.href = "./Index.html";
}