public with sharing class ContactController {
  public ContactController() {
  }

  @AuraEnabled(cacheable=true)
  public static List<Contact> getContactList() {
    return [
      SELECT Id, Name, Title, Phone, Email, AccountId
      FROM Contact
      WITH SECURITY_ENFORCED
      LIMIT 10
    ];
  }

  @AuraEnabled(cacheable=true)
  public static List<Contact> getDevContactList() {
    return [
      SELECT Id, Name, Title, Phone, Email
      FROM Contact
      WHERE Title = 'Application Developer'
      WITH SECURITY_ENFORCED
      LIMIT 10
    ];
  }

  @AuraEnabled(cacheable=true)
  public static List<Contact> getCustSuccessContactList() {
    return [
      SELECT Id, Name, Title, Phone, Email
      FROM Contact
      WHERE Title = 'Customer Success'
      WITH SECURITY_ENFORCED
      LIMIT 10
    ];
  }

  @AuraEnabled(cacheable=true)
  public static Contact getSingleContact() {
    return [
      SELECT Id, Name, Title, Phone, Email
      FROM Contact
      WITH SECURITY_ENFORCED
      LIMIT 1
    ];
  }
}
