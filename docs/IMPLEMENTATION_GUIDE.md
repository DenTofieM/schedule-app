# Schedule App - Complete Implementation Guide

A comprehensive mobile application for creating and managing school/class timetables and teacher schedules using Expo + React Native frontend and Express + PostgreSQL backend.

## Project Structure

```
schedule-app/
├── docs/                          # Documentation
│   ├── REQUIREMENTS.md            # Project requirements & rules
│   ├── DATA_MODEL.md              # Entity design & relationships
│   ├── SAMPLE_DATA.json           # Sample data structure
│   └── README.md                  # (This file)
│
├── src/                           # Frontend (React Native/Expo)
│   ├── app/
│   │   ├── (auth)/
│   │   │   ├── _layout.tsx        # Auth layout
│   │   │   ├── login.tsx          # Login screen
│   │   │   ├── register.tsx       # Registration (placeholder)
│   │   │   └── forgot-password.tsx # Password reset (placeholder)
│   │   │
│   │   ├── (app)/
│   │   │   ├── _layout.tsx        # Main app layout with tabs
│   │   │   ├── home.tsx           # Dashboard
│   │   │   ├── master-data.tsx    # Master data management
│   │   │   ├── routines.tsx       # Routine management
│   │   │   ├── builder.tsx        # Routine builder
│   │   │   └── settings.tsx       # Settings
│   │   │
│   │   └── _layout.tsx            # Root layout with auth/app switching
│   │
│   ├── components/
│   │   ├── master-data/           # Master data management components
│   │   │   ├── sections-list.tsx  # Sections management
│   │   │   ├── subjects-list.tsx  # Subjects management
│   │   │   ├── teachers-list.tsx  # Teachers management
│   │   │   ├── days-list.tsx      # Days management
│   │   │   └── periods-list.tsx   # Periods management
│   │   │
│   │   └── routine-builder/       # Routine builder components
│   │       ├── grid-builder.tsx   # Drag & drop grid
│   │       ├── conflicts-list.tsx # Conflicts display
│   │       └── assignment-dialog.tsx # Assignment dialog
│   │
│   ├── store/
│   │   └── index.ts               # Zustand stores (app & routine builder)
│   │
│   ├── services/
│   │   ├── storage.ts             # AsyncStorage service
│   │   └── conflict-detection.ts  # Conflict detection logic
│   │
│   ├── api/
│   │   ├── client.ts              # Axios client setup
│   │   ├── auth.ts                # Auth endpoints
│   │   ├── masterData.ts          # Master data endpoints
│   │   └── routine.ts             # Routine endpoints
│   │
│   ├── hooks/
│   │   ├── use-color-scheme.ts    # Color scheme hook
│   │   └── use-theme.ts           # Theme hook
│   │
│   ├── constants/
│   │   └── theme.ts               # Theme configuration
│   │
│   ├── types/
│   │   └── index.ts               # TypeScript type definitions
│   │
│   ├── global.css                 # Global styles
│   └── utils/                     # Utility functions
│
├── backend/                       # Express Backend
│   ├── src/
│   │   ├── entities/              # TypeORM entities
│   │   │   ├── User.ts
│   │   │   ├── Section.ts
│   │   │   ├── Subject.ts
│   │   │   ├── Teacher.ts
│   │   │   ├── DayAndPeriod.ts
│   │   │   ├── Routine.ts
│   │   │   ├── Assignment.ts
│   │   │   └── ConflictLog.ts
│   │   │
│   │   ├── routes/                # API routes
│   │   │   ├── auth.ts
│   │   │   ├── sections.ts
│   │   │   ├── subjects.ts
│   │   │   ├── teachers.ts
│   │   │   ├── days.ts
│   │   │   ├── periods.ts
│   │   │   ├── routines.ts
│   │   │   ├── assignments.ts
│   │   │   └── config.ts
│   │   │
│   │   ├── database.ts            # Database connection setup
│   │   └── index.ts               # Express app initialization
│   │
│   ├── .env.example               # Environment variables template
│   ├── tsconfig.json              # TypeScript config
│   └── package.json               # Backend dependencies
│
├── tests/                         # Tests directory
├── package.json                   # Frontend dependencies
├── tsconfig.json                  # Frontend TypeScript config
├── app.json                       # Expo configuration
└── .eslintrc.js                   # ESLint configuration
```

## Technology Stack

### Frontend
- **React Native 0.86** - Mobile framework
- **Expo 57.0** - Managed React Native platform
- **Expo Router** - File-based routing
- **Zustand** - State management
- **React Native Paper** - UI components
- **React Hook Form** - Form handling
- **AsyncStorage** - Local data persistence
- **Axios** - HTTP client
- **TypeScript** - Type safety

