Design Notification System

Step 1: Designing APIs

Define RESTful APIs that will manage notifications as follows:
1. GET /notifications
Retrieve all the notifications for a particular user.
2. POST /notifications
Create a notification/trigger a notification.
3. PATCH /notifications/:id/read
Mark a notification as being read.

Fields:
1. id - unique ID.
2. userId - user receiving notification.
3. message - the notification itself.
4. type - (email/SMS/in-app).
5. timestamp - date when the notification was created.
6. isRead - read or unread.


Step 2: Designing Database
Database: MongoDB
Structure:

{
  "id": "string",
  "userId": "string",
  "message": "string",
  "type": "string",
  "timestamp": "date",
  "isRead": "boolean"
}

Step 3: Optimizing Database
The issue:
Slow queries when dealing with large data sets
Solutions:
- index on "userId" - quick way of finding a user
- index on "isRead" - filtering out unread notifications
- use pagination (LIMIT, OFFSET)


Step 4: Improving Performance
In order to increase overall performance:
    - use caching mechanism (Redis) for notifications often accessed.
    - implement lazy loading mechanism to load notifications in chunks


Step 5: Handling Reliability Issues
Notifications might fail in delivery.
Solutions:
    - use Message Queues (Kafka/RabbitMQ)
    - have a retry method for notifications that did not make it through