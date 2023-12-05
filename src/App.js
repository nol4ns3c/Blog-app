import Header from './components/Header';
import Navbar from './components/Navbar';
import Blogs from './components/Blogs';
import Login from './components/Login';
import Signup from './components/Signup';
import CreatePost from './components/CreatePost';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { UserContextProvider } from './UserContext';
import PostPage from './components/PostPage';
import EditPost from './components/EditPost';
import Profile from './components/Profile';
//rafce

function App() {
  return (
    <UserContextProvider>
    <Routes>
      <Route index element={
        <div className="App">
        <Navbar />
        <Blogs />
        
      </div>
      } />
      <Route path={'/blogs'} element={
        
        <Navbar />
      } />
      <Route path={'/login'} element={
        <>
        <Navbar />
        <Login /> </>} 
      />  
      <Route path={'/signup'} element={
        <>
        <Navbar />
        <Signup /> </>} 
      />  
      <Route path={'/create'} element={
        <>
        <Navbar />
        <CreatePost />
      
        </>

      }

        />
      <Route path={'/post/:id'} element={
        <>
        <Navbar />
        <PostPage />
        </>


      }

      

        />

      <Route path={'/edit/:id'} element={
        <>
        <Navbar />
        <EditPost />
        </>


      }

      

        />

      <Route path={'/profile'} element={
        <>
        <Navbar />
        <Profile />
        </>


      }

      

        />

    </Routes>
    </UserContextProvider>
    
  );
}

export default App;