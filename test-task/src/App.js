import Header from "./components/Header/Header";
import UserContainer from "./components/UsersContainer/UserContainer";
import RegistrationForm from "./components/RegistrationForm/RegistrationForm";
import ActionMessage from "./components/ActionMessage/ActionMessage";

function App() {
  return (
    <>
      <Header/>
      <UserContainer/>
      <RegistrationForm/>
      <ActionMessage/>
    </>
  );
}

export default App;
