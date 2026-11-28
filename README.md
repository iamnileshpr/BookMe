# BookMe Setup

This project has two parts:

- `backend` - Node.js, Express, MongoDB
- `frontend` - React, Vite

Read these setup files:

- [Backend and MongoDB setup](docs/backend-setup/README.md)
- [Google Calendar setup](docs/google-calendar-setup/README.md)
- [Stripe setup](docs/stripe-setup/README.md)
- [Brevo email setup](docs/brevo-setup/README.md)


## Quick Start

1. Clone the repo.

```bash
git clone <your-repo-url>
cd repo-name
```

2. Setup backend and MongoDB.

```text
docs/backend-setup/README.md
```

3. Setup frontend.

```bash
cd frontend
npm install
npm run dev
```

4. Open frontend.

```text
http://localhost:5173
```

## Optional Setup

- Setup Stripe for paid bookings.
- Setup Brevo for OTP and booking emails.
- Setup Google Calendar for calendar sync.
