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

    handleChange(e) {
        this.value = e.detail.value;
        // if this.value === 'name()' set name(get name())

        // eslint-disable-next-line vars-on-top
        // for (var prop in e.detail.value) {
        //     if (Object.prototype.hasOwnProperty.call(e.detail.value, prop)) {
        //         // eslint-disable-next-line no-alert
        //         alert("prop: " + prop + " obj: " + e.detail.value[prop]);
        //         switch(e.detail.value[prop]) {
        //             case 'name()':
        //                 this.value[prop] = 'Name: ' + this.name();
        //                 // eslint-disable-next-line no-alert
        //                 alert(this.value[prop]);
        //                 break;
        //             default:

        //         }
        //     }
        // }

        // eslint-disable-next-line vars-on-top
        for (var prop in this.value) {
            if (Object.prototype.hasOwnProperty.call(this.value, prop)) {
                // eslint-disable-next-line no-alert
                // alert(this.value[prop]);
                switch(this.value[prop]) {
                    case 'name()':
                        // eslint-disable-next-line no-alert
                        // alert(name());
                        // this.value[prop] = name();

                        this.acctFields[prop] = this.account.data.fields.Name.value;
                        break;
                    default:
                        // no action
                }

                // test
                // eslint-disable-next-line vars-on-top
                for (var subProp in this.value[prop]) {
                    if (Object.prototype.hasOwnProperty.call(this.value[prop], subProp))
                        // eslint-disable-next-line no-alert
                        alert("subProp: " + subProp + ", val: " + this.value[prop][subProp]);
                }
            }
        }
    }




    @wire(getContactList) contacts;
    // @wire(getDevContactList) devContacts;
    @wire(getThisDevContactList, { recordId: '$recordId' }) devContacts;
    @wire(getThisCustSuccessContactList, { recordId: '$recordId' }) custSuccessContacts;

}
