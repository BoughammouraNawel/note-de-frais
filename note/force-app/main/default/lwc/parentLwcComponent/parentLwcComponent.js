import { LightningElement, api } from "lwc";

export default class ParentLwcComponent extends LightningElement {
  @api recordId;
  @api objectApiName;
}