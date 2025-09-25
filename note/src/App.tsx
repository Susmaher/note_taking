import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Journal from "./pages/Journal";
import Sign_up from "./pages/Sign-up";
import Sign_in from "./pages/Sign-in";
import Navbar from "./Components/navbar";

function App() {
    return (
        <>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/journal" element={<Journal />} />
                <Route path="/sign-up" element={<Sign_up />} />
                <Route path="/sign-in" element={<Sign_in />} />
            </Routes>
        </>
    );
}

export default App;
