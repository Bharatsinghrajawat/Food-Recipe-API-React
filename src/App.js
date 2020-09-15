import React,{useState,useEffect} from 'react';
import Recipe from './Recipe';
import './recipe.css';
const App = () => {
    const APP_ID = '7d884ffd';
    const APP_KEY = '4b51ab7265218aa4df9dd6a7068050f0';
    const [recipes,setRecipes] = useState([]);
    const [search,setSearch] = useState('');
    const [query,setQuery] = useState('chicken');
   
useEffect(() =>{
    getRecipes();
},[query])

const getRecipes = async () => {
      const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`);
      const data = await response.json();
      setRecipes(data.hits)
      // console.log(data.hits);
}

const handleSearch = (e) => {
    setSearch(e.target.value);

}

const getSearch = (e) => {
    e.preventDefault();
    setQuery(search);
    setSearch('');
}

    return(
      <div className='App'>
        <form onSubmit={getSearch} className='search-form'>
            <input type='text' className='search-bar' value={search} onChange={handleSearch}/>
            <button  className='search-button' >Search</button>
        </form>
      <div className='recipes'>
     {recipes.map(recipe => (<Recipe key={recipe.recipe.label} title={recipe.recipe.label} calories={recipe.recipe.calories} image={recipe.recipe.image} ingredients={recipe.recipe.ingredients}/>))}
     </div>
      </div>
    )
}


export default App;
