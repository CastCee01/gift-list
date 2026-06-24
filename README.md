# Gift List

Gift List is a web app for creating and sharing gift lists so guests can reserve gifts and avoid buying duplicates.

Live app: https://gift-list-alpha.vercel.app/

## Overview

Gift List allows a user to create an account, create gift lists, add gift ideas, and share a public link with guests. Guests can open the shared list without creating an account and reserve a gift. Once a gift is reserved, it becomes unavailable for other guests.

## Main Features

* User signup and login
* Create multiple gift lists
* Add gifts to a list
* Public share link for each list
* Guest gift reservation without account
* Reserved gifts are blocked from duplicate reservation
* Owner can see who reserved each gift
* Live deployment on Vercel

## Tech Stack

* React
* Vite
* Tailwind CSS
* React Router
* Supabase Auth
* Supabase PostgreSQL
* Vercel

## Main User Flow

1. User creates an account or logs in.
2. User creates a gift list.
3. User adds gifts to the list.
4. User copies and shares the public list link.
5. Guest opens the public link.
6. Guest reserves a gift.
7. Gift becomes reserved.
8. Owner can see the reservation details.

## Local Setup

Clone the repository:

```bash
git clone https://github.com/CastCee01/gift-list.git
cd gift-list
```

Install dependencies:

```bash
npm install
```

Create a `.env` file in the project root:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_publishable_key
```

Run the development server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

## Environment Variables

The app requires these environment variables:

```env
VITE_SUPABASE_URL
VITE_SUPABASE_ANON_KEY
```

These are configured locally in `.env` and in Vercel under Environment Variables.

## Database

The app uses Supabase with these main tables:

* `profiles`
* `gift_lists`
* `gift_items`
* `reservations`

Reservations are handled through a Supabase function to prevent duplicate gift reservations.

## MVP Status

Current MVP status: functional.

Completed:

* Authentication
* Database schema
* Private dashboard
* Gift list creation
* Gift creation
* Public sharing
* Guest reservations
* Owner reservation visibility
* Production deployment

Possible future improvements:

* Gift editing
* Gift deletion from UI
* Better image handling
* Email notifications
* Reservation cancellation
* Improved profile settings
* Custom list themes
* Better mobile polish
