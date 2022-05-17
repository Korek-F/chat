import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import { AddFriend } from "./components/AddFriend";
import { Chats } from "./components/chat/Chats";

import { NotFound } from "./components/errors/NotFound";
import { Invitations } from "./components/Invitations";
import { Login } from "./components/Login";
import { Logout } from "./components/Logout";
import { MainPage } from "./components/MainPage";
import { Navbar } from "./components/Navbar";
import { Registration } from "./components/Registration";


function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="main_content">
        <Routes>
          <Route exact path='/' element={<MainPage />} />
          <Route exact path='login' element={<Login />} />
          <Route exact path='logout' element={<Logout />} />
          <Route exact path='add-friend' element={<AddFriend />} />
          <Route exact path='invitations' element={<Invitations />} />
          <Route exact path='chats' element={<Chats />} />
          <Route exact path='register' element={<Registration />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
