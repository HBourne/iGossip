# iGossip
**iGossip** is a social platform specifically designed for students who are interested in the courses their universities are offering. With the support of IGossip, students can have easy access to comments, average past GPA, descriptions, professor ratings and a lot more.

The app is basically based on Django, React, Mysql & MongoDB and is still in progress. Also, relevant data will not be provided.

This README is for instructing how to start the app on a Linux/MacOS server.

## Prequisites
- Linux/MacOS
- Python (>= 3.6.0)
- npm
- Clone of the repo
- MySQL
- MongoDB

### Step 1 - Install Django
Make sure you are using ***Python 3.6.0 or newer versions*** since the version of Django used in this repo is 3.0, which does not support previous versions according to the official document.
```
$ python -m pip install Django
```

### Step 2 - Install Django Rest-framework & filter
```
$ pip install djangorestframework
$ pip install django-filter
```

### Step 3 - Install MySQL Client
For Linux:
```
$ sudo apt-get install python-dev default-libmysqlclient-dev
```
For MacOS:
```
$ brew install mysql-client
```
Install from PyPI (recommended):
```
$ pip install mysqlclient
```

### Step 4 - Modify Settings & Migrate Model
Create `mysql.conf` at any place you like and add the following:
```
[client]
database = the data base you'd like to use
user = your username
password = your password
host = 127.0.0.1
port = 3306
default-character-set = utf8
```

Modify the `read_default_file` in `.app/base/settings.py` to the path where your `mysql.conf` is:
```
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'OPTIONS': {
            'read_default_file': '/path/to/your/mysql.conf',
        },
    }
}
```

Make sure your MySQL is running well and there is such a database as indicated in your `mysql.conf` before you start migrate, otherwise, errors will be raised. If these are all set, you can then start migrating, which will create a table in your selected database accordingly:
```
$ python .app/manage.py migrate
```

If you're running your MySQL in a docker container, you might have to add a `root`@`172.17.0.1` user to your database since MySQL in this scenario will be visited as `172.17.0.1` instead of `127.0.0.1`.
Refer to [this solution](https://github.com/docker-library/mysql/issues/275#issuecomment-330113998) if necessary.

### Step 5 - Start Backend Server for MySQL
```
$ python .app/manage.py runserver
```
After running the command above, you should be able to see an API interface through `127.0.0.1:8000/api/test`. If so, you're done with the backend!

### Step 6 - Install Frontend Packages
```
$ cd app/frontend
$ npm i webpack webpack-cli
$ npm i @babel/core babel-loader @babel/preset-env @babel/preset-react @babel/plugin-proposal-class-properties
$ npm i react react-dom react-router-dom react-cookies
$ npm i less less-loader css-loader style-loader url-loader
$ npm i antd
$ npm i axios
```
If you have any problem installing `antd` on MacOS, please refer to https://github.com/schnerd/d3-scale-cluster/issues/7.

Also, ensure you have `yarn` since we have to install ant design icons through `yarn`:
```
$ yarn add @ant-design/icons@4.0.0
```
Ensure your have the latest version of node.js

```
$ npm i -g npm
```

Then, run the frontend:

```
$ cd .app/frontend && npm run dev
```

### Step 7 - Install Node Packages for MongoDB Backend
```
$ cd app/mongo
$ npm i express mongoose
```

### Step 8 - Start Backend Server for MongoDB
```
$ cd app/mongo
$ node index.js
```
Remember to start the API service for MongoDB on a different port other than the port for MySQL API. In this case, use any port except 8000. You can manually change the port you'd like your MongoDB API to run on in `index.js`.

----------------------

If no error has been raised, you should now be able to see whatever you've posted to the api through `127.0.0.1:8000`.

#### Enjoy!
