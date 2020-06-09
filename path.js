import { LightningElement, api, wire, track } from 'lwc';
// import getPicklistValues method from lightning/uiObjectInfoApi
import { getPicklistValues } from 'lightning/uiObjectInfoApi';
// import getObjectInfo method from lightning/uiObjectInfoApi
import { getObjectInfo } from 'lightning/uiObjectInfoApi';

import PICKLIST_FIELD from '@salesforce/schema/candidate__c.status__c';
// import record ui service to use crud services

// import show toast
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
// import update record api
import { updateRecord } from 'lightning/uiRecordApi';
import { getRecord, getFieldValue } from 'lightning/uiRecordApi';
import NAME_FIELD from '@salesforce/schema/candidate__c.Name';
import EMAIL_FIELD from '@salesforce/schema/candidate__c.email_collaborateur__c';
import PHONE_FIELD from '@salesforce/schema/candidate__c.Phone_number__c';
import ADRESSE_FIELD from '@salesforce/schema/candidate__c.Adress__c';
import CONTRAT_FIELD from '@salesforce/schema/candidate__c.Contract__c';
import PHOTO_FIELD from '@salesforce/schema/candidate__c.Photo__c';


import candidate__c_OBJECT from '@salesforce/schema/candidate__c';


 const FIELDS = [
    'candidate__c.Id',
    'candidate__c.status__c'
];
const fields = [NAME_FIELD,EMAIL_FIELD, PHONE_FIELD,ADRESSE_FIELD,CONTRAT_FIELD,PHOTO_FIELD];

export default class Path extends LightningElement {
    @api recordId;

    @wire(getRecord, { recordId: '$recordId', fields })
    candidate__c_OBJECT;

    get Name() {
        return getFieldValue(this.candidate__c_OBJECT.data, NAME_FIELD);
    };

    get Email() {
        return getFieldValue(this.candidate__c_OBJECT.data, EMAIL_FIELD);
    };
    get Phone() {
        return getFieldValue(this.candidate__c_OBJECT.data, PHONE_FIELD);
    };

    get Adresse() {
        return getFieldValue(this.candidate__c_OBJECT.data, ADRESSE_FIELD);
    };
   
  
    get Contrat() {
        return getFieldValue(this.candidate__c_OBJECT.data, CONTRAT_FIELD);
    };
    
    get Photo() {
        return getFieldValue(this.candidate__c_OBJECT.data, PHOTO_FIELD);
    };

    @api objectApiName;
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

handleSubmit(event){
    event.preventDefault();       // stop the form from submitting
    const fields = event.detail.fields;
    console.log('Fields -->',fields);
    this.template.querySelector('lightning-record-edit-form').submit(fields);
 }

 handleSuccess() {
       const event = new ShowToastEvent({
          title: 'Success',
          message: 'Ressource moved successfully',
          variant: 'success'
       });
       this.dispatchEvent(event);
 }



handlePopup() {
    this.template.querySelector("section").classList.remove("slds-hide");
    this.template
      .querySelector("div.modalBackdrops")
      .classList.remove("slds-hide");
  }

    }