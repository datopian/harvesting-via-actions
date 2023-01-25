const core = require('@actions/core');
const github = require('@actions/github');
const { Client } = require('ckan-client');
const fetch = require('node-fetch');

try {
  // `who-to-greet` input defined in action metadata file
  const urlToHarvest = core.getInput('url-to-harvest');
  console.log(`URL to harvest: ${urlToHarvest}`);
  fetch(urlToHarvest)
    .then(res => res.json())
    .then(json => {
      json.owner_org = 'test';
      delete json.id;
      const client = new Client(
        'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJqdGkiOiJmbUgwRDlZMWlRSXVEdDBnMjg5UDgwenVRejYyYkRXdF9PeFRaSjM4eGxlYlJpbm5HclhYcTFwZndQbzE0Y3lETmM3ZThkaGhzLUtwUUcwVCIsImlhdCI6MTY3NDYzNDQ5OH0.qCcRh2GMouvnL5t6d_0Ya1Fw2uH09oc8RkrCSCo9bBk',
        '',
        '',
        'https://ckan.x.demo.datopian.com'
      );
      client.create(json).then(console.log);
    });
} catch (error) {
  core.setFailed(error.message);
}