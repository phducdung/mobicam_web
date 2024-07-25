const con = require("../db/db.js");

//==================Policy==================
const getPolicyDetails = async (id) => {
  try {
    const [results] = await con.query("SELECT * FROM policy WHERE id = ?", [
      id,
    ]);
    return results[0];
  } catch (error) {
    console.log("Error getting policy", error);
  }
};
const getPolicyList = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      const [results] = await con.query(
        "SELECT id, name_vi, name_en FROM policy"
      );
      return resolve(results);
    } catch (error) {
      return reject(error);
    }
  });
};
const updatePolicy = async (name_vi, name_en, content_vi, content_en, id) => {
  const [results] = await con.query(
    "update policy set name_vi = ?, name_en = ?, content_vi = ?, content_en = ? where id = ?",
    [name_vi, name_en, content_vi, content_en, id]
  );
  return results.affectedRows;
};
const addPolicy = async (name_vi, name_en, content_vi, content_en) => {
  try {
    const [results] = await con.query(
      "insert into policy (name_vi, name_en, content_vi, content_en) values (?,?,?,?)",
      [name_vi, name_en, content_vi, content_en]
    );
    return results;
  } catch (error) {
    console.log(error);
  }
}
const deletePolicy = async (id) => {
  try {
    const [results] = await con.query(
      "delete from policy where id =?",
      [id]
    );
    return results
  } catch (error) {
    console.log(error)
  }
};

//==================Cooperate==================
const getCoopList = async () => {
  try {
    const [results] = await con.query("SELECT id,name_vi,name_en from cooperate")
    return results
  } catch (error) {
    console.log(error)
  }

};
const getCoopDetails = async (id, lang) => {
  try {
    const [results] = await con.query(
      `SELECT name_${lang}, content_${lang} FROM cooperate WHERE id = ?`,
      [id]
    );
    const response = {};
    response.name = results[0][`name_${lang}`];
    response.content = results[0][`content_${lang}`];
    return response;
  } catch (error) {
    console.log(error);
  }
};
const getCoopDetailsAdmin = async (id) => {
  try {
    const [results] = await con.query(`SELECT * FROM cooperate WHERE id = ?`, [
      id,
    ]);
    return results[0];
  } catch (error) {
    console.log(error);
  }
};

const addCoop = async (name_vi, name_en, content_vi, content_en) => {
  try {
    const [results] = await con.query(
      "insert into cooperate (name_vi, name_en, content_vi, content_en) values (?,?,?,?)",
      [name_vi, name_en, content_vi, content_en]
    );
    return results;
  } catch (error) {
    console.log(error);
  }
};
const deleteCoop = async (id) => {
  try {
    const [results] = await con.query(
      "delete from cooperate where id = ?",
      [id]
    );
    return results;
  } catch (error) {
    console.log(error);
  }
};
const updateCoop = async (name_vi, name_en, content_vi, content_en, id) => {
  const [results] = await con.query(
    "update cooperate set name_vi = ?, name_en = ?, content_vi = ?, content_en = ? where id = ?",
    [name_vi, name_en, content_vi, content_en, id]
  );
  return results.affectedRows;
};
//==================QA==================
const getQADetails = async (id) => {
  const [results] = await con.query(
    "SELECT * FROM contentQA WHERE cateId = ?",
    [id]
  );
  for (let i = 0; i < results.length; i++) {
    const [cat] = await con.query(
      "SELECT name_vi, name_en FROM categoriesQA WHERE id = ?",
      [results[i].cateId]
    );
    results[i].cat_name_vi = cat[0].name_vi;
    results[i].cat_name_en = cat[0].name_en;
  }

  console.log("results", results);
  return results;
};
const getQAList = async () => {
  const [results] = await con.query(
    "SELECT id, name_vi, name_en FROM categoriesQA"
  );
  return results;
};

const updateQA = (content_vi, content_en, id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const [results] = await con.query(
        "update contentQA set content_vi = ?, content_en = ? where cateId = ?",
        [content_vi, content_en, id]
      );

      resolve(results.affectedRows);
    } catch (error) {
      reject(false);
    }
  });
};
const addQA = (content_vi, content_en, q_vi, q_en, catid) => {
  return new Promise(async (resolve, reject) => {
    try {
      const [results] = await con.query(
        "insert into contentQA (content_vi, content_en, name_vi, name_en, cateId) values (?,?,?,?,?)",
        [content_vi, content_en, q_vi, q_en, catid]
      );

      resolve(results.affectedRows);
    } catch (error) {
      reject(false);
    }
  });
};
const deleteQA = (id) => {

  return new Promise(async (resolve, reject) => {
    try {
      const [results] = await con.query("delete from contentQA where id = ?", [
        id,
      ]);

      resolve(results.affectedRows);
    } catch (error) {
      reject(false);
    }
  });
};

module.exports = {
  getPolicyDetails,
  getPolicyList,
  updatePolicy,
  addPolicy,
  deletePolicy,
  getQADetails,
  getQAList,
  getCoopList,
  getCoopDetails,
  updateCoop,
  getCoopDetailsAdmin,
  updateQA,
  deleteQA,
  addQA,
  addCoop,
  deleteCoop
};
