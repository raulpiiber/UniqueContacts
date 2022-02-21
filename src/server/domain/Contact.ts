export class Contact {
    readonly id: string;
    readonly fullName: string;
    readonly emailAddresses: string[];
    readonly addTime: Date;
    readonly updateTime: Date;

    constructor(contact: Contact) {
        Object.assign(this, contact);
    }
}