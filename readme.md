character - символ, например 'Q', 'f', ''

key - клавиша на клавиатуре, например 'Shift', 'Space', 'a', 't'

Поэтому везде в constants/keyboards поля обозначены через key и shiftKey, это логично. 
'Shift' например это не character.


####Statuses:

200: _OK_ – Eyerything is working<br />
201: _OK_ – New resource has been created<br />
204: _OK_ – The resource was successfully deleted<br />
304: _Not Modified_ – The client can use cached data<br />
400: _Bad Request_ – The request was invalid or cannot be served. The exact error should be explained in the error payload. E.g. „The JSON is not valid“<br />
401: _Unauthorized_ – The request requires an user authentication<br />
403: _Forbidden_ – The server understood the request, but is refusing it or the access is not allowed.<br />
404: _Not found_ – There is no resource behind the URI.<br />
409: _Conflict_ – Whenever a resource conflict would be caused by fulfilling the request. Duplicate entries and deleting root objects when cascade-delete is not supported are a couple of examples.<br />
422: _Unprocessable Entity_ – Should be used if the server cannot process the enitity, e.g. if an image cannot be formatted or mandatory fields are missing in the payload.<br />
500: _Internal Server Error_ – API developers should avoid this error. If an error occurs in the global catch blog, the stracktrace should be logged and not returned as response.
503: _Service Unavailable_ – The server is currently unavailable (because it is overloaded or down for maintenance). Generally, this is a temporary state.
