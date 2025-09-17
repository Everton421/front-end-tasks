import axios from "axios";

export const api = axios.create({
    baseURL:'https://api-tasks-9sex.onrender.com',
       headers:{ 'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJjYWE5ODQ0MS03OGE3LTQ4MWMtOTYzYi0yOWQ1YmZiOTQ3ZjciLCJyb2xlIjoic3Vwb3J0IiwiaWF0IjoxNzU3NTM3NDk0fQ.q-C_XzoVg4NAfRaEUIcxSFeqxXQ6hWHH0SbtLe3SBQU'}
       
})