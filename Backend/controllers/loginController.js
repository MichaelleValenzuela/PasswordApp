//BORRAR

const getLogin = (req, res) => {
    const products = [
        {   
            id: 1,
            price: 30,
            name: 'laptop'
        },
        {
            id: 2,
            price: 14,
            name: 'router'
        }
    ]
    res.json(products)
}

//Exportar las funciones del controlador
export {
    getLogin
}