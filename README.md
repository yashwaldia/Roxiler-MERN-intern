# Roxiler MERN Assignment

## Project Overview

This project is a full-stack MERN (MongoDB, Express.js, React.js, Node.js) application designed to manage and visualize product transactions based on a third-party API. The backend and frontend interact seamlessly to provide a user-friendly experience with features such as a transaction table, statistics, bar chart, and pie chart.

## Directory Structure

- **Roxiler MERN Assignment**
  - **mern_backend**  
    - Backend server code, API routes, and database management.
  - **frontend**  
    - React-based frontend code for user interaction and visualization.

---

## Backend (mern_backend) Details

### APIs Overview

1. **Initialize Database**: Fetches data from the third-party API (`https://s3.amazonaws.com/roxiler.com/product_transaction.json`) and initializes the database.
   
2. **List Transactions**: 
   - Supports search and pagination for product transactions based on the selected month.
   - Supports search by title, description, and price.
   - Pagination with default values: `page = 1` and `perPage = 10`.

3. **Statistics**: 
   - Provides total sale amount, total sold items, and total not sold items for the selected month.

4. **Bar Chart**: 
   - Displays price ranges and the number of items in each range for the selected month.

5. **Pie Chart**: 
   - Shows unique categories and the count of items in each category for the selected month.

6. **Combined Data**: 
   - Combines the data from all the above APIs into a single JSON response.

---

### Backend Setup

1. **Dependencies**:
   - MongoDB
   - Express.js
   - Mongoose (MongoDB ODM)
   - Axios

2. **Initialization**:
   - Navigate to the frontend directory: `cd mern-backend`
   - Install dependencies: `npm install`
   - Start the server: `npm start`

4. **Endpoints**:
   - `/api/initialize`: Fetches and initializes the database with product transactions.
   - `/api/transactions`: Lists transactions with search and pagination.
   - `/api/statistics`: Provides sales, sold items, and unsold items statistics.
   - `/api/bar-chart`: Generates bar chart data for price ranges.
   - `/api/pie-chart`: Generates pie chart data for unique categories.

---

## Frontend (frontend) Details

### Features

1. **Transaction Table**:
   - Displays product transactions for the selected month.
   - Search functionality for title, description, and price.
   - Pagination for transactions with Next and Previous buttons.

2. **Transaction Statistics**:
   - Displays total sale amount, total sold items, and total not sold items based on the selected month.

3. **Bar Chart**:
   - Visualizes price ranges and the number of items for the selected month.

4. **Pie Chart**:
   - Displays unique categories and their corresponding item counts for the selected month.

### Frontend Setup

1. **Dependencies**:
   - React
   - Chart.js
   - Axios

2. **Run the Application**:
   - Navigate to the frontend directory: `cd mern-frontend`
   - Install dependencies: `npm install`
   - Start the application: `npm start`

---

## Instructions

### Initialization

- Ensure that the backend is initialized before using the frontend (`npm start` in `mern_backend`).

### Frontend Usage

1. Select a month from the dropdown (Jan to Dec).
2. View the transaction table for the selected month.
3. Use the search box to filter transactions by title, description, or price.
4. Navigate through the transaction pages using Next and Previous buttons.
5. View the statistics for total sale amount, sold, and not sold items.
6. Visualize data with bar and pie charts corresponding to the selected month.

---

## Technologies Used

- **Backend**:
  - Node.js
  - Express.js
  - MongoDB
  - Mongoose
  - Axios

- **Frontend**:
  - React.js
  - Chart.js
  - Axios

---

## Conclusion

This Roxiler MERN assignment provides a complete solution for managing product transactions, statistics, and visualizations with a seamless user experience across both backend and frontend.



## Working demo video of the application:

https://github.com/user-attachments/assets/a8c655dd-ee4a-4592-9e31-77760062876d
