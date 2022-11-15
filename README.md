## Welcome to my readme!

This was quite a cool project and I enjoyed it quite a bit. There is a docker file in the backend if you would like to run
it through docker, this was just for fun.

TailwindCSS was used in the frontend to help with styling and to make things just a little easier. I am
very familiar with all the concepts I've used and Tailwind was, in a sense, "necessary".

OpenAi was also made use of in the backend, it generates an image based on your description of the food,
it then saves it and posts it. Some issues with this is that it seems OpenAi's link to the image
only lasts a certain amount of time, no documentation on this is available as it got released last week.
So you can always just create a new one, if the server lives for that long. theres is a $2 limit and each image
costs $0.016. Dont spend it all at once ;)

Im also going to be describing how I met all the requirements stated within the document. Since I would hate for
all this work to have gone into meeting them and a passing by of them is made.

There was also a decision made to use modals and a single page approach to the application, instead of using multiple separate routes.

First of all, welcome to Marketen! An auction store where you can place you second hand food that you dont want to eat
or dont want to throw away! Bids always close in 3 days, since food lasting anything more than that is gross.

Authorization and protected routing is available throughout the application

IMPORTANT: If not data is loading and you get authorization error, this is because your token has expired.


## Requirements that are fulfilled.
### Functional

- [x] Display a list of auctionable products or services
- [x] Of each of these products or services show at least the following:
    - [x] Product or service name
    - [x] The price (these should be integer values)
    - [x] Who placed bids
    - [x] When will the auction end
- [x] It should be possible to search the list of auctions
- [x] Input is validated client side before sending it to the server
- [x] The server must perform server side validation
- [x] The list of auctions should be filterable on at least three attributes that are logical for the chosen service or product. I.e.:
    - [x] All Auctions under 100 euros
    - [x] All Bids Currently Winning (user story and requirement fulfilled here)
    - [ ] All Auctions that are less than 1 day old

### Non functional

- [x] The API is expected to return JSON, accompanied by an appropriate [HTTP status code](https://en.wikipedia.org/wiki/List_of_HTTP_status_codes)
- [x] The REST API has to be designed using the most important REST principles:
    - [x] HTTP request methods are used as intended. A GET request may never update a resource.
    - [x] URI paths represent resources or a set of resources, not actions. POST /addProduct/ is not acceptable.
    - [x] Query parameters are meant for querying, so it should limit the results from a GET request. I.e. they can be used to filter certain values, sort or limit result sets by requesting only the first 10 results.
- [x] All response bodies (including errors) must return valid JSON
- [x] Correct HTTP status codes have to be returned for every request.
- [x] Both the front-end and backend provide descriptive error messages: 'You already placed a bid', 'Bid already exists', 'User X not allowed to do ...'
- [x] Both front-end and backend code is logically separated. Specifically for the Express routes (use multiple files)
- [x] Endpoints have meaningful good and bad-weather tests
- [x] After registration the user should be logged in. They should not have to log in again before being able to place a bid
- [x] The front-end is build using Svelte
- [x] The backend is built using Node js with Express


## Userstories

- [x] As an administrator I want to be able to add, remove and modify auctions, so I can maintain the website
- [x] As a user I want to be able to register (wth email-address and password), so I can use the website
- [x] As an administrator I want to be able to log in, so I can maintain the auction site.
- [x] As a user I want to be able to log in, so I can place bids
- [x] As a user I want to be able to place a bid on an auction, so I have a chance of winning the item
- [x] As a user I want to be able to remove my bid, so I can correct any mistakes
- [x] As I want to see a list of all auctions I won, so I can see how much I have to pay

## API Specification
https://documenter.getpostman.com/view/14238517/2s8YYLK1t9#625bebc3-1a48-4cf6-9967-587dd67e19b1

This is the link to the entire API specification and documentation. If more is needed, I can provide screenshots of everything.

https://warped-crater-4953.postman.co/workspace/My-Workspace~e62df916-d918-4506-8404-ec68420d83bf/collection/14238517-fa3b017c-edee-491b-b41c-2fcce744e712?action=share&creator=14238517

Here is a link to my postman with all examples and documentation given.

There will also be a json, ready to import into a local postman.
Available here: template-main\client\Markteten.postman_collection.json

### End of my Project?

I hope you enjoy my code and its easy to read! :) Kept everything has clean as I could while surviving off nothing but adrenaline and coffee.

