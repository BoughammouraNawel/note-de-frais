import { LightningElement, api } from 'lwc';  
 export default class PaginatorBottom extends LightningElement {  
   // Api considered as a reactive public property.  
   @api totalrecords;  
   @api currentpage;  
   @api pagesize;  
   // Following are the private properties to a class.  
   lastpage = false;  
   firstpage = false;  
   // getter  
 
   //Fire events based on the button actions  
   handlePrevious() {  
     this.dispatchEvent(new CustomEvent('previous'));  
   }  
   handleNext() {  
     this.dispatchEvent(new CustomEvent('next'));  
   }  
  
 }  