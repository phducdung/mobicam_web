const con = require("..//db/db.js");

const restoreDefault = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const [result] = await con.execute(
        `update htmlcontent set  content_vi =content_backup_vi , content_en =content_backup_en`
      );
   
      if (result.affectedRows > 0) {
      
        return resolve(true);
      }
    } catch (error) {
      console.log("error >>>", error);
      return reject(false);
    }
  });
};

const updateHeader = (headerHtml, lang) => {
  return new Promise(async (resolve, reject) => {
    try {
      const [result] = await con.execute(
        `update htmlcontent set content_${lang} = ? where section = 'header'`,
        [headerHtml]
      );
      if (result.affectedRows > 0) {
        return resolve(true);
      }
    } catch (error) {
      console.log("error >>>", error);
      return reject(false);
    }
  });
};

const getHeaderSection = (lang) => {
  return new Promise(async (resolve, reject) => {
    try {
      const [result] = await con.execute(
        `select * from htmlcontent where section = 'header'`
      );
      if (result.length > 0) {
        return resolve(result[0][`content_${lang}`]);
      }
    } catch (error) {
      console.log("error >>>", error);
      return reject(false);
    }
  });
};
const updateHero = (heroHtml, lang) => {
  return new Promise(async (resolve, reject) => {
    try {
      const [result] = await con.execute(
        `update htmlcontent set content_${lang} = ? where section = 'hero'`,
        [heroHtml]
      );

      if (result.affectedRows > 0) {
        return resolve(true);
      }
    } catch (error) {
      console.log("error >>>", error);
      return reject(false);
    }
  });
};

const getHeroSection = (lang) => {
  return new Promise(async (resolve, reject) => {
    try {
      const [result] = await con.execute(
        `select * from htmlcontent where section = 'hero'`
      );
      if (result.length > 0) {
        return resolve(result[0][`content_${lang}`]);
      }
    } catch (error) {
      console.log("error >>>", error);
      return reject(false);
    }
  });
};

const updateMethod = (MethodHtml, lang) => {
  return new Promise(async (resolve, reject) => {
    try {
      const [result] = await con.execute(
        `update htmlcontent set content_${lang} = ? where section = 'method'`,
        [MethodHtml]
      );

      if (result.affectedRows > 0) {
        return resolve(true);
      }
    } catch (error) {
      console.log("error >>>", error);
      return reject(false);
    }
  });
};

const getMethodSection = (lang) => {
  return new Promise(async (resolve, reject) => {
    try {
      const [result] = await con.execute(
        `select * from htmlcontent where section = 'method'`
      );
      if (result.length > 0) {
        return resolve(result[0][`content_${lang}`]);
      }
    } catch (error) {
      console.log("error >>>", error);
      return reject(false);
    }
  });
};
const updateFeture = (FetureHtml, lang) => {
  return new Promise(async (resolve, reject) => {
    try {
      const [result] = await con.execute(
        `update htmlcontent set content_${lang} = ? where section = 'feture'`,
        [FetureHtml]
      );

      if (result.affectedRows > 0) {
        return resolve(true);
      }
    } catch (error) {
      console.log("error >>>", error);
      return reject(false);
    }
  });
};

const getFetureSection = (lang) => {
  return new Promise(async (resolve, reject) => {
    try {
      const [result] = await con.execute(
        `select * from htmlcontent where section = 'feture'`
      );
      if (result.length > 0) {
        return resolve(result[0][`content_${lang}`]);
      }
    } catch (error) {
      console.log("error >>>", error);
      return reject(false);
    }
  });
};
const updateFooter = (FooterHtml, lang) => {
  return new Promise(async (resolve, reject) => {
    try {
      const [result] = await con.execute(
        `update htmlcontent set content_${lang} = ? where section = 'footer'`,
        [FooterHtml]
      );

      if (result.affectedRows > 0) {
        return resolve(true);
      }
    } catch (error) {
      console.log("error >>>", error);
      return reject(false);
    }
  });
};

const getFooterSection = (lang) => {
  return new Promise(async (resolve, reject) => {
    try {
      const [result] = await con.execute(
        `select * from htmlcontent where section = 'footer'`
      );
      if (result.length > 0) {
        return resolve(result[0][`content_${lang}`]);
      }
    } catch (error) {
      console.log("error >>>", error);
      return reject(false);
    }
  });
};
const updateAchieve = (AchieveHtml, lang) => {
  return new Promise(async (resolve, reject) => {
    try {
      const [result] = await con.execute(
        `update htmlcontent set content_${lang} = ? where section = 'achieve'`,
        [AchieveHtml]
      );

      if (result.affectedRows > 0) {
        return resolve(true);
      }
    } catch (error) {
      console.log("error >>>", error);
      return reject(false);
    }
  });
};

const getAchieveSection = (lang) => {
  return new Promise(async (resolve, reject) => {
    try {
      const [result] = await con.execute(
        `select * from htmlcontent where section = 'achieve'`
      );
      if (result.length > 0) {
        return resolve(result[0][`content_${lang}`]);
      }
    } catch (error) {
      console.log("error >>>", error);
      return reject(false);
    }
  });
};

const updateExperience = (ExperienceHtml, lang) => {
  return new Promise(async (resolve, reject) => {
    try {
      const [result] = await con.execute(
        `update htmlcontent set content_${lang} = ? where section = 'experience'`,
        [ExperienceHtml]
      );

      if (result.affectedRows > 0) {
        return resolve(true);
      }
    } catch (error) {
      console.log("error >>>", error);
      return reject(false);
    }
  });
};

