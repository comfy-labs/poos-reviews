# Workflows
1. [Log in](#login)
2. [Sign up](#signup)
3. [Map](#map)

### Log in
- The Login Modal allows users to login.
- Logging in allows users to write reviews.
- Without logging in, users are in read-only mode.

##### Login Modal - Start
![Login Modal - Start](./images/login1.png "Login Modal - Start")
##### Login Modal - Filled
![Login Modal - Filled](./images/login2.png "Login Modal - Filled")
##### Login Modal - Request Payload
- Outgoing Data:
  - email [string]
  - password [string]
- Requested Incoming Data:
  - user id [string]
  - name [string]
  - token [string]
- Current Query Structure
```json
  {
    "query": "mutation { login ( email: \"berg@gmail.com\" password: \"berg\" ) { user { id name } token } }"
  }
```
- Current Response Structure
```json
  {
    "data": {
      "login": {
        "user": {
          "id": "cjoxzoma5ly8y0a71ymbo4h8s",
          "name": "berg"
        },
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJjam94em9tYTVseTh5MGE3MXltYm80aDhzIiwiaWF0IjoxNTUzNzk0NTIyfQ.7gCa5wURde8xYFQlgnfcATm1TZETpPiEALQ5d9p6Zno"
      }
    }
  }
```

### Sign up
- The Signup Modal allows users to sign up.
- Once signed up, a user is then logged in.
- Logging in allows users to write reviews.
- Without logging in, users are in read-only mode.

##### Signup Modal - Start
![Signup Modal - Start](./images/signup1.png "Signup Modal - Start")
##### Signup Modal - Filled
![Signup Modal - Filled](./images/signup2.png "Signup Modal - Filled")
##### Signup Modal - Request Payload
- Outgoing Data:
  - name [string]
  - email [string]
  - password [string]
- Requested Incoming Data:
  - user id [string]
  - name [string]
  - token [string]
- Current Query Structure:
```json
  {
    "query": "mutation { signup ( name: \"berg3\" email: \"berg3@gmail.com\" password: \"berg3\" ) { user { id name } token } }"
  }
```
- Current Response Structure
```json
  {
    "data": {
      "signup": {
        "user": {
          "id": "cjtta1f9qh12s0b04nk8o4qhy",
          "name": "berg3"
        },
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJjanR0YTFmOXFoMTJzMGIwNG5rOG80cWh5IiwiaWF0IjoxNTUzODE2MTg3fQ.parOqb24wn6E9baZpYpZm6oC-2qUpj5LfA8P-71QkQM"
      }
    }
  }
```

### Map

##### Map - Landing
- When a user lands on the homepage:
  - the UI should render with a loading indicator placeholder for the map
  - the UI should load San Francisco and default zoom
  - a query should be sent to get relevant reviews for the bounding corner coordinates

![Map - Landing](./images/map1.png "Map - Landing")
