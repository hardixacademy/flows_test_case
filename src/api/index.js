import axios from 'axios';

export const getPosts = async (setter) => {
    try {
        const { data } = await axios.get(`https://60cc74ec71b73400171f7ce1.mockapi.io/api/3001/items`);
        console.log(1);
        if (data.length > 0) {
            setter(data)
        } else {
            setter(null)
        }
    } catch (error) {
        console.error(error);
    }
}

export const deleteItem = async (id) => {
    try {
        await axios.delete(`https://60cc74ec71b73400171f7ce1.mockapi.io/api/3001/items/${id}`);
    } catch (error) {
        console.error(error);
    }
}

export const editItem = async (id) => {
    try {
        await axios.put(`https://60cc74ec71b73400171f7ce1.mockapi.io/api/3001/items/${id}`, { title: 'edited', text: 'edited' });
    } catch (error) {
        console.error(error);
    }
}

export const addItem = async ({ company, name }) => {
    try {
        const { data } = await axios.post(`https://60cc74ec71b73400171f7ce1.mockapi.io/api/3001/items`);
        try {
            await axios.post(`https://60cc74ec71b73400171f7ce1.mockapi.io/api/3001/items/${data.id}/head`, { company, name });
        } catch (error) {
            console.error(error);
        }
        try {
            await axios.post(`https://60cc74ec71b73400171f7ce1.mockapi.io/api/3001/items/${data.id}/body`, { car: 'mock', color: 'mock', price: '0.00' });
        } catch (error) {
            console.error(error);
        }
    } catch (error) {
        console.error(error);
    }
}

// import axios from 'axios';



