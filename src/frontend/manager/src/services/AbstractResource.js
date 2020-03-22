import axios from 'axios';
export default class AbstractResource {
    constructor(resourcePath) {
        this.resourcePath = resourcePath;
    }
    /**
     * Get one resource object
     * @param {number} id 
     */
    async getOneById(id) {
        const result = await axios.get(`${this.resourcePath}/${id}`);
        return result.data;
    }

    /**
     * Get all resource objects
     */
    async getAll() {
        const result = await axios.get(this.resourcePath);
        return result.data;
    }

    /**
     * Save one resource object
     * @param {*} resourceObject 
     */
    async save(resourceObject) {
        const id = resourceObject.id;
        const suffix = id ? `/${id}` : '';
        const result = await axios.post(`${this.resourcePath}${suffix}`, resourceObject);
        return result.data;
    }

    /**
     * Delete one resource object
     * @param {number} id 
     */
    delete(id) {
        return axios.delete(`${this.resourcePath}/${id}`);
    }
}