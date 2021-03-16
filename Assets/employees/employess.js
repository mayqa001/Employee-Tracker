class Employee {
    constructor(firstName, lastName , id) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.id = id;
    }

    getFullName() {
        return this.firstName + ' ' + this.lastName;
    }

    getId() {
        return this.id;
    }
}

module.exports = Employee;