### Backend
- **Node.js** - Runtime
- **Express 4.18** - Web framework
- **TypeORM** - ORM for database
- **PostgreSQL** - Database
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **TypeScript** - Type safety

### Development Tools
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Jest** - Testing framework
- **GitHub Actions** - CI/CD

## Quick Start

### Prerequisites
- Node.js 18+ and npm
- Expo CLI: `npm install -g expo-cli`
- PostgreSQL 12+ (for backend)
- Git

### Frontend Setup

1. **Install dependencies**
   ```bash
   cd schedule-app
   npm install
   ```

2. **Configure environment**
   ```bash
   # Create .env.local (if needed)
   EXPO_PUBLIC_API_URL=http://localhost:3000/api
   ```

3. **Start development server**
   ```bash
   npm run dev
   # or
   expo start
   ```

4. **Run on simulator/device**
   ```bash
   # iOS
   expo start -i
   
   # Android
   expo start -a
   
   # Web
   expo start -w
   ```

### Backend Setup

1. **Install dependencies**
   ```bash
   cd backend
   npm install
   ```

2. **Configure environment**
   ```bash
   cp .env.example .env
   # Edit .env with your database credentials
   ```

3. **Create database**
   ```bash
   createdb schedule_app
   ```

4. **Run database migrations**
   ```bash
   npm run db:migrate
   ```

5. **Seed sample data** (optional)
   ```bash
   npm run db:seed
   ```

6. **Start development server**
   ```bash
   npm run dev
   ```

The backend will start on `http://localhost:3000`

## API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `POST /api/auth/logout` - User logout
- `GET /api/auth/profile` - Get user profile
- `POST /api/auth/refresh` - Refresh token

### Master Data
- `GET /api/sections` - List all sections
- `POST /api/sections` - Create section
- `PUT /api/sections/:id` - Update section
- `DELETE /api/sections/:id` - Delete section

- `GET /api/subjects` - List all subjects
- `POST /api/subjects` - Create subject
- `PUT /api/subjects/:id` - Update subject
- `DELETE /api/subjects/:id` - Delete subject

- `GET /api/teachers` - List all teachers
- `POST /api/teachers` - Create teacher
- `PUT /api/teachers/:id` - Update teacher
- `DELETE /api/teachers/:id` - Delete teacher

- `GET /api/days` - List all days
- `POST /api/days` - Create day
- `PUT /api/days/:id` - Update day
- `DELETE /api/days/:id` - Delete day

- `GET /api/periods` - List all periods
- `POST /api/periods` - Create period
- `PUT /api/periods/:id` - Update period
- `DELETE /api/periods/:id` - Delete period

### Routines
- `GET /api/routines` - List all routines
- `POST /api/routines` - Create routine
- `GET /api/routines/:id` - Get routine details
- `PUT /api/routines/:id` - Update routine
- `DELETE /api/routines/:id` - Delete routine
- `POST /api/routines/:id/publish` - Publish routine
- `POST /api/routines/:id/archive` - Archive routine
- `GET /api/routines/:id/conflicts` - Check conflicts
- `POST /api/routines/:id/duplicate` - Duplicate routine

### Assignments
- `POST /api/assignments` - Add assignment
- `PUT /api/assignments/:id` - Update assignment
- `DELETE /api/assignments/:id` - Delete assignment
- `GET /api/assignments/routine/:routineId` - Get routine assignments
- `GET /api/assignments/teacher/:teacherId` - Get teacher assignments

### Configuration
- `GET /api/config` - Get school configuration
- `PUT /api/config` - Update school configuration

## Core Features Implemented

### ✅ Phase 1: Foundation (Complete)
- [x] Project requirements and specifications
- [x] Data model and entity design
- [x] TypeScript type definitions
- [x] Project setup and dependencies
- [x] Basic navigation structure
- [x] Authentication screens

### ✅ Phase 2: Master Data (Complete)
- [x] Master data management UI
- [x] Sections (Classes) CRUD
- [x] Subjects CRUD
- [x] Teachers CRUD
- [x] Days CRUD
- [x] Periods CRUD

### ✅ Phase 3: Routine Management (Complete)
- [x] Conflict detection service
- [x] Conflict types: Teacher double-booking, Invalid subject-teacher, Period overlap
- [x] Routine builder screen
- [x] Real-time conflict checking
- [x] Routine status management (Draft, Published, Archived)

