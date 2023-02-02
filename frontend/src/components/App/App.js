import "./App.css";
import "../Header/header.css"
import Header from "../Header/Header";
// import Footer from '../Footer/Footer';
import Main from "../Main";


function App() {
  return (
    <div className="App">
      {/* wrap in context */}
      <Header />
      <Main />
    </div>
  );
}

export default App;
