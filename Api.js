const dboperations = require('./Operations/DbOperations');

var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var app = express();
var router = express.Router();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use('/api', router);

const port = 3000
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })

router.use((request,response,next)=>{
    //use this for authentication
   console.log('middleware');
   next();
})


router.route('/students').get((request,response)=>{
    dboperations.GetAllStudents().then(result => {
       response.json(result[0]);
    })

})

router.route('/student/:id').get((request,response)=>{
    dboperations.GetStudent(request.params.id).then(result => {
       response.json(result[0]);
    })

})

router.route('/student/delete/:id').delete((request,response)=>{
    dboperations.DeleteStudent(request.params.id).then(result => {
       response.json(result[0]);
    })

})

router.route('/addStudent').post((request,response)=>{
    let student = {...request.body}
    dboperations.AddStudent(student).then(result => {
        response.status(201).json(result);
    })

})

router.route('/updateStudent').put((request,response)=>{
    let student = {...request.body}
    dboperations.UpdateStudent(student).then(result => {
        response.status(201).json(result);
    })

})