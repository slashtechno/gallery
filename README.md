# Gallery

A SvelteKit web application for uploading and viewing images. Uses email-based authentication and supports JPEG, PNG, and HEIC formats.

## Features

- **Authentication**: Email-based authentication with allowed email list
- **Gallery Views**: 
  - Root page shows authenticated user's images or first allowed email's images for unauthenticated users
  - `/users/[id]` route shows images for any specific user ID
- **Image Upload**: Support for JPEG, PNG, and HEIC formats
- **Metadata Removal**: Strips metadata from uploaded images
- **Image Management**: Delete images from your own gallery

## Setup

1. Install dependencies:
   ```bash
   bun install
   ```

2. Create a `.env` file:
   ```env
   AUTH_SECRET=your-secret-key-here
   AUTH_LOOPS_KEY=your-loops-api-key
   AUTH_LOOPS_TRANSACTIONAL_ID=your-loops-transactional-id
   AUTH_ALLOWED_EMAILS=email1@example.com,email2@example.com
   ```

   AUTH_ALLOWED_EMAILS accepts a comma-separated list of allowed email addresses (for example: `alice@example.com,bob@example.com`).

3. Run the development server:
   ```bash
   bun run dev
   ```

The application will be available at `http://localhost:5173`.

## Usage

- **Root page (`/`)**: 
  - If logged in: Shows your own images
  - If not logged in: Shows images for the user associated with the first email in `AUTH_ALLOWED_EMAILS`, or an empty gallery with sign-in prompt if no user is found
- **User galleries (`/users/[user-id]`)**: View any user's gallery by their user ID
- **Authentication**: Only users with email addresses listed in `AUTH_ALLOWED_EMAILS` can sign in and upload images
- **Upload**: Sign in with an authorized email to upload images to your gallery
- **Delete**: Remove images from your own gallery

## Build

```bash
bun run build
```