# predix-static-app
### Instructions
> * **Staticfile.auth** --> Contains user name and hashed password (generated from [htaccesstool])
> * **Staticfile**      --> Defines the root directory of the content

### Command to create newrelic service in cloud foundry
```sh
$ cf cs predixplatform-newrelic standard newrelic
```

### Install newrelic npm dependency and add to package.json
```sh
$ npm install newrelic --save
```

### Command to push
```sh
$ cf push
```

[//]: # (These are reference links used in the body of this note and get stripped out when the markdown processor does its job. There is no need to format nicely because it shouldn't be seen.)

   [htaccesstool]: <http://www.htaccesstools.com/htpasswd-generator/>