const getExperienceSection = (lang) => {
  return new Promise(async (resolve, reject) => {
    try {
      const [result] = await con.execute(
        `select * from htmlcontent where section = 'experience'`
      );
      if (result.length > 0) {
        return resolve(result[0][`content_${lang}`]);
      }
    } catch (error) {
      console.log("error >>>", error);
      return reject(false);
    }
  });
};
const updateBenifit = (benifitHtml, lang) => {
  return new Promise(async (resolve, reject) => {
    try {
      const [result] = await con.execute(
        `update htmlcontent set content_${lang} = ? where section = 'benifit'`,
        [benifitHtml]
      );

      if (result.affectedRows > 0) {
        return resolve(true);
      }
    } catch (error) {
      console.log("error >>>", error);
      return reject(false);
    }
  });
};

const getbenifitSection = (lang) => {
  return new Promise(async (resolve, reject) => {
    try {
      const [result] = await con.execute(
        `select * from htmlcontent where section = 'benifit'`
      );
      if (result.length > 0) {
        return resolve(result[0][`content_${lang}`]);
      }
    } catch (error) {
      console.log("error >>>", error);
      return reject(false);
    }
  });
};

const updateCertificert = (CertificertHtml, lang) => {
  return new Promise(async (resolve, reject) => {
    try {
      const [result] = await con.execute(
        `update htmlcontent set content_${lang} = ? where section = 'certificert'`,
        [CertificertHtml]
      );

      if (result.affectedRows > 0) {
        return resolve(true);
      }
    } catch (error) {
      console.log("error >>>", error);
      return reject(false);
    }
  });
};

const getCertificertSection = (lang) => {
  return new Promise(async (resolve, reject) => {
    try {
      const [result] = await con.execute(
        `select * from htmlcontent where section = 'certificert'`
      );
      if (result.length > 0) {
        return resolve(result[0][`content_${lang}`]);
      }
    } catch (error) {
      console.log("error >>>", error);
      return reject(false);
    }
  });
};

const updateCategories = (CategoriesHtml, lang) => {
  return new Promise(async (resolve, reject) => {
    try {
      const [result] = await con.execute(
        `update htmlcontent set content_${lang} = ? where section = 'categories'`,
        [CategoriesHtml]
      );

      if (result.affectedRows > 0) {
        return resolve(true);
      }
    } catch (error) {
      console.log("error >>>", error);
      return reject(false);
    }
  });
};

const getCategoriesSection = (lang) => {
  return new Promise(async (resolve, reject) => {
    try {
      const [result] = await con.execute(
        `select * from htmlcontent where section = 'categories'`
      );
      if (result.length > 0) {
        return resolve(result[0][`content_${lang}`]);
      }
    } catch (error) {
      console.log("error >>>", error);
      return reject(false);
    }
  });
};


const updateNews = (NewsHtml, lang) => {
  return new Promise(async (resolve, reject) => {
    try {
      const [result] = await con.execute(
        `update htmlcontent set content_${lang} = ? where section = 'news'`,
        [NewsHtml]
      );

      if (result.affectedRows > 0) {
        return resolve(true);
      }
    } catch (error) {
      console.log("error >>>", error);
      return reject(false);
    }
  });
};

const getNewsSection = (lang) => {
  return new Promise(async (resolve, reject) => {
    try {
      const [result] = await con.execute(
        `select * from htmlcontent where section = 'news'`
      );
      if (result.length > 0) {
        return resolve(result[0][`content_${lang}`]);
      }
    } catch (error) {
      console.log("error >>>", error);
      return reject(false);
    }
  });
};

const updateCertificertHeading = (CertificertHeadingHtml, lang) => {
  return new Promise(async (resolve, reject) => {
    try {
      const [result] = await con.execute(
        `update htmlcontent set content_${lang} = ? where section = 'certificert_heading'`,
        [CertificertHeadingHtml]
      );

      if (result.affectedRows > 0) {
        return resolve(true);
      }
    } catch (error) {
      console.log("error >>>", error);
      return reject(false);
    }
  });
};

const getCertificertHeadingSection = (lang) => {
  return new Promise(async (resolve, reject) => {
    try {
      const [result] = await con.execute(
        `select * from htmlcontent where section = 'certificert_heading'`
      );
      if (result.length > 0) {
        return resolve(result[0][`content_${lang}`]);
      }
    } catch (error) {
      console.log("error >>>", error);
      return reject(false);
    }
  });
};

const updateFooterIcon = (FooterIconHtml, lang) => {
  return new Promise(async (resolve, reject) => {
    try {
      const [result] = await con.execute(
        `update htmlcontent set content_${lang} = ? where section = 'footerIcon'`,
        [FooterIconHtml]
      );

      if (result.affectedRows > 0) {
        return resolve(true);
      }
    } catch (error) {
      console.log("error >>>", error);
      return reject(false);
    }
  });
};

const getFooterIconSection = (lang) => {
  return new Promise(async (resolve, reject) => {
    try {
      const [result] = await con.execute(
        `select * from htmlcontent where section = 'footerIcon'`
      );
      if (result.length > 0) {
        return resolve(result[0][`content_${lang}`]);
      }
    } catch (error) {
      console.log("error >>>", error);
      return reject(false);
    }
  });
};

module.exports = {
  updateHeader,
  updateHero,
  updateMethod,
  updateFeture,
  updateFooter,
  updateAchieve,
  getHeaderSection,
  getHeroSection,
  getMethodSection,
  getFetureSection,
  getFooterSection,
  getAchieveSection,
  updateExperience,
  getExperienceSection,
  updateBenifit,
  getbenifitSection,
  updateCertificert,
  getCertificertSection,
  updateCategories,
  getCategoriesSection,
  restoreDefault,
  updateNews,
  getNewsSection,
  updateCertificertHeading,
  getCertificertHeadingSection,
  updateFooterIcon,
  getFooterIconSection,
};
