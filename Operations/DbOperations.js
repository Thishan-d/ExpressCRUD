var config = require('../DbConfig.js');
var sql = require('mssql');

async function GetAllStudents()
{
    try{
        let pool = await sql.connect(config.sqlConfig);
        let students = await pool.request().query('SELECT * FROM StudentData');
        return students.recordsets;
        //console.log(students.recordsets);
    }
    catch
    {
        console.log('error occured!');
    }
}

async function GetStudent(studentId)
{
    try{
        let pool = await sql.connect(config.sqlConfig);
        let students = await pool.request()
        .input('ID', sql.Int, studentId)
        .query('SELECT * FROM StudentData where Id = @ID');
        return students.recordsets;
    }
    catch
    {
        console.log('error occured!');
    }
}

async function GetStudentByRollNumber(rollNumber,dob)
{
    try{
        let pool = await sql.connect(config.sqlConfig);
        let students = await pool.request()
        .input('RollNumber', sql.NVarChar, rollNumber)
        .input('DOB', sql.NVarChar, dob)
        .query('SELECT * FROM StudentData where RollNumber = @RollNumber AND DOB = @DOB');
        return students.recordsets;
    }
    catch
    {
        console.log('error occured!');
    }
}

async function AddStudent(Student) {

    try {
        let pool = await sql.connect(config.sqlConfig);
        let insertStudent = await pool.request()
            .input('RollNumber', sql.NVarChar, Student.RollNumber)
            .input('Name', sql.NVarChar, Student.Name)
            .input('DOB', sql.NVarChar, Student.DOB)
            .input('Score', sql.NVarChar, Student.Score)
            .query('INSERT INTO StudentData VALUES (@RollNumber,@Name,@DOB,@Score)');
        return insertStudent.recordsets;
    }
    catch (err) {
        console.log(err);
    }

}

async function UpdateStudent(Student) {

    try {
        let pool = await sql.connect(config.sqlConfig);
        let updateStudent = await pool.request()
            .input('ID', sql.Int, Student.Id)
            .input('RollNumber', sql.NVarChar, Student.RollNumber)
            .input('Name', sql.NVarChar, Student.Name)
            .input('DOB', sql.NVarChar, Student.DOB)
            .input('Score', sql.NVarChar, Student.Score)
            .query('UPDATE StudentData SET RollNumber = @RollNumber,Name= @Name,DOB = @DOB,Score = @Score WHERE Id = @ID');
        return updateStudent.recordsets;
    }
    catch (err) {
        console.log(err);
    }

}

async function DeleteStudent(studentId)
{
    try{
        let pool = await sql.connect(config.sqlConfig);
        let students = await pool.request()
        .input('ID', sql.Int, studentId)
        .query('DELETE FROM StudentData WHERE Id =@ID;');
        return students.recordsets;
    }
    catch
    {
        console.log('error occured!');
    }
}


module.exports = {
    GetAllStudents : GetAllStudents,
    GetStudent:GetStudent,
    AddStudent:AddStudent,
    UpdateStudent: UpdateStudent,
    DeleteStudent:DeleteStudent,
    GetStudentByRollNumber:GetStudentByRollNumber,
}
