const baseURL = import.meta.env.VITE_SERVER_URL

async function convertToJson(res) {
    try {
        const jsonResponse = await res.json();
        if (res.ok) {
            return jsonResponse;
        }
        else {
            throw { name: 'servicesError', message: jsonResponse };
        }
    }
    catch (error) {
        throw { name: 'servicesError', message: error.message };

    }

}

export default class ExternalServices {
    constructor() {
        // this.category = category;
        // this.path = `../json/${this.category}.json`;
    }
    async getData(category) {
        const response = await fetch(`${baseURL}products/search/${category}`);
        const data = await convertToJson(response);
        return data.Result;
    }
    async findProductById(id) {
        const response = await fetch(`${baseURL}product/${id}`);
        const data = await convertToJson(response);
        return data.Result;
    }
    async checkout(payload) {
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        };
        return await fetch(`${baseURL}checkout`, options).then(convertToJson);
    }
}