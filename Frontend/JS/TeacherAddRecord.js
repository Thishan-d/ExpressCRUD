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

 function addStudent()
{
    if(checkFormValidity())
    {
        try
        {
            newStudent = 
            {
                RollNumber: document.getElementById('rollNumber').value,
                Name: document.getElementById('name').value,
                Score: document.getElementById('score').value,
                DOB: document.getElementById('date').value,
            }
            sendData(newStudent);
            alert('Record added successfully!!');
            return true;
        }
        catch(ex)
        {
            alert("Error occured!")
            return false;
        }
    }
    return false;
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

    async function sendData(newStudent)
   {
    const response = await fetch("http://localhost:3000/api/addStudent", {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body:JSON.stringify({
            RollNumber: newStudent.RollNumber,
            Name: newStudent.Name,
            DOB: newStudent.DOB,
            Score: newStudent.Score
        })
        });
   }

function logout()
{
  //window.localStorage.clear();
  window.localStorage.removeItem('studentId');
  window.location.href = "./Index.html";
}



