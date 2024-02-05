# XenoGraft Mobiles Client

\
[Live Demo Link](https://xenograft-mobiles.netlify.app)\
\
\
![image](https://github.com/Porgramming-Hero-web-course/l2b2-full-stack-a5-client-side-friyad/assets/86700138/b9982912-4974-47f6-817c-8e1f0cb41ba9)

## Description

XenoGraft Mobiles is a comprehensive smartphone management dashboard designed for efficiently managing smartphone inventory, tracking sales, and analyzing sales history. It's not a whole website but mejor part of a large mobile selling platform. Where every phone seller has access to their dashboard to manage smartphones, sell smartphones, and track the sales history.

The primary objective of this project is to create a user-friendly dashboard that empowers users to manage smartphone inventory and sales seamlessly.

This project incorporates features such as secure JWT authentication, complete CRUD operations, global state management, real-time UI updates, and mini ADVANCED smartphone filtering.

## Features

### 1. Authentication

- User Registration.
- User Login.
- Use of JWT to secure authentication.

### 2. Smartphone Management

#### CRUD Operations

- Add A New Smartphone to the Inventory.
- Delete existing smartphone.
- Duplicate & Edit / Create Variant from exising smartphone.
- Update Smartphone Details.
- View the list of smartphones in the inventory.

#### Dynamic Filtering System

- A Robust dynamic filtering system to filter smartphones in inventory
- The reason why it's **DYNAMIC** is the filtering options are not static. Filtering options will be generated based on the fetched data.
- Filters include price, release date, brand, model, operating system, storage capacity, screen size, Color and Battery size.

#### Bulk Delete Product Options

- User are able to select multiple smartphone and click on delete icon to delete selected phones.

#### Others

- Search option to search a smartphone in inventory
- Grid & List view option to view smartphones in different way.

### 3. Sales Management

- User can select a smartphone to sell from the **Sell** page.
- Then complete the sell with a form including quantity, buyer name, and sale date.
- The system will track how many quantities are sold off a phone, and it will be automatically updated to the product on the inventory
- Products with zero quantity are automatically removed from the inventory.

### 4. Sales History

- If a product is sold, this product data and few additional data like sell quantity, buyer name and sale date will be stored to the **Sales History**.
- After that user will be able to see his entire sales history from **Sales History** page.
- View sales history categorized by weekly, daily, monthly, and yearly periods.

### 5. User Interface Features

- Real-time UI updates for changes like product updates, sales, etc.
- Utilization of RTK Query for efficient CRUD operations.
- Data Caching to prevent unnecessary API calls and save the API cost.
- Implementation of Re-fetching functionality for data accuracy.
- Smooth transition on route changing.
- Nice Modals, Selects, Date Picker, Buttons and other UI components.
- 100% responsive in all devices.
- Skeleton view on loading.
- Resizable sidebar.
- Overall a smooth experience.

#### Others

- Use of Toast to show error and success messages.
- Privet Route to protect the privet pages from unauthenticated users.
- Dynamic Input field generations for forms.
- Form Validations using complete type safe ZOD package with react-hook-form.

### 6. State Management

- Best use of Redux Toolkit for maintaining a consistent application state.

## Technologies

- React
- TypeScript
- Vite
- Tailwind CSS
- Redux Toolkit
- RTK Query
- Shadecn UI
- React Hook Form
- Framer Motion

## Dependencies

- List of dependencies mentioned in `package.json`.

## Setup

1. Clone the repository.

```
git clone <repo_url>
```

2. Run this command to install dependencies.

```
npm install
```

3. Use scripts mentioned above for various tasks.
