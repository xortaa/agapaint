import React, { useState, useEffect } from 'react';
import { Interface } from 'readline';

interface ICategory {
    name: string;
}
const CategoryDropDown = () => {
    const [selectedCategory, setSelectedCategory] = useState('');
    const [category, setCategory] = useState<ICategory>({name: ''});



    const handleCategoryChange = (event) => {
        setSelectedCategory(event.target.value);
        setCategory({
            name: selectedCategory
        })
    };

    return (
        <>
         <select value={selectedCategory} onChange={handleCategoryChange}>
            <option value="">Select a category</option>
            <option value="painting">Painting</option>
            <option value="washing">Washing</option>
            <option value="detailing">Detailing</option>
        </select>
        <h1>{selectedCategory}</h1>
        </>
       
    );
};

export default CategoryDropDown;