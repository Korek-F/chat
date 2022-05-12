import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import { AddFriend } from "./components/AddFriend";
import { Chats } from "./components/Chats";
import { Invitations } from "./components/Invitations";
import { Login } from "./components/Login";
import { Logout } from "./components/Logout";
import { MainPage } from "./components/MainPage";
import { Navbar } from "./components/Navbar";


function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="main_content">
        <Routes>
          <Route path='/' element={<MainPage />} />
          <Route path='login' element={<Login />} />
          <Route path='logout' element={<Logout />} />
          <Route path='add-friend' element={<AddFriend />} />
          <Route path='invitations' element={<Invitations />} />
          <Route path='chats' element={<Chats />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
