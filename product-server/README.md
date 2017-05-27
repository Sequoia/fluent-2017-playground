## TODO

* [X] ~~*Connect to redis server*~~
* [X] ~~*Connect to mongo server*~~
* [ ] Serve login page
* [X] ~~*Set up mongoose user*~~
* [X] ~~*Auth user against Mongo*~~
* [ ] Passport
  * [X] ~~*Local strategy*~~
  * [X] ~~*Session (default, in memory)*~~
  * [X] ~~*Serializing user?*~~
  * [ ] Store serialized user in redis
* [ ] Set session in redis

* [ ] Externalize stuff
  * [ ] redis host
  * [ ] redis port
  * [ ] redis pass
  * [ ] mongo URI


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