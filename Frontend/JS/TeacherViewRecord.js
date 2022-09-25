 async function getStudentData()
  {
    const response = await fetch('http://localhost:3000/api/students');
    const allStudents = await response.json(); //extract JSON from the http response
    console.log(allStudents);

    let RecordCount = allStudents.length;
    document.getElementById('recordCount').innerText = RecordCount;

    if(RecordCount == 0)
    {
        document.getElementById('tableBody').innerHTML = '<tr><td colspan="6" style="text-align:center">No Records Available</td></tr>'
    }
    else
    {
        var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        let tableData = '';
        let count = 1;
        for(var student of allStudents)
        {
            tableData += `
            <tr>
            <th scope="row">${count}</th>
            <td>${student.RollNumber}</td>
            <td>${student.Name}</td>
            <td>${new Date(student.DOB).toLocaleDateString("en-US", options)}</td>
            <td>${student.Score}</td>
            <td>
            <button class="btn btn-warning" onclick="updateStudent(${student.Id})">Edit</button>
            <button class="btn btn-danger" onclick="deleteStudent(${student.Id})">Delete</button>
            </td>
            </tr>
            `
            count ++;

        }
        // console.log(tableContent);
         document.getElementById('tableBody').innerHTML = tableData;



    }

  }

  async function deleteStudent(studentId)
  {
    let text = "Are you sure you want to delete?";
    if (confirm(text) == true) {
      const response = await fetch('http://localhost:3000/api/student/delete/'+studentId,{
        method: 'DELETE', 
        headers: {
          'Content-Type': 'application/json'
        },
        body: null
      });

      getStudentData();
    }
  }

  function updateStudent(studentId)
  {
    window.localStorage.setItem('studentId', studentId);
    window.location.href = "./TeacherUpdateRecord.html";
  }




  window.onload = function() {
    console.log('fires');
    getStudentData();
    
    //only uses when update
    // var studentId = window.localStorage.getItem('studentId');
    // if(studentId)
    // {
    //   let student = getStudent(studentId);
 
    //   console.log(student)
    // }
  };
