import { LightningElement, api,wire} from 'lwc';


import {ShowToastEvent} from 'lightning/platformShowToastEvent';

import { getRecord, getFieldValue } from 'lightning/uiRecordApi';
import TITLE_FIELD from '@salesforce/schema/note_de_frais__c.Name';

const fields = [TITLE_FIELD];

export default class Record extends LightningElement {
    @api recordId;
  
    @wire(getRecord, { recordId: '$recordId', fields })
    note_de_frais__c_OBJECT;

    get Title() {
        return getFieldValue(this.note_de_frais__c_OBJECT.data, TITLE_FIELD);
    };

    handleSubmit(event){
        event.preventDefault();       // stop the form from submitting
        const fields = event.detail.fields;
        console.log('Fields -->',fields);
        this.template.querySelector('lightning-record-edit-form').submit(fields);
     }
  
     handleSuccess() {
           const event = new ShowToastEvent({
              title: 'Success',
              message: 'Depense created successfully',
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
    
      handleSkip() {
        this.template.querySelector("section").classList.add("slds-hide");
        this.template
          .querySelector("div.modalBackdrops")
          .classList.add("slds-hide");
      }

      
      // accepted parameters
      get acceptedFormats() {
          return ['.pdf', '.png','.jpg','.jpeg'];
       
        }
      handleUploadFinished(event) {
          let strFileNames = '';
          // Get the list of uploaded files
          const uploadedFiles = event.detail.files;
  
          for(let i = 0; i < uploadedFiles.length; i++) {
              strFileNames += uploadedFiles[i].name + ', ';
          }
          this.dispatchEvent(
              new ShowToastEvent({
                  title: 'Success!!',
                  message: strFileNames + ' Files uploaded Successfully!!!',
                  variant: 'success',
              }),
          );
      }
  }
