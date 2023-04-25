### Student Routes

<hr>

@method
: POST

@route
: /users/student/register

@access
: protected (admin)

@desc
: Register a student

<hr>

@method
: POST

@route
: /users/student/login

@access
: public

@desc
: Login as student

<hr>

@method
: DELETE

@route
: /users/student/delete

@access
: protected (admin)

@desc
: Delete a student

<hr>

@method
: PUT

@route
: /users/student/attendance

@access
: protected (faculty)

@desc
: Update students' attendance

<hr>

@method
: GET

@route
: /users/student/me

@access
: protected (student)

@desc
: Get student information

<hr>

@method
: GET

@route
: /users/student/info

@access
: protected (admin)

@desc
: Get student information (for admin)

<hr>

@method
: GET

@route
: /users/student/all

@access
: protected (admin)

@desc
: Get all students

<hr>