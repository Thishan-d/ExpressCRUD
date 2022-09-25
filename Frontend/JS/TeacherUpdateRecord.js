//import { checkFormValidity } from './TeacherAddRecord';
//onst TeacherAddRecord = require('./TeacherAddRecord');

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

  async function updateStudent()
  {
    // if(TeacherAddRecord.checkFormValidity())
    if(true) // =====================> add the validation here
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
        }

        console.log(updatedStudent);
    
       let res = await fetch('http://localhost:3000/api/updateStudent',{
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

        return true;
      }
      catch
      {
        return false;
      }

    }

    return false;

  }


  async function testFunction()
  {
    updatedStudent = 
    {
        Id: window.localStorage.getItem('studentId'),
        RollNumber: document.getElementById('rollNumber').value,
        Name: document.getElementById('name').value,
        Score: document.getElementById('score').value,
        DOB: document.getElementById('date').value,
    }

    console.log(updatedStudent);

   let res = await fetch('http://localhost:3000/api/updateStudent',{
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