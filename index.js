const core = require('@actions/core');
const github = require('@actions/github');
const { Client } = require('ckanClient');

try {
  // `who-to-greet` input defined in action metadata file
  const urlToHarvest = core.getInput('url-to-harvest');
  console.log(`URL to harvest: ${urlToHarvest}`);
  const time = (new Date()).toTimeString();
  core.setOutput("time", time);
  const client = new Client('eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJqdGkiOiJmbUgwRDlZMWlRSXVEdDBnMjg5UDgwenVRejYyYkRXdF9PeFRaSjM4eGxlYlJpbm5HclhYcTFwZndQbzE0Y3lETmM3ZThkaGhzLUtwUUcwVCIsImlhdCI6MTY3NDYzNDQ5OH0.qCcRh2GMouvnL5t6d_0Ya1Fw2uH09oc8RkrCSCo9bBk', '', '', 'https://ckan.x.demo.datopian.com')
  const dataset = await client.create({
    name: 'test',
  })
  console.log(dataset)
  // Get the JSON webhook payload for the event that triggered the workflow
  //   const payload = JSON.stringify(github.context.payload, undefined, 2)
  //   console.log(`The event payload: ${payload}`);
} catch (error) {
  core.setFailed(error.message);
}