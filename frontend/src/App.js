import { useSelector } from "react-redux";
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
import { PopMessage } from "./components/PopMessage";
import { Registration } from "./components/Registration";


function App() {
  const chatData = useSelector(state => state.chatData)
  const { message } = chatData

  return (
    <BrowserRouter>
      <Navbar />
      {message &&
        <PopMessage message={message} />
      }
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
