---
title: API Reference

language_tabs:
- bash

- javascript


includes:

search: true

toc_footers:
- <a href='http://github.com/mpociot/documentarian'>Documentation Powered by Documentarian</a>


---
<!-- START_INFO -->
# Info

Welcome to the generated API reference.
[Get Postman Collection](http://localhost/docs/collection.json)

<!-- END_INFO -->

#general
<!-- START_d7b7952e7fdddc07c978c9bdaf757acf -->
## api/register
> Example request:

```bash
curl -X POST "http://localhost/api/register" 
```


```javascript
const url = new URL("http://localhost/api/register");

let headers = {
    "Accept": "application/json",
    "Content-Type": "application/json",
}

fetch(url, {
    method: "POST",
    headers: headers,
})
    .then(response => response.json())
    .then(json => console.log(json));
```




### HTTP Request
`POST api/register`


<!-- END_d7b7952e7fdddc07c978c9bdaf757acf -->


<!-- START_c3fa189a6c95ca36ad6ac4791a873d23 -->
## api/login
> Example request:

```bash
curl -X POST "http://localhost/api/login" 
```


```javascript
const url = new URL("http://localhost/api/login");

let headers = {
    "Accept": "application/json",
    "Content-Type": "application/json",
}

fetch(url, {
    method: "POST",
    headers: headers,
})
    .then(response => response.json())
    .then(json => console.log(json));
```




### HTTP Request
`POST api/login`


<!-- END_c3fa189a6c95ca36ad6ac4791a873d23 -->


<!-- START_fc1e4f6a697e3c48257de845299b71d5 -->
## api/users
> Example request:

```bash
curl -X GET -G "http://localhost/api/users" 
```


```javascript
const url = new URL("http://localhost/api/users");

let headers = {
    "Accept": "application/json",
    "Content-Type": "application/json",
}

fetch(url, {
    method: "GET",
    headers: headers,
})
    .then(response => response.json())
    .then(json => console.log(json));
```



> Example response (200):


```json
[
    {
        "id": 1,
        "user_name": "jacques69",
        "email": "bobby75@bode.info",
        "last_login": null,
        "reset_token": null,
        "reset_token_last_updated": null,
        "created_at": "2019-05-11 13:18:38",
        "updated_at": "2019-05-11 13:18:38"
    },
    {
        "id": 2,
        "user_name": "don16",
        "email": "robbie.huels@hotmail.com",
        "last_login": null,
        "reset_token": null,
        "reset_token_last_updated": null,
        "created_at": "2019-05-11 13:18:38",
        "updated_at": "2019-05-11 13:18:38"
    },
    {
        "id": 3,
        "user_name": "friedrich.kub",
        "email": "eliza23@yahoo.com",
        "last_login": null,
        "reset_token": null,
        "reset_token_last_updated": null,
        "created_at": "2019-05-11 13:18:38",
        "updated_at": "2019-05-11 13:18:38"
    },
    {
        "id": 4,
        "user_name": "qwiegand",
        "email": "gottlieb.orland@hotmail.com",
        "last_login": null,
        "reset_token": null,
        "reset_token_last_updated": null,
        "created_at": "2019-05-11 13:18:38",
        "updated_at": "2019-05-11 13:18:38"
    },
    {
        "id": 5,
        "user_name": "dubuque.soledad",
        "email": "jebert@yahoo.com",
        "last_login": null,
        "reset_token": null,
        "reset_token_last_updated": null,
        "created_at": "2019-05-11 13:18:38",
        "updated_at": "2019-05-11 13:18:38"
    },
    {
        "id": 6,
        "user_name": "bartoletti.bernice",
        "email": "swift.andrew@gmail.com",
        "last_login": null,
        "reset_token": null,
        "reset_token_last_updated": null,
        "created_at": "2019-05-11 13:18:38",
        "updated_at": "2019-05-11 13:18:38"
    },
    {
        "id": 7,
        "user_name": "rpfeffer",
        "email": "bette68@gleichner.net",
        "last_login": null,
        "reset_token": null,
        "reset_token_last_updated": null,
        "created_at": "2019-05-11 13:18:38",
        "updated_at": "2019-05-11 13:18:38"
    },
    {
        "id": 8,
        "user_name": "dominique85",
        "email": "linda86@hilpert.com",
        "last_login": null,
        "reset_token": null,
        "reset_token_last_updated": null,
        "created_at": "2019-05-11 13:18:39",
        "updated_at": "2019-05-11 13:18:39"
    },
    {
        "id": 9,
        "user_name": "heichmann",
        "email": "schmidt.bennett@yahoo.com",
        "last_login": null,
        "reset_token": null,
        "reset_token_last_updated": null,
        "created_at": "2019-05-11 13:18:39",
        "updated_at": "2019-05-11 13:18:39"
    },
    {
        "id": 10,
        "user_name": "gibson.jacinto",
        "email": "csipes@krajcik.com",
        "last_login": null,
        "reset_token": null,
        "reset_token_last_updated": null,
        "created_at": "2019-05-11 13:18:39",
        "updated_at": "2019-05-11 13:18:39"
    },
    {
        "id": 11,
        "user_name": "dtorp",
        "email": "bauch.patricia@yahoo.com",
        "last_login": null,
        "reset_token": null,
        "reset_token_last_updated": null,
        "created_at": "2019-05-11 13:18:39",
        "updated_at": "2019-05-11 13:18:39"
    },
    {
        "id": 12,
        "user_name": "gleason.brant",
        "email": "cummerata.terrence@hotmail.com",
        "last_login": null,
        "reset_token": null,
        "reset_token_last_updated": null,
        "created_at": "2019-05-11 13:18:39",
        "updated_at": "2019-05-11 13:18:39"
    },
    {
        "id": 13,
        "user_name": "plangosh",
        "email": "mraz.lon@yahoo.com",
        "last_login": null,
        "reset_token": null,
        "reset_token_last_updated": null,
        "created_at": "2019-05-11 13:18:39",
        "updated_at": "2019-05-11 13:18:39"
    },
    {
        "id": 14,
        "user_name": "vincenzo90",
        "email": "bschmitt@lebsack.org",
        "last_login": null,
        "reset_token": null,
        "reset_token_last_updated": null,
        "created_at": "2019-05-11 13:18:39",
        "updated_at": "2019-05-11 13:18:39"
    },
    {
        "id": 15,
        "user_name": "rfeest",
        "email": "emanuel24@yahoo.com",
        "last_login": null,
        "reset_token": null,
        "reset_token_last_updated": null,
        "created_at": "2019-05-11 13:18:39",
        "updated_at": "2019-05-11 13:18:39"
    },
    {
        "id": 16,
        "user_name": "colin93",
        "email": "coby66@gislason.info",
        "last_login": null,
        "reset_token": null,
        "reset_token_last_updated": null,
        "created_at": "2019-05-11 13:18:39",
        "updated_at": "2019-05-11 13:18:39"
    },
    {
        "id": 17,
        "user_name": "lockman.jacey",
        "email": "tillman.roman@bosco.biz",
        "last_login": null,
        "reset_token": null,
        "reset_token_last_updated": null,
        "created_at": "2019-05-11 13:18:39",
        "updated_at": "2019-05-11 13:18:39"
    },
    {
        "id": 18,
        "user_name": "alford.lynch",
        "email": "eherman@yahoo.com",
        "last_login": null,
        "reset_token": null,
        "reset_token_last_updated": null,
        "created_at": "2019-05-11 13:18:39",
        "updated_at": "2019-05-11 13:18:39"
    },
    {
        "id": 19,
        "user_name": "tklocko",
        "email": "juwan.metz@ziemann.com",
        "last_login": null,
        "reset_token": null,
        "reset_token_last_updated": null,
        "created_at": "2019-05-11 13:18:39",
        "updated_at": "2019-05-11 13:18:39"
    },
    {
        "id": 20,
        "user_name": "bmarquardt",
        "email": "jevon90@oreilly.org",
        "last_login": null,
        "reset_token": null,
        "reset_token_last_updated": null,
        "created_at": "2019-05-11 13:18:40",
        "updated_at": "2019-05-11 13:18:40"
    },
    {
        "id": 21,
        "user_name": "uhilpert",
        "email": "jerad.flatley@hotmail.com",
        "last_login": null,
        "reset_token": null,
        "reset_token_last_updated": null,
        "created_at": "2019-05-11 13:18:40",
        "updated_at": "2019-05-11 13:18:40"
    },
    {
        "id": 22,
        "user_name": "ansel83",
        "email": "yvandervort@gmail.com",
        "last_login": null,
        "reset_token": null,
        "reset_token_last_updated": null,
        "created_at": "2019-05-11 13:18:40",
        "updated_at": "2019-05-11 13:18:40"
    },
    {
        "id": 23,
        "user_name": "mcdermott.merl",
        "email": "rosa12@lesch.biz",
        "last_login": null,
        "reset_token": null,
        "reset_token_last_updated": null,
        "created_at": "2019-05-11 13:18:40",
        "updated_at": "2019-05-11 13:18:40"
    },
    {
        "id": 24,
        "user_name": "ciara99",
        "email": "bridgette.von@wilkinson.info",
        "last_login": null,
        "reset_token": null,
        "reset_token_last_updated": null,
        "created_at": "2019-05-11 13:18:40",
        "updated_at": "2019-05-11 13:18:40"
    },
    {
        "id": 25,
        "user_name": "littel.noemy",
        "email": "sboehm@parker.biz",
        "last_login": null,
        "reset_token": null,
        "reset_token_last_updated": null,
        "created_at": "2019-05-11 13:18:40",
        "updated_at": "2019-05-11 13:18:40"
    },
    {
        "id": 26,
        "user_name": "meggie.streich",
        "email": "bethel82@oconner.net",
        "last_login": null,
        "reset_token": null,
        "reset_token_last_updated": null,
        "created_at": "2019-05-11 13:18:40",
        "updated_at": "2019-05-11 13:18:40"
    },
    {
        "id": 27,
        "user_name": "cynthia81",
        "email": "pflatley@yahoo.com",
        "last_login": null,
        "reset_token": null,
        "reset_token_last_updated": null,
        "created_at": "2019-05-11 13:18:40",
        "updated_at": "2019-05-11 13:18:40"
    },
    {
        "id": 28,
        "user_name": "juanita10",
        "email": "candelario27@kunde.com",
        "last_login": null,
        "reset_token": null,
        "reset_token_last_updated": null,
        "created_at": "2019-05-11 13:18:40",
        "updated_at": "2019-05-11 13:18:40"
    },
    {
        "id": 29,
        "user_name": "santino.kessler",
        "email": "janis.kreiger@jenkins.com",
        "last_login": null,
        "reset_token": null,
        "reset_token_last_updated": null,
        "created_at": "2019-05-11 13:18:40",
        "updated_at": "2019-05-11 13:18:40"
    },
    {
        "id": 30,
        "user_name": "lew.gleason",
        "email": "kconroy@yahoo.com",
        "last_login": null,
        "reset_token": null,
        "reset_token_last_updated": null,
        "created_at": "2019-05-11 13:18:41",
        "updated_at": "2019-05-11 13:18:41"
    },
    {
        "id": 31,
        "user_name": "test@test.com",
        "email": "test@test.com",
        "last_login": null,
        "reset_token": null,
        "reset_token_last_updated": null,
        "created_at": "2019-05-11 13:19:00",
        "updated_at": "2019-05-11 13:19:00"
    }
]
```

### HTTP Request
`GET api/users`


<!-- END_fc1e4f6a697e3c48257de845299b71d5 -->


<!-- START_12e37982cc5398c7100e59625ebb5514 -->
## api/users
> Example request:

```bash
curl -X POST "http://localhost/api/users" 
```


```javascript
const url = new URL("http://localhost/api/users");

let headers = {
    "Accept": "application/json",
    "Content-Type": "application/json",
}

fetch(url, {
    method: "POST",
    headers: headers,
})
    .then(response => response.json())
    .then(json => console.log(json));
```




### HTTP Request
`POST api/users`


<!-- END_12e37982cc5398c7100e59625ebb5514 -->


<!-- START_8653614346cb0e3d444d164579a0a0a2 -->
## api/users/{user}
> Example request:

```bash
curl -X GET -G "http://localhost/api/users/1" 
```


```javascript
const url = new URL("http://localhost/api/users/1");

let headers = {
    "Accept": "application/json",
    "Content-Type": "application/json",
}

fetch(url, {
    method: "GET",
    headers: headers,
})
    .then(response => response.json())
    .then(json => console.log(json));
```



> Example response (200):


```json
{
    "user": {
        "id": 1,
        "user_name": "jacques69",
        "email": "bobby75@bode.info",
        "last_login": null,
        "reset_token": null,
        "reset_token_last_updated": null,
        "created_at": "2019-05-11 13:18:38",
        "updated_at": "2019-05-11 13:18:38"
    }
}
```

### HTTP Request
`GET api/users/{user}`


<!-- END_8653614346cb0e3d444d164579a0a0a2 -->


<!-- START_78e59f373e92a1bb338f7d17b183ae6a -->
## api/users/{user}
> Example request:

```bash
curl -X PUT "http://localhost/api/users/1" 
```


```javascript
const url = new URL("http://localhost/api/users/1");

let headers = {
    "Accept": "application/json",
    "Content-Type": "application/json",
}

fetch(url, {
    method: "PUT",
    headers: headers,
})
    .then(response => response.json())
    .then(json => console.log(json));
```




### HTTP Request
`PUT api/users/{user}`


<!-- END_78e59f373e92a1bb338f7d17b183ae6a -->


<!-- START_d2db7a9fe3abd141d5adbc367a88e969 -->
## api/users/{user}
> Example request:

```bash
curl -X DELETE "http://localhost/api/users/1" 
```


```javascript
const url = new URL("http://localhost/api/users/1");

let headers = {
    "Accept": "application/json",
    "Content-Type": "application/json",
}

fetch(url, {
    method: "DELETE",
    headers: headers,
})
    .then(response => response.json())
    .then(json => console.log(json));
```




### HTTP Request
`DELETE api/users/{user}`


<!-- END_d2db7a9fe3abd141d5adbc367a88e969 -->


<!-- START_61fae94aba01cd5c59eacf8d4667944f -->
## Display a listing of the resource.

> Example request:

```bash
curl -X GET -G "http://localhost/api/daymeals" 
```


```javascript
const url = new URL("http://localhost/api/daymeals");

let headers = {
    "Accept": "application/json",
    "Content-Type": "application/json",
}

fetch(url, {
    method: "GET",
    headers: headers,
})
    .then(response => response.json())
    .then(json => console.log(json));
```



> Example response (401):


```json
{
    "message": "Token not provided"
}
```

### HTTP Request
`GET api/daymeals`


<!-- END_61fae94aba01cd5c59eacf8d4667944f -->


<!-- START_b35363da68d6786fd1c6c8c8726c2bb6 -->
## Store a newly created resource in storage.

> Example request:

```bash
curl -X GET -G "http://localhost/api/daymeals-current" 
```


```javascript
const url = new URL("http://localhost/api/daymeals-current");

let headers = {
    "Accept": "application/json",
    "Content-Type": "application/json",
}

fetch(url, {
    method: "GET",
    headers: headers,
})
    .then(response => response.json())
    .then(json => console.log(json));
```



> Example response (401):


```json
{
    "message": "Token not provided"
}
```

### HTTP Request
`GET api/daymeals-current`


<!-- END_b35363da68d6786fd1c6c8c8726c2bb6 -->


<!-- START_f5c647e6e273320fed083793b730ce4d -->
## Display the specified resource.

> Example request:

```bash
curl -X GET -G "http://localhost/api/daymeals/1" 
```


```javascript
const url = new URL("http://localhost/api/daymeals/1");

let headers = {
    "Accept": "application/json",
    "Content-Type": "application/json",
}

fetch(url, {
    method: "GET",
    headers: headers,
})
    .then(response => response.json())
    .then(json => console.log(json));
```



> Example response (401):


```json
{
    "message": "Token not provided"
}
```

### HTTP Request
`GET api/daymeals/{monday}`


<!-- END_f5c647e6e273320fed083793b730ce4d -->


<!-- START_94ef11e5e34fc4b6b837aee68bebbbac -->
## Update the specified resource in storage.

> Example request:

```bash
curl -X PUT "http://localhost/api/daymeals-update" 
```


```javascript
const url = new URL("http://localhost/api/daymeals-update");

let headers = {
    "Accept": "application/json",
    "Content-Type": "application/json",
}

fetch(url, {
    method: "PUT",
    headers: headers,
})
    .then(response => response.json())
    .then(json => console.log(json));
```




### HTTP Request
`PUT api/daymeals-update`


<!-- END_94ef11e5e34fc4b6b837aee68bebbbac -->


<!-- START_9408750ca433bc115cfb10fbb3d5209f -->
## Get shoppinglist for a given week.

> Example request:

```bash
curl -X GET -G "http://localhost/api/shopping-list/1" 
```


```javascript
const url = new URL("http://localhost/api/shopping-list/1");

let headers = {
    "Accept": "application/json",
    "Content-Type": "application/json",
}

fetch(url, {
    method: "GET",
    headers: headers,
})
    .then(response => response.json())
    .then(json => console.log(json));
```



> Example response (401):


```json
{
    "message": "Token not provided"
}
```

### HTTP Request
`GET api/shopping-list/{monday}`


<!-- END_9408750ca433bc115cfb10fbb3d5209f -->


<!-- START_02bd2d3d1a63764c37b57d681aef9ddb -->
## Display a listing of the resource.

> Example request:

```bash
curl -X GET -G "http://localhost/api/recipes" 
```


```javascript
const url = new URL("http://localhost/api/recipes");

let headers = {
    "Accept": "application/json",
    "Content-Type": "application/json",
}

fetch(url, {
    method: "GET",
    headers: headers,
})
    .then(response => response.json())
    .then(json => console.log(json));
```



> Example response (401):


```json
{
    "message": "Token not provided"
}
```

### HTTP Request
`GET api/recipes`


<!-- END_02bd2d3d1a63764c37b57d681aef9ddb -->


<!-- START_bb080581db5f1515ef30ecca0742c0a3 -->
## Display a listing of the resource.

> Example request:

```bash
curl -X GET -G "http://localhost/api/recipesAll" 
```


```javascript
const url = new URL("http://localhost/api/recipesAll");

let headers = {
    "Accept": "application/json",
    "Content-Type": "application/json",
}

fetch(url, {
    method: "GET",
    headers: headers,
})
    .then(response => response.json())
    .then(json => console.log(json));
```



> Example response (401):


```json
{
    "message": "Token not provided"
}
```

### HTTP Request
`GET api/recipesAll`


<!-- END_bb080581db5f1515ef30ecca0742c0a3 -->


<!-- START_dc664fc70403b4fefc98b982ddf6d3dc -->
## Store a newly created resource in storage.

> Example request:

```bash
curl -X POST "http://localhost/api/recipes" 
```


```javascript
const url = new URL("http://localhost/api/recipes");

let headers = {
    "Accept": "application/json",
    "Content-Type": "application/json",
}

fetch(url, {
    method: "POST",
    headers: headers,
})
    .then(response => response.json())
    .then(json => console.log(json));
```




### HTTP Request
`POST api/recipes`


<!-- END_dc664fc70403b4fefc98b982ddf6d3dc -->


<!-- START_029ea329f0cde361151117ebf64049d3 -->
## Remove the specified resource from storage.

> Example request:

```bash
curl -X POST "http://localhost/api/recipes/image/store" 
```


```javascript
const url = new URL("http://localhost/api/recipes/image/store");

let headers = {
    "Accept": "application/json",
    "Content-Type": "application/json",
}

fetch(url, {
    method: "POST",
    headers: headers,
})
    .then(response => response.json())
    .then(json => console.log(json));
```




### HTTP Request
`POST api/recipes/image/store`


<!-- END_029ea329f0cde361151117ebf64049d3 -->


<!-- START_b79afadf0a73ac65cac663f7dd84b934 -->
## Display the specified resource.

> Example request:

```bash
curl -X GET -G "http://localhost/api/recipes/1" 
```


```javascript
const url = new URL("http://localhost/api/recipes/1");

let headers = {
    "Accept": "application/json",
    "Content-Type": "application/json",
}

fetch(url, {
    method: "GET",
    headers: headers,
})
    .then(response => response.json())
    .then(json => console.log(json));
```



> Example response (401):


```json
{
    "message": "Token not provided"
}
```

### HTTP Request
`GET api/recipes/{slug}`


<!-- END_b79afadf0a73ac65cac663f7dd84b934 -->


<!-- START_744c593273eee3474d92b2dff19c89a7 -->
## Update the specified resource in storage.

> Example request:

```bash
curl -X PUT "http://localhost/api/recipes/1" 
```


```javascript
const url = new URL("http://localhost/api/recipes/1");

let headers = {
    "Accept": "application/json",
    "Content-Type": "application/json",
}

fetch(url, {
    method: "PUT",
    headers: headers,
})
    .then(response => response.json())
    .then(json => console.log(json));
```




### HTTP Request
`PUT api/recipes/{slug}`


<!-- END_744c593273eee3474d92b2dff19c89a7 -->


<!-- START_e806a10918386bf7e2a23ec0f4d6ed51 -->
## Remove the specified resource from storage.

> Example request:

```bash
curl -X DELETE "http://localhost/api/recipes/1" 
```


```javascript
const url = new URL("http://localhost/api/recipes/1");

let headers = {
    "Accept": "application/json",
    "Content-Type": "application/json",
}

fetch(url, {
    method: "DELETE",
    headers: headers,
})
    .then(response => response.json())
    .then(json => console.log(json));
```




### HTTP Request
`DELETE api/recipes/{id}`


<!-- END_e806a10918386bf7e2a23ec0f4d6ed51 -->


<!-- START_84f4e02edf1836e8107c34a8659fbcf6 -->
## Display a listing of the resource.

> Example request:

```bash
curl -X GET -G "http://localhost/api/recipe-tags" 
```


```javascript
const url = new URL("http://localhost/api/recipe-tags");

let headers = {
    "Accept": "application/json",
    "Content-Type": "application/json",
}

fetch(url, {
    method: "GET",
    headers: headers,
})
    .then(response => response.json())
    .then(json => console.log(json));
```



> Example response (401):


```json
{
    "message": "Token not provided"
}
```

### HTTP Request
`GET api/recipe-tags`


<!-- END_84f4e02edf1836e8107c34a8659fbcf6 -->


<!-- START_b6c9d3544f0b2214823f92765e7e54d5 -->
## Store a newly created resource in storage.

> Example request:

```bash
curl -X POST "http://localhost/api/recipe-tags" 
```


```javascript
const url = new URL("http://localhost/api/recipe-tags");

let headers = {
    "Accept": "application/json",
    "Content-Type": "application/json",
}

fetch(url, {
    method: "POST",
    headers: headers,
})
    .then(response => response.json())
    .then(json => console.log(json));
```




### HTTP Request
`POST api/recipe-tags`


<!-- END_b6c9d3544f0b2214823f92765e7e54d5 -->


<!-- START_61879a4e817849bc0f98c5b72a021ca3 -->
## Update the specified resource in storage.

> Example request:

```bash
curl -X PUT "http://localhost/api/recipe-tags/1" 
```


```javascript
const url = new URL("http://localhost/api/recipe-tags/1");

let headers = {
    "Accept": "application/json",
    "Content-Type": "application/json",
}

fetch(url, {
    method: "PUT",
    headers: headers,
})
    .then(response => response.json())
    .then(json => console.log(json));
```




### HTTP Request
`PUT api/recipe-tags/{id}`


<!-- END_61879a4e817849bc0f98c5b72a021ca3 -->


<!-- START_786f1db74c2c4e1b45a3c913910ad5f3 -->
## Remove the specified resource from storage.

> Example request:

```bash
curl -X DELETE "http://localhost/api/recipe-tags/1" 
```


```javascript
const url = new URL("http://localhost/api/recipe-tags/1");

let headers = {
    "Accept": "application/json",
    "Content-Type": "application/json",
}

fetch(url, {
    method: "DELETE",
    headers: headers,
})
    .then(response => response.json())
    .then(json => console.log(json));
```




### HTTP Request
`DELETE api/recipe-tags/{id}`


<!-- END_786f1db74c2c4e1b45a3c913910ad5f3 -->


<!-- START_a96b813acfacd6c71315245dbd1be060 -->
## Display a listing of the resource.

> Example request:

```bash
curl -X GET -G "http://localhost/api/ingredients" 
```


```javascript
const url = new URL("http://localhost/api/ingredients");

let headers = {
    "Accept": "application/json",
    "Content-Type": "application/json",
}

fetch(url, {
    method: "GET",
    headers: headers,
})
    .then(response => response.json())
    .then(json => console.log(json));
```



> Example response (401):


```json
{
    "message": "Token not provided"
}
```

### HTTP Request
`GET api/ingredients`


<!-- END_a96b813acfacd6c71315245dbd1be060 -->


<!-- START_638e9ca24754765a7b8b7b367c7261c7 -->
## Store a newly created resource in storage.

> Example request:

```bash
curl -X POST "http://localhost/api/ingredients" 
```


```javascript
const url = new URL("http://localhost/api/ingredients");

let headers = {
    "Accept": "application/json",
    "Content-Type": "application/json",
}

fetch(url, {
    method: "POST",
    headers: headers,
})
    .then(response => response.json())
    .then(json => console.log(json));
```




### HTTP Request
`POST api/ingredients`


<!-- END_638e9ca24754765a7b8b7b367c7261c7 -->


<!-- START_a868f79ce7a1cfa47cf2d674cab4dd21 -->
## Display the specified resource.

> Example request:

```bash
curl -X GET -G "http://localhost/api/ingredients/1" 
```


```javascript
const url = new URL("http://localhost/api/ingredients/1");

let headers = {
    "Accept": "application/json",
    "Content-Type": "application/json",
}

fetch(url, {
    method: "GET",
    headers: headers,
})
    .then(response => response.json())
    .then(json => console.log(json));
```



> Example response (401):


```json
{
    "message": "Token not provided"
}
```

### HTTP Request
`GET api/ingredients/{id}`


<!-- END_a868f79ce7a1cfa47cf2d674cab4dd21 -->


<!-- START_577b446b0708ddd75e639c4ba9394693 -->
## Update the specified resource in storage.

> Example request:

```bash
curl -X PUT "http://localhost/api/ingredients/1" 
```


```javascript
const url = new URL("http://localhost/api/ingredients/1");

let headers = {
    "Accept": "application/json",
    "Content-Type": "application/json",
}

fetch(url, {
    method: "PUT",
    headers: headers,
})
    .then(response => response.json())
    .then(json => console.log(json));
```




### HTTP Request
`PUT api/ingredients/{id}`


<!-- END_577b446b0708ddd75e639c4ba9394693 -->


<!-- START_d9993c6b8b5829e0fea7ee879e1b0ba4 -->
## Remove the specified resource from storage.

> Example request:

```bash
curl -X DELETE "http://localhost/api/ingredients/1" 
```


```javascript
const url = new URL("http://localhost/api/ingredients/1");

let headers = {
    "Accept": "application/json",
    "Content-Type": "application/json",
}

fetch(url, {
    method: "DELETE",
    headers: headers,
})
    .then(response => response.json())
    .then(json => console.log(json));
```




### HTTP Request
`DELETE api/ingredients/{id}`


<!-- END_d9993c6b8b5829e0fea7ee879e1b0ba4 -->


<!-- START_345f06e43af968d99caa23ed8efc40c8 -->
## Display a listing of the resource.

> Example request:

```bash
curl -X GET -G "http://localhost/api/recipe-ingredients" 
```


```javascript
const url = new URL("http://localhost/api/recipe-ingredients");

let headers = {
    "Accept": "application/json",
    "Content-Type": "application/json",
}

fetch(url, {
    method: "GET",
    headers: headers,
})
    .then(response => response.json())
    .then(json => console.log(json));
```



> Example response (401):


```json
{
    "message": "Token not provided"
}
```

### HTTP Request
`GET api/recipe-ingredients`


<!-- END_345f06e43af968d99caa23ed8efc40c8 -->


<!-- START_08d01fe335768c3b583f485dd37e22de -->
## Store a newly created resource in storage.

> Example request:

```bash
curl -X POST "http://localhost/api/recipe-ingredients" 
```


```javascript
const url = new URL("http://localhost/api/recipe-ingredients");

let headers = {
    "Accept": "application/json",
    "Content-Type": "application/json",
}

fetch(url, {
    method: "POST",
    headers: headers,
})
    .then(response => response.json())
    .then(json => console.log(json));
```




### HTTP Request
`POST api/recipe-ingredients`


<!-- END_08d01fe335768c3b583f485dd37e22de -->


<!-- START_e70e8c7f7511338b9b51f81514cf23a6 -->
## Update the specified resource in storage.

> Example request:

```bash
curl -X PUT "http://localhost/api/recipe-ingredients" 
```


```javascript
const url = new URL("http://localhost/api/recipe-ingredients");

let headers = {
    "Accept": "application/json",
    "Content-Type": "application/json",
}

fetch(url, {
    method: "PUT",
    headers: headers,
})
    .then(response => response.json())
    .then(json => console.log(json));
```




### HTTP Request
`PUT api/recipe-ingredients`


<!-- END_e70e8c7f7511338b9b51f81514cf23a6 -->


<!-- START_453c9fc34d6cd021700597566e75999e -->
## Remove the specified resource from storage.

> Example request:

```bash
curl -X DELETE "http://localhost/api/recipe-ingredients/1" 
```


```javascript
const url = new URL("http://localhost/api/recipe-ingredients/1");

let headers = {
    "Accept": "application/json",
    "Content-Type": "application/json",
}

fetch(url, {
    method: "DELETE",
    headers: headers,
})
    .then(response => response.json())
    .then(json => console.log(json));
```




### HTTP Request
`DELETE api/recipe-ingredients/{id}`


<!-- END_453c9fc34d6cd021700597566e75999e -->


<!-- START_8e9e2f7b6568d14b197402543cdaa874 -->
## Create token password reset

> Example request:

```bash
curl -X POST "http://localhost/api/password/create" 
```


```javascript
const url = new URL("http://localhost/api/password/create");

let headers = {
    "Accept": "application/json",
    "Content-Type": "application/json",
}

fetch(url, {
    method: "POST",
    headers: headers,
})
    .then(response => response.json())
    .then(json => console.log(json));
```




### HTTP Request
`POST api/password/create`


<!-- END_8e9e2f7b6568d14b197402543cdaa874 -->


<!-- START_8ad860d24dc1cc6dac772d99135ad13e -->
## Reset password

> Example request:

```bash
curl -X POST "http://localhost/api/password/reset" 
```


```javascript
const url = new URL("http://localhost/api/password/reset");

let headers = {
    "Accept": "application/json",
    "Content-Type": "application/json",
}

fetch(url, {
    method: "POST",
    headers: headers,
})
    .then(response => response.json())
    .then(json => console.log(json));
```




### HTTP Request
`POST api/password/reset`


<!-- END_8ad860d24dc1cc6dac772d99135ad13e -->




