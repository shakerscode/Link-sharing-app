# Project Name: DevLinks

DevLinks is a platform where users can register, sign in, and manage personal links to various platforms. Users can create, update, and share their profiles, displaying their social and professional links through a customizable interface.

## Installation

To install and run the project locally, follow these steps:

1. **Clone the repository**:

   ```bash
   git clone https://github.com/shakerscode/Link-sharing-app.git
   cd Link-sharing-app
   ```

2. **Install dependencies using pnpm**:
   Ensure that you have [pnpm](https://pnpm.io/installation) installed. If not, install it globally:

   ```bash
   npm install -g pnpm
   ```

   After that, run:

   ```bash
   pnpm install
   ```

3. **Set up environment variables**:
   Create a `.env` file in the root of the project and configure the required environment variables (e.g., database credentials, JWT secrets). Here is an example:

   ```bash
   VITE_API_URL="http://localhost:5001/api"
   VITE_API_URL="https://devlinks-server-euwp.onrender.com/api"
   ```

4. **Run the application**:

   ```bash
   pnpm run dev
   ```

5. **Visit the application**:
   Open your browser and go to `http://localhost:5173`.

## Technologies Used Full App

- **React** - For building the user interface.
- **React Router** - For handling routing within the app.
- **TailwindCSS** - For designing the layout and styling.
- **TypeScript** - For type-safe code across the project.
- **Zustand** - For state management.
- **React Query** - For managing server-side data and caching.
- **Express.js** - Backend server to handle requests and routes.
- **MongoDB** - NoSQL database for storing user data and links.
- **Cloudinary** - For uploading and managing user images.
- **Multer** - For handling file uploads on the server.
- **jsonwebtoken (JWT)** - For user authentication and session management.
- **bcryptjs** - For password encryption and validation.
- **pnpm** - Package manager used for managing dependencies.

## Credits

- Developed by **Shaker Ahamed**.

## Node
- You must clone the server public repo for opening it in locally. 

 ```bash
   SERVER_REPO = "https://github.com/shakerscode/devlinks-server" 

   ```