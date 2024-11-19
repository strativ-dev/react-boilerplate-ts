# Frontend Documentation

## Introduction

Welcome to our React TypeScript boilerplate! This project is designed to provide a solid, scalable foundation for building modern web applications. We've carefully selected technologies and structured the project to make development smooth, efficient, and enjoyable.

## Project Overview

Our boilerplate is built with:

- React 18
- TypeScript
- Vite for lightning-fast development
- React Router for routing
- Tanstack React Query for data fetching
- Zustand for state management
- Axios for API interactions
- Ant Design for UI components
- Styled Components for styling
- Vitest for testing

## Technologies Used

- **React (v18.3.1)**: Our primary UI library, providing a component-based architecture

- **TypeScript (v5.6.2)**: Adding type safety and enhanced developer experience

- **Vite (v5.4.10)**: Our blazing-fast build tool and development server

- **Tanstack React Query (v5.59.20)**: Powerful data synchronization and caching
- **Axios (v1.7.7)**: Promise-based HTTP client for API requests

- **Zustand (v4.5.4)**: State management for React applications

- **React Router (v6.27.0)**: Declarative routing for React applications

- **Ant Design (v5.17.2)**: Comprehensive React UI library with a wide range of pre-built components

- **Styled Components (v6.1.13)**: CSS-in-JS solution for component-level styling

- **Vitest (v3.1.1)**: Testing framework for JavaScript and TypeScript

## Project Structure

```
src/
├── app/                # Top-level application pages
│   ├── authentication/
│   └── dashboard/
├── assets/             # Static assets and global theme
├── features/           # Feature-specific modules
│   ├── authentication/
│   │   ├── components/
│   │   ├── styles/
│   │   └── types/
│   └── dashboard/
├── routes/             # Routing configuration
├── services/           # API and authentication services
├── stores/             # Global state management
├── App.tsx             # Root application component
└── main.tsx            # Application entry point
```

## Project Structure Responsibilities

### `src/app/`

Responsible for top-level page components that represent entire routes or views in the application.

- **Purpose**: Compose page-level components using feature-specific components
- **Contents**:
  - High-level page components
  - Page-specific layout and structure
- **Examples**:
  - `authentication/login/index.tsx`: Login page component
  - `dashboard/home/index.tsx`: Dashboard home page

### `src/assets/`

Stores static assets and global styling resources.

- **Purpose**: Centralize static files and global design tokens
- **Contents**:
  - SVG icons
  - Global theme configurations
  - Font files
  - Global CSS or styling variables
- **Examples**:
  - `theme/globals.ts`: Global theme configuration
  - `react.svg`: Application logo or icon

### `src/features/`

Organizes feature-specific modules with a modular and scalable approach.

- **Purpose**: Encapsulate feature-related code with clear boundaries
- **Structure**:
  - `components/`: Reusable components for the feature
  - `styles/`: Feature-specific styling
  - `types/`: TypeScript type definitions
- **Examples**:
  - `authentication/`: Login, registration, authentication-related code
  - `dashboard/`: Dashboard-specific components and logic

#### Feature Module Breakdown

- **`components/`**:
  - Reusable React components specific to the feature
  - Smaller, focused components that can be composed into pages
- **`styles/`**:
  - Styled-components or CSS modules
  - Feature-specific styling logic
- **`types/`**:
  - TypeScript interfaces and type definitions
  - Ensures type safety for the feature

### `src/routes/`

Manages application routing configuration.

- **Purpose**: Define and organize application routes
- **Contents**:
  - Route definitions
  - Route protection logic
  - Navigation paths
- **Key Files**:
  - `index.tsx`: Main router configuration
  - `paths.ts`: Centralized route constants
  - `private-routes.ts`: Protected route definitions
  - `public-routes.ts`: Publicly accessible routes

### `src/services/`

Handles external service interactions and API communications.

- **Purpose**: Centralize network requests and service logic
- **Contents**:
  - API call implementations
  - Authentication service
  - External service integrations
- **Examples**:
  - `api.ts`: Base API configuration
  - `auth.ts`: Authentication-related service methods

### `src/stores/`

Manages global state using Zustand.

- **Purpose**: Provide centralized state management
- **Contents**:
  - Global state stores
  - State manipulation logic
- **Examples**:
  - `useAuthStore.ts`: Authentication state management
  - Other feature-specific stores

## Architectural Principles

1. **Modularity**: Each feature is self-contained and can be developed independently
2. **Type Safety**: Comprehensive TypeScript usage
3. **Separation of Concerns**: Clear boundaries between different parts of the application
4. **Scalability**: Structure allows easy addition of new features

