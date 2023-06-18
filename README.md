It is social media app. It uses Node.js CacarrotServer as it's backend server.

About it:

After logging you can post posts that other people will see, comment and like your own posts and other people posts. You can add friends by searching their nickname and send them friend request. If they accept you can send text messages and images between you.

Everything you do is updated realtime in database and on website so you don't have to refresh page to see what have you done.
As database serves me Firebase Cloud Firestore and Firebase Storage (firestore for data, storage for images, films etc.)

Posts and messages are not downloaded all but just newest 10 and when you are close to reaching end of page or end of chat IntersectionObserver fires event to download next 10 objects.

Things I'm proud of:
- possibility to do video calls between certain users

TODO:
- add creating chats with multiple users and many people video calls

Link to the website - https://zzzdreamm.github.io/social-app/

EXAMPLE ACCOUNT TO TEST APP:
- e-mail: example@gmail.com
- password: Example1@
