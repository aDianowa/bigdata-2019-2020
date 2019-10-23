// Relational Style
// + clients
// - firstName
// - lastName
// - otherName
// - phone
// - email
// - address
// - bankAccounts

var validatedClients = function(document){
    // Requires first name
    if(!document.firstName) {
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

    //Requires address
    if(!document.address ||
        !document.address.address ||
        !document.address.country ||
        !document.address.city) {
        print('Property *address* is required');
        return;
    }

    // Phone validation
    if(!document.phone.startsWith('08') || document.phone.length != 10 ){
        print('Invalid phone number');
        return false;
    }

    // Bank Account Validation
    var accountValidation = true;
    document.bankAccounts.forEach(function(element){

        // Should be unique
        if(db.clients.find({"bankAccount.accountId": element.accountId}).count()>0){
            print("The bank account is not unique");
            accountValidation = false;
            return;
        }

        // Should contain only letters or only numbers
        if(!(/(^[A-Za-z]+|^[0-9]+)$/.test(element.accountId))){
            print("The bank account should contain only letters or only numbers");
            accountValidation = false;
            return;
        }

        // Set default currency for bank account if there isn't one
        if(!element['currency']){
            element['currency'] = 'BGN';
        }

        // Set default amount for bank account if there isn't one
        if(!element['amount']){
            element['amount'] = 0;
        }
    })

    return accountValidation;
}

// FOR INSERT
var dbclin = {
    insert : function(document) {

    if(!validatedClients(document)) return;

    // insert data 
    db.clients.insert(document);
    }
};

// FOR UPDATE
var dbclup = {
    update : function(document) {

    if(!validatedClients(document)) return;
    
    // update data 
    db.clients.update(document);
    }
};

// Validated initial record
dbclin.insert({
    firstName: 'Plamena',
    lastName: 'Georgieva',
    otherName: 'Stoyanova',
    phone: '0867345726',
    email: 'pgeorgieva@yahoo.com',
    address : {
        city: 'Plovdiv',
        country: 'Bulgaria',
        address: 'Galileo Str, 32'
    },
    bankAccounts: [
        {
            accountId: 'initialBankAccountTest',
            amount: 1000,
            currency: 'BGN'
        }
    ]
  })

// Script for generating objects properties

// Genarate Name
// Using all employees generation methods

// Generate Bank Accounts
var generateBankAccountName = function() {
    return Math.floor(Math.random() * 100000000);
}

var generateBankAccountAmount = function() {
    return Math.floor(Math.random() * 1000);
}

var generateBankAccountCurrency = function() {
    var collection = ['BGN', 'GBP', 'USD', 'AUD'];
  
    var index = Math.floor((Math.random() * (4 - 1) + 1));
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
          
          dbclin.insert({
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
            bankAccounts: [
                {
                    accountId: generateBankAccountName(),
                    currency: generateBankAccountCurrency(),
                    amount: generateBankAccountAmount()
                }

            ]
          })
      }
  }
  
  var addMaleClients = function() {
  
      for(i = 0; i < 10; i++) {
          var firstName = generateMaleFirstname();
          var lastName = generateMaleLastname();
          
          var email = firstName.toLowerCase() + '.' + lastName.toLowerCase() + '@' + generateEmailDomain();
  
          var address =  generateAddress() + ', ' + (Math.floor(Math.random() * 100)).toString();
          
          dbclin.insert({
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
            bankAccounts: [
                {
                    accountId: generateBankAccountName(),
                    currency: generateBankAccountCurrency(),
                    amount: generateBankAccountAmount()
                }

            ]
          })
      }
  }
  