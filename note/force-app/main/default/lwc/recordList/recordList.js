import { LightningElement, track, api } from 'lwc';  

import getAccountsList from '@salesforce/apex/ManageRecordsController.getAccountsList';  
import getAccountsCount from '@salesforce/apex/ManageRecordsController.getAccountsCount';  
import deleteAccounts from '@salesforce/apex/dynamicRowsController.deleteAccounts';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class RecordList extends LightningElement {  
  @track isEdited = false;

  @track ressources;  
  @track error;  
  @api currentpage;  
  @api pagesize;  
  @track searchKey;  
  totalpages;  
  localCurrentPage = null;  
  isSearchChangeExecuted = false;  
  // not yet implemented  
  pageSizeOptions =  
    [  
      { label: '5', value: 5 },  
      { label: '10', value: 10 },  
      { label: '25', value: 25 },  
      { label: '50', value: 50 },  
      { label: 'All', value: '' },  
    ];  
  handleKeyChange(event) {  
    if (this.searchKey !== event.target.value) {  
      this.isSearchChangeExecuted = false;  
      this.searchKey = event.target.value;  
      this.currentpage = 1;  
    }  
  }  




  remove(event) { 
    let indexPosition = event.currentTarget.name;
    const recId = event.currentTarget.dataset.id;
            
    deleteAccounts({toDeleteId : recId})
    .then(() => {
        this.dispatchEvent(
            new ShowToastEvent({
                title : 'Success',
                message : `Record deleted succesfully!`,
                variant : 'success',
            }),
        )
        if(this.myList.length > 1) 
        this.myList.splice(indexPosition, 1);
        this.error = undefined;
    })
    .catch(error => {
        this.error = error;
    })
}

add() {
  let newList = this.ressources;
  newList.push({Name : "",  email_collaborateur__c : "" });
  this.ressources = newList;
}



  renderedCallback() {  
    // This line added to avoid duplicate/multiple executions of this code.  
    if (this.isSearchChangeExecuted && (this.localCurrentPage === this.currentpage)) {  
      return;  
    }  
    this.isSearchChangeExecuted = true;  
    this.localCurrentPage = this.currentpage;  
    getAccountsCount({ searchString: this.searchKey })  
      .then(recordsCount => {  
        this.totalrecords = recordsCount;  
        if (recordsCount !== 0 && !isNaN(recordsCount)) {  
          this.totalpages = Math.ceil(recordsCount / this.pagesize);  
          getAccountsList({ pagenumber: this.currentpage, numberOfRecords: recordsCount, pageSize: this.pagesize, searchString: this.searchKey })  
            .then(accountList => {  
              this.ressources = accountList;  
              this.error = undefined;  
            })  
            .catch(error => {  
              this.error = error;  
              this.ressources = undefined;  
            });  
        } else {  
          this.ressources = [];  
          this.totalpages = 1;  
          this.totalrecords = 0;  
        }  
        const event = new CustomEvent('recordsload', {  
          detail: recordsCount  
        });  
        this.dispatchEvent(event);  
      })  
      .catch(error => {  
        this.error = error;  
        this.totalrecords = undefined;  
      });  
  }  
}  