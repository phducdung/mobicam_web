const con = require("..//db/db.js");
const cheerio = require("cheerio");
const convertStringToHTML = (str) => {
  const $ = cheerio.load(str);
  return $.html();
};

const getAllCategory = (lang = "vi") => {
  return new Promise(async (resolve, reject) => {
    try {
      const [result] = await con.execute(
        `SELECT id,name_${lang} FROM categories`
      );

      return resolve(result);
    } catch (error) {
      console.log("error  alo>>>", error);
      return reject(error);
    }
  });
};

function renameField(obj, oldName, newName) {
  // Kiểm tra xem field cũ có tồn tại hay không
  if (obj.hasOwnProperty(oldName)) {
    // Tạo field mới với giá trị từ field cũ
    obj[newName] = obj[oldName];
    // Xóa field cũ
    delete obj[oldName];
  }
}
const getAllCategoryAndProduct = (lang = "vi") => {
  return new Promise(async (resolve, reject) => {
    try {
      const categories = await getAllCategory(lang);
      for (let category of categories) {
        renameField(category, `name_${lang}`, `name`);
        const [products] = await con.execute(
          `SELECT id, productname_${lang}, productdesc_${lang}, catid FROM products WHERE catid = ${category.id}`
        );
        let products_res = [];
        for (let product of products) {
          const [images] = await con.execute(
            `SELECT img FROM product_thumb WHERE product_id = ${product.id}`
          );
          product.images = images.map((img) => img.img);

          products_res.push({
            id: product.id,
            productname: product[`productname_${lang}`],
            productimg: product.productimg,
            images: product.images,
            productdesc: convertStringToHTML(product[`productdesc_${lang}`]),
          });
        }
        category.products = products_res;
      }
      return resolve(categories);
    } catch (error) {
      console.error("Error fetching categories and products:", error);
      return reject(error);
    }
  });
};

module.exports = {
  getAllCategory,
  getAllCategoryAndProduct,
};
