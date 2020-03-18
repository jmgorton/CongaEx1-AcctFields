import { LightningElement, track, wire, api } from "lwc";
import { getRecord } from 'lightning/uiRecordApi';
import getContactList from "@salesforce/apex/ContactController.getContactList";
import getThisDevContactList from "@salesforce/apex/ContactController.getThisDevContactList";
import getThisCustSuccessContactList from "@salesforce/apex/ContactController.getThisCustSuccessContactList";
// import DevContacts from "c/devContacts";


const FIELDS = [
    'Account.Id',
    'Account.Name',
    'Account.NumberOfEmployees',
    'Account.Phone',
    'Account.BillingStreet',
    'Account.BillingCity',
    'Account.BillingState',
    'Account.BillingPostalCode'
];

export default class AcctFields extends LightningElement {

    @api recordId;
    @wire(getRecord, { recordId: '$recordId', fields: FIELDS }) account;

    get acctId() {
        return this.account.data.fields.Id.value;
    }

    get name() {
        return this.account.data.fields.Name.value;
    }

    get numberOfEmployees() {
        return this.account.data.fields.NumberOfEmployees.value;
    }

    get phone() {
        return this.account.data.fields.Phone.value;
    }

    get billingStreet() {
        return this.account.data.fields.BillingStreet.value;
    }

    get billingCity() {
        return this.account.data.fields.BillingCity.value;
    }

    get billingState() {
        return this.account.data.fields.BillingState.value;
    }

    get billingPostalCode() {
        return this.account.data.fields.BillingPostalCode.value;
    }





    @track
    fieldList = ["Name", "CreatedDate"];

    @track value = [
        // {
        //     Id: 0,
        //     Name: 'Name',
        //     Value: 'GenValue'
        // }
        'name()'
    ];

    @track acctFields = [
        // name()
        // this.account.data.fields.Name.value
    ];
    // get acctFields() {
    //     var i = 0;
    //     for (i; i < this.value.length; i++) {
    //         if (this.value[i] === 'name()') 
    //             this.value[0] = {
    //                 Id: this.acctId(),
    //                 Name: 'Name',
    //                 Value: this.name()
    //             };
    //     }
    //     return null;
    // }

    @track showNotes = false;


    get options() {
        return [
            { label: 'Name', value: 'name()' },
            { label: 'Number of Employees', value: 'numberOfEmployees()' },
            { label: 'Custom Notes', value: 'customNotes()' },
            { label: 'Phone', value: 'phone()' },
            { label: 'Billing Street', value: 'billingStreet()' },
            { label: 'Billing City', value: 'billingCity()' },
            { label: 'Billing State', value: 'billingState()' },
            { label: 'Billing Postal Code', value: 'billingPostalCode()' },
            { label: 'Number of Contacts', value: 'numberOfContacts()' }
        ];
    }

    get selectedValues() {
        return this.value.join(', ');
    }

    handleChange(e) {
        // keeps the boxes up to date
        this.value = e.detail.value;

        // clears fields every time to handle case when box is unchecked
        // TODO better way
        this.acctFields = [];
        this.showNotes = false;

        // eslint-disable-next-line vars-on-top
        for (var prop in this.value) {
            if (Object.prototype.hasOwnProperty.call(this.value, prop)) {
                switch(this.value[prop]) {
                    case 'name()':
                        this.acctFields[prop] = this.account.data.fields.Name.value;
                        break;
                    case 'numberOfEmployees()':
                        this.acctFields[prop] = this.account.data.fields.NumberOfEmployees.value;
                        break;
                    case 'phone()':
                        this.acctFields[prop] = this.account.data.fields.Phone.value;
                        break;
                    case 'billingStreet()':
                        this.acctFields[prop] = this.account.data.fields.BillingStreet.value;
                        break;
                    case 'billingCity()':
                        this.acctFields[prop] = this.account.data.fields.BillingCity.value;
                        break;
                    case 'billingState()':
                        this.acctFields[prop] = this.account.data.fields.BillingState.value;
                        break;
                    // case 'billingPostalCode()':
                    //     this.acctFields[prop] = this.account.data.fields.BillingPostalCode.value;
                    //     break;
                    case 'customNotes()':
                        this.showNotes = true;
                        break;
                    case 'numberOfContacts()':
                        this.acctFields[prop] = 666;
                        break;
                    default:
                        // no action
                }
            }
        }
    }




    @wire(getContactList) contacts;
    // @wire(getDevContactList) devContacts;
    @wire(getThisDevContactList, { recordId: '$recordId' }) devContacts;
    @wire(getThisCustSuccessContactList, { recordId: '$recordId' }) custSuccessContacts;

}
