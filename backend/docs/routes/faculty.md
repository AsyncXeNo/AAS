### Faculty Routes

<hr>

@method
: POST

@route
: /users/faculty/register

@access
: protected (admin)

@desc
: Register a faculty

<hr>

@method
: POST

@route
: /users/faculty/login

@access
: public

@desc
: Login as faculty

<hr>

@method
: DELETE

@route
: /users/faculty/delete

@access
: protected (admin)

@desc
: Delete a faculty

<hr>

@method
: GET

@route
: /users/faculty/me

@access
: protected (faculty)

@desc
: Get faculty information

<hr>

@method
: GET

@route
: /users/faculty/info

@access
: protected (admin)

@desc
: Get faculty information (for admin)

<hr>

@method
: GET

@route
: /users/faculty/all

@access
: protected (admin)

@desc
: Get all faculty

<hr>