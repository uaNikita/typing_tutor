character - символ, например 'Q', 'f', ''

key - клавиша на клавиатуре, например 'Shift', 'Space', 'a', 't'

Поэтому везде в constants/keyboards поля обозначены через key и shiftKey, это логично. 
'Shift' например это не character.


####Statuses

Status | First Header | Second Header
---: | :--- | :---
200 | OK | Eyerything is working
201 | OK | New resource has been created
204 | OK | The resource was successfully deleted
304 | Not Modified | The client can use cached data
400 | Bad Request | The request was invalid or cannot be served. The exact error should be explained in the error payload. E.g. „The JSON is not valid“
401 | Unauthorized | The request requires an user authentication
403 | Forbidden | The server understood the request, but is refusing it or the access is not allowed.
404 | Not found | There is no resource behind the URI.
409 | Conflict | Whenever a resource conflict would be caused by fulfilling the request. Duplicate entries and deleting root objects when cascade-delete is not supported are a couple of examples.
422 | Unprocessable Entity | Should be used if the server cannot process the enitity, e.g. if an image cannot be formatted or mandatory fields are missing in the payload.
500 | Internal Server Error | API developers should avoid this error. If an error occurs in the global catch blog, the stracktrace should be logged and not returned as response.
503 | Service Unavailable | The server is currently unavailable (because it is overloaded or down for maintenance). Generally, this is a temporary state.
