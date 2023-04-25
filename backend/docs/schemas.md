## Student Schema

- `id` ObjectID
- `username` string
- `password` string
- `facialId` string
<br>
- `registrationNumber` int
- `universityEmail` string
- `department` string
- `programme` string
- `year` int
<br>
- `classesConducted` int
- `classesAttended` int
<br>
- `fullName` string
- `personalEmail` string
- `phone` array[int]
- `address` array[string]
- `other` object

## Faculty Schema

- `id` ObjectID
- `username` string
- `password` string
<br>
- `universityEmail` string
- `department` string
<br>
- `fullName` string
- `personalEmail` string
- `phone` array[int]
- `address` array[string]
- `other` object

## Admin Schema

- `id` ObjectID
- `username` string
- `password` string

## Class Schema

- `id` ObjectID
- `name` string
- `classTeacher` Faculty
- `students` array[Student]