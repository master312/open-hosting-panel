# Open Hosting Panel

To run stuff do:

```
# Install server dependencies
npm install

# Install client dependencies
npm run client-install

# Run server and the clisent with concurrently
npm run dev

```


**REST API:**
For all API calls, client must be authenticated to oauth2 server.
All api calls must have oauth2 barrier token included in header.
EX:
```
Authorization: Bearer 0b79bab50daca910b000d4f1a2b675d604257e42
```


**Service:**
All service api calls start with /api/service/

### GET '/'
Return array of all services owned by user
```javascript
{
    "count": 2,
    "service": [
        {"id":13, "runner":"nodejs", "name":"the_service", "state":"running"},
        {"id":14, "runner":"nodejs", "name":"jesus_christ.com", "state":"stopped"}
    ]
}
```

### GET '/{$id}'
*Content-Type: application/json*
Return info about specified service id. Or 404 if not found.

```javascript
{
    "id":13,
    "runner":"nodejs", 
    "state":"running",
    "name":"the_service",
    "domain":"the_service.com",
    "uptime":"4235345"              // Upime in seconds
}
```

### GET '/runners/'
*Content-Type: application/json*
Returns list of available service runners.

Request format:
```javascript
{
    "runners":[
        {
            "name": "NodeJS",
            "version": "10.15.3"
        },  {
            "name": "PHP",
            "version": "7.0.3"
        }, {
            "name": "JAVA",
            "version": "8"
        }
    ]
}
```

### POST '/new'
*Content-Type: application/json*
Creates new service. 

Request format:
```javascript
{
    "runner":"nodejs", 
    "name":"new_service",
    "domain":"new_service.com",
    // TODO....
}
```

Response format:
```javascript
{
    "id":123,
    "success":true,
    "runner":"nodejs",
    "message":"Service created successfully" // Can be an error message
}
```
Id and runner parameters are not send if success == false

### POST '/delete/{$id}'
Deletes service.
Return 204 - No Content on success
Return 400 - Bad Request on error
In case of error, error message is returned as *Content-Type: application/json*

Error message format:
```javascript
{
    "message":"Power outage in datacenter"
}
```

### POST '/start/{$id}'
Start service.
Return 204 - No Content on success
Return 409 - Conflict (if service is already running)

### POST '/stop/{$id}'
Stop service.
Return 204 - No Content on success
Return 409 - Conflict (if service is not running)

### POST '/restart/{$id}'
Restart service.
Return 204 - No Content on success
Return 400 - Bad Request on error


### POST '/edit/{$id}'
*.....TODO.....*