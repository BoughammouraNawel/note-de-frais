public with sharing class ManageRecordsController {  
    @AuraEnabled(cacheable = true)  
    public static List<ressource__c> getAccountsList(Integer pagenumber, Integer numberOfRecords, Integer pageSize, String searchString) {  
      String searchKey = '%' + searchString + '%';  
      String query = 'select  Name,email_collaborateur__c from ressource__c ';  
      if (searchString != null && searchString != '') {  
        query += ' where name like \'%' + searchString + '%\' ';  
      }  
      query += ' limit ' + pageSize + ' offset ' + (pageSize * (pagenumber - 1));  
      return Database.query(query);  
    }  
    @AuraEnabled(cacheable = true)  
    public static Integer getAccountsCount(String searchString) {  
      String query = 'select count() from ressource__c ';  
      if (searchString != null && searchString != '') {  
        query += ' where name like \'%' + searchString + '%\' ';  
      }  
      return Database.countQuery(query);  
    }  
  }  