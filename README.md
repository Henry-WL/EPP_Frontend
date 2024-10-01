# Project: BetterGram Application

[Visit The App](https://epp-frontend.onrender.com) (Please allow a few minutes for the server to start, then login as guest)

[Backend Repository](https://github.com/Henry-WL/EPP_Backend)

## Demo video

https://streamable.com/

## Table of Contents
- [About The Project](#about-the-project)
- [Key Features](#key-features)
- [Demo Screenshots](#demo-screenshots)
- [Mobile Screenshots](#mobile-screenshots)
- [Contact](#contact)

## About The Project

'EPP' is a full stack application allowing staff members to create events for others user's. The application focuses on film user's but the API can be changed to any interest.

#### Built With

#### - TypeScript, React.js, Tailwind and DaisyUI, Node.js, Express, MongoDB

## Key Features

#### Authentication and Authorization with JWTs
The EPP app implements authentication and authorization using JSON Web Tokens (JWTs). Upon login, the backend auth server issues a JWT, which is stored on the client-side. This token is sent in the request headers for routes that require authentication, ensuring secure access to protected resources.

#### Join Events
Users can see events available to them on their feed, they can filter these events by oldest/newest. Events will shows details such as times, location, tags, description and user's attending the event.

#### Google Calendar
When a user is an attendee of an event they can add the event to their google calendar.

#### Payments
Payments are handled with Stripe using their API, depending on the event type a user can pay for an event, pay what they want or join for free. This option is set by staff when creating an event.

#### CRUD
The application features all CRUD methods using the backend API creating in Express and using MongoDB. On the frontend staff user's can create, read, updated and delete events.

#### Editing Profile
Users can edit their own profile if they are logged in, changing their username, email and password are all available, all updates are shown in real time. If a user edits their profile this will update across the application.

#### Responsive Design
The app is designed to be responsive across various devices, including desktops, tablets, and smartphones. This ensures optimal usability and accessibility regardless of screen size or device type.

## Demo Screenshots
![Screenshot 2024-10-01 at 14 27 21](https://github.com/user-attachments/assets/7746d169-062e-4d24-8dc3-eaca370ae0ac)
![Screenshot 2024-10-01 at 14 27 35](https://github.com/user-attachments/assets/71a1912c-b656-4f13-94d3-ffaf10e71762)
![Screenshot 2024-10-01 at 14 28 05](https://github.com/user-attachments/assets/06b7c4f2-47f8-4b3a-a777-d211ef49d3a3)
![Screenshot 2024-10-01 at 14 28 33](https://github.com/user-attachments/assets/7faf6dad-fabd-44e7-85bf-b52dc79d623d)
![Screenshot 2024-10-01 at 14 29 08](https://github.com/user-attachments/assets/5dfbc11a-60f6-40bf-9e1e-b9ed7e8fba9a)
![Screenshot 2024-10-01 at 14 29 13](https://github.com/user-attachments/assets/9825b195-5aeb-42b1-8e25-2ad9baf18203)
![Screenshot 2024-10-01 at 14 30 17](https://github.com/user-attachments/assets/4de8ef62-b157-4808-8e56-a5544041ee00)
![Screenshot 2024-10-01 at 14 31 22](https://github.com/user-attachments/assets/e11594ae-efbc-4da5-90af-f56fdea2f87d)
![Screenshot 2024-10-01 at 14 31 34](https://github.com/user-attachments/assets/ba860f77-3680-4a56-a047-ffc5eef541ad)
![Screenshot 2024-10-01 at 14 33 51](https://github.com/user-attachments/assets/bd5fa8e8-04f8-4074-935f-52726757a060)




## Mobile Screenshots




## Local install and setup

- Clone git repository to your local machine, install dependencies with npm install

- You will need the URL of your backend whether this is being run locally or on a server is up to you

- Create a .env file in the top level of the cloned repo

- You will need to sign up for an API key at https://www.omdbapi.com/, this is free and the key will be emailed to you

- You will need a google maps API key, this can be setup through the google console and enabling Google Maps

- The BASE_URL is your backend URL, run the backend locally on your machine at the same time

- Add the following variables to the env file and add the required keys / URLS

  VITE_BASE_URL='http://localhost:3000/api'\
  VITE_GOOGLE_MAPS_API_KEY=AIzaSyByXecr6ln1gbRYgJEbU1Do8ZdIXMBpSwY\
  VITE_OMDB_API='30b97e2a'\

- Run 'npm run dev' in the Frontend directory

## Contact


[LinkedIn](https://www.linkedin.com/in/henry-westhoff-lewis-b18a91196/)



