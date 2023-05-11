# commentAPI_S3
Comment Section API for The_Web_Wizards.

Get Request URL = "http://localhost:3000/api/comments"
Sample HTTP POST request for Postman :
{
  "firstName": "Test",
  "lastName": "Test",
  "content": "Test"
}

get a specific Request URL = "http://localhost:3000/api/comments/2"

.env needed data -<br>
DATABASE_URL="postgresql://johndoe:randompassword@localhost:5432/mydb?schema=public"<br>
PORT=3000
