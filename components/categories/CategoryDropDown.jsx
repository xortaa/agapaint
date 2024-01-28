import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CategoryDropDown = () => {
    const [selectedCategory, setSelectedCategory] = useState('');

    const handleCategoryChange = (event) => {
        setSelectedCategory(event.target.value);
    };

    useEffect(() => {
        if (selectedCategory) {
            axios.get(`http://localhost:3000`)
                .then(response => {
                    console.log({selectedCategory, response});
                })
                .catch(error => {
                    console.error('Error fetching category:', error);
                });
        }
    }, [selectedCategory]);

    return (
        <select value={selectedCategory} onChange={handleCategoryChange}>
            <option value="">Select a category</option>
            <option value="painting">Painting</option>
            <option value="washing">Washing</option>
            <option value="detailing">Detailing</option>
        </select>
    );
};

export default CategoryDropDown;