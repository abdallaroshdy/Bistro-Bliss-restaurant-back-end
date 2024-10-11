# Bistro-Bliss Restaurant System - Backend

This repository contains the backend code for a Bistro-Bliss Restaurant System. This backend is built using Node.js, Express.js, and MongoDB.  This project was developed as the final project for the Orange - AMIT scholarship program in the Mean-stack track. The program ran from September 1st, 2024, to September 27th, 2024.

## Features

* **User Authentication:**
    * Register new users with email verification (using OTP).
    * Login for existing users.
    * Different roles for users (Normal user, Admin).
* **Menu Management:**
    * Admin can add, update, and delete menu items.
    * Menu items include title, price, description, category, and an image.
* **Table Booking:**
    * Normal users can book a table for a specific date and number of people.
    * Admin can view all booked tables.
* **Contact Form:**
    * Normal users can submit contact messages.
    * Admin can view all contact messages.
* **Email Verification:**
    * A verification email is sent to new users with an OTP.
    * Users can verify their email by entering the OTP.
* **Error Handling:**
    * Custom error handling middleware to handle validation errors and other errors.

## Technologies

* **Node.js:** Javascript runtime environment.
* **Express.js:** Web framework for Node.js.
* **MongoDB:** NoSQL database.
* **Mongoose:** ODM (Object Document Mapper) for MongoDB.
* **bcrypt:** Password hashing library.
* **jsonwebtoken:** For creating and verifying JWT (JSON Web Token).
* **nodemailer:** For sending emails.
* **multer:** For handling file uploads.
* **express-validator:** For input validation.
* **cors:** For enabling Cross-Origin Resource Sharing (CORS).
* **dotenv:** For loading environment variables.

## Getting Started

##1. Clone the Repository:
   ```bash
   git clone https://github.com/abdallaroshdy/Bistro-Bliss-restaurant-back-end.git
   ```
   
##2. Install Dependencies:
   ```bash
   cd Bistro-Bliss-restaurant-back-end
   npm install
   ```

 ##3. Set Up Environment Variables

* Create a `.env` file in the root directory of the project.
* Add the following environment variables:

| Variable Name | Description | Example |
|---|---|---|
| PORT | Port for the server to listen on. | 5210 |
| DB | MongoDB connection string. | mongodb://localhost:27017/your_database_name |
| JWDKEY | Secret key for JWT (JSON Web Token) authentication. | RKJVWP$%@*254j5AVFAarha |
| AdminUser | Email address of the admin user. | admin@example.com |
| AdminPassword | Password for the admin user. | YourStrongPassword |
| AdminJWDKEY | Secret key for JWT authentication for the admin user. |  RKJVWP$%@*254j5AVFAarha |
| FoodEmail | Your email address for sending verification emails. | your_email@example.com |
| FoodPassword | Your app password for sending verification emails. | YourAppPassword |
     
##4. Start the Server:
   ```bash
   nodemon start
   ```

## Contribution

Contributions are welcome! Feel free to open an issue or submit a pull request.

## Contact

If you have any questions or feedback, please feel free to contact me via email at abdallaroshdy222@gmail.com.
