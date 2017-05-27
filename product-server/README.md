## TODO

* [X] ~~*Connect to redis server*~~
* [X] ~~*Connect to mongo server*~~
* [X] ~~*Serve login page*~~
* [X] ~~*Set up mongoose user*~~
* [X] ~~*Auth user against Mongo*~~
* [X] ~~*Passport*~~
  * [X] ~~*Local strategy*~~
  * [X] ~~*Session (default, in memory)*~~
  * [X] ~~*Serializing user?*~~
  * [X] ~~*Store serialized user in redis*~~
* [X] ~~*Set session in redis*~~

* [X] ~~*Externalize stuff*~~
  * [X] ~~*redis host*~~
  * [X] ~~*redis port*~~
  * [X] ~~*redis pass*~~
  * [X] ~~*mongo URI*~~


## App server (JWT + auth checking)

* [ ] /buy/book
* [ ] check auth on buy
* [ ] Create token
* [ ] Return download link (to lambda)
* [ ] Externalize lambda link
* [ ] Externalize secret

## Lambda

* [ ] verify token
* [ ] Externalize secret
* [ ] send a file from s3
* [ ] Alias (passthrough) on `now`