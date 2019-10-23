// All Department Names
db.departments.distinct('name')

// Update Employees - Set salary
db.employees.update({"jobTitle" : 'accountant'}, {$set : {"salary": 1500}})
db.employees.update({"jobTitle" : 'auditor'}, {$set : {"salary": 2500}})
db.employees.update({"jobTitle" : 'collectors'}, {$set : {"salary": 2000}})
db.employees.update({"jobTitle" : 'loan officer'}, {$set : {"salary": 3000}})