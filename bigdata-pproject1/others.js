// UPDATE
db.employees.find().forEach(function(document) {
  
    // assigne document
    var fname = (document.firstName).toLowerCase;
    var lname = (document.lastName).toLowerCase;
    var email = fname + '.' + lname + '@' + generateEmailDomain();
  
    // UPDATE employees SET name = 'Mihail' WHERE id = 10;
    db.employees.update({ _id : document._id},{
      firstName : fname,
      lastName : lname,
      email: email,

    })
})

//  случва се непоправимото, оказа се че потребителите ни не трябва да имат само едно поле за име а две полета 
//  - fname
//  - lname
//  хайде сега да преправим функцията така че да работи както трябва

// SELECT * FROM employees
db.employees.find({age : 7}).forEach(function(document) {
  
  // assigne document
  var element = (document.name).split(' ');
  var fname = element[0];
  var lname = element[1];

  // UPDATE employees SET name = 'Mihail' WHERE id = 10;
  db.employees.update({ _id : document._id},{
    fname : fname,
    lname : lname
  })
})

// Get specific elements
// SELECT * FROM employees where age = 7
db.employees.find({age : 7})

// Remove information 
db.employees.remove({age : 19})
db.employees.deleteOne({age : 16})


// simple select
// SELECT * FROM employees
db.employees.find()

// format result document
db.employees.find().pretty() 

// Insert document with _id
db.employees.insert({
  _id   : 'user_1',
  name  : 'Ivan Ivanov',
  age   : 36
})

