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

var validatedEmployees = function(document){
    // Requires first name
    if(!(document.firstName)) {
        print('Property *firstName* is required');
        return false; 
    }
    
    // Requires last name
    if(!document.lastName) {
        print('Property *lastName* is required');
        return false; 
    }

    // Requires phone
    if(!document.phone) {
        print('Property *phone* is required');
        return false; 
    }

    // Requires email
    if(!document.email) {
        print('Property *email* is required');
        return false; 
    }

    // Requires job title
    if(!document.jobTitle) {
        print('Property *jobTitle* is required');
        return false; 
    }

    //Requires address
    if(!document.addressCollection || 
        !document.addressCollection.address ||
        !document.addressCollection.country ||
        !document.addressCollection.city) {
        print('Property *address* is required');
        return;
    }

    // // Departments validation
    // if(!(document.department in db.departments.distinct("name"))){
    //     print(document.department)
    //     print(db.departments.distinct("name"))
    //     print(document.department in db.departments.distinct("name"))
    //     //print('That is an invalid department');
    //     return false;
    // }

    // Phone validation
    if(!document.phone.startsWith('0') || document.phone.length != 10 ){
        print('Invalid phone number');
        return false;
    }

    // Manager validation
    if(!document.manager in db.employees.distinct("_id")){
        print('Invalid manager id');
        return false;
    }

    return true;
}

// FOR INSERT
var dbempin = {
    insert : function(document) {

    if(!validatedEmployees(document)) return;

    // insert data 
    dbempin.insert(document);
    }
};

// FOR UPDATE
var dbempup = {
    update : function(document) {

    if(!validatedEmployees(document)) return;
    
    // update data 
    db.employees.update(document);
    }
};

// Validated initial record
dbempin.insert({
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
    return '08' + (Math.floor(10000000 + Math.random() * 9000000)).toString();
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
    var collection = db.departments.distinct('name');
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
        
        dbеmpin.insert({
            firstName: firstName,
            lastName: lastName,
            email: email,
            phone: generatePhone(),
            jobTitle: generateJobTitle(),
            department: generateDepartment(),
            addressCollection: {
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
        
        dbempin.insert({
            firstName: firstName,
            lastName: lastName,
            email: email,
            phone: generatePhone(),
            jobTitle: generateJobTitle(),
            department: generateDepartment(),
            addressCollection: {
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
    dbempup.update({ _id : document._id},{
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
dbempin.insert({
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

// TEST MANAGER VALIDATION
dbempin.insert({
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
    department: 'administration',
    manager: 'non existing manager'
  })

// TEST REQUIRED EMAIL 
dbempin.insert({
firstName: 'Albena',
lastName: 'Andreeva',
otherName: 'Dianova',
phone: '0876453446',
addressCollection : {
    city: 'Plovdiv',
    country: 'Bulgaria',
    address: 'Ravna reka Str, 12'
},
jobTitle: 'auditor',
department: 'administration'
})

// TEST REQUIRED FIRST NAME 
dbempin.insert({
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
    department: 'administration'
    })

    // TEST REQUIRED LAST NAME 
dbempin.insert({
    firstName: 'Albena',
    otherName: 'Dianova',
    phone: '0876453446',
    email: 'test@test.com',
    addressCollection : {
        city: 'Plovdiv',
        country: 'Bulgaria',
        address: 'Ravna reka Str, 12'
    },
    jobTitle: 'auditor',
    department: 'administration'
    })

// TEST REQUIRED PHONE 
dbempin.insert({
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
    department: 'administration'
    })

// TEST REQUIRED JOB TITLE 
dbempin.insert({
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
    department: 'administration'
    })
    