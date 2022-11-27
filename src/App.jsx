import React, { useContext } from "react";
import "./App.css";

// components
import Navbar from "./components/navbar/Navbar";
import Carousel from "./components/carousel/Carousel";
import Header from "./components/header/Header";
import Table from "./components/table/Table";
import Modal from "./components/modal/Modal";

// context
import { CryptoContext } from "./context/CryptoContext";

const App = () => {
  // context
  const { modal } = useContext(CryptoContext);
  return (
    <>
      {modal && <Modal />}
      <div className="app absolute top-0 h-screen z-0">
        <Navbar />
        <Carousel />
        <Header />
        <Table />
      </div>
    </>
  );
};

export default App;
