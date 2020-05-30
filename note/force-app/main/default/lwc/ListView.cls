//Apex class to create listview automatically 

global class ListView Implements Schedulable
    {
        global void execute(SchedulableContext sc)
        {
            setToMiko();
        }

        public void setToMiko()
        {
            DateTime d = dateTime.now();
            string MonthName = d.format('MMMMM');
            
            List<note_de_frais__c> listofNotes = [select id,Name from note_de_frais__c where Name =: MonthName];
            if(listofNotes.isEmpty())
            {
                note_de_frais__c newNote = new note_de_frais__c();
                newNote.Name = MonthName;
                insert newNote;
            }
        }
    }
