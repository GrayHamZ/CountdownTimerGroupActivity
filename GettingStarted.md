# Getting Started with Vite + React

This guide covers the fundamentals of setting up a Vite + React project, using React Router for navigation, and creating reusable components.

## Table of Contents
1. [Setting Up a Vite + React Project](#setting-up-a-vite--react-project)
2. [Using React Router DOM (v5.2.0)](#using-react-router-dom-v520)
3. [Creating Reusable Components](#creating-reusable-components)
4. [Running and Building Your Project](#running-and-building-your-project)

---

## Setting Up a Vite + React Project

### What is Vite?
Vite is a modern build tool that provides a faster and leaner development experience for modern web projects. It offers instant server start, lightning-fast Hot Module Replacement (HMR), and optimized builds.

### Creating a New Vite + React Project

1. **Create the project** using npm:
   ```bash
   npm create vite@latest my-project-name -- --template react
   ```

   Replace `my-project-name` with your desired project name.

2. **Navigate to the project directory**:
   ```bash
   cd my-project-name
   ```

3. **Install dependencies**:
   ```bash
   npm install
   ```

4. **Start the development server**:
   ```bash
   npm run dev
   ```

### Project Structure
After creation, your project will have the following structure:
```
my-project-name/
├── node_modules/
├── public/
├── src/
│   ├── assets/
│   ├── App.css
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── index.html
├── package.json
└── vite.config.js
```

---

## Using React Router DOM (v5.2.0)

### What is React Router?
React Router DOM is a library that enables navigation between different views/pages in a React application. It allows you to create single-page applications with multiple routes.

### Installation

Install React Router DOM v5.2.0:
```bash
npm install react-router-dom@5.2.0
```

### Core Components

1. **BrowserRouter**: Wraps your entire application to enable routing
2. **Route**: Defines a path and the component to render
3. **Switch**: Renders only the first matching route
4. **Link**: Creates navigation links without page reload

### Basic Setup

#### Step 1: Wrap Your App with BrowserRouter

In `main.jsx`, import and wrap your App component:

```jsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
```

#### Step 2: Define Routes in Your App

In `App.jsx`, import routing components and define your routes:

```jsx
import { Route, Switch } from 'react-router-dom'
import Home from './components/Home'
import About from './components/About'

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/about">
          <About />
        </Route>
      </Switch>
    </div>
  )
}

export default App
```

#### Step 3: Create Navigation Links

Use the `Link` component to navigate between routes:

```jsx
import { Link } from 'react-router-dom'

function Navigation() {
  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/about">About</Link>
    </nav>
  )
}
```

### Advanced Routing Features

#### Route Parameters
```jsx
<Route path="/user/:id">
  <UserProfile />
</Route>
```

Access parameters in the component:
```jsx
import { useParams } from 'react-router-dom'

function UserProfile() {
  const { id } = useParams()
  return <div>User ID: {id}</div>
}
```

#### Programmatic Navigation
```jsx
import { useHistory } from 'react-router-dom'

function MyComponent() {
  const history = useHistory()

  const navigateToHome = () => {
    history.push('/')
  }

  return <button onClick={navigateToHome}>Go Home</button>
}
```

### Application in This Project

In this countdown timer project, routing is set up but uses only a single route:

```jsx
// App.jsx
<Switch>
  <Route exact path="/">
    <Timer />
  </Route>
  {/* Additional routes can be added here */}
</Switch>
```

The routing infrastructure is in place, making it easy to add more routes in the future (e.g., settings page, about page, etc.).

---

## Creating Reusable Components

### What are Reusable Components?
Reusable components are self-contained pieces of UI that can be used multiple times throughout your application with different data. They follow the DRY (Don't Repeat Yourself) principle and make your code more maintainable.

### Key Principles

1. **Single Responsibility**: Each component should do one thing well
2. **Props for Customization**: Use props to make components flexible
3. **Separation of Concerns**: Keep logic, styling, and presentation organized

### Example 1: TimeInput Component

This component creates a reusable input field for time values:

```jsx
import React from 'react';

function TimeInput({ label, value, onChange, max }) {
  const handleChange = (e) => {
    const inputValue = parseInt(e.target.value) || 0;
    // Ensure value doesn't exceed max
    if (inputValue >= 0 && inputValue <= max) {
      onChange(inputValue);
    }
  };

  return (
    <div style={{ margin: '10px' }}>
      <label>
        {label}:
        <input
          type="number"
          min="0"
          max={max}
          value={value}
          onChange={handleChange}
          style={{
            marginLeft: '10px',
            width: '60px',
            padding: '5px',
            fontSize: '16px'
          }}
        />
      </label>
    </div>
  );
}

export default TimeInput;
```

**Usage:**
```jsx
<TimeInput
  label="Hours"
  value={hours}
  onChange={setHours}
  max={23}
/>
<TimeInput
  label="Minutes"
  value={minutes}
  onChange={setMinutes}
  max={59}
/>
```

**Why it's reusable:**
- Used for hours, minutes, and seconds with different max values
- Accepts custom labels via props
- Handles its own validation logic
- Can be used in any project that needs number inputs

### Example 2: TimeDisplay Component

This component displays time in a formatted way:

```jsx
import React from 'react';

function TimeDisplay({ hours, minutes, seconds }) {
  // Format numbers to always show 2 digits
  const formatTime = (time) => {
    return time.toString().padStart(2, '0');
  };

  return (
    <div style={{
      fontSize: '48px',
      fontFamily: 'monospace',
      margin: '20px',
      padding: '20px',
      border: '2px solid #646cff',
      borderRadius: '8px',
      minWidth: '200px',
      textAlign: 'center'
    }}>
      {formatTime(hours)}:{formatTime(minutes)}:{formatTime(seconds)}
    </div>
  );
}

export default TimeDisplay;
```

**Usage:**
```jsx
<TimeDisplay hours={2} minutes={30} seconds={45} />
// Displays: 02:30:45
```

**Why it's reusable:**
- Takes any time values as props
- Handles formatting internally
- Consistent styling across the app
- Can be reused for stopwatches, clocks, timers, etc.

### Example 3: Timer Component (Composition)

The Timer component demonstrates composition by combining multiple reusable components:

```jsx
function Timer() {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  return (
    <div>
      <h1>Countdown Timer</h1>

      {/* Using TimeDisplay component */}
      <TimeDisplay hours={hours} minutes={minutes} seconds={seconds} />

      {/* Using multiple TimeInput components */}
      <TimeInput label="Hours" value={hours} onChange={setHours} max={23} />
      <TimeInput label="Minutes" value={minutes} onChange={setMinutes} max={59} />
      <TimeInput label="Seconds" value={seconds} onChange={setSeconds} max={59} />
    </div>
  );
}
```

### Best Practices for Reusable Components

1. **Use Props for Data**: Pass data to components via props rather than hardcoding values
   ```jsx
   // Good
   <Button text="Click Me" onClick={handleClick} />

   // Bad
   <Button /> // with hardcoded "Click Me" inside
   ```

2. **Keep Components Small**: Each component should have one clear purpose
   ```jsx
   // Good: Separate components
   <TimeInput />
   <TimeDisplay />

   // Bad: One giant component doing everything
   <TimeInputAndDisplay />
   ```

3. **Provide Sensible Defaults**: Use default props when appropriate
   ```jsx
   function Button({ text = "Submit", type = "button" }) {
     return <button type={type}>{text}</button>
   }
   ```

4. **Name Props Clearly**: Use descriptive prop names
   ```jsx
   // Good
   <TimeInput label="Hours" max={23} />

   // Bad
   <TimeInput l="Hours" m={23} />
   ```

5. **Extract Repeated UI**: If you're copying and pasting JSX, make it a component
   ```jsx
   // Before: Repeated code
   <div className="card">
     <h2>{title1}</h2>
     <p>{content1}</p>
   </div>
   <div className="card">
     <h2>{title2}</h2>
     <p>{content2}</p>
   </div>

   // After: Reusable component
   function Card({ title, content }) {
     return (
       <div className="card">
         <h2>{title}</h2>
         <p>{content}</p>
       </div>
     )
   }

   <Card title={title1} content={content1} />
   <Card title={title2} content={content2} />
   ```

---

## Running and Building Your Project

### Development Mode

Start the development server with hot module replacement:
```bash
npm run dev
```

The application will typically run at `http://localhost:5173/`

Features in dev mode:
- Instant updates when you save files
- Detailed error messages
- Fast refresh without losing component state

### Production Build

Create an optimized production build:
```bash
npm run build
```

This command:
- Bundles your code
- Minifies JavaScript and CSS
- Optimizes assets
- Creates a `dist` folder with production files

### Preview Production Build

Test the production build locally:
```bash
npm run preview
```

### Project Scripts Summary

| Command | Purpose |
|---------|---------|
| `npm run dev` | Start development server |
| `npm run build` | Create production build |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint to check code quality |

---

## Summary

You've learned how to:

1. **Set up a Vite + React project** for fast development
2. **Use React Router DOM v5.2.0** to create multi-page applications with client-side routing
3. **Create reusable components** that follow best practices and can be used throughout your application
4. **Run and build your project** for development and production

### Next Steps

- Experiment with adding more routes to your application
- Create additional reusable components for common UI patterns
- Learn about React hooks (useState, useEffect, useRef) for managing state and side effects
- Explore CSS modules or styled-components for component-specific styling
- Add form validation and error handling
- Implement more advanced routing features like route guards and nested routes

Happy coding!
