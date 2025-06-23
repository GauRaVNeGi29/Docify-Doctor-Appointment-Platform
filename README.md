# 🩺 Docify – Doctor Appointment Platform

**Docify** is a full-stack doctor appointment platform built using the **MERN stack** (MongoDB, Express.js, React, Node.js). It provides a seamless experience for users to browse doctors, book appointments, and manage their profiles. Doctors can view, complete, and cancel appointments, while the admin can monitor the entire system.

---

## 📸 Preview

![image](https://github.com/user-attachments/assets/ceb65e85-d5e4-4dd1-b1d6-af6d2d662924)


---

## 🚀 Features

- 👨‍⚕️ **Doctor Profiles** with specialties, experience, fees, and availability
- 📅 **Appointment Booking System** with real-time slot management
- 💳 **Razorpay Payment Gateway Integration** for secure online payments
- 📄 **Profile Management** for both users and doctors
- 🔐 **User & Doctor Authentication** (JWT-based)
- 📦 **RESTful APIs** for scalable data handling
- 🌐 **Responsive Design** using Tailwind CSS

---

## 🛠️ Tech Stack

- **Frontend**: React.js, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT
- **Payment Integration**: Razorpay
- **Version Control**: Git & GitHub

---

## 📂 Project Structure

docify/
├── backend/
│   ├── config/
│   ├── controller/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── uploads/
│   ├── .env
│   ├── index.js
│   ├── package.json
│
├── frontend/
│   ├── public/
│   ├── src/
│   ├── index.html
│   ├── package.json
│   ├── postcss.config.js
│   ├── tailwind.config.js
│   └── vite.config.js
│
├── admin/
│   ├── public/
│   ├── src/
│   ├── index.html
│   ├── package.json
│   ├── postcss.config.js
│   ├── tailwind.config.js
│   └── vite.config.js
│
└── README.md



---

## ⚙️ Installation

### 🔁 Clone the Repository

```bash
git clone https://github.com/your-username/Docify-Doctor-Appointment-Platform.git
cd Docify-Doctor-Appointment-Platform

🖥️ Backend Setup

cd backend
npm install

🔐 Create a .env file inside /backend and add:

PORT=4000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
RAZORPAY_KEY_ID=your_razorpay_key
RAZORPAY_KEY_SECRET=your_razorpay_secret

npm run dev

🌐 Frontend Setup

cd ../frontend
npm install
npm run dev

🧪 API Endpoints (Sample)
👤 User Auth
Method	Endpoint	Description
POST	/api/user/register	Register a user
POST	/api/user/login	Login user
POST	/api/user/forgot	Forgot password
🧑‍⚕️ Doctor Management
Method	Endpoint	Description
POST	/api/doctor/register	Register a doctor
POST	/api/doctor/login	Login doctor
GET	/api/doctor/data	Get all doctor profiles
POST	/api/doctor/update-profile	Update doctor profile
📅 Appointments
Method	Endpoint	Description
POST	/api/user/book-appointment	Book a new appointment
GET	/api/user/appointments	Get all user appointments
POST	/api/user/cancel-appointment	Cancel an appointment
💳 Payments
Method	Endpoint	Description
POST	/api/user/payment-razorpay	Create Razorpay order
POST	/api/user/verify-razorpay	Verify payment & confirm
🙌 Acknowledgements

    MongoDB for the database

    Razorpay for secure payments

    Tailwind CSS for modern UI

    React for frontend rendering

    Express.js for backend routing

📃 License

This project is licensed under the MIT License.
💬 Contact

Gaurav Negi
📧 Email: negigaurav419@gmail.com
🔗 GitHub: GauRaVNeGi29
