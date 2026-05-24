## Dev Tinder API

# authRouter
POST /signup
POST /login
POST /logout

# profileRouter
GET /profile/view
PATCH /profile/edit
PATCH /profile/password

# requestRouter
POST /request/send/intersted:userId
POST /request/send/ignored:userId
Post /request/review/accepted:userId
Post /request/review/rejected:userId

# userRoute
GET /user/request/received
GET /user/connections
GET /user/feed
