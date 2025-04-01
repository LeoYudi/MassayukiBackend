import { ProductCategoryType } from 'types/productCategory';

export class ProductCategoryRepository {
  database: D1Database;

  constructor(database: D1Database) {
    this.database = database;
  }

  async getById(id: number) {
    try {
      let query = this.database.prepare(
        'SELECT * FROM product_categories WHERE id=?;'
      );
      query = query.bind([id]);
      return await query.run<ProductCategoryType[]>();
    } catch (err) {
      return { error: `Failed to run query: ${err}` };
    }
  }

  async listAll() {
    try {
      const query = this.database.prepare('SELECT * FROM product_categories;');
      return await query.run<ProductCategoryType[]>();
    } catch (err) {
      return { error: `Failed to run query: ${err}` };
    }
  }

  async create(name: string) {
    try {
      let query = this.database.prepare(
        `INSERT INTO product_categories (id, name) VALUES (NULL, ?);`
      );
      console.log(query);
      query = query.bind(name);
      return await query.run<ProductCategoryType>();
    } catch (err) {
      return { error: `Failed to run query: ${err}` };
    }
  }

  async delete(id: number) {
    try {
      let query = this.database.prepare(
        `DELETE FROM product_categories WHERE id=?;`
      );
      query = query.bind([id]);
      return await query.run<ProductCategoryType>();
    } catch (err) {
      return { error: `Failed to run query: ${err}` };
    }
  }
}
