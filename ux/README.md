# Workflows
1. [Login](#login)

### Login
- The Login Modal allows users to login.
- Logging in allows users to write reviews.
- Without logging in, users are in read-only mode.

##### Login Modal - Start
![Login Modal - Start](./images/login1.png "Login Modal - Start")
##### Login Modal - Filled
![Login Modal - Filled](./images/login2.png "Login Modal - Filled")
##### Login Modal - Request Payload
- Outgoing data:
  - email [string]
  - password [string]
- Requested incoming data:
  - userId [string]
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
