# Okdb Spreadsheet
React Spreadsheet Component with support for multiuser collaboration in realtime. Integrates well with [okdb](https://okdb.io/) and includes multi-user collaboration features.

## Installation

Install from npm:

```bash
$ npm install okdb-spreadsheet --save
```

## Usage

1. Import main component and styles into your project:

```javascript
import OkdbSpreadsheet from 'okdb-spreadsheet';
import "okdb-spreadsheet/lib/styles.css";
```

1. Prepare your data for the spreadsheet:

```javascript
const data = [
  [
    { readOnly: true, value: '' },
    { value: 'Expences', readOnly: true },
    { value: 'Q1', readOnly: true },
    { value: 'Q2', readOnly: true },
    { value: 'Q3', readOnly: true },
    { value: 'Q4', readOnly: true },
  ],
  [
    { readOnly: true, value: 1 },
    { value: ""},
    { value: ""},
    { value: ""},
    { value: ""},
    { value: ""},
  ],
  [
    { readOnly: true, value: 1 },
    { value: ""},
    { value: ""},
    { value: ""},
    { value: ""},
    { value: ""},
  ]
];
```

1. Include the Spreadsheet component.

```javascript
<OkdbSpreadsheet
  data={data}  
  onCellsChanged={changes => {
    const newGrid = grid.map(row => [...row]);
    changes.forEach(({ cell, row, col, value }) => {
      newGrid[row][col] = { ...grid[row][col], value };
    });
    // put newGrid into the local component state
    setData(newGrid);
    // notify other pariticipants about data changes
     okdb.put(DATA_TYPE, DOCUMENT_ID, newGrid);
  }}  
  onSelect={(selection) => {    
    // save new selection locally     
    setLocalSelection(selection);
    // notify other participants about selection change
    okdb.sendPresence({
      ...selection,
    });
  }}
/>
```

See [Okdb Spreadsheet Sample](https://github.com/okdb-io/okdb-sample-spreadsheet) for more details and integration with okdb for collaboration features like lock-free data replication, collaborative mouse pointers and cursors.