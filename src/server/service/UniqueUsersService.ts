import { Contact } from '../domain/Contact';
import { IContactService } from './IContactService';

export class UniqueUsersService  {

    findUnique = async(serviceA: IContactService, serviceB: IContactService) : Promise<Contact[]> => {

        return Promise.all([
            serviceA.loadContacts(), 
            serviceB.loadContacts()
        ]).then((contacts) => {

            let contactA = contacts[0];
            let contactB = contacts[1];

            let emailsToExclude = contactB
            .flatMap((contact: Contact) => contact.emailAddresses)
            .map(email => email.toLowerCase());
  
            const uniqueContacts = contactA.filter((contact: Contact) => !this.includes(contact.emailAddresses, emailsToExclude))
            if(uniqueContacts && uniqueContacts.length > 0) {
                return uniqueContacts;
            }
            return this.noUniqueContactsFoundMessage()
        })
    }

    includes(emailsA: string[], emailsB: string[]) {
        return emailsA.find((email) => (emailsB.includes(email.toLowerCase())))
    }

    private noUniqueContactsFoundMessage() {
        return {message: "No unique contacts found"};
    }
}
