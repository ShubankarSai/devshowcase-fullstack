# DevShowcase — Full Stack Portfolio Platform

DevShowcase is a full-stack web application that allows developers to create, manage, and share their projects through a public portfolio link.

---

## Features

Authentication
- User registration and login using JWT
- Secure password handling

Dashboard
- Add, edit, and delete projects
- View all personal projects in one place
- Track project views

Public Portfolio
- Shareable portfolio link based on user email
- Displays profile and projects
- Option to download portfolio as PDF

Profile Management
- Update name and password
- Extendable for additional fields like bio and GitHub

---

## Tech Stack

Frontend
- React.js
- Bootstrap
- Axios

Backend
- Spring Boot
- Spring Security (JWT)
- Hibernate / JPA

Database
- MySQL

---

## Project Structure

devshowcase-fullstack/
│
├── backend/                  # Spring Boot backend
└── devshowcase-frontend/     # React frontend

---

## Setup Instructions

Backend

cd backend  
./mvnw spring-boot:run  

Runs on: http://localhost:8080

Frontend

cd devshowcase-frontend  
npm install  
npm start  

Runs on: http://localhost:3000

---

## API Endpoints (Sample)

POST /api/users → Register  
POST /api/users/login → Login  
GET /api/projects/my → Get user projects  
PUT /api/projects/{id} → Update project  
DELETE /api/projects/{id} → Delete project  
GET /api/projects/portfolio/{email} → Public portfolio  

---

## Key Highlights

- Full-stack application using React and Spring Boot  
- JWT-based authentication system  
- RESTful API design  
- Real-world CRUD operations  
- Responsive UI  
- Portfolio export as PDF  

---

## Future Enhancements

- Email authentication and verification for real users  
- Password reset via email  
- Profile image upload  
- GitHub API integration (auto-fetch repositories)  
- Project screenshots/media support  
- Dark mode  
- Deployment with CI/CD pipeline  
- Custom domain support  
- Analytics for portfolio views (charts, insights)  
- Role-based access (admin/user)   

---

## Author

Shubhankar Sai  

GitHub: https://github.com/YOUR_USERNAME  
LinkedIn: Add your LinkedIn link here  

---

## Notes

This project was built as part of full-stack development practice with a focus on building a real-world application combining backend APIs, authentication, and a responsive frontend.
