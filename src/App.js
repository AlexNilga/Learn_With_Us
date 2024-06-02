import React from "react";
import './App.css';
import Header from "./componets/Header/Header.jsx";
import {Route, Routes} from 'react-router-dom';
import Login from "./componets/Login/Login";
import SignUp from "./componets/Login/SignUp";
import CardGrid from "./componets/Subjects/CardGrid";
import {SubjectsJSON} from "./DB/SubjectsJSON"
import MaterialsGrid from "./componets/Materials/MaterialsGrid";
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";

function App() {
    return (
        <div className="App">
            <Header/>
            <Routes>
                <Route path="/subjects" element={<CardGrid data = {SubjectsJSON}/>} />
                <Route path="/subjects/materials" element={<MaterialsGrid/>} />
                <Route path='/login' element={<Login/>}/>
                <Route path="/sign-up" element={<SignUp/>} />

            </Routes>
        </div>
    )
}

export default App;
