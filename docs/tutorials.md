# Tutorials
## Authentication & Multi-user

### Register & Login

Use the authentication endpoints to create an account and obtain a JWT.

`POST /api/auth/register`

Request:
```json
{ "email": "user@example.com", "password": "secret" }
```
Response:
```json
{ "token": "<jwt>" }
```

`POST /api/auth/login`

Request:
```json
{ "email": "user@example.com", "password": "secret" }
```
Response:
```json
{ "token": "<jwt>" }
```

Once logged in, include the JWT in the `Authorization` header for
protected requests:

```
Authorization: Bearer <jwt>
```

All crew, parcel and card endpoints now require this header.

