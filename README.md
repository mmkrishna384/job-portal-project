# Job Portal Platform

A full-stack MERN application that connects top talent with leading companies worldwide. This platform supports distinct role-based workflows for both Applicants (Students) and Recruiters.

## 🚀 Key Features

### For Applicants (Students)
- **Profile Management**: Upload resumes (PDF/Images via Cloudinary), update skills, and edit bio.
- **Job Discovery**: Browse, search, and filter thousands of jobs globally.
- **Application Tracking**: One-click apply and real-time tracking of application statuses.

### For Recruiters (Employers)
- **Company Management**: Register new companies and upload company logos.
- **Job Postings**: Create, edit, and publish dynamic job listings.
- **Applicant Review**: Review student profiles, download resumes, and accept/reject candidates.

---

## 🛠️ Tech Stack

- **Frontend**: React (Vite), Tailwind CSS, Redux Toolkit
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (Atlas), Mongoose
- **Authentication**: JWT (Cookies), bcryptjs
- **Storage**: Cloudinary, Multer

---

## 💻 Local Setup Instructions

1. **Clone the repository:**
   ```bash
   git clone <your-github-repo-url>
   cd job-portal-project
   ```

2. **Setup Backend:**
   ```bash
   cd backend
   npm install
   ```
   Create a `.env` file in the `/backend` directory with the following variables:
   ```env
   PORT=8000
   MONGO_URI=<your_mongodb_connection_string>
   JWT_SECRET=<your_secure_random_string>
   CLOUD_NAME=<your_cloudinary_cloud_name>
   API_KEY=<your_cloudinary_api_key>
   API_SECRET=<your_cloudinary_api_secret>
   ```

3. **Setup Frontend:**
   ```bash
   cd ../frontend
   npm install
   ```

4. **Run Locally:**
   Open two terminal windows:
   - Terminal 1 (Backend): `cd backend && npm run dev`
   - Terminal 2 (Frontend): `cd frontend && npm run dev`
   
   Navigate to `http://localhost:5173` (or the port Vite provides) in your browser.

---

## 🌐 Live Deployment Guide (Render)

This project is configured with a `render.yaml` file for instant deployment!

1. Push this repository to your GitHub account.
2. Sign in to [Render.com](https://render.com/).
3. Click **New +** and select **Blueprint**.
4. Connect the GitHub repository.
5. Provide your Environment Variables when prompted.
6. Click **Apply**. Render will automatically build and deploy both the frontend and backend natively.

---

## 📸 Screenshots

> *Placeholder: Add screenshots of your Home Page, Dashboard, and Login screens here.*

![Home Page Placeholder](https://via.placeholder.com/800x400.png?text=Home+Page)
![Recruiter Dashboard Placeholder](https://via.placeholder.com/800x400.png?text=Recruiter+Dashboard)

---

*Designed and engineered with modern UI/UX practices.*
