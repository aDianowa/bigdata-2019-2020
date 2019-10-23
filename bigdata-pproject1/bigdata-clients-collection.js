// Relational Style
// + clients
// - firstName
// - lastName
// - otherName
// - phone
// - email
// - address
// - bankAccounts

db.createCollection("clients", {
    validator: {
        $jsonSchema: {
            bsonType: "object",
            required: [ "firstName", "lastName", "phone", "email", "addressCollection"],
            properties: {
                firstName: {
                    bsonType: "string",
                    description: "must be a string and is required"
                },
                lastName: {
                    bsonType: "string",
                    description: "must be a string and is required"
                },
                otherName: {
                    bsonType: "string",
                    description: "must be a string"
                },
                phone: {
                    bsonType: "string",
                    description: "must be a string and is required"
                },
                email: {
                    bsonType: "string",
                    description: "must be a string and is required"
                },
                addressCollection: {
                    bsonType: "object",
                    description: "must be an object and is required"
                },
            }
        }
    }
})

// initial clients record
db.clients.insert({
    firstName: 'Plamena',
    lastName: 'Georgieva',
    otherName: 'Stoyanova',
    phone: '0867345726',
    email: 'pgeorgieva@yahoo.com',
    addressCollection : {
        city: 'Plovdiv',
        country: 'Bulgaria',
        address: 'Galileo Str, 32'
    },
  })
  
  // Script for generating objects properties
  
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
      var collection = ['currency management', 'banking', 'budgetary control', 'control', 'credit', 'administration', 'economic analysis', 'legal'];
    
      var index = Math.floor((Math.random() * (8 - 1) + 1));
      return collection[index]
  }
  
  // Q U E R I E S
  
  // CREATE
  var addFemaleClients = function() {
      for(i = 0; i < 10; i++) {    
          var firstName = generateFemaleFirstname();
          var lastName = (generateMaleLastname()).toString() + 'a';
          
          var email = firstName.toLowerCase() + '.' + lastName.toLowerCase() + '@' + generateEmailDomain();
  
          var address =  generateAddress() + ', ' + (Math.floor(Math.random() * 100)).toString();
          
          db.clients.insert({
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
  
  var addMaleClients = function() {
  
      for(i = 0; i < 10; i++) {
          var firstName = generateMaleFirstname();
          var lastName = generateMaleLastname();
          
          var email = firstName.toLowerCase() + '.' + lastName.toLowerCase() + '@' + generateEmailDomain();
  
          var address =  generateAddress() + ', ' + (Math.floor(Math.random() * 100)).toString();
          
          db.clients.insert({
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
  