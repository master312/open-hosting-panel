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

**Service:**
All service api calls start with /api/services/

### GET '/'
Return array of all services owned by user
```javascript
{
    "count": 2,
    "service": [
        {"id":13, "type":"nodejs", "name":"the_service", "state":"running"},
        {"id":14, "type":"nodejs", "name":"jesus_christ.com", "state":"stopped"}
    ]
}
```

### GET '/{$id}'
Return info about specified service id. Or 404 if not found.

```javascript
{
    "id":13,
    "type":"nodejs", 
    "state":"running",
    "name":"the_service",
    "domain":"the_service.com",
    "uptime":"4235345"              // Upime in seconds
}
```

### POST '/new'
*Content-Type: application/json*
Creates new service. 

Request format:
```javascript
{
    "type":"nodejs", 
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
    "message":"Service created successfully" // Can be an error message
}
```

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