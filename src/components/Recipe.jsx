import React, { useState, useEffect } from 'react';


function Recipe() {
    const [formData, setFormData] = useState(
        JSON.parse(localStorage.getItem("formData")) || [
            {
                name: "",
                description: "",
                type: "",
                servings: "",
                cookTime: "",
                prepTime: "",
                plateTime: "",
                allergy: "",
                checked: false,
                isOpen: false,
                inputs: [{ input1: "", input2: "", select: "", checked: false }],
                instructions: [{ instruction: "", checked: false }]
            },
        ]
    )



    const [searchTerm, setSearchTerm] = useState("")


    // Component for Carousel 
    function ButtonCarousel() {

        const [buttons, setButtons] = React.useState([
            { id: 1, label: "Amuse" },
            { id: 2, label: "all" },
            { id: 3, label: "Appetizer" },
            { id: 4, label: "Soup" },
            { id: 5, label: "Salad" },
            { id: 6, label: "Entree" },
            { id: 7, label: "Cheese" },
            { id: 8, label: "Mignardiese" },
            { id: 9, label: "Beverage" },
            { id: 10, label: "Dessert" }
        ])

        useEffect(() => {
            const middleIndex = Math.floor(buttons.length / 10)
            const typeSelected = buttons[middleIndex].label
            // BUG *** 
            // when type selected is logged it gives the correct buttons string
            // Trying to have setSearchTerm be set to the typeSelected value
            // When I do this it no longer allows the buttons to be changed. 
            console.log(typeSelected)
            // if (typeSelected == "All") {
            //     setSearchTerm("")
            // }
            // else {
            //     setSearchTerm(typeSelected)
            // }

            // code below does not do what I anticipated. Ignore for now.
            // if (buttons[middleIndex].id === buttons[1].id) {
            // }

        }, [buttons])

        const handlePrevClick = () => {
            setButtons(prevButtons => {
                const lastIndex = prevButtons.length
                const newLastIndex = lastIndex - 1
                const newButtons = prevButtons.slice(newLastIndex).concat(prevButtons.slice(0, newLastIndex))
                return newButtons
            })

        }

        const handleNextClick = () => {
            setButtons(prevButtons => {
                const lastIndex = prevButtons.length - 1
                const newButtons = prevButtons.slice(1).concat(prevButtons.slice(0, 1))
                return newButtons
            })

        }

        // onClick={filterButtons}
        return (
            <div className="carousel-container">
                <button className="carousel-button" onClick={handlePrevClick}>{`< ${buttons[0].label}`}</button>
                <button
                    className="carousel-button recipe-focus-button"
                    value={buttons[1].label}
                    onClick={handleAddForm}
                >{`${buttons[1].label} +`}</button>
                <button className="carousel-button" onClick={handleNextClick} >{`${buttons[2].label} >`}</button>
            </div >
        )

    }

    // Carousel ^^^

    const handleAddForm = () => {
        setFormData(
            [
                {
                    name: "",
                    description: "",
                    type: "",
                    servings: "",
                    cookTime: "",
                    prepTime: "",
                    plateTime: "",
                    allergy: "",
                    checked: false,
                    isOpen: false,
                    inputs: [{ input1: "", input2: "", select: "", checked: false }],
                    instructions: [{ instruction: "", checked: false }]
                },
                ...formData
            ])
    }

    const handleAddSubForm = (formIndex) => {
        const newFormData = [...formData]
        newFormData[formIndex].inputs.push({ input1: "", input2: "", select: "", checked: false })
        setFormData(newFormData)
    }

    const handleAddInstruction = (formIndex) => {
        const newFormData = [...formData]
        newFormData[formIndex].instructions.push({ instruction: "", checked: false })
        setFormData(newFormData)
    }

    const handleInputChange = (formIndex, inputIndex, event) => {
        const newFormData = [...formData]
        newFormData[formIndex].inputs[inputIndex][event.target.name] =
            event.target.value
        setFormData(newFormData)
        localStorage.setItem("formData", JSON.stringify(newFormData))
    }

    const handleInstructionChange = (formIndex, inputIndex, event) => {
        const newFormData = [...formData]
        newFormData[formIndex].instructions[inputIndex][event.target.name] =
            event.target.value
        setFormData(newFormData)
        localStorage.setItem("formData", JSON.stringify(newFormData))
    }

    // removed code below to handle input amount in ingredients subForm

    // const handleInputAmountChange = (formIndex, inputIndex, event) => {
    //     const newFormData = [...formData]
    //     newFormData[formIndex].inputs[inputIndex][event.target.name] =
    //         event.target.value
    //     setFormData(newFormData)
    //     localStorage.setItem("formData", JSON.stringify(newFormData))
    // }

    const handleNameChange = (formIndex, event) => {
        const newFormData = [...formData]
        newFormData[formIndex].name = event.target.value
        setFormData(newFormData)
        localStorage.setItem("formData", JSON.stringify(newFormData))
    }

    // working on having the checked property display the current recipe.


    function handleDisplayRecipe(formIndex, event) {
        const newFormData = [...formData]
        newFormData[formIndex].isOpen = !newFormData[formIndex].isOpen
        setFormData(newFormData)
    }

    // change stops here

    function handlePrintRecipe(formIndex, event) {
        const newFormData = [...formData]
        setSearchTerm(newFormData[formIndex].name)
        console.log(newFormData[formIndex].name)
        setTimeout(printPage, 1000)

    }

    const printPage = () => {
        window.print()
        const searchId = document.getElementById('searchbarId')
        searchId.value = ''
        setSearchTerm("")
    }

    const handleDescriptionChange = (formIndex, event) => {
        const newFormData = [...formData]
        newFormData[formIndex].description = event.target.value
        setFormData(newFormData)
        localStorage.setItem("formData", JSON.stringify(newFormData))
    }

    const handleServingsChange = (formIndex, event) => {
        const newFormData = [...formData]
        newFormData[formIndex].servings = event.target.value
        setFormData(newFormData)
        localStorage.setItem("formData", JSON.stringify(newFormData))
    }

    const handleCookTimeChange = (formIndex, event) => {
        const newFormData = [...formData]
        newFormData[formIndex].cookTime = event.target.value
        setFormData(newFormData)
        localStorage.setItem("formData", JSON.stringify(newFormData))
    }

    const handlePrepTimeChange = (formIndex, event) => {
        const newFormData = [...formData]
        newFormData[formIndex].prepTime = event.target.value
        setFormData(newFormData)
        localStorage.setItem("formData", JSON.stringify(newFormData))
    }

    const handlePlateTimeChange = (formIndex, event) => {
        const newFormData = [...formData]
        newFormData[formIndex].plateTime = event.target.value
        setFormData(newFormData)
        localStorage.setItem("formData", JSON.stringify(newFormData))
    }

    const handleAllergyChange = (formIndex, event) => {
        const newFormData = [...formData]
        newFormData[formIndex].allergy = event.target.value
        setFormData(newFormData)
        localStorage.setItem("formData", JSON.stringify(newFormData))
    }

    const handleCheckboxChange = (formIndex, event) => {
        const newFormData = [...formData]
        newFormData[formIndex].checked = event.target.checked
        setFormData(newFormData)
        localStorage.setItem("formData", JSON.stringify(newFormData))
    }

    const handleRemoveForm = (formIndex) => {
        const newFormData = [...formData]
        newFormData.splice(formIndex, 1)
        setFormData(newFormData)
        localStorage.setItem("formData", JSON.stringify(newFormData))
    }

    const handleSubFormCheckboxChange = (formIndex, subFormIndex, event) => {
        const newFormData = [...formData]
        const subFormInputs = newFormData[formIndex].inputs.slice(
            subFormIndex * 1,
            subFormIndex * 1 + 1
        )
        if (event.target.checked) {
            subFormInputs.forEach((input) => (input.checked = true))
        } else {
            subFormInputs.forEach((input) => (input.checked = false))
        }
        setFormData(newFormData)
        localStorage.setItem("formData", JSON.stringify(newFormData))
    }

    const handleSubIngredientCheckboxChange = (formIndex, subIngredientIndex, event) => {
        const newFormData = [...formData]
        const subFormIngredientInputs = newFormData[formIndex].instructions.slice(
            subIngredientIndex * 1,
            subIngredientIndex * 1 + 1
        )
        if (event.target.checked) {
            subFormIngredientInputs.forEach((input) => (input.checked = true))
        } else {
            subFormIngredientInputs.forEach((input) => (input.checked = false))
        }
        setFormData(newFormData)
        localStorage.setItem("formData", JSON.stringify(newFormData))
    }

    const handleRemoveSubForm = (formIndex, subFormIndex) => {
        const newFormData = [...formData]
        newFormData[formIndex].inputs.splice(subFormIndex * 1, 1)
        setFormData(newFormData)
        localStorage.setItem("formData", JSON.stringify(newFormData))
    }

    const handleRemoveSubInstructionForm = (formIndex, subFormIndex) => {
        const newFormData = [...formData]
        newFormData[formIndex].instructions.splice(subFormIndex * 1, 1)
        setFormData(newFormData)
        localStorage.setItem("formData", JSON.stringify(newFormData))
    }

    const handleTypeChange = (formIndex, event) => {
        const newFormData = [...formData]
        newFormData[formIndex].type = event.target.value
        setFormData(newFormData)
        localStorage.setItem("formData", JSON.stringify(newFormData))
    }

    const handleSelectChange = (formIndex, event) => {
        const newFormData = [...formData]
        newFormData[formIndex].inputs.select = event.target.value
        setFormData(newFormData)
        localStorage.setItem("formData", JSON.stringify(newFormData))
    }

    // BUG 
    // when used it disables all functions to the form "Sometimes".////
    const filteredData = formData.filter((form) => {
        return form.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            form.type.toLowerCase().includes(searchTerm.toLowerCase())
    }
    )

    useEffect(() => {
        localStorage.setItem("formData", JSON.stringify(formData))
    }, [formData])

    // Feature
    // Trying to dynamicly change the height of the textarea fields as person types

    // const textarea = document.getElementsByClassName('.textareaTitle')
    // textarea.addEventListener("keyup", e => {
    //     console.log(e)
    //     let scHeight = e.target.scrollHeight
    //     textarea.style.height = `$(scHeight)px`
    // })



    return (
        <>
            <div className='margin-bottom'>
                <hr />
                {filteredData.map((form, formIndex) => (
                    <div key={formIndex}>
                        <section className='recipe-header'>
                            <label>

                                <textarea
                                    type="text"
                                    rows={3}
                                    className='recipe-title textareaTitle'
                                    placeholder='Recipe Title'
                                    value={form.name}
                                    onChange={(event) => handleNameChange(formIndex, event)}
                                ></textarea>
                            </label>
                            <label>
                                <textarea
                                    type="text"
                                    rows={2}
                                    className='recipe-info'
                                    placeholder='Menu Description'
                                    value={form.description}
                                    onChange={(event) => handleDescriptionChange(formIndex, event)}
                                >
                                </textarea>
                            </label>
                        </section>
                        <div className='flex-align'>

                            <div className='center-item-container'>
                                <button onClick={(event) => handleDisplayRecipe(formIndex, event)} className="open-recipe-button">{`${form.isOpen ? "Close Recipe" : "Open Recipe"}`}</button>
                            </div>
                            {form.name != '' && form.isOpen && <div className='center-item-container'>
                                <button onClick={(event) => handlePrintRecipe(formIndex, event)} className="open-recipe-button">Print Recipe</button>
                            </div>}
                        </div>
                        <label className='recipe-header'>
                            Allergies:
                            <input
                                type="text"
                                className='allergy-input'
                                placeholder='Egg, Fish, Milk, Peanuts, Shellfish, Soy, Tree nuts, Wheat'
                                value={form.allergy}
                                onChange={(event) => handleAllergyChange(formIndex, event)}
                            />
                        </label>
                        {form.isOpen && <select name="" className='center-type-container' value={form.type} onChange={(event) => handleTypeChange(formIndex, event)} id="">
                            <option value="all">Type</option>
                            <option value="amuse">Amuse</option>
                            <option value="appetizer">Appetizer</option>
                            <option value="soup">Soup</option>
                            <option value="salad">Salad</option>
                            <option value="entree">Entree</option>
                            <option value="cheese">Cheese</option>
                            <option value="mignardiese">Mignardiese</option>
                            <option value="beverage">Beverage</option>
                            <option value="dessert">Dessert</option>
                        </select>}

                        {form.isOpen && <section className='info-container'>
                            <div className='flex-align'>
                                <label className='label-font'>
                                    Servings:
                                    <input
                                        type="number"
                                        className='servings-info-input'
                                        placeholder='6'
                                        value={form.servings}
                                        onChange={(event) => handleServingsChange(formIndex, event)}
                                    />
                                </label>
                                <label className='label-font'>
                                    Cook Time:
                                    <input
                                        type="text"
                                        className='cook-time-input'
                                        placeholder='20 minute'
                                        value={form.cookTime}
                                        onChange={(event) => handleCookTimeChange(formIndex, event)}
                                    />
                                </label>
                            </div>

                            <div className='flex-align'>
                                <label className='label-font'>
                                    Prep Time:
                                    <input
                                        type="text"
                                        className='prep-time-input'
                                        placeholder='1 hour'
                                        value={form.prepTime}
                                        onChange={(event) => handlePrepTimeChange(formIndex, event)}
                                    />
                                </label>
                                <label className='label-font'>
                                    Plate Time:
                                    <input
                                        type="text"
                                        className='plate-time-input'
                                        placeholder='4 minutes'
                                        value={form.plateTime}
                                        onChange={(event) => handlePlateTimeChange(formIndex, event)}
                                    />
                                </label>
                            </div>
                        </section>}


                        {form.isOpen && <label className='flex-end'>
                            DELETE RECIPE
                            <input
                                type="checkbox"
                                name='delete-recipe'
                                className='check-box'
                                checked={form.checked}
                                onChange={(event) =>
                                    handleCheckboxChange(formIndex, event)
                                }
                            />
                        </label>}
                        {form.checked && <button type="button" onClick={() => handleRemoveForm(formIndex)}>
                            Are you sure?
                        </button>}
                        {form.isOpen && <h2>Ingredients</h2>}
                        {form.isOpen && <button type="button" onClick={() => handleAddSubForm(formIndex)}>
                            Add Ingredient
                        </button>}
                        {form.inputs.map((subForm, subFormIndex) => (
                            <section key={subFormIndex}>

                                {form.isOpen && <form key={subFormIndex} className='ingredient-container'>
                                    <label>
                                        <input
                                            type="text"
                                            placeholder='Ingredient'
                                            name="input1"
                                            value={subForm.input1}
                                            onChange={(event) =>
                                                handleInputChange(formIndex, subFormIndex, event)
                                            }
                                        />
                                    </label>
                                    <label>
                                        <input
                                            type="number"
                                            placeholder='Amount'
                                            className='ingredient-amount-width'
                                            name="input2"
                                            value={subForm.input2}
                                            onChange={(event) =>
                                                handleInputChange(formIndex, subFormIndex, event)
                                            }
                                        />
                                    </label>
                                    <label>
                                        <select
                                            name="select"
                                            value={subForm.select}
                                            onChange={(event) => handleInputChange(formIndex, subFormIndex, event)}
                                        >
                                            <option value="unit">Unit</option>
                                            <option value="t.t.">t.t.</option>
                                            <option value="tbsp">tbsp</option>
                                            <option value="tsp">tsp</option>
                                            <option value="oz">oz</option>
                                            <option value="c">c</option>
                                            <option value="qt">qt</option>
                                            <option value="pt">pt</option>
                                            <option value="gal">gal</option>
                                            <option value="lb">lb</option>
                                            <option value="ml">ml</option>
                                            <option value="gr">gr</option>
                                            <option value="kg">kg</option>
                                            <option value="li">li</option>
                                            )){'}'}
                                        </select>
                                    </label>
                                    <label className='label'>
                                        Remove
                                        <input
                                            type="checkbox"
                                            className='check-box'
                                            checked={subForm.checked}
                                            onChange={(event) =>
                                                handleSubFormCheckboxChange(formIndex, subFormIndex, event)
                                            }
                                        />
                                    </label>
                                </form>}
                                <div className='center-item-container'>
                                    {subForm.checked && <button type="button" onClick={() => handleRemoveSubForm(formIndex, subFormIndex)}>
                                        Are you sure?
                                    </button>}
                                </div>
                            </section>
                        ))}
                        {form.isOpen && <h2>Instructions</h2>}
                        {form.isOpen && <button type="button" onClick={() => handleAddInstruction(formIndex)}>
                            Add Instruction
                        </button>}
                        {form.instructions.map((subInstruction, subInstructionIndex) => (
                            <div key={subInstructionIndex} >
                                <div className="instruction-container">

                                    {form.isOpen && <label>
                                        {`${subInstructionIndex + 1} : `}
                                        <textarea
                                            id=""
                                            cols="40"
                                            rows="2"
                                            type="text"
                                            name="instruction"
                                            className='instruction-text-area'
                                            value={subInstruction.instruction}
                                            onChange={(event) =>
                                                handleInstructionChange(formIndex, subInstructionIndex, event)
                                            }
                                        >
                                        </textarea>
                                    </label>}
                                    {form.isOpen && <div>
                                        <label className='label'>
                                            Remove
                                            <input
                                                type="checkbox"
                                                className='check-box'
                                                checked={subInstruction.checked}
                                                onChange={(event) =>
                                                    handleSubIngredientCheckboxChange(formIndex, subInstructionIndex, event)
                                                }
                                            />
                                        </label>

                                    </div>}
                                </div>
                                {subInstruction.checked && <button type="button" onClick={() => handleRemoveSubInstructionForm(formIndex, subInstructionIndex)}>
                                    Remove Instruction
                                </button>}
                            </div>
                        ))}
                        <hr />
                    </div>
                ))}
            </div>
            <section className='navigate-contianer'>
                <div className='center-item-container'>
                    <input
                        id="searchbarId"
                        type="text"
                        className='searchbar'
                        value={searchTerm}
                        placeholder='Search...'
                        onChange={(event) => setSearchTerm(event.target.value)}
                    />

                </div>
                <ButtonCarousel />
            </section>
        </>
    )
}



export default Recipe
