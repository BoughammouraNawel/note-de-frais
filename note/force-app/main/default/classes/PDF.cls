<apex:page standardController="Contract__c" renderAs="pdf" applyBodyTag="false">

    <head>
        <style> 
            body { font-family: 'Arial Unicode MS'; }
            .companyName { font: bold 30px; color: red; }  
       
       </style>
    
        <apex:image url="{!$Resource.logo}" style="float:right;width:40%; height:40px;" />
     

    </head>
   
    <body>
     
         Ref :<apex:outputText value="{!Contract__c.Name}" /> 
         
     
    
       
        <p>  <apex:outputText value="{!NOW()}" style="float:right; color: red;font-style: italic;position:absolute"></apex:outputText></p>
      
   <p> <h1> Contrat de travail </h1></p>
    <p><h1> Entre les soussigné(e)s :</h1></p>
     <p> 

     
      La societé RedLean a dénomé le collaborateur(e): <apex:form ><apex:outputfield value="{!Contract__c.ressource__c}"/> </apex:form> pour un contrat de type : <apex:form ><apex:outputfield value="{!Contract__c.Type__c}"/> </apex:form> 
    
       avec une periode d essai :<apex:form ><apex:outputfield value="{!Contract__c.trial_period__c}"/> </apex:form> pouvant demarré le : <apex:form ><apex:outputfield value="{!Contract__c.Start_date__c}"/> </apex:form> 
     </p>
   
   </body>
  

  
  
  
     <p><h1>  <apex:form > Signature</apex:form> </h1></p>
             <apex:image url="{!$Resource.signature}" style="float:left;" />
     
     </apex:page>
                         
