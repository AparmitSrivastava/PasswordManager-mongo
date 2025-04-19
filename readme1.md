# where to use what----

Great! Here's the **best-suited way** for each case:  

---

### **1️⃣ Changing the Image for "Show Password"**  
🔹 **Use `useState`** ✅  
**Why?** The image/icon needs to change dynamically when the user clicks the toggle button, so state updates ensure proper re-rendering.  

**Example:**
```jsx
const [showPassword, setShowPassword] = useState(false);

<button onClick={() => setShowPassword(!showPassword)}>
  <img src={showPassword ? "eye-open.png" : "eye-closed.png"} alt="Toggle Password" />
</button>
```

---

### **2️⃣ Updating the Form Data (Handling Input Changes)**  
🔹 **Use `useState`** ✅  
**Why?** React forms need state to track user input and update the UI when data changes.  

**Example:**
```jsx
const [formData, setFormData] = useState({ username: "", password: "" });

const handleChange = (e) => {
  setFormData({ ...formData, [e.target.name]: e.target.value });
};

<input type="text" name="username" value={formData.username} onChange={handleChange} />
<input type="password" name="password" value={formData.password} onChange={handleChange} />
```

---

### **3️⃣ Saving the Passwords to Local Storage**  
🔹 **Use `useEffect` (to load stored data) + `localStorage.setItem()` (on form submit)** ✅  
**Why?**  
- `useEffect` **retrieves saved data** when the component loads.  
- `localStorage.setItem()` **saves passwords when the form is submitted**.  

**Example:**
```jsx
import { useState, useEffect } from "react";

const [passwords, setPasswords] = useState([]);

// Load saved passwords when component mounts
useEffect(() => {
  const savedPasswords = JSON.parse(localStorage.getItem("passwords")) || [];
  setPasswords(savedPasswords);
}, []);

const savePassword = (newPassword) => {
  const updatedPasswords = [...passwords, newPassword];
  setPasswords(updatedPasswords);
  localStorage.setItem("passwords", JSON.stringify(updatedPasswords));
};
```

---

### **🚀 Final Answer:**
| **Feature** | **Best Hook** | **Why?** |
|------------|-------------|--------|
| Changing show/hide password image | `useState` | UI updates dynamically |
| Updating form data | `useState` | Tracks user input changes |
| Saving passwords to local storage | `useEffect` (for loading) + `localStorage.setItem()` (on submit) | Ensures data persistence |



---
---


# Tools used in this project --
1.**lordicon.com**
-
2.**copied to clipboard popup** - https://fkhadra.github.io/react-toastify/introduction* 
- also we have to add some imports and npm in terminal


3.**creating unique id's** - write uuid in google 
-






# first run backend folder and wirte node --watch server.js on terminal
# and then run this whole safepassMongo - npm run dev