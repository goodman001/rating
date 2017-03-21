#!/bin/bash
echo '[*]before test,please empty the database!'
#POST /user

curl --data "id=1&username=gump1994&firstname=Tom&lastname=Hanks&sex=M&age=60" 'http://127.0.0.1:3000/user'

curl --data "id=2&username=h0rcrux&firstname=Tom&lastname=Riddle&sex=M&age=71" 'http://127.0.0.1:3000/user'

curl --data "id=3&username=m1ssionP0zzible&firstname=Tom&lastname=Cruise&sex=M&age=54" 'http://127.0.0.1:3000/user'
#POST /user Forbid

curl --data "username=m1ssionP0zzible&firstname=Tom&lastname=Cruise&sex=M&age=54" 'http://127.0.0.1:3000/user'
#GET /users
curl http://127.0.0.1:3000/users



#GET /users?query
curl 'http://127.0.0.1:3000/users?firstname=Tom&sex=M'
curl 'http://127.0.0.1:3000/users?firstname=Tom&sex=F'
#GET /user?id=
curl 'http://127.0.0.1:3000/user?id=1'
curl 'http://127.0.0.1:3000/user?id=1000'
#GET /user?username=
curl 'http://127.0.0.1:3000/user?username=h0rcrux'
#DELETE /user?id= 
curl -X DELETE 'http://127.0.0.1:3000/user?id=3'
curl -X DELETE 'http://127.0.0.1:3000/user?id=3'
#PUT /user?id=
curl -X PUT -d 'username=gump1994&firstname=Tomm&lastname=Hankstest&sex=M&age=30' 'http://127.0.0.1:3000/user?id=1'
curl -X PUT -d 'username=gump1994&firstname=Tomm&lastname=Hankstest&sex=M&age=30' 'http://127.0.0.1:3000/user?id=100'

#POST /store
curl --data "storename=One%20Square&category=clothing&address=831%20Young%20Street" 'http://127.0.0.1:3000/store'
curl --data "storename=University&category=school&address=10%20Young%20Street" 'http://127.0.0.1:3000/store'
curl --data "storename=One%20Square&category=office&address=831%20Young%20Street" 'http://127.0.0.1:3000/store'
