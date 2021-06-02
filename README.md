# Cash In and Cash Out

A simple JavaScript code for commission fee based on a users transaction type and their history.


## Installation

To run this program some installations are required. Run the following command to install. (Make sure you have the latest node installed)
```bash
npm i
```

## How to use
To use this program it would require a json file that contains an array of transaction objects

```json
{ 
  "date": "2016-01-05",
  "user_id": 1,
  "user_type": "natural",
  "type": "cash_in",
  "operation": { 
    "amount": 200.00, 
    "currency": "EUR" 
  }
}
```
Now we will need the path of the json file to run the app. The following command runs it.
```bash
node app.js "json_file_path"
```

## Test
The test cases were written in Jest. To run the tests run the following command.
```bash
npm run test
```

## License
[MIT](https://choosealicense.com/licenses/mit/)