## Getting Started

### Prerequisites

- Node.js (v22.0.0 or newer)
- PNPM (v9.0.0 or newer)

### Installation Steps

1. Clone the repository
2. Run `pnpm install` to install dependencies
3. Copy `env.example` to `.env` and configure your environment variables
4. Run `pnpm dev` to start the development server

## Development Workflow

### Running the Project

- `pnpm dev`: Start development server
- `pnpm build`: Create production build
- `pnpm lint`: Run ESLint
- `pnpm preview`: Preview production build

### Code Quality Tools

- **ESLint**: Ensures code quality and catches potential issues
- **Prettier**: Maintains consistent code formatting
- **Husky**: Runs linters before commits

## State Management

We use Zustand for state management in our application. This section outlines our conventions and best practices for working with Zustand stores.

### Store Structure

Each store should be defined in a separate file under `src/stores` directory. The store file should:

1. Define an interface for the store state
2. Create and export the store using Zustand's `create` function
3. Include any necessary actions as part of the store

Example structure:

```typescript
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface StoreState {
  // State properties
  someProperty: SomeType;

  // Actions
  setSomeProperty: (value: SomeType) => void;
}

export const useStore = create<StoreState>()(
  devtools(
    persist(
      // if you need to persist in local storage
      (set) => ({
        // Initial state and actions implementation
      }),
      { name: 'storeName' }
    ),
    { name: 'Store Name' } // for persist
  )
);
```

### Middleware

We commonly use two middleware functions with our stores:

- `devtools`: For Redux DevTools integration
- `persist`: For persisting store state in localStorage

### Naming Conventions

- Store hooks should be named `useStoreName` (e.g., `useAuthStore`)
- Action names should be descriptive and start with a verb (e.g., `setUser`, `updateUser`)

### Using Stores in Components

Import and use store hooks in components as follows:

```typescript
import useStoreName from './path/to/store';

function MyComponent() {
	const value = useStoreName((state) => state.someProperty);
	const setValue = useStoreName((state) => state.setSomeProperty);

	// or

	const { value, setValue } = useStoreName();
	// Use value and setValue in your component
}
```

### Best Practices

- Keep stores focused on a specific domain or feature
- Use TypeScript for type safety in store definitions
- Prefer multiple small stores over a single large store
- Use selectors to access specific parts of the state
- Clear sensitive data when appropriate (e.g., on logout)

## Naming Conventions

### File Naming

- Use PascalCase for component files (e.g., `LoginForm.tsx`, `UserProfileCard.tsx`).
- Use camelCase for other JavaScript/TypeScript files (e.g., `authService.ts`, `userUtils.ts`).
- Use lowercase for non-component files and directories (e.g., `assets/`, `features/`).

### Component Naming

- Use PascalCase for component names (e.g., `LoginForm`, `UserProfileCard`).
- Use descriptive names that reflect the component's purpose.
- For component directories, use PascalCase and keep related files together (e.g., `LoginForm/LoginForm.tsx`, `LoginForm/styles.ts`).

### Variable and Function Naming

- Use camelCase for variable and function names (e.g., `userEmail`, `handleLogin`).
- Use descriptive names that convey purpose.
- For boolean variables, prefix with "is", "has", or "should" (e.g., `isAuthenticated`, `hasPermission`, `shouldRefreshData`).

### Constants Naming

- Use UPPER_SNAKE_CASE (e.g., `MAX_USER_ATTEMPTS`, `API_BASE_URL`).
- Group related constants in a single file (e.g., `constants/index.ts`).

### TypeScript Types and Interfaces

- Use PascalCase (e.g., `UserProfile`, `AuthenticationResponse`).

### CSS Naming

- Use kebab-case for CSS class names (e.g., `login-form`, `user-profile-card`).

### Event Handlers

- Prefix with `handle` (e.g., `handleLogin`, `handleInputChange`)

### Store and Hook Naming

- Prefix with `use` (e.g., `useAuthStore`, `useUserProfile`)

## Contributing

### Pull Request Process

- Create a branch for your feature or bugfix from `dev` branch. Follow the branch name format.
  ```bash
     git checkout -b feature/feature-name
  ```
- Make your changes, ensuring they match our coding standards.
- Make sure there is no merge-conflicts by pulling the `dev` branch.
- Issue a pull request and add your teammates as reviewers.
- Respond to any feedback from reviewers.

### Commit Message Guidelines

Follow the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/#specification) specification:

```
<type>(ticket-number): <message>

[optional body]

[optional footer(s)]
```

Types: feat, fix, docs, style, refactor, test, chore.

Example:

```bash
feat(AB-000): add login functionality
```
