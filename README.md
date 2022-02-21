## Configuration:
Create dotenv file (.env) in project root directory. Add configuration:
 * SERVER_PORT=... (example: SERVER_PORT=3000)
 * PIPEDRIVE_URL=...
 * PIPEDRIVE_API_TOKEN=...
 * MAILCHIMP_API_KEY=...
 * MAILCHIMP_SERVER=...
 * MAILCHIMP_LIST_ID=...

## Install:
npm install

## Start using command:
npm run start

## APIs:
GET localhost:<SERVER_PORT>/uniqueContacts/mailchimp/pipedrive  
GET localhost:<SERVER_PORT>/uniqueContacts/pipedrive/mailchimp

**NB!** Mailchimp API returns maximum 1000 contacts on one request, for bigger lists multiple queries with offset parameter must be done (not implemented).

## Extensibility:
To add new CRM or marketing tool service:
 * add new service implementation for IContactService interface
 * set new service to serviceMap
 * necessary configuration can be added to .env file