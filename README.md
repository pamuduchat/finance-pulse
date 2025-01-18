# Finance Pulse

Finance Pulse is a financial management platform designed to help users effectively track income and expenses, manage accounts, and gain insights into their financial status.

## Features

- **Income & Expense Tracking**: Easily monitor your finances with a categorized transaction history.
- **Account Management**: Manage multiple accounts with ease.
- **Interactive Dashboard**: Analyze your financial data through visually engaging charts and summaries.
- **CSV Import**: Import transaction data from CSV files for quick setup and management.
- **Transaction Categorization**: Organize your transactions into categories for detailed insights.

## Tech Stack

- **Frontend**: [Next.js](https://nextjs.org/), [Tailwind CSS](https://tailwindcss.com/), [Shadcn UI](https://ui.shadcn.dev/)
- **Backend**: [Hono.js](https://hono.dev/), [Clerk](https://clerk.dev/)
- **Database**: [PostgreSQL](https://www.postgresql.org/), [Drizzle ORM](https://orm.drizzle.team/)
- **State Management**: [TanStack Query](https://tanstack.com/query/v4)

## Installation

### Prerequisites

- Node.js (v16 or higher)
- PostgreSQL

### Setup

1. Clone the repository:

```bash
git clone https://github.com/yourusername/finance-pulse.git
cd finance-pulse
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:
   Create a `.env.local` file in the root directory and configure the necessary environment variables:

```env
DATABASE_URL=your_postgresql_connection_string
CLERK_API_KEY=your_clerk_api_key
NEXT_PUBLIC_CLERK_FRONTEND_API=your_clerk_frontend_api
```

4. Generate and run database migrations:

```bash
npm run db:generate
npm run db:migrate
```

5. Start the development server:

```bash
npm run dev
```

6. Open the application in your browser:

```
http://localhost:3000
```

## Project Structure

- `app/`: Contains the main application components and pages
- `components/`: Reusable UI components for building the application
- `db/`: Database-related files and configurations
- `drizzle/`: Configuration and migrations for Drizzle ORM
- `features/`: Feature-specific components and hooks
- `hooks/`: Custom React hooks to extend functionality
- `lib/`: Utility functions and libraries
- `providers/`: Context providers for global state management
- `public/`: Static assets such as images and fonts
- `scripts/`: Scripts for tasks such as seeding data
- `tailwind.config.ts`: Configuration file for Tailwind CSS
- `tsconfig.json`: TypeScript configuration

## Available Scripts

- `npm run dev`: Start the development server
- `npm run build`: Build the application for production
- `npm start`: Start the production server
- `npm run lint`: Run ESLint to analyze code for potential issues
- `npm run db:generate`: Generate database migrations
- `npm run db:migrate`: Run database migrations
- `npm run db:seed`: Seed the database with initial data
- `npm run db:studio`: Open Drizzle Studio for database management

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch:

```bash
git checkout -b feature-name
```

3. Commit your changes:

```bash
git commit -m "Add a meaningful commit message"
```

4. Push to the branch:

```bash
git push origin feature-name
```

5. Submit a pull request
