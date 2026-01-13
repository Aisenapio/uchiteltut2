# uchiteltut2 Project Context

## Project Overview
**uchiteltut2** is a portal for teacher employment (Портал для трудоустройства учителей) built as a modern React application using Vite as the build tool. The project is structured as a monorepo with a client-side application in the `client` directory and an empty `server` directory, suggesting this is a frontend-focused application that likely connects to external APIs for backend functionality.

## Technology Stack
- **Frontend Framework**: React 19.1.1
- **Build Tool**: Vite 7.1.7
- **Styling**: Tailwind CSS with custom theme configuration
- **UI Components**: Shadcn UI components with Radix UI primitives
- **Routing**: React Router 7.9.4
- **State Management**: React hooks and context API
- **Icons**: Lucide React and Tabler Icons
- **Form Handling**: React Hook Form with Zod validation
- **Data Tables**: TanStack React Table
- **Charts**: Recharts
- **Date Handling**: date-fns and date-fns-tz
- **Internationalization**: Partially prepared with Russian language focus

## Application Architecture
The application follows a component-based architecture with the following structure:
- `src/components` - Reusable UI components
- `src/data` - Data structures and mock data
- `src/hooks` - Custom React hooks
- `src/lib` - Utility functions and shared libraries
- `src/pages` - Page components organized by functionality
  - `public` - Public-facing pages (home, job listings)
  - `auth` - Authentication flows (login, register, password reset)
  - `main` - Main dashboard with role-based layouts
    - `school` - School-specific functionality (vacancies, teacher search)
    - `teacher` - Teacher-specific functionality (profile, job search, responses)
    - `settings` - User settings and preferences
    - `developers` - Developer tools (API keys, webhooks)
    - Other admin features (users, tasks, products, subscribers)

## Key Features
- Role-based dashboards for schools and teachers
- Job posting and search functionality
- User authentication and profile management
- Dark/light theme support with system preference detection
- Responsive design using Tailwind CSS
- Comprehensive admin panel with multiple sections
- Component library integration (shadcn/ui)

## Building and Running

### Development Environment
```bash
cd client
npm install  # Install dependencies
npm run dev  # Start development server on port 3001
```

### Production Build
```bash
npm run build  # Creates production build in dist/
npm run preview  # Preview production build locally
```

### Docker Deployment
The application includes a Dockerfile that:
- Uses Node 24 Alpine base image
- Installs dependencies with `npm ci`
- Builds the application
- Runs the preview server on port 3001
- Exposes the app on 0.0.0.0 for Docker compatibility

Run with:
```bash
docker build -t uchiteltut2-client .
docker run -p 3001:3001 uchiteltut2-client
```

## Development Conventions
- Component organization follows shadcn/ui patterns
- File-based routing with React Router
- CSS variables for theming with OKLCH color space
- Modern JavaScript with ES modules
- ESLint for code linting
- Alias `@` points to `src` directory
- Consistent naming conventions for components and routes

## Project Structure
```
uchiteltut2/
├── client/                 # Frontend React application
│   ├── public/             # Static assets
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── data/           # Mock data and data structures
│   │   ├── hooks/          # Custom React hooks
│   │   ├── lib/            # Utility functions
│   │   ├── pages/          # Page components
│   │   ├── index.css       # Global styles
│   │   ├── layout.jsx      # Root layout
│   │   ├── main.jsx        # Application entry point
│   │   ├── providers.jsx   # Context providers
│   │   └── router.jsx      # Application routing
│   ├── package.json        # Dependencies and scripts
│   ├── vite.config.js      # Vite configuration
│   └── Dockerfile          # Container configuration
└── server/                 # Empty directory (placeholder for backend)
```

## Notes
- The server directory is currently empty, indicating this may be a frontend-only application or the backend is planned for future development
- The application is configured to run on port 3001
- Theme preferences are persisted in localStorage
- The application supports both light and dark modes with automatic system preference detection