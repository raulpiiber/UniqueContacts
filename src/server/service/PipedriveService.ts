import { Contact } from '../domain/Contact';
import { IContactService } from './IContactService';
const axios = require('axios');

export class PipedriveService implements IContactService {
 
    loadContacts = async() : Promise<Contact[]> => {
        let contactsJson = await axios.get(this.url)
        return this.mapContacts(contactsJson.data.data)
    }
    
    private mapContacts(contactsJsons: any[]) : Contact[] {
        return contactsJsons
        .map(contactJson => this.mapContact(contactJson))
        .filter(contact => contact != null)
    }

    private mapContact(contactJson: any) : Contact {
        if(contactJson) {
            return new Contact ({
                id: contactJson['id'],
                fullName: contactJson['name'],
                emailAddresses: contactJson['email'].map(email => email.value),
                addTime: contactJson['add_time'],
                updateTime: contactJson['update_time']
            })
        }
        return null;
    }

    private get url() : string {
        return `${process.env.PIPEDRIVE_URL}/v1/persons?api_token=${process.env.PIPEDRIVE_API_TOKEN}`;
    }
}