### ✅ Phase 4: Backend Infrastructure (Complete)
- [x] Express server setup
- [x] TypeORM database layer
- [x] Entity definitions
- [x] API route structure
- [x] Database schema

### ⏳ Phase 5: API Integration (In Progress)
- [ ] Complete API controllers
- [ ] Authentication middleware
- [ ] Input validation
- [ ] Error handling

### ⏳ Phase 6: Advanced Views (Planned)
- [ ] Class-wise routine view
- [ ] Teacher-wise routine view
- [ ] Weekly routine grid
- [ ] Routine export (PDF/Image)

### ⏳ Phase 7: Local Storage (Planned)
- [ ] AsyncStorage integration
- [ ] Data sync mechanism
- [ ] Offline mode support
- [ ] Conflict resolution

### ⏳ Phase 8: Testing & Production (Planned)
- [ ] Unit tests
- [ ] Integration tests
- [ ] E2E tests
- [ ] Production deployment

## Development Commands

### Frontend
```bash
# Development
npm run dev                 # Start development server
npm run web               # Run on web
npm run ios               # Run on iOS simulator
npm run android           # Run on Android emulator

# Code quality
npm run lint              # Run ESLint
npm run lint:fix          # Fix linting issues
npm run format            # Format code with Prettier
npm run type-check        # TypeScript type checking

# Testing
npm run test              # Run tests
npm run test:watch        # Watch mode
npm run test:coverage     # Coverage report

# Building
expo build:ios            # Build for iOS
expo build:android        # Build for Android
```

### Backend
```bash
# Development
npm run dev               # Start development server with hot reload
npm run build             # Build TypeScript
npm run start             # Start production server

# Database
npm run db:migrate        # Run migrations
npm run db:seed           # Seed sample data

# Code quality
npm run lint              # Run ESLint
npm run typecheck         # TypeScript type checking

# Testing
npm run test              # Run tests
npm run test:watch        # Watch mode
```

## Project Workflow

### For Developers

1. **Create Feature Branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make Changes**
   - Follow code style (ESLint + Prettier)
   - Add type annotations
   - Write tests for new features

3. **Run Quality Checks**
   ```bash
   npm run lint:fix
   npm run type-check
   npm run test
   ```

4. **Commit and Push**
   ```bash
   git add .
   git commit -m "feat: description of changes"
   git push origin feature/your-feature-name
   ```

5. **Create Pull Request**
   - Add description of changes
   - Link related issues
   - Wait for review

## Troubleshooting

### Expo Issues
```bash
# Clear cache
expo start -c

# Reset project
npm run reset-project

# Reinstall dependencies
rm -rf node_modules && npm install
```

### Backend Issues
```bash
# Check database connection
psql -U postgres -d schedule_app

# Reset database
dropdb schedule_app && createdb schedule_app && npm run db:migrate

# Clear TypeScript cache
rm -rf dist && npm run build
```

### Port Conflicts
- Frontend runs on: `8081` (Expo)
- Backend runs on: `3000` (Express)

To use different ports, update environment variables.

## Database Schema

### Key Relationships
- User → Many Sections, Routines
- Section → Many Routines
- Routine → Many Assignments
- Assignment → Subject, Teacher, Day, Period
- Teacher → Many Subjects (Many-to-Many)

### Indexes
- User: email (unique)
- Section: name (unique)
- Subject: code (unique)
- Teacher: email, employeeId (unique)
- Routine: sectionId, status
- Assignment: routineId, teacherId, dayId, periodId

## Performance Optimization

### Frontend
- Lazy loading components with React.lazy()
- Image optimization with Expo Image
- Virtualized lists for large data
- Memoization with useMemo/useCallback

### Backend
- Database indexing on frequently queried fields
- Connection pooling
- Query optimization
- API response caching

## Security Best Practices

### Authentication
- JWT tokens with expiration
- Secure token storage (AsyncStorage)
- Password hashing with bcryptjs
- Protected routes with middleware

### Data Protection
- HTTPS/TLS encryption
- Input validation and sanitization
- SQL injection prevention via ORM
- CORS configuration

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## License

MIT License - see LICENSE file for details

## Contact & Support

For issues, questions, or suggestions:
- Open an issue on GitHub
- Email: support@schedulapp.com
- Documentation: See `/docs` folder

## Roadmap

### Version 1.1
- Drag and drop routine builder
- Export routines as PDF
- Email notifications

### Version 1.2
- Teacher mobile app (view-only)
- SMS notifications
- Advanced analytics

### Version 2.0
- Multi-school support
- ERP integration
- AI-based suggestions

---

**Last Updated**: January 2025
**Status**: In Development
**Contributors**: ATR Innovations
