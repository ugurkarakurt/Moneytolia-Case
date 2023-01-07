# Moneytolia-Case with (with swapi.dev & json-server)

Contact list created with a **Fake REST API**

- [JSONPlaceholder - Live running version](https://jsonplaceholder.typicode.com/).
- [Serve - Live running version](https://github.com/vercel/serve/).

## Getting started

</br>

### Install Global Packages
```
npm install --global serve
```

```
npm install -g json-server
```

After the installations are successful, we need to run Json-server

```
json-server --watch .\assets\api\db.json

// Since it runs on" json server and react" 3000 port, we need to start json server first.
```

and next 

```
serve
With this command, our port is ready for the project.
```
In the browser, we can start our project by going to the port we created with serve and following the path <br>
=> templates > landing-page > index.html respectively.

 <em>Campaign list created with Fake API. With the json-server I use, GET/POST/PUT/DELETE requests can be sent to this api.</em>.

