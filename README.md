# SQLuminator

### A versatile SQL ORM library for JavaScript/TypeScript that simplifies database interactions and enables seamless mapping between SQL databases and object-oriented programming.

## Installation

- Install sqluminator and mysql driver packages for nodejs using npm or yarn.

> The current version of the sqluminator library only supports the MySQL driver for Node.js. However, we want to assure you that we are committed to expanding our support to include other SQL drivers as well.

```
npm i sqluminator mysql
```

## Setup sql driver

```javascript
const { SQL } = require("sqluminator");

SQL.createConnection("mysql", {
  // Change the values depending on your target connection
  user: "root",
  host: "localhost",
  database: "orm",
  password: "",
  port: 3306,
});
```

## Instantiate model / sql table

```javascript
const { SQL } = require("sqluminator");

/**
 *
 * constructor(tableName: string, schema?: any)
 */
const User = new Model("user"); // the sql table would be 'users'
```

## Basic Operations

### Create / Save Record

Inserts a new record.

### Parameters

- `data` (`Object`): The data object containing the record information.

### Return Value

Returns a `Promise` that resolves when the record is successfully inserted.

```javascript
const user = await User.save({ name: "Anthony Stark" });
console.log({ user });
```

### Retrieve Data

```javascript
const users = await User.find({ name: "Anthony Stark" }, { lean: true });
console.log(users);
```

### Update Data

```javascript
await User.findByIdAndUpdate(15, { name: "mart" });
```

### Delete Record

- Delete single record by id

```javascript
await User.findByIdAndDelete(4);
```

- or delete many records using a condition

```javascript
await User.deleteMany({ age: 15 });
```
