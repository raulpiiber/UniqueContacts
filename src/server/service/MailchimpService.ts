import { Contact } from '../domain/Contact';
import { IContactService } from './IContactService';
const client = require('@mailchimp/mailchimp_marketing');

export class MailchimpService implements IContactService {

    constructor() {
        client.setConfig({
            apiKey: process.env.MAILCHIMP_API_KEY,
            server: process.env.MAILCHIMP_SERVER,
        });
    }

    loadContacts = async () : Promise<Contact[]> => {
        const contactsJson = await client.lists.getListMembersInfo(process.env.MAILCHIMP_LIST_ID, {count: 1000})
        return this.mapContacts(contactsJson);
    };

    private mapContacts(contactsJson: any[]) : Contact[] {
        return contactsJson['members']
        .map(contactJson => this.mapContact(contactJson))
        .filter(contact => contact != null)
    }

    private mapContact(contactJson: any) : Contact {
        if(contactJson) {
            return new Contact ({
                id: contactJson['id'],
                fullName: contactJson['full_name'],
                emailAddresses: [contactJson['email_address']],
                addTime: contactJson['timestamp_opt'],
                updateTime: contactJson['timestamp_opt']
            })
        }
        return null;
    }
}