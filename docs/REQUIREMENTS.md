# Schedule App - Project Requirements & Rules

## Project Overview
A mobile application for creating and managing school/class timetables and teacher schedules. The app allows administrators to define master data (sections, subjects, teachers, days, periods) and create conflict-free routines.

## Functional Requirements

### 1. Master Data Management
- **Sections**: Create, read, update, delete classes/sections (e.g., Class A, Class B, 10th Grade)
- **Subjects**: Manage subjects offered (e.g., Math, Science, English)
- **Teachers**: Manage teacher information with assigned subjects
- **Days**: Define working days in a week (Monday-Saturday or custom)
- **Periods**: Define time periods/slots (e.g., 08:00-08:45, 08:45-09:30)

### 2. Routine Management
- **Create Routines**: Build class-wise timetables by assigning subject-teacher combinations to periods
- **Edit Routines**: Modify existing routines
- **View Routines**: Display by class and by teacher
- **Duplicate Routines**: Clone existing routines as templates

### 3. Drag & Drop Interface
- Intuitive drag-and-drop builder for assigning subjects to time slots
- Visual feedback during dragging
- Smooth animations and responsive design

### 4. Conflict Detection
- **Teacher Conflicts**: Prevent same teacher teaching multiple classes in same period
- **Subject Conflicts**: Alert if subject scheduled multiple times in same class in one day
- **Period Conflicts**: Ensure no double-booking in any slot
- Real-time validation during routine building

### 5. Routine Views
- **Class-wise Routine**: Show complete timetable for a specific section
- **Teacher-wise Routine**: Show complete schedule for a specific teacher
- **Weekly View**: Display entire week's schedule in grid format
- **Export/Share**: Export routines as PDF or image

### 6. Data Persistence
- **Local Storage**: AsyncStorage for offline-first capability
- **Cloud Sync**: Express backend with database for cloud backup
- **Auto-save**: Periodic saving of routines

### 7. Authentication & Admin
- **Admin Login**: Email/password authentication
- **Role-based Access**: Admin and view-only user roles
- **User Management**: Create accounts for other administrators

### 8. Additional Features
- **Templates**: Pre-built routine templates
- **Bulk Operations**: Import/export multiple routines
- **Search & Filter**: Find routines, teachers, subjects
- **Notifications**: Alerts for schedule changes

## Non-Functional Requirements

### Performance
- Fast load times (< 2 seconds for routine views)
- Smooth animations and transitions
- Optimized database queries
- Lazy loading for large datasets

### Scalability
- Support 100+ sections, 200+ teachers, 1000+ routines
- Efficient data sync between mobile and server
- Real-time collaboration capabilities

### Security
- Secure authentication (JWT tokens)
- Encrypted data transmission (HTTPS/TLS)
- Input validation and sanitization
- Rate limiting on API endpoints

### Compatibility
- iOS and Android support via Expo
- Responsive design for different screen sizes
- Works offline with sync when connected

### Usability
- Intuitive UI with minimal learning curve
- Clear error messages
- Undo/redo functionality
- Help tooltips and documentation

## Data Model Overview

### Core Entities
1. **Section**: id, name, yearLevel, description
2. **Subject**: id, name, code, description
3. **Teacher**: id, name, email, phone, subjects[]
4. **Day**: id, name, dayOfWeek, isWorking
5. **Period**: id, name, startTime, endTime, sequenceNumber
6. **Routine**: id, sectionId, data (2D array of assignments)
7. **Assignment**: subjectId, teacherId, dayIndex, periodIndex
8. **User**: id, email, password, role (admin/viewer)

## Technical Stack

### Frontend
- **Framework**: React Native with Expo
- **Routing**: Expo Router
- **State Management**: Context API / Zustand
- **Local Storage**: AsyncStorage
- **UI Components**: React Native Paper / Tamagui
- **Animation**: React Native Reanimated
- **Drag & Drop**: React Native Gesture Handler

### Backend
- **Runtime**: Node.js with Express
- **Database**: PostgreSQL or MongoDB
- **Authentication**: JWT
- **File Storage**: Local FS or AWS S3
- **API**: RESTful

### Development Tools
- **Language**: TypeScript
- **Testing**: Jest + React Testing Library
- **Linting**: ESLint + Prettier
- **CI/CD**: GitHub Actions
- **Deployment**: Expo EAS Build

## Business Rules

1. **No Teacher Double-Booking**: A teacher cannot be scheduled for two different classes in the same period
2. **Valid Subject Assignment**: Only teachers qualified to teach a subject can teach it
3. **Period Must Have Time**: Periods must have valid start and end times
4. **Day Must Be Active**: Only active days can have scheduled periods
5. **Required Fields**: All master data must have mandatory fields filled
6. **Unique Names**: Sections and subjects must have unique names per school
7. **Default Working Days**: Default to Monday-Saturday, configurable
8. **Standard Periods**: Support both 45-min and 50-min period formats

## Success Criteria

- ✅ All CRUD operations for master data working
- ✅ Conflict detection working in real-time
- ✅ Routines buildable via drag-and-drop
- ✅ Multiple view options (class-wise, teacher-wise)
- ✅ Local storage persistent and sync-able
- ✅ Backend API fully functional
- ✅ Authentication working
- ✅ Mobile-responsive and performant
- ✅ Test coverage > 80%

## Out of Scope (Future Enhancements)

- SMS/Email notifications to teachers
- Mobile app for teachers (view-only)
- Advanced analytics and reporting
- AI-based routine suggestion
- Multi-school management
- Integration with school ERP systems
