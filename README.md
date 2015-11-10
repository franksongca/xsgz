# Installation process:

### Setup general environment

- Install nginx from [here](http://wiki.nginx.org/Install)
- Configure nginx by adding the configuration snippet at the bottom of this page to your nginx/conf/nginx.conf file
- Create an `ss.crt` and `ss.key` by following the instructions from [here](http://www.akadia.com/services/ssh_test_certificate.html). Make a note of the folder in which you stored them.
- Open the `nginx/nginx.conf` file in this project and edit the lines 48 and 49 to point to where your ssl keys (see above) are stored.
- Edit lines 63 and 64 to point to your project.
- Move this edited `nginx.conf` file to the conf folder of your nginx installation.
- Install nodejs from [here](http://nodejs.org/download/)
- Add this host-entry to your OS host file: `127.0.0.1    www.socialstraw.com` 
- To change the host file for your OS you can follow [this](http://www.rackspace.com/knowledge_center/article/how-do-i-modify-my-hosts-file)
- In the command line type: `$ npm install -g grunt-cli`

### Setup project environment

- In the command line, navigate to the folder into which you want to install the project eg: `$ cd path/to/my/workspace`
- Type `$ git clone ssh://git@jira.sigma-canada.com:7999/socstra/socialstraw-ui-new.git socialstrawnew`
- Type `$ cd socialstrawnew`
- `$ npm install`
- `$ bower install`
- `$ grunt`
- Go to your nginx folder and type: `$ nginx` to start nginx
- Go [here](https://socialstraw.com) to view in the browser

### TROUBLESHOOTING

#### I can't see anything in the browser

- Make sure nginx is running
- Look in the logs for the express server in `/socialstraw/server/logs` to diagnose.

