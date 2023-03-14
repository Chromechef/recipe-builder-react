import React, { useState, useEffect } from 'react';


function Recipe() {
    const [formData, setFormData] = useState(
        JSON.parse(localStorage.getItem("formData")) || [
            {
                id: nanoid(),
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
                isFiltered: false,
                inputs: [{ id: nanoid(), input1: "", input2: "", select: "", checked: false }],
                instructions: [{ id: nanoid(), instruction: "", checked: false }]
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
            if (buttons[middleIndex].id === buttons[1].id) {
                const newFormData = [...formData]
                // } else {
                //     console.log(searchTerm)
                //     setSearchTerm(typeSelected)
                // }
                if (typeSelected == "All") {
                    console.log(typeSelected)
                    setSearchTerm('')
                }
            }
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
                    id: nanoid(),
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
                    isFiltered: false,
                    inputs: [{ id: nanoid(), input1: "", input2: "", select: "", checked: false }],
                    instructions: [{ id: nanoid(), instruction: "", checked: false }]
                },
                ...formData
            ])
    }

    const handleAddSubForm = (id, formIndex) => {
        const newFormData = [...formData]
        formData.map(item => {
            if (item.id === id) {
                const newFormData = [...formData]
                item.inputs.push({ id: nanoid(), input1: "", input2: "", select: "", checked: false })
            }
        })

        setFormData(newFormData)
    }

    const handleAddInstruction = (id, formIndex) => {
        const newFormData = [...formData]
        formData.map(item => {
            if (item.id === id) {
                item.instructions.push({ id: nanoid(), instruction: "", checked: false })
            }
        })
        setFormData(newFormData)
    }

    const handleInputChange = (id, formIndex, inputIndex, event) => {
        const newFormData = [...formData]
        formData.map(item => {
            if (item.id === id) {
                item.inputs[inputIndex][event.target.name] =
                    event.target.value
            }
        })
        setFormData(newFormData)
        localStorage.setItem("formData", JSON.stringify(newFormData))
    }

    const handleInstructionChange = (id, formIndex, inputIndex, event) => {
        const newFormData = [...formData]
        formData.map(item => {
            if (item.id === id) {
                item.instructions[inputIndex][event.target.name] =
                    event.target.value
            }
        })
        setFormData(newFormData)
        localStorage.setItem("formData", JSON.stringify(newFormData))
    }

    const handleNameChange = (formIndex, formId, event) => {
        const newFormData = formData.map(item => {
            if (item.id === formId) {
                return {
                    ...item,
                    name: event.target.value,
                }
            } else {
                return { ...item }
            }
        })
        setFormData(newFormData)
        localStorage.setItem("formData", JSON.stringify(formData))
    }

    const handleDisplayRecipe = (formIndex, formId, event) => {
        const newFormData = formData.map((form, index) => {
            if (formId === form.id) {
                return {
                    ...form,
                    isOpen: !form.isOpen
                }
            } else {
                return {
                    ...form
                }
            }
        })
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

    const handleDescriptionChange = (formIndex, formId, event) => {
        const newFormData = formData.map(item => {
            if (item.id === formId) {
                return {
                    ...item,
                    description: event.target.value,
                }
            } else {
                return { ...item }
            }
        })
        setFormData(newFormData)
        localStorage.setItem("formData", JSON.stringify(formData))
    }


    const handleServingsChange = (formIndex, formId, event) => {
        const newFormData = formData.map(item => {
            if (item.id === formId) {
                return {
                    ...item,
                    servings: event.target.value,
                }
            } else {
                return { ...item }
            }
        })
        setFormData(newFormData)
        localStorage.setItem("formData", JSON.stringify(formData))
    }

    const handleCookTimeChange = (formIndex, formId, event) => {
        const newFormData = formData.map(item => {
            if (item.id === formId) {
                return {
                    ...item,
                    cookTime: event.target.value,
                }
            } else {
                return { ...item }
            }
        })
        setFormData(newFormData)
        localStorage.setItem("formData", JSON.stringify(formData))
    }

    const handlePrepTimeChange = (formIndex, formId, event) => {
        const newFormData = formData.map(item => {
            if (item.id === formId) {
                return {
                    ...item,
                    prepTime: event.target.value,
                }
            } else {
                return { ...item }
            }
        })
        setFormData(newFormData)
        localStorage.setItem("formData", JSON.stringify(formData))
    }

    const handlePlateTimeChange = (formIndex, formId, event) => {
        const newFormData = formData.map(item => {
            if (item.id === formId) {
                return {
                    ...item,
                    plateTime: event.target.value,
                }
            } else {
                return { ...item }
            }
        })
        setFormData(newFormData)
        localStorage.setItem("formData", JSON.stringify(formData))
    }

    const handleAllergyChange = (formIndex, formId, event) => {
        const newFormData = formData.map(item => {
            if (item.id === formId) {
                return {
                    ...item,
                    allergy: event.target.value,
                }
            } else {
                return { ...item }
            }
        })
        setFormData(newFormData)
        localStorage.setItem("formData", JSON.stringify(formData))
    }

    const handleCheckboxChange = (id, formIndex, event) => {
        const newFormData = [...formData]
        formData.map(item => {
            if (item.id === id) {
                item.checked = event.target.checked
            }
        })
        setFormData(newFormData)
        localStorage.setItem("formData", JSON.stringify(newFormData))
    }

    const handleRemoveForm = (id, formIndex) => {
        const newFormData = [...formData]
        const indexOfChecked = newFormData.findIndex(check => check.checked === true)
        formData.map(item => {
            if (item.id === id) {
                newFormData.splice(indexOfChecked, 1)
            }
        })
        setFormData(newFormData)
        localStorage.setItem("formData", JSON.stringify(newFormData))
    }

    const handleSubFormCheckboxChange = (id, subFormIndex, event) => {
        const newFormData = [...formData]
        newFormData.map(item => {
            if (item.id === id) {
                const subFormInputs = item.inputs.slice(
                    subFormIndex * 1,
                    subFormIndex * 1 + 1
                )
                if (event.target.checked) {
                    subFormInputs.forEach((input) => (input.checked = true))
                } else {
                    subFormInputs.forEach((input) => (input.checked = false))
                }
            }
        })
        setFormData(newFormData)
        localStorage.setItem("formData", JSON.stringify(newFormData))
    }

    const handleSubIstructionCheckboxChange = (id, subIngredientIndex, event) => {
        const newFormData = [...formData]
        newFormData.map(item => {
            if (item.id === id) {
                const subFormIngredientInputs = item.instructions.slice(
                    subIngredientIndex * 1,
                    subIngredientIndex * 1 + 1
                )
                if (event.target.checked) {
                    subFormIngredientInputs.forEach((input) => (input.checked = true))
                } else {
                    subFormIngredientInputs.forEach((input) => (input.checked = false))
                }
            }
        })
        setFormData(newFormData)
        localStorage.setItem("formData", JSON.stringify(newFormData))
    }

    const handleRemoveSubForm = (id, subFormIndex) => {
        const newFormData = [...formData]
        newFormData.map(item => {
            if (item.id === id) {
                item.inputs.splice(subFormIndex * 1, 1)
            }
        })
        setFormData(newFormData)
        localStorage.setItem("formData", JSON.stringify(newFormData))
    }

    const handleRemoveSubInstructionForm = (id, subFormIndex) => {
        const newFormData = [...formData]
        newFormData.map(item => {
            if (item.id === id) {
                item.instructions.splice(subFormIndex * 1, 1)
            }
        })
        setFormData(newFormData)
        localStorage.setItem("formData", JSON.stringify(newFormData))

    }

    const handleTypeChange = (id, formIndex, event) => {
        const newFormData = [...formData]
        formData.map(item => {
            if (item.id === id) {
                item.type = event.target.value
            }
        })
        setFormData(newFormData)
        localStorage.setItem("formData", JSON.stringify(newFormData))
    }

    const filteredData = formData.filter((form) => {
        return form.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            form.type.toLowerCase().includes(searchTerm.toLowerCase())
    }
    )


    useEffect(() => {
        localStorage.setItem("formData", JSON.stringify(formData))
    }, [formData])


    // const textarea = document.getElementsByClassName('.textareaTitle')
    // textarea.addEventListener("keyup", e => {
    //     console.log(e)
    //     let scHeight = e.target.scrollHeight
    //     textarea.style.height = `$(scHeight)px`
    // })



    return (
        <>
            <div className='margin-bottom'>
                {filteredData.map((form, formIndex) => (
                    <div key={formIndex}>
                        <hr />
                        <section className='recipe-header'>
                            <label>

                                <textarea
                                    type="text"
                                    rows={3}
                                    className='recipe-title textareaTitle'
                                    placeholder='Recipe Title'
                                    value={form.name}
                                    onChange={(event) => handleNameChange(formIndex, form.id, event)}
                                ></textarea>
                            </label>
                            <label>
                                <textarea
                                    type="text"
                                    rows={2}
                                    className='recipe-info'
                                    placeholder='Menu Description'
                                    value={form.description}
                                    onChange={(event) => handleDescriptionChange(formIndex, form.id, event)}
                                >
                                </textarea>
                            </label>
                        </section>
                        <div className='flex-align'>

                            <div className='center-item-container'>
                                <button onClick={(event) => handleDisplayRecipe(formIndex, form.id, event)} className="open-recipe-button">{`${form.isOpen ? "Close Recipe" : "Open Recipe"}`}</button>
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
                                onChange={(event) => handleAllergyChange(formIndex, form.id, event)}
                            />
                        </label>
                        {form.isOpen && <select name="" className='center-type-container' value={form.type} onChange={(event) => handleTypeChange(form.id, formIndex, event)} id="">
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
                                        onChange={(event) => handleServingsChange(formIndex, form.id, event)}
                                    />
                                </label>
                                <label className='label-font'>
                                    Cook Time:
                                    <input
                                        type="text"
                                        className='cook-time-input'
                                        placeholder='20 minute'
                                        value={form.cookTime}
                                        onChange={(event) => handleCookTimeChange(formIndex, form.id, event)}
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
                                        onChange={(event) => handlePrepTimeChange(formIndex, form.id, event)}
                                    />
                                </label>
                                <label className='label-font'>
                                    Plate Time:
                                    <input
                                        type="text"
                                        className='plate-time-input'
                                        placeholder='4 minutes'
                                        value={form.plateTime}
                                        onChange={(event) => handlePlateTimeChange(formIndex, form.id, event)}
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
                                    handleCheckboxChange(form.id, formIndex, event)
                                }
                            />
                        </label>}
                        {form.checked && <button type="button" onClick={() => handleRemoveForm(form.id, formIndex)}>
                            Are you sure?
                        </button>}
                        {form.isOpen && <h2>Ingredients</h2>}
                        {form.isOpen && <button type="button" onClick={() => handleAddSubForm(form.id, formIndex)}>
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
                                                handleInputChange(form.id, formIndex, subFormIndex, event)
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
                                                handleInputChange(form.id, formIndex, subFormIndex, event)
                                            }
                                        />
                                    </label>
                                    <label>
                                        <select
                                            name="select"
                                            value={subForm.select}
                                            onChange={(event) => handleInputChange(form.id, formIndex, subFormIndex, event)}
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
                                                handleSubFormCheckboxChange(form.id, subFormIndex, event)
                                            }
                                        />
                                    </label>
                                </form>}
                                <div className='center-item-container'>
                                    {subForm.checked && form.isOpen && <button type="button" onClick={() => handleRemoveSubForm(form.id, subFormIndex)}>
                                        Are you sure?
                                    </button>}
                                </div>
                            </section>
                        ))}
                        {form.isOpen && <h2>Instructions</h2>}
                        {form.isOpen && <button type="button" onClick={() => handleAddInstruction(form.id, formIndex)}>
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
                                                handleInstructionChange(form.id, formIndex, subInstructionIndex, event)
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
                                                    handleSubIstructionCheckboxChange(form.id, subInstructionIndex, event)
                                                }
                                            />
                                        </label>

                                    </div>}
                                </div>
                                {subInstruction.checked && form.isOpen && <button type="button" onClick={() => handleRemoveSubInstructionForm(form.id, subInstructionIndex)}>
                                    Remove Instruction
                                </button>}
                            </div>
                        ))}
                    </div>
                ))}
                <hr />
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
