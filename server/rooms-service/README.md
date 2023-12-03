Introduction
------------

Welcome to the Smrt Booking repository! 


THIS IS NOT PRODUCTION READY. WE CAN DO SO MANY MORE THINGS LIKE **CACHING**, **CIRCUIT BRAKER** **CONTAINERIZATION** AND MORE...

**BUT THIS WILL GIVE YOU THE IDEA WHAT I CAN BUILD**

In the time available, I have set up a project with two main folders and to save time i use mongodb with different databases


1\. Server
----------

The `server` folder contains four microservices:

*   **Users**
*   **Hotels**
*   **Rooms**
*   **Auth**

### Documentation Generation

To generate documentation for each microservice, run the following command in the respective microservices folder:

`npm run docs`

### Microservices Ports

The microservices are currently configured to run on the following ports:

*   Users: `3001`
*   Hotels: `3005`
*   Rooms: `3004`
*   Auth: `3003`

Feel free to customize the ports by modifying the values in the `.env` file, which is included in this repository (considered private).

### Development Mode

For development mode, use the following command in any microservice folder:

`npm run dev`

### Live Mode

To run the project in live mode using pm2, execute:

`npm start`

### Test Driven Development

Tests have been implemented in the Users microservice, demonstrating proficiency in test-driven development.

Note: The Users service does not require authentication, while Hotels and Rooms do require a Bearer token.

2\. Mobile App
--------------

The `mobile-app` folder contains a mobile application. To configure the microservices URLs, navigate to `constants/vars.js` and make the necessary adjustments.

Please be aware that due to time constraints, the React Native work may not be polished, but it provides an overview of my ability to make things work.

Feel free to explore and test the functionalities. If you have any questions or need further assistance, don't hesitate to reach out.

Thank you for your time and consideration.