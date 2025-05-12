# Unity WebGL Integration

A demo project for integrating a Unity WebGL build into a React application.  
This project demonstrates handling player controls, object interactions, and simple UI/UX enhancements using React and Tailwind CSS.

---

## 📚 Project Overview

- **Assignment**: Holofair Assignment
- **Technologies Used**:
  - React (Vite)
  - Tailwind CSS
  - Unity WebGL
- **Developed by**: Issatay Massalin

---

## 🎮 Features

- Unity WebGL canvas embedded directly into React.
- Player controls using standard `WASD` and `Shift` for acceleration.
- Spacebar for jumping.
- Mouse interactions for:
  - Left Click: Interact with buttons and duplicate construction objects.
  - Right Click: Set position for construction objects.
- Auto-prompt for user email before starting the game.
- Smooth scrolling navigation between Play and About sections.
- Responsive top navigation bar and clean footer design using Tailwind CSS.

---

## 🚀 How to Run Locally

1. **Clone the Repository**

   ```bash
   git clone https://github.com/your-repo/unity_webgl_integration.git
   cd unity_webgl_integration
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

3. **Start the Development Server**

   ```bash
   npm run dev
   ```

4. Open [http://localhost:5173/](http://localhost:5173/) in your browser.

---

## 📂 Project Structure

```
unity_webgl_integration/
├── public/
│   └── Build/               # Unity WebGL Build Files (.data.gz, .wasm.gz, .framework.js.gz, .loader.js)
├── src/
│   └── App.jsx              # Main React Component with Unity Integration
│   └── main.jsx             # React Entry Point
│   └── index.css            # Tailwind CSS Configurations
├── .gitignore
├── package.json
└── tailwind.config.js
```

---

## ✍️ Author

- Issatay Massalin (Leather Bag)

---

## 📃 License

This project is for demonstration purposes only.
