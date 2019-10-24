use stu_1601321002

// VEHICLES
db.vehicles.insert({
    storageId: 6378462,
    model: 'VW'
})

db.departments.createIndex( { "name": 1 }, { unique: true } );


var dbveh = {
    insert : function(document) {

    if(!document.storageId){
        print("*storageId* is required") 
        return;
    }

    if(!document.model){
        print("*model* is required") 
        return;
    }

    if(!(/([0-9]+)$/.test(document.storageId))){
        print("*storageId* should only contain numbers") 
        return;
    }

    // insert data 
    db.vehicles.insert(document);
    }
};

var generateModel = function() {
    var collection = ['VW', 'BMW', 'Audi', 'Opel'];
  
    var index = Math.floor((Math.random() * (4 - 1) + 1));
    return collection[index]
}

var generateStorageId = function(){
    return Math.floor(Math.random() * 10000000);
}

var addVehicles = function() {
    for(i = 0; i < 5; i++) {
        db.vehicles.insert({
            storageId: generateStorageId(),
            model: generateModel()
        })
    }
}

// dbveh.insert({
//     storageId: '837483',
//     model: 'BMW'
// })
    
// dbveh.insert({
//     storageId: '928432',
//     model: 'Audi'
// })
    
// dbveh.insert({
//     storageId: '7204872',
//     model: 'Opel'
// })

var generatePassengers = function(){
    return Math.floor((Math.random() * (10 - 2) + 2));
}

db.vehicle.update({}, {$set : {"passengers": generatePassengers()}})


// CARGO
db.cargo.insert({
    name: 'Cucumbers',
    category: 'vegitables',
    quantity: 100,
    vehicleStorageId: 6378462
})

var dbcar = {
    insert : function(document) {

    if(!document.name){
        print("*name* is required") 
        return;
    }

    if(!document.category){
        print("*category* is required") 
        return;
    }

    if(!document.quantity){
        print("*category* is required") 
        return;
    }

    if(!document.vehicleStorageId){
        print("*vehicleStorageId* is required") 
        return;
    }

    if(!(/([0-9]+)$/.test(document.vehicleStorageId))){
        print("*vehicleStorageId* should only contain numbers") 
        return;
    }

    if(!(db.vehicle.distinct("storageId").includes(document.storageId))){
        print('That is an invalid storageId');
        return;
    }
    
    if(['milk/diary', 'fruits', 'vegetables', 'meat'].includes(document.category)){
        db.priorityCargo.insert(document);    
    }

    // insert data 
    db.cargo.insert(document);
    }
};

var generateVegetables = function() {
    var collection = ['Tomato', 'Cucumber', 'Pepper', 'Onion'];
  
    var index = Math.floor((Math.random() * (4 - 1) + 1));
    return collection[index];
}

var generateFruits = function() {
    var collection = ['Apple', 'Melon', 'Cherry', 'Pear'];
  
    var index = Math.floor((Math.random() * (4 - 1) + 1));
    return collection[index];
}

var generateVehicleStorageId = function(){
    var collection = db.vehicles.distinct('storageId');

    print(db.vehicle.count())
    print(collection)
    var index = Math.floor((Math.random() * (db.vehicle.count() - 1) + 1));
    return collection[index]
}

var addCargo = function() {
    for(i = 0; i < 5; i++) {
        print(generateVehicleStorageId())
        dbcar.insert({
            name: generateFruits(),
            category: 'fruits',
            quantity: Math.floor((Math.random()*100)),
            vehicleStorageId: generateVehicleStorageId()
        })

        dbcar.insert({
            name: generateVegetables(),
            category: 'vegitables',
            quantity: Math.floor((Math.random()*100)),
            vehicleStorageId: generateVehicleStorageId()
        })
    }
}

// db.cargo.insert({
//     name: 'Cucumbers',
//     category: 'Vegitables',
//     quantity: 100,
//     vehicleStorageId: '7204872'
// })


// FUNCTIONS


db.vehicle.aggregate([
    { $lookup:
        {
          from: "cargo",
          localField: "storageId",
          foreignField: "vehicleStorageId",
          as: "storageId"
        }
    }
])


// PRIORITY CARGO

db.cargo.find({}).forEach(function(element){
    if(['milk/diary', 'fruits', 'vegetables', 'meat'].includes(element.category)){
        db.priorityCargo.insert({element})
    }
})

