public with sharing class dynamicRowsController {
      
    @AuraEnabled
    public static void saveAccountsLwc(List<ressource__c> records){
        if(records.size()>0 && records != null){
            List<ressource__c> accs = new List<ressource__c>();
            
            for(integer i = 0; i < records.size(); i++) {
                ressource__c acc = new ressource__c();
                acc.Id = records[i].Id;
                acc.Name = 'nawel';
                acc.Name = records[i].Name;
               
                accs.add(acc);
            }
            
            upsert accs;
        }
    }
    
  

    @AuraEnabled
    public static List<ressource__c> getAccounts(){
        return [SELECT  Name, email_collaborateur__c
                from ressource__c 
              ];
    }
    
    
    
    
    @AuraEnabled
    public static String deleteAccounts(String toDeleteId){
        List<ressource__c> acc = new List<ressource__c>();
        ressource__c a = new ressource__c();
        a.Id = toDeleteId;
        acc.add(a);
        Database.DeleteResult[] drList = Database.delete(acc, false);
		List<String> deletedIds = new List<String>();
        List<String> errorMessages = new List<String>();
        // Iterate through each returned result
        for(Database.DeleteResult dr : drList) {
            if (dr.isSuccess()) {
                // Operation was successful, so get the ID of the record that was processed
                System.debug('Successfully deleted collaborator with ID: ' + dr.getId());
                deletedIds.add(dr.getId());
                
            }
            else {
                // Operation failed, so get all errors                
                for(Database.Error err : dr.getErrors()) {
                    System.debug('The following error has occurred.');                    
                    System.debug(err.getStatusCode() + ': ' + err.getMessage());
                    System.debug('Account fields that affected this error: ' + err.getFields());
                    errorMessages.add(err.getMessage());
                }
                
            }
        }
        if(deletedIds.size() > 0)
            return 'success';
        else
            return errorMessages[0];
    }
    
}