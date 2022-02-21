import express from 'express';
import { IContactService } from './server/service/IContactService';
import { MailchimpService } from './server/service/MailchimpService';
import { PipedriveService } from './server/service/PipedriveService';
import { UniqueUsersService } from './server/service/UniqueUsersService';
require('dotenv').config();

const app = express();
const port = process.env.SERVER_PORT;
const uniqueSerice = new UniqueUsersService();
const serviceMap = new Map<string, IContactService>();
serviceMap.set('PIPEDRIVE', new PipedriveService());
serviceMap.set('MAILCHIMP', new MailchimpService());

app.listen(port, () => {
  return console.log(`App is listening at http://localhost:${port}`);
});

app.get('/uniqueContacts/:serviceA/:serviceB', (req, res) => {
  
  const serviceA = serviceMap.get(req.params.serviceA.toUpperCase());
  if(serviceA == null) {
    res.send(unknownServiceMessage(req.params.serviceA))
    return;
  }
  const serviceB = serviceMap.get(req.params.serviceB.toUpperCase());
  if(serviceB == null) {
    res.send(unknownServiceMessage(req.params.serviceB))
    return;
  }
  
  uniqueSerice.findUnique(serviceA, serviceB)
  .then((uniqueUsers) => res.send(uniqueUsers))
});

function unknownServiceMessage(service: string): object {
  return {message : `Unknown service ${service}, valid services are: ${getValidServices()}`};
}

function getValidServices() : string {
  return Array.from(serviceMap.keys()).join(', ');
}
