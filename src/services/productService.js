const con = require("..//db/db.js");

module.exports = {
  addProduct: (name_vi, imgs, desc_vi, catid, name_en, desc_en) => {
    return new Promise(async (resolve, reject) => {
      try {
        const [resultProduct] = await con.execute(
          // productname,productimg,productdesc,catid
          `INSERT INTO products (
            productname_vi,
            productname_en,
            productdesc_vi,
            productdesc_en,
            catid
          ) VALUES(?,?,?,?,?)`,
          [name_vi, name_en, desc_vi, desc_en, catid]
        );
        const id = resultProduct.insertId;

        //bulk insert
        const values = imgs.flatMap((img) => [id, img]);
        const placeholders = imgs.map(() => "(?, ?)").join(", ");
        const sql = `INSERT INTO product_thumb (product_id, img) VALUES ${placeholders}`;
        const [resultImg] = await con.execute(sql, values);

        if (resultProduct.affectedRows && resultImg.affectedRows) {
          return resolve(true);
        }
      } catch (error) {
        return reject(error);
      }
    });
  },
  getAllProduct: () => {
    return new Promise(async (resolve, reject) => {
      try {
        const [rows] = await con.execute(`
          SELECT p.id, p.productname_vi, p.productname_en, p.catid, p.productdesc_en, p.productdesc_vi, pt.img
          FROM products p
          LEFT JOIN product_thumb pt ON p.id = pt.product_id
        `);

        // Nhóm các hình ảnh theo sản phẩm
        const products = rows.reduce((acc, row) => {
          const {
            id,
            productname_vi,
            productname_en,
            catid,
            productdesc_en,
            productdesc_vi,
            img,
          } = row;
          if (!acc[id]) {
            acc[id] = {
              id,
              productname_vi,
              productname_en,
              catid,
              productdesc_en,
              productdesc_vi,
              images: [],
            };
          }
          if (img) {
            acc[id].images.push(img);
          }
          return acc;
        }, {});

        // Chuyển đổi đối tượng thành mảng
        resolve(Object.values(products));
      } catch (error) {
        reject(error);
      }
    });
  },
  deleteProduct: (id) => {
    return new Promise(async (resolve, reject) => {
      try {
        const [result] = await con.execute(
          `DELETE FROM products WHERE id = ?`,
          [id]
        );

        if (result.affectedRows > 0) {
          return resolve(true);
        }
        return resolve(false);
      } catch (error) {
        return reject(error);
      }
    });
  },

  updateProduct: (name_vi, imgs, desc_vi, catid, name_en, desc_en, id) => {
    return new Promise(async (resolve, reject) => {
      let connection;
      try {
        connection = await con.getConnection();
        await connection.beginTransaction();

        // Cập nhật thông tin sản phẩm trong bảng products
        const updateProductQuery = `
          UPDATE products
          SET productname_vi = ?, productdesc_vi = ?, catid = ?, productname_en = ?, productdesc_en = ?
          WHERE id = ?
        `;
        await connection.execute(updateProductQuery, [
          name_vi,
          desc_vi,
          catid,
          name_en,
          desc_en,
          id,
        ]);

        // Xóa các hình ảnh cũ của sản phẩm trong bảng product_thumb
        const deleteImagesQuery = `
          DELETE FROM product_thumb
          WHERE product_id = ?
        `;
        await connection.execute(deleteImagesQuery, [id]);

        // Thêm các hình ảnh mới vào bảng product_thumb bằng bulk insert
        if (imgs && imgs.length > 0) {
          // Tạo một mảng các câu lệnh INSERT VALUES
          const insertQueries = imgs.map((img) => {
            return connection.execute(
              "INSERT INTO product_thumb (product_id, img) VALUES (?, ?)",
              [id, img]
            );
          });

          // Thực hiện các câu lệnh INSERT VALUES
          await Promise.all(insertQueries);
        }

        await connection.commit();
        resolve(true); // Cập nhật thành công
      } catch (error) {
        if (connection) {
          await connection.rollback();
        }
        console.error("Error updating product:", error);
        reject(false);
      } finally {
        if (connection) {
          connection.release();
        }
      }
    });
  },
};
