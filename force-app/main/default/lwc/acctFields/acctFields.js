import { LightningElement, track, wire, api } from "lwc";
import { getRecord } from 'lightning/uiRecordApi';
import getContactList from "@salesforce/apex/ContactController.getContactList";
import getThisDevContactList from "@salesforce/apex/ContactController.getThisDevContactList";
import getThisCustSuccessContactList from "@salesforce/apex/ContactController.getThisCustSuccessContactList";
// import DevContacts from "c/devContacts";


// var query;
// var records;
// var records1;

const FIELDS2 = [
    'Account.Name',
    'Account.Id'
];

export default class AcctFields extends LightningElement {
  // export default class HelloIteration extends LightningElement {
      @api recordId;

      @wire(getRecord, { recordId: '$recordId', fields: FIELDS2 }) account;

    get acctName() {
        return this.account.data.fields.Name.value;
    }

    get id() {
        return this.account.data.fields.Id.value;
    }

  // @track
  // contacts = [
  //     {
  //         Id: 1,
  //         Name: 'Amy Taylor',
  //         Title: 'VP of Engineering',
  //     },
  //     {
  //         Id: 2,
  //         Name: 'Michael Jones',
  //         Title: 'VP of Sales',
  //     },
  //     {
  //         Id: 3,
  //         Name: 'Jennifer Wu',
  //         Title: 'CEO',
  //     },
  // ];

  @track
  fieldList = ["Name", "createdDate"];

  @wire(getContactList) contacts;
//   @wire(getDevContactList) devContacts;
  @wire(getThisDevContactList, { recordId: '$recordId' }) devContacts;
  @wire(getThisCustSuccessContactList, { recordId: '$recordId' }) custSuccessContacts;

  // result = sforce.connection.query("Select Name, Id from User");
  // records = result.getArray("records");

  // for (var i = 0; i < records.length; i++) {
  //     var record = records[i];
  //     log(record.Name + " -- " + record.Id);
  // }

  // // {!REQUIRESCRIPT("/soap/ajax/24.0/connection.js")}
  // // {!REQUIRESCRIPT("/soap/ajax/24.0/apex.js")}
  // // try {
  // var query = "SELECT Id,Name from Account LIMIT 2";
  // var records = sforce.connection.query(query);
  // var records1 = records.getArray('records');
  // alert(records);
  // // } finally {

  // // // }
}

// export function getSelectedFields() {
//     var query, records;
//     var records1;
//     var i;
//     // {!REQUIRESCRIPT("/soap/ajax/24.0/connection.js")}
//     // {!REQUIRESCRIPT("/soap/ajax/24.0/apex.js")}
//     try {
//         query = "SELECT Id,Name from Account LIMIT 2";
//         records = sforce.connection.query(query);
//         records1 = records.getArray('records');
//         // alert(records);
//         for (i = 0; i < records.length; i++) {
//         //   var record = records[i];
//         //   log(record.Name + " -- " + record.Id);
//         }
//     } catch(error) {
//         // log(error);
//     }
// }
