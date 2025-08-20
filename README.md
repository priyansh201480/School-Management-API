# School Management API

A simple **Node.js + Express.js + MySQL** based API for managing schools.  
This project allows users to **add new schools** and **list schools sorted by proximity** to a given location.

---

##  Features
- Add new schools with name, address, latitude, and longitude.
- List all schools sorted by distance from user-provided coordinates.
- MySQL database integration.
- RESTful API design.
- Hosted on **Render** for public access.
- Postman Collection for easy testing.

---

##  Deployed Links
- **Live API Base URL:** [https://school-management-api-clc0.onrender.com](https://school-management-api-clc0.onrender.com)  
- **Postman Collection:** [School Management API Collection](https://www.postman.com/priyanshagarwal-8087186/school-management-apis/collection/x20iahw/school-management-api?action=share&source=copy-link&creator=45738153)  

---

##  API Endpoints

### 1. Add School
**Endpoint:**  
```http 
POST /addSchool
```

### 2. List Schools by Proximity
**Endpoint:**
```http
GET /listSchools?latitude=<user_lat>&longitude=<user_lng>
```
---

##  Local setup 
### 1. Clone this repository:
```bash
git clone https://github.com/your-username/school-management-api.git
cd school-management-api
```
### 2. Install dependencies:
````bash
npm install
````
### 3. Configure database in .env:
``` bash
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=schooldb
```
### 4. Run the server
```bash
npm start
```
### 5. Test using Postman

