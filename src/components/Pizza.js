import React, {useState, useEffect} from 'react'
import axios from 'axios'
import * as Yup from 'yup'
import {Link, Route} from "react-router-dom"

const Pizza = () => {
    const [post, setPost] = useState()
    const [pizzaState, setPizzaState] = useState({
        name: '',
        size: '',
        sauce: '',
        origional: false,
        garlic: false,
        bbq: false,
        special_instructions: ""
      })

      const sauces = ['Origional', 'garlic', 'bbq']
      const sizes = ['Large', 'Medium', 'Small', 'Personal']
      const toppings = ['Pepperoni', 'Beef', 'Sausage', 'Cheese']

      const formSchema = Yup.object().shape({
        name: Yup.string().min(2, "Requires at least 2 characters"),
        sauce: Yup.mixed().oneOf(sauces)
    })

    
    const [errors, setErrors] = useState({
        name: '',
        sauce: ''
    });
    
   

   


    const validateChange = (e) => {
        if(e.target.name === 'name' || e.target.name === 'sauce'){
            Yup.reach(formSchema, e.target.name).validate(e.target.value)
            .then(isValid => {
                setErrors({...errors, [e.target.name]: ""})
            })
            .catch(err => {
                console.log(err.errors)
                setErrors({...errors, [e.target.name]:err.errors[0]})
                
            })
        }

    }

    const handleChange = e => {
        e.persist()
        setPizzaState({...pizzaState, [e.target.name]: e.target.value})
        validateChange(e)
    }

    const handleSubmit = e => {
        e.preventDefault()
        axios.post('https://reqres.in/api/users', pizzaState)
        .then(res => {
            console.log(res.data)
            setPost(res.data);
            setPizzaState({
                name: '',
                size: '',
                sauce: '',
                origional: false,
                garlic: false,
                bbq: false,
                special_instructions: ""
            })
        })
        .catch(err => {
            console.log(err)
        })
    }

    return (
        <>
        <p>Pizza Order Form</p>
        <Link to ="/"><button>Home</button></Link>
        <form onSubmit={handleSubmit}>
            <label htmlFor="name">
                Name:
                <input type='text' name='name' value={pizzaState.name} onChange={handleChange} />
                {errors.name.length > 2 ? <p className="error">{errors.name}</p>: null}
            </label>
            <label htmlFor="size">
                Size:
                <select value={pizzaState.size} name='size' onChange={handleChange}>
                    {sizes.map(size => {
                        return (
                            <option value={size}>{size}</option>
                        )
                    })}
                </select>
            </label>
            <label htmlFor="sauce">
                Sauce:
                <select value={pizzaState.sauce} name='sauce' onChange={handleChange}>
                    {sauces.map(sauce => {
                        return (
                            <option value={sauce}>{sauce}</option>
                        )
                    })}
                </select>
            </label>
            <label htmlFor="topping">
                Toppings:
                    {toppings.map(topping => {
                        return (
                            <label htmlFor={topping}>{topping}
                                <input type='checkbox' name={toppings} data-cy="toppings" checked={pizzaState.topping} onChange={handleChange}/>
                            </label>
                        )
                    })}
            </label>
            <label htmlFor="special_instructions">
              Special Instructions:
              <textarea
                id="special_instructions"
                name="special_instructions"
                data-cy = "special_instructions"
                value={pizzaState.special_instructions}
                onChange={handleChange}
              />
            </label>
            <input data-cy="submit" type='submit' />
        </form>
        </>
    )
}

export default Pizza