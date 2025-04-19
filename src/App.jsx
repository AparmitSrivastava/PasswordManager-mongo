


import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import Navbar from './components/Navbar';
import Manager from './components/Manager';
import Footer from './components/Footer';

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      
      <div className="relative min-h-screen">
     
        <div className="absolute inset-0 -z-10 h-full w-full bg-white 
          bg-[linear-gradient(to_right,#e5e5e5_1px,transparent_1px),
          linear-gradient(to_bottom,#e5e5e5_1px,transparent_1px),
          linear-gradient(to-bottom, rgba(255,255,255,0) 60%, white 100%)] 
          bg-[size:6rem_4rem]">
          
        
          <div className="absolute inset-0 bg-[radial-gradient(circle_800px_at_50%_200px,#c0ffc0,transparent)]"></div>
        </div>

     
        <Navbar />

        <div className="min-h-[85.5vh]">
          <Manager />
        </div>

        <Footer />
      </div>
    </>
  );
}

export default App;
