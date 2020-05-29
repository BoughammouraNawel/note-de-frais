import { LightningElement, api } from "lwc";

export default class ChildDynamicRecordForm extends LightningElement {
  @api getIdFromParent;
  @api objectApiName;
}