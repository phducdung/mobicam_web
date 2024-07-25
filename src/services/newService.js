const con = require("..//db/db.js");

module.exports = {
  addNew: (
    title_vi,
    title_en,
    content_vi,
    content_en,
    imageUrl,
    importance,
    datePost
  ) => {
    const slug_vi = title_vi.toLowerCase().replace(/[\s\/]+/g, "-");
    const slug_en = title_en.toLowerCase().replace(/[\s\/]+/g, "-");

    return new Promise(async (resolve, reject) => {
      try {
        const [result] = await con.execute(
          `INSERT INTO news ( title_vi,
      title_en,
      content_vi,
      content_en,
      img,
      importance,
      createdAt,
      updatedAt,
      slug_vi,
      slug_en
      ) VALUES (?,?,?,?,?,?,?,?,?,?)`,
          [
            title_vi,
            title_en,
            content_vi,
            content_en,
            imageUrl,
            importance,
            datePost,
            datePost,
            slug_vi,
            slug_en,
          ]
        );

        if (result.affectedRows > 0) {
          return resolve(true);
        }
        return resolve(false);
      } catch (error) {
        console.log("error >>>", error);
        return reject(error);
      }
    });
  },

  updateNew: (
    title_vi,
    title_en,
    content_vi,
    content_en,
    imageUrl,
    id,
    importance,
    datePost
  ) => {
    return new Promise(async (resolve, reject) => {
      try {
        const slug_vi = title_vi.toLowerCase().replace(/[\s\/]+/g, "-");
        const slug_en = title_en.toLowerCase().replace(/[\s\/]+/g, "-");

        if (imageUrl) {
          const [result] = await con.execute(
            `UPDATE news SET  
            title_vi = ?,
            title_en = ?,
            content_vi = ?,
            content_en = ?,
            img = ?,
            updatedAt = ?,
            importance = ?,
            slug_vi = ?,
            slug_en = ?
            WHERE id = ?
           `,
            [
              title_vi,
              title_en,
              content_vi,
              content_en,
              imageUrl,
              datePost,
              Number(importance),
              slug_vi,
              slug_en,
              id,
            ]
          );

          if (result.affectedRows > 0) {
            return resolve(true);
          }
          return resolve(false);
        } else {
          const [result] = await con.execute(
            `UPDATE news SET  
            title_vi = ?,
            title_en = ?,
            content_vi = ?,
            content_en = ?,
            updatedAt = ?,
            importance = ?,
            slug_vi = ?,
            slug_en = ?
            WHERE id = ?`,
            [
              title_vi,
              title_en,
              content_vi,
              content_en,
              datePost,
              Number(importance),
              slug_vi,
              slug_en,
              id,
            ]
          );
          if (result.affectedRows > 0) {
            return resolve(true);
          }
          return resolve(false);
        }
      } catch (error) {
        console.log("error >>>", error);
        return reject(false);
      }
    });
  },

  getNewbyId: (slug, lang) => {
    return new Promise(async (resolve, reject) => {
      try {
        const [result] = await con.execute(
          `SELECT * FROM news WHERE slug_${lang} = ?`,
          [slug]
        );

        if (result.length > 0) {
          let news = {};
          news.slug = result[0].slug;
          news.title = result[0][`title_${lang}`];
          news.content = result[0][`content_${lang}`];
          news.img = result[0].img;

          return resolve(news);
        }
        return resolve(false);
      } catch (error) {
        console.log("error >>>", error);
        return reject(false);
      }
    });
  },

  deleteNew: (id) => {
    return new Promise(async (resolve, reject) => {
      try {
        const [result] = await con.execute(`DELETE FROM news WHERE id = ?`, [
          id,
        ]);

        if (result.affectedRows > 0) {
          return resolve(true);
        }
        return resolve(false);
      } catch (error) {
        return reject(error);
      }
    });
  },

  getAllnewsPagination: (lang = "vi", page = 1, pageSize = 10) => {
    return new Promise(async (resolve, reject) => {
      try {
        const offset = (page - 1) * pageSize;

        const [result] = await con.execute(
          `SELECT * 
           FROM news 
           ORDER BY importance DESC, updatedAt DESC
           LIMIT ? OFFSET ?;`,
          [pageSize, offset]
        );

        const [totalResult] = await con.execute(
          `SELECT COUNT(*) as total 
           FROM news;`
        );
        const totalItems = totalResult[0].total;
        const totalPages = Math.ceil(totalItems / pageSize);

        if (result.length > 0) {
          result.forEach((element) => {
            element.updatedAt = new Date(element.updatedAt).toLocaleDateString(
              "en-CA"
            );
          });

          return resolve({
            news: result,
            pagination: {
              page,
              pageSize,
              totalItems,
              totalPages,
            },
          });
        }
      } catch (error) {
        console.log("Error >>>", error);
        return reject(error);
      }
    });
  },
  getAllnews: (lang = "vi") => {
    return new Promise(async (resolve, reject) => {
      try {
        const [result] = await con.execute(
          `SELECT * 
FROM news 
ORDER BY importance DESC,updatedAt DESC;`
        );
        if (result.length > 0) {
          result.forEach((element) => {
            element.updatedAt = new Date(element.updatedAt).toLocaleDateString(
              "en-CA"
            );
          });

          return resolve(result);
        }
      } catch (error) {
        console.log(" loi ne error >>>", error);
        return reject(error);
      }
    });
  },
  getNewsLimit: (limit_num, lang = "vi") => {
    return new Promise(async (resolve, reject) => {
      try {
        const [result] = await con.execute(
          `select * from news  ORDER BY importance DESC,updatedAt DESC  limit ${limit_num}`
        );
        const news = [];
        result.forEach((element) => {
          news.push({
            id: element.id,
            title: element[`title_${lang}`],
            content: element[`content_${lang}`],
            slug: element[`slug_${lang}`],
            img: element.img,
            updatedAt: element.updatedAt.toLocaleDateString("en-CA"),
          });
        });

        return resolve(news);
      } catch (error) {
        console.log("error >>>", error);
        return reject(error);
      }
    });
  },
};
