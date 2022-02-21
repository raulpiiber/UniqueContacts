Install:
npm install

Start using command:
npm run start

APIs:
GET localhost:3000/uniqueContacts/mailchimp/pipedrive
GET localhost:3000/uniqueContacts/pipedrive/mailchimp

NB! Mailchimp API returns maximum 1000 contacts on one request, for bigger lists multiple queries with offset parameter must be done (not implemented).

Extensibility:
To add new CRM or marketing tool service:
 * add new service implementation for IContactService interface
 * set new service to serviceMap
 * necessary configuration can be added to .env file