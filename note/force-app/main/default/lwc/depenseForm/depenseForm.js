import { LightningElement, track, api} from 'lwc';


export default class DepenseForm extends LightningElement {
    @api recordId;
    
    get options() {
        return [
            { label: 'New', value: 'new' },
            { label: 'In Progress', value: 'inProgress' },
            { label: 'Option1', value: 'Option1' },
            { label: 'Option2', value: 'Option2' },
            { label: 'Option3', value: 'Option3' },
            { label: 'Option4', value: 'Option4' },
            { label: 'Option5', value: 'Option5' },
            { label: 'Option6', value: 'Option6' },
            { label: 'Option7', value: 'Option7' },
            { label: 'Option8', value: 'Option8' },
            { label: 'Option9', value: 'Option9' },
            { label: 'Option10', value: 'Option10' },
        ];
    }
    
     @track openmodel = false;
    openmodal() {
        this.openmodel = true
    }
    closeModal() {
        this.openmodel = false
    } 
    saveMethod() {
        this.closeModal();
    }
}