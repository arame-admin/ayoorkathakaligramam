# Ayoorkathakaligramam

## Description

Ayoorkathakaligramam is the official website for the Kathakali Gramam in Kerala, India. This cultural center is dedicated to preserving and promoting Kathakali, the classical dance-drama form of Kerala. The website serves as a platform to showcase performances, provide information about Kathakali art, and facilitate bookings for cultural events and workshops.

## Technologies Used

- **Framework:** Laravel (Latest Version: 11.x)
- **PHP Version:** 8.2 or higher (as required by Laravel 11.x)
- **Database:** MySQL

## Features

- Information about Kathakali history and performances
- Gallery of performances and artists
- Contact and location details

## Installation

1. Ensure you have PHP 8.2 or higher installed.
2. Install Composer if not already installed.
3. Clone the repository:
   ```
   git clone <repository-url>
   ```
4. Navigate to the project directory:
   ```
   cd ayoorkathakaligramam
   ```
5. Install dependencies:
   ```
   composer install
   ```
6. Copy the environment file and configure it:
   ```
   cp .env.example .env
   ```
   Update the `.env` file with your database credentials (MySQL).
7. Generate application key:
   ```
   php artisan key:generate
   ```
8. Run database migrations:
   ```
   php artisan migrate
   ```
9. (Optional) Seed the database:
   ```
   php artisan db:seed
   ```
10. Start the development server:
    ```
    php artisan serve
    ```

## Usage

Visit `http://localhost:8000` to access the website.

## Contributing

Contributions are welcome. Please fork the repository and submit a pull request.

## License

This project is licensed under the MIT License.