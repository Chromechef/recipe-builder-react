import React from 'react'
import Recipe from './components/Recipe'



function App() {
  const [recipeState, setRecipeState] = React.useState()




  // const [usdaData, setUsdaData] = React.useState({})


  // React.useEffect(() => {
  //   fetch('https://api.nal.usda.gov/fdc/v1/foods/search?query=apple&pageSize=2&api_key=iDRTYKxUfu3BtBJCjNifntprzXt6dtADj6Y6s7HC')
  //     .then(res => res.json())
  //     .then(data => setUsdaData(data))
  // }, [])


  function ButtonCarousel() {
    const [buttons, setButtons] = React.useState([
      { id: 1, label: "Amuse" },
      { id: 2, label: "Appetizer" },
      { id: 3, label: "Soup" },
      { id: 4, label: "Salad" },
      { id: 5, label: "Entree" },
      { id: 6, label: "Cheese" },
      { id: 7, label: "Mignardiese" },
      { id: 8, label: "Beverage" },
      { id: 9, label: "Dessert" }
    ]);

    const handlePrevClick = () => {
      setButtons(prevButtons => {
        const lastIndex = prevButtons.length;
        const newLastIndex = lastIndex - 1;
        const newButtons = prevButtons.slice(newLastIndex).concat(prevButtons.slice(0, newLastIndex));
        return newButtons;
      });
    };

    const handleNextClick = () => {
      setButtons(prevButtons => {
        const lastIndex = prevButtons.length - 1;
        const newButtons = prevButtons.slice(1).concat(prevButtons.slice(0, 1));
        return newButtons;
      });
    };

    return (
      <div className="carousel-container">
        <button className="carousel-button" onClick={handlePrevClick}>{`< ${buttons[0].label}`}</button>
        <button className="carousel-button" onClick={renderNewRecipe}>{`${buttons[1].label} +`}</button>
        <button className="carousel-button" onClick={handleNextClick}>{`${buttons[2].label} >`}</button>
      </div >
    );
  }

  return (
    <>
      <main className='main-container'>
        <h1>Joy's Recipe Book</h1>
        <Recipe />
      </main>
    </>


  )
}

export default App
