// Relational Style
// + departments
// - id
// - name

// CREATE DEPARTMENTS COLLECTION
db.createCollection("departments", {
validator: {
    $jsonSchema: {
        bsonType: "object",
        required: [ "name" ],
        properties: {
            name: {
            bsonType: "string",
            description: "must be a string and is required"
            }
        }
    }
}
})

// VALIDATION
db.departments.createIndex( { "name": 1 }, { unique: true } );

// Q U E R I E S

// ADD TO DEPARTMENTS
var addDepartments = function() {
    var collection = [
        'currency management',
        'banking',
        'budgetary control',
        'control',
        'credit',
        'administration',
        'economic analysis',
        'legal',
        'inspection',
        'management services'
    ];
    for(i = 0; i < 10; i++) {    
        db.departments.insert({
            name: collection[i]
        })
    }
}

// TESTING

// TEST UNIQUE CONSTRAINT

db.departments.insert({
    name: 'banking'
})

// TEST REQUIRED CONSTRAINT

db.departments.insert({
})
