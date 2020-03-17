import { LightningElement, wire } from "lwc";

// import getContactList from "@salesforce/apex/ContactController.getContactList";
import getDevContactList from "@salesforce/apex/ContactController.getDevContactList";
// import getContactList from '/scripts/soql/account.soql';

export default class DevContacts extends LightningElement {
  @wire(getDevContactList) devcontacts;
    // devcontacts;
}
