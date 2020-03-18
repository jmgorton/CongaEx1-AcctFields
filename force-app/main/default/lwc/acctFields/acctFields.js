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
    ];

    get options() {
        return [
            { label: 'Name', value: 'name()' },
            { label: 'Number of Employees', value: 'numberOfEmployees()' },
            { label: 'Phone', value: 'phone()' },
            { label: 'Billing Street', value: 'billingStreet()' },
            { label: 'Billing City', value: 'billingCity()' },
            { label: 'Billing State', value: 'billingState()' },
            { label: 'Billing Postal Code', value: 'billingPostalCode()' }
        ];
    }

    get selectedValues() {
        return this.value.join(', ');
    }

    // @track acctFields;
    get acctFields() {
        var i = 0;
        for (i; i < this.value.length; i++) {
            if (this.value[i] === 'name()') 
                this.value[0] = {
                    Id: this.acctId(),
                    Name: 'Name',
                    Value: this.name()
                };
        }
        return null;
    }

    handleChange(e) {
        this.value = e.detail.value;
        // if this.value === 'name()' set name(get name())
    }




    @wire(getContactList) contacts;
    // @wire(getDevContactList) devContacts;
    @wire(getThisDevContactList, { recordId: '$recordId' }) devContacts;
    @wire(getThisCustSuccessContactList, { recordId: '$recordId' }) custSuccessContacts;

}
