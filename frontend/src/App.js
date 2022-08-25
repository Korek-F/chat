import { useSelector } from "react-redux";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import { AddFriend } from "./components/AddFriend";
import { Chats } from "./components/chat/Chats";
import { Error } from "./components/errors/Error";
import { Loading } from "./components/errors/Loading";

import { NotFound } from "./components/errors/NotFound";
import { Invitations } from "./components/Invitations";
import { Login } from "./components/Login";
import { Logout } from "./components/Logout";
import { MainPage } from "./components/MainPage";
import { Navbar } from "./components/Navbar";
import { PopMessage } from "./components/PopMessage";
import { Registration } from "./components/Registration";
import Protected from "./utils/ProtectedRoute";


function App() {
  const chatData = useSelector(state => state.chatData)
  const authData = useSelector(state => state.authData)
  const { message, error, chatLoading } = chatData
  const { isLogged } = authData

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
          <Route exact path='add-friend' element={
            <Protected isLogged={isLogged}>
              <AddFriend />
            </Protected>} />
          <Route exact path='invitations'

            element={<Protected isLogged={isLogged}>
              <Invitations />
            </Protected>} />

          <Route exact path='chats'
            element={<Protected isLogged={isLogged}>
              <Chats />
            </Protected>} />

          <Route exact path='register' element={<Registration />} />
          <Route path="*" element={<NotFound />} />
        </Routes>

        <Loading loading={chatLoading} error={error} />
        <Error error={error} />
      </div>
    </BrowserRouter>
  );
}

export default App;
