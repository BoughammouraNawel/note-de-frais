import { LightningElement, api, wire, track } from 'lwc';
// import getPicklistValues method from lightning/uiObjectInfoApi
import { getPicklistValues } from 'lightning/uiObjectInfoApi';
// import getObjectInfo method from lightning/uiObjectInfoApi
import { getObjectInfo } from 'lightning/uiObjectInfoApi';

import PICKLIST_FIELD from '@salesforce/schema/candidate__c.status__c';
// import record ui service to use crud services
import { getRecord } from 'lightning/uiRecordApi';
// import show toast
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
// import update record api
import { updateRecord } from 'lightning/uiRecordApi';

import { createRecord } from 'lightning/uiRecordApi';
import candidate__c_OBJECT from '@salesforce/schema/candidate__c';
import ressource__c_OBJECT from '@salesforce/schema/ressource__c';
 import NAME_FIELD from '@salesforce/schema/candidate__c.Name';


 const FIELDS = [
    'candidate__c.Id',
    'candidate__c.status__c'
];


export default class Path extends LightningElement {
   
   
    @track ressourceName;
    @track ressourceId; 
    @track candidatId;
    @track status;
    @track ressourceid;

  
    @api objectApiName;

    @api recordId;
    @track isModalOpen = false;
    @track selectedValue;
    @track showSpinner = false;


    @track showModal = false;
    @track showNegativeButton;
    @track showPositiveButton = true;
    @track positiveButtonLabel = 'Close';

 
    @wire(getObjectInfo, { objectApiName: candidate__c_OBJECT })
    objectInfo;

    @wire(getPicklistValues, { recordTypeId: '$objectInfo.data.defaultRecordTypeId', fieldApiName: PICKLIST_FIELD })
    picklistFieldValues;

    @wire(getRecord, { recordId: '$recordId', fields: FIELDS })
    record;


    get picklistValues() {
        let itemsList = [];
        console.log(JSON.stringify(this.record));
        if (this.record.data) {
            if (!this.selectedValue && this.record.data.fields.status__c.value) {
                this.selectedValue = this.record.data.fields.status__c.value + '';
            }
            if (this.picklistFieldValues && this.picklistFieldValues.data && this.picklistFieldValues.data.values) {
                console.log('got picklist field data');
                let selectedUpTo = 0;
                for (let item in this.picklistFieldValues.data.values) {

                    if (Object.prototype.hasOwnProperty.call(this.picklistFieldValues.data.values, item)) {
                        let classList;
                        if (this.picklistFieldValues.data.values[item].value === this.selectedValue) {
                            classList = 'slds-path__item slds-is-current slds-is-active';
                            selectedUpTo++;
                        } else {
                            classList = 'slds-path__item slds-is-incomplete';
                        }

                        console.log(classList);

                        itemsList.push({
                            pItem: this.picklistFieldValues.data.values[item],
                            classList: classList
                        })
                    }
                }

                if (selectedUpTo > 0) {
                    for (let item = 0; item < selectedUpTo; item++) {
                        itemsList[item].classList = 'slds-path__item slds-is-complete';
                    }
                }
                console.log('im here = ' + this.selectedValue);
                return itemsList;
            }
        }
        return null;
    }

    handleSelect(event) {
        console.log('in the function', event.currentTarget.dataset.value);
        this.selectedValue = event.currentTarget.dataset.value;
    }
   
    handleMarkAsSelected() {
        this.showSpinner = true;
        const fields = {};
        fields.Id = this.recordId;
        fields.status__c = this.selectedValue;

        const recordInput = { fields };

        updateRecord(recordInput)
            .then(() => {
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Success',
                        message: 'Status Updated!',
                        variant: 'success'
                    })
                );
                console.log('success!');
            })
            .catch(
                error => {
                    this.dispatchEvent(
                        new ShowToastEvent({
                            title: 'Error updating status!',
                            message: error.body.message,
                            variant: 'error'
                        })
                    );
                    console.log('failure => ' + error.body.message);
                }
            );
        this.showSpinner = false;
    }
     
openModal() {
    // to open modal set isModalOpen tarck value as true
    this.isModalOpen = true;
}
closeModals() {
    // to close modal set isModalOpen tarck value as false
    this.isModalOpen = false;
}


closeModal() {
  this.showModal = false;
}

showModalPopup() {
  this.showModal = true;

}
handleNameChange(event){
    this.ressourceName = event.target.value;
    this.ressourceEmail=event.target.value;

    this.ressourceid = event.target.value;
    this.ressourcePhone=event.target.value;

}
handleNameChange(event){
    this.ressourceName = event.target.value;
}
save() {
 
    const fields = {};
    fields[NAME_FIELD.fieldApiName] = this.ressourceName;
    const accRecordInput = { apiName: ressource__c_OBJECT.objectApiName, fields};
  
  
    createRecord(accRecordInput)
        .then(account => {
            this.ressourceId = account.id;
           // display success toast msg for account
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Success',
                    message: 'resource created',
                    variant: 'success',
                }),
            );
           
            
        })
        .catch(error => {
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Error creating record',
                    message: error.body.message,
                    variant: 'error',
                }),
            );
        });

       
    
}

    }