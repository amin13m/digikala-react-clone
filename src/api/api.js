import axios from "axios";



////CREATE////

const api = axios.create({
    baseURL: "http://localhost:3000",
    headers: {
        "Content-Type": "application/json",
    },
    timeout: 5000
});




/////USER CRUD////

export const UserAPI={
    getAll: ()=> api.get("/users"),
    getById: (id)=> api.get(`/users/${id}`),
    create : (data) => api.post("/users", data),
    update: (id, data) => api.put(`/users/${id}`, data),
    delete: (id) => api.delete(`/users/${id}`)  
}

/////CATEGORY CRUD////

export const CategoryAPI={
    getAll: ()=> api.get("/categories"),
    getById: (id)=> api.get(`/categories/${id}`),
    create : (data) => api.post("/categories", data),
    update: (id, data) => api.put(`/categories/${id}`, data),
    delete: (id) => api.delete(`/categories/${id}`)
}

/////PRODUCT CRUD////

export const ProductAPI={
    getAll: ()=> api.get("/products"),
    getById: (id)=> api.get(`/products/${id}`),
    create : (data) => api.post("/products", data),
    update: (id, data) => api.put(`/products/${id}`, data),
    delete: (id) => api.delete(`/products/${id}`),
    getByCategory: (category) => api.get(`/products?category=${category}`)
}

/////CART CRUD////

export const CartAPI={
    getAll: ()=> api.get("/carts"),
    getById: (id)=> api.get(`/carts/${id}`),
    create : (data) => api.post("/carts", data),
    update: (id, data) => api.put(`/carts/${id}`, data),
    delete: (id) => api.delete(`/carts/${id}`)
}


export default api