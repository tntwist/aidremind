import AbstractResource from './AbstractResource';

class CategoryApi extends AbstractResource {}

export default new CategoryApi('/Categories', 'categoryId');