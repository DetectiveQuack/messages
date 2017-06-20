# Messages
[![Build Status](https://travis-ci.org/DetectiveQuack/messages.svg?branch=master)](https://travis-ci.org/DetectiveQuack/messages)

## Routes
### GET
  https://intense-basin-70441.herokuapp.com/messages/{id}

#### Usage
    curl https://intense-basin-70441.herokuapp.com/messages/1

### POST
  https://intense-basin-70441.herokuapp.com/messages

#### Usage
    curl https://intense-basin-70441.herokuapp.com/messages/ -d 'my test message to store'

## Requirements
* Postgres
### Environment Variable
Requires DATABASE_URL to be set to postgres db

#### Example
    export DATABASE_URL=postgres://postgres@localhost:5432/test

