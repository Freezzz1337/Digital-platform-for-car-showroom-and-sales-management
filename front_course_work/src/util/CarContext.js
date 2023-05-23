import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const CarContext = createContext();

const CarProvider = ({ children }) => {
    const [car, setCar] = useState([]);
    const [filteredCars, setFilteredCars] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:80").then((response) => {
            setCar(response.data);
            setFilteredCars(response.data);
        });
    }, []);

    const handleSearch = (searchQuery) => {
        const filtered = car.filter((car) =>
            car.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredCars(filtered);
    };

    return (
        <CarContext.Provider value={{ car: filteredCars, handleSearch }}>
            {children}
        </CarContext.Provider>
    );
};

export { CarContext, CarProvider };
