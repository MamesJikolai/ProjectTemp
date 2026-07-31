# PhishingOps Project Documentation

This README provides an overview of the **PhishingOps** repository, a full-stack web application designed for managing phishing simulation campaigns and delivering security awareness training via a Learning Management System (LMS). 

---

## Overview

The PhishingOps platform is divided into a Django-based backend API and a React-based frontend. It allows administrators to configure SMTP settings, manage user accounts, deploy simulated phishing templates, and track user engagement and risk metrics through interactive analytics. Additionally, it features an integrated LMS for assigning courses, video lessons, and quizzes to users.

---

## Tech Stack

| Component | Technology |
| :--- | :--- |
| **Backend** | Python, Django, Django REST Framework |
| **Frontend** | React, TypeScript, Vite |
| **Styling/UI** | Tailwind CSS |

---

## Key Features

*   **Campaign Management:** Create, deploy, and manage simulated phishing campaigns using customizable email templates.
*   **Engagement Tracking:** Track user clicks, engagement rates, and business unit risk levels via analytics charts.
*   **Learning Management System (LMS):** Provide educational content through course modules, video players, and interactive quizzes.
*   **User Management:** Administer platform users, manage roles, and import targets via CSV.
*   **System Configuration:** Configure platform-wide settings and SMTP credentials directly from the admin dashboard.
*   **Phishing Landing Pages:** Host secure, trackable landing pages for simulation targets.

---

## Project Structure

The repository is organized into two primary directories:

*   **`Backend/`**: Contains the Django application.
    *   **`api/`**: Houses serializers, views, and URL routing for the REST API.
    *   **`apps/`**: Contains the core modular Django applications: `accounts`, `campaigns`, `lms`, and `settings_app`.
    *   **`phishingOperations/`**: The main Django project configuration directory.
*   **`Frontend/`**: Contains the React + Vite application.
    *   **`src/components/`**: Reusable UI components including charts, tables, sidebars, and settings forms.
    *   **`src/pages/`**: Top-level page views for Admin and User roles (e.g., Dashboard, Campaigns, Courses, Analytics).
    *   **`src/services/`**: API integration and user service handlers.
    *   **`public/dummydata/`**: JSON files used for local testing and mock data rendering.

---

## Getting Started

### Prerequisites
*   Python 3.x
*   Node.js and npm (or yarn)

### Backend Setup
1.  Navigate to the backend directory: `cd Backend`
2.  Create a virtual environment and activate it.
3.  Install the required dependencies: `pip install -r requirements.txt`
4.  Copy the environment template: `cp .env.example .env`
5.  Apply database migrations: `python manage.py migrate`
6.  Start the development server: `python manage.py runserver`

### Frontend Setup
1.  Navigate to the frontend directory: `cd Frontend`
2.  Install JavaScript dependencies: `npm install`
3.  Start the Vite development server: `npm run dev`
