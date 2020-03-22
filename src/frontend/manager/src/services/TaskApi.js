import AbstractResource from './AbstractResource';
import Axios from 'axios';

class TaskApi extends AbstractResource {
    /**
     * Get all resource objects
     */
    async getAllByCategoryId(categoryId) {
        const result = await Axios.get(this.resourcePath, { params: { categoryId } });
        return result.data;
    }
}

export default new TaskApi('/tasks');