// Relational Style
// + employees
// - firstName
// - lastName
// - otherName
// - phone
// - email
// - address
// - jobTitle
// - department

// VALIDATION
db.employees.createIndex( { "email": 1 }, { unique: true } );

var dbe = {
    insert : function(document) {

    // Requires first name
    if(!document.firstName) {

    print('Property *firstName* is required');
    return; 
    }

    // Requires last name
    if(!document.firstName) {
        print('Property *lastName* is required');
        return; 
    }

    // Requires phone
    if(!document.phone) {
        print('Property *phone* is required');
        return; 
    }

    // Requires email
    if(!document.email) {
        print('Property *email* is required');
        return; 
    }

    // Requires job title
    if(!document.jobTitle) {
        print('Property *jobTitle* is required');
        return; 
    }

    // Requires address
    // if(document.addressCollection.isEmpty()) {
    //     print('Property *address* is required');
    //     return;
    // }

    // Departments validation
    if(!document.departments in  db.departments.distinct("name")){
        print('That is an invalid department');
        return;
    }

    // Phone validation
    if(!document.phone.startsWith('0') || document.phone.length != 10 ){
        print('Invalid phone number');
        return;
    }

    // insert data 
    db.employees.insert(document);
    }
};

// Initial record    
db.employees.insert({
    firstName: 'Albena',
    lastName: 'Andreeva',
    otherName: 'Dianova',
    phone: '0876453446',
    email: 'abi1997@abv.bg',
    addressCollection : {
        city: 'Plovdiv',
        country: 'Bulgaria',
        address: 'Ravna reka Str, 12'
    },
    jobTitle: 'auditor',
    department: 'test'
})

dbe.insert({
    firstName: 'Albena',
    lastName: 'Andreeva',
    otherName: 'Dianova',
    phone: '0876453446',
    email: 'abi1997@abv.bg',
    addressCollection : {
        city: 'Plovdiv',
        country: 'Bulgaria',
        address: 'Ravna reka Str, 12'
    },
    jobTitle: 'auditor',
    department: 'test'
})

// GENERATING PROPERTIES

// Genarate Name
var generateMaleFirstname = function() {
  var collection = ['Mihail', 'Ivan', 'Georgi', 'Nikola', 'Vladimir', 'Peter', 'Doncho'];

  var index = Math.floor((Math.random() * (7 -1) + 1));
  return collection[index]
}

var generateMaleLastname = function() {
  var collection = ['Petrov', 'Ivanov', 'Georgiev', 'Petkov', 'Milev', 'Genchev', 'Penchev'];

  var index = Math.floor(Math.random() * (7 - 1) + 1);
  return collection[index];
}

var generateFemaleFirstname = function() {
    var collection = ['Mihaela', 'Iva', 'Gergana', 'Nikolina', 'Vladislava', 'Petq', 'Donka'];
  
    var index = Math.floor((Math.random() * (7 -1) + 1));
    return collection[index]
  }

// Generate Email
var generateEmailDomain = function() {
    var collection = ['gmail.com', 'yahoo.com', 'abv.bg', 'outlook.com', 'mail.ru', 'hotmail.com'];
  
    var index = Math.floor((Math.random() * (6 - 1) + 1));
    return collection[index]
}

// Generate Phone Number
var generatePhone = function() {
    return '08' + (Math.floor(Math.random() * 100000000)).toString();
}

// Generate Address
var generateAddress = function() {
    var collection = ['Angel Kanchev Str', 'Asen Zlatarov Str', 'Baikal Str', 'Bogomil Str', 'Buxton Bros Str', 'Dimitar Talev Str', 'Galileo Str'];
  
    var index = Math.floor((Math.random() * (7 - 1) + 1));
    return collection[index]
}

// Generate Job Title
var generateJobTitle = function() {
    var collection = ['financial analyst', 'personal financial adviser', 'accountant', 'auditor', 'loan officer', 'collectors', 'bank teller'];
  
    var index = Math.floor((Math.random() * (7 - 1) + 1));
    return collection[index]
}

// Generate Department
var generateDepartment = function() {
    var 
    var index = Math.floor((Math.random() * (8 - 1) + 1));
    return collection[index]
}

db.departments.distinct("name")

// Q U E R I E S

// ADD RECORDS TO EMPLOYEES
var addFemaleEmployees = function() {
    for(i = 0; i < 10; i++) {    
        var firstName = generateFemaleFirstname();
        var lastName = (generateMaleLastname()).toString() + 'a';
        
        var email = firstName.toLowerCase() + '.' + lastName.toLowerCase() + '@' + generateEmailDomain();

        var address =  generateAddress() + ', ' + (Math.floor(Math.random() * 100)).toString();
        
        db.employees.insert({
            firstName: firstName,
            lastName: lastName,
            email: email,
            phone: generatePhone(),
            jobTitle: generateJobTitle(),
            department: generateDepartment(),
            address: {
                city: 'Plovdiv',
                country: 'Bulgaria',
                address: address
            },
        })
    }
}

var addMaleEmployees = function() {

    for(i = 0; i < 10; i++) {
        var firstName = generateMaleFirstname();
        var lastName = generateMaleLastname();
        
        var email = firstName.toLowerCase() + '.' + lastName.toLowerCase() + '@' + generateEmailDomain();

        var address =  generateAddress() + ', ' + (Math.floor(Math.random() * 100)).toString();
        
        db.employees.insert({
            firstName: firstName,
            lastName: lastName,
            email: email,
            phone: generatePhone(),
            jobTitle: generateJobTitle(),
            department: generateDepartment(),
            address: {
                city: 'Plovdiv',
                country: 'Bulgaria',
                address: address
            },
        })
    }
}

// ADD MANAGERS

// FOR AUDITORS
db.employees.find({jobTitle : 'auditor'}).forEach(function(document) {
  
    // UPDATE employees SET manager = 'Albena Andreeva' WHERE jobTitle = 'auditor';
    db.employees.update({ _id : document._id},{
        firstName : document.firstName,
        lastName : document.lastName,
        email: document.email,
        otherName: document.otherName,
        phone: document.phone,
        addressCollection : document.addressCollection,
        jobTitle: document.jobTitle,
        department: document.department,
        manager: '5db073eb054caf46ae1a9c4c' // Albena Andreeva

    })
})

// TESTING

// TEST DEPARTMENT VALIDATION
db.employees.insert({
    firstName: 'Albena',
    lastName: 'Andreeva',
    otherName: 'Dianova',
    phone: '0876453446',
    email: 'test@test.com',
    addressCollection : {
      city: 'Plovdiv',
      country: 'Bulgaria',
      address: 'Ravna reka Str, 12'
    },
    jobTitle: 'auditor',
    department: 'non existent department type'
  })

// TEST UNIQUE EMAIL 
db.employees.insert({
firstName: 'Albena',
lastName: 'Andreeva',
otherName: 'Dianova',
phone: '0876453446',
email: 'abi1997@abv.bg',
addressCollection : {
    city: 'Plovdiv',
    country: 'Bulgaria',
    address: 'Ravna reka Str, 12'
},
jobTitle: 'auditor',
department: 'administration'
})