import Common from './Common.js';

class API {
 constructor() {
  this.apiMethods = {
   search: this.search,
  };
 }

 async processAPI(name, params) {
  //console.log('API request:', name);
  //console.log('Parameters:', params);
  const method = this.apiMethods[name];
  if (method) return await method.call(this, params);
  else return { error: 1, message: 'API not found' };
 }

 async search(p) {
  const api_key = Common.settings.tenor.api_key;
  const client_key = Common.settings.tenor.client_key;

  const q = p.q;
  const limit = p.limit || 12;
  const pos = p.pos;

  let url = "https://tenor.googleapis.com/v2/search?q=" + q + "&key=" +
      api_key +"&client_key=" + client_key +  "&limit=" + limit;
  if (pos)
    url += "&pos=" + pos;

  console.log('API request:', url);

  let result = await fetch(url);

  if (!result.ok) {
   Common.addLog(result.statusText);
   return {
    error: 1,
    message: 'API request failed',
   }
  }

  return {
   error: 0,
   data: await result.json(),
  };

 }

}

export default API;
