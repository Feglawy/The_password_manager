# The Password Manager

## Overview

The Password Manager is a secure and user-friendly application that allows users to store and manage their passwords efficiently. Built with modern web technologies, it ensures data security with SQLite3.

## Features

- **Secure Storage**: Passwords are stored securely using SQLite3.
- **User-Friendly Interface**: Built with React for a responsive and intuitive user experience.
- **Environment Configuration**: Easily configurable with environment variables.

## Prerequisites

- Node.js (version >= 14.x)
- npm (Node Package Manager)

## How to Configure and Build the Project

1. **Create a `.env` File**: Store your `SECRET_KEY` in the `.env` file for secure access.

   ```text
   SECRET_KEY=your_secret_key_here
   ```

2. **Install Dependencies**: Run the following command to install all necessary packages.

   ```bash
   npm install
   ```

3. **Rebuild Native Dependencies**: Make the project compatible with `better-sqlite3`.

   ```bash
   npm run rebuild
   ```

4. **Start the Development Server**: Launch the application in development mode.

   ```bash
   npm run dev
   ```

## Project Structure

```
The_password_manager/
├── electron/                      # Directory containing Electron-related files
│   ├── db/                        # Directory for database management
│   │   ├── Managers/                   # Directory for database manager classes
│   │   │   ├── AccountManager.ts       # Handles account-related database operations
│   │   │   ├── WebsiteManager.ts       # Manages website-related data in the database
│   │   │   └── SignedInByManager.ts    # Manages signed-in user sessions and related data
│   │   ├── config.ts              # Configuration settings for the database connection
│   │   ├── csvManager.ts          # Utility for importing/exporting data in CSV format
│   │   ├── DBConnection.ts        # Establishes and manages the database connection
│   │   ├── schema.ts              # Project's database schema definitions
│   │   ├── types.ts               # Database type definitions for TypeScript usage
│   │   └── utils.ts               # Utility functions for database operations
│   ├── electron-env.d.ts          # Type definitions for Electron environment
│   ├── main.ts                    # Main Electron entry point; initializes the application
│   ├── preload.ts                 # Preloads scripts for the renderer process; secures context
│   └── utils.ts                   # General utility functions for the Electron app
├── public/                        # Public directory for static assets
│   ├── font/                      # Directory for custom fonts
│   └── icons                      # All other public icons
├── src/                           # Directory for React frontend components
│   ├── assets/                    # Directory for static assets used in the React app
│   ├── components/                # Reusable React components
│   ├── context/                   # Context API providers for state management
│   ├── style/                     # Stylesheets (CSS) for the React app
│   ├── app.tsx                    # Main application component; entry point for React
│   ├── main.tsx                   # React rendering
│   └── utils.tsx                  # Utility functions for the React app
└── .env                           # Environment variables for the application
```
