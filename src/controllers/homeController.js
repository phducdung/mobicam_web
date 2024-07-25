const newService = require("../services/newService.js");
const categoryService = require("../services/categoriesService.js");
const editLandingService = require("../services/editLandingService.js");
const {getPolicyDetails,getPolicyList,getQADetails,getQAList,getCoopList,getCoopDetails} = require("../services/footerService.js")

const cheerio = require("cheerio");
const adminController = require("./adminController.js");

const convertStringToHTML = (str) => {
  const $ = cheerio.load(str);
  return $.html();
};

module.exports = {
  async handleRenderHomePage  (req, res,type="home",roles)  {
    const { lang } = req.params.lang =="favicon.ico"  ? {lang:"vi"} : (req.params.lang ? req.params : {lang:"vi"}) ;


    try {
      const listQA = await getQAList();  
      const listPolicy = await getPolicyList();
      const listCoop = await getCoopList();  
      const news = await newService.getNewsLimit(3,lang);
      const categories = await categoryService.getAllCategoryAndProduct(lang);
      const headerSection = await editLandingService.getHeaderSection(lang);
      const heroSection = await editLandingService.getHeroSection(lang);
      const methodSection = await editLandingService.getMethodSection(lang);
      const featureSection = await editLandingService.getFetureSection(lang);
      const achieveSection= await editLandingService.getAchieveSection(lang);
      const experienceSection = await editLandingService.getExperienceSection(lang);
      const footerSection = await editLandingService.getFooterSection(lang);  
      const benifitSection= await editLandingService.getbenifitSection(lang);
      const certificertSection= await editLandingService.getCertificertSection(lang);
      const categoriesSection= await editLandingService.getCategoriesSection(lang);
      const newsSection = await editLandingService.getNewsSection(lang);
      const certificertHeading = await editLandingService.getCertificertHeadingSection(lang);
      const footerIcon = await editLandingService.getFooterIconSection(lang);
      const data= {
        roles,
        listPolicy: listPolicy,
        listQA : listQA,
        listCoop: listCoop,
        lang:lang? lang : "vi",  
        news,
        categories,
        headerSection: convertStringToHTML(headerSection),
        lang:lang ? lang : "vi",  
        news,
        categories,
        newsSection: convertStringToHTML(newsSection),
        certificertHeading: convertStringToHTML(certificertHeading),
        headerSection: convertStringToHTML(headerSection),
        heroSection: convertStringToHTML(heroSection),
        methodSection: convertStringToHTML(methodSection),
        fetureSection : convertStringToHTML(featureSection),
        achieveSection: convertStringToHTML(achieveSection),
        footerSection: convertStringToHTML(footerSection),
        experienceSection: convertStringToHTML(experienceSection),
        benifitSection: convertStringToHTML(benifitSection),
        certificertSection: convertStringToHTML(certificertSection),
        categoriesSection: convertStringToHTML(categoriesSection),
        footerIcon: convertStringToHTML(footerIcon),
      } 

      if(type=="home"){

        return res.render("./Home/home.ejs",data);
      }

      return res.render("./Admin/editLandingPage.ejs", data);
    } catch (error) {
      console.log("error >>>", error);
      return res.render("ErrorPage.ejs");
    }
  },

  handleGetAllNews: async (req, res) => {
    try {
       const { lang } = req.params;
       const page = parseInt(req.query.page) || 1;
       const pageSize = 6; 
      const newsData = await newService.getAllnewsPagination(lang,page, pageSize);
      const headerSection = await editLandingService.getHeaderSection(lang);
      const footerSection = await editLandingService.getFooterSection(lang);
      const listPolicy = await getPolicyList();  
      const listQA = await getQAList();  
      const listCoop = await getCoopList();  
      const footerIcon = await editLandingService.getFooterIconSection(lang);
      const data={
        listPolicy,
        listCoop,
        listQA,
        lang:lang ? lang : "vi",
        news: newsData.news, 
        pagination: newsData.pagination,
        headerSection: convertStringToHTML(headerSection),
        footerSection: convertStringToHTML(footerSection),
        footerIcon: convertStringToHTML(footerIcon),
        
      }
      return res.render("./New/allNews.ejs", data);
    } catch (error) {
      console.log("error >>>", error);
      return res.render("ErrorPage.ejs");
    }
  },

  handleGetNewById: async (req, res) => {
    const {lang,slug} = req.params;
    const headerSection = await editLandingService.getHeaderSection(lang);
    const footerSection = await editLandingService.getFooterSection(lang);
    const listPolicy = await getPolicyList();  
    const listQA = await getQAList();  
    const listCoop = await getCoopList();  
    const footerIcon = await editLandingService.getFooterIconSection(lang);
    try {
      const newDetail = await newService.getNewbyId(slug,lang);
      const data={
        listCoop,
        listPolicy,
        listQA,
        lang,
        newDetail,
        headerSection: convertStringToHTML(headerSection),
        footerSection: convertStringToHTML(footerSection),
        footerIcon: convertStringToHTML(footerIcon),
      }
      return res.render("./New/detailNew.ejs",  data);
    } catch (error) {

      return res.render("ErrorPage.ejs");
    }
  },

  handleRenderNewPage: (req, res) => {
    return res.render("./New/new.ejs");
  },

  handleRenderPolicy: async (req,res) =>{
    const {id} = req.params
    const { lang } = req.params?.lang ? req.params : {lang:"vi"};

    try {
      const headerSection = await editLandingService.getHeaderSection(lang);
      const footerSection = await editLandingService.getFooterSection(lang);
      const listPolicy = await getPolicyList(); 
      const listQA = await getQAList();
      const listCoop = await getCoopList();  
      const footerIcon = await editLandingService.getFooterIconSection(lang);
 
      const data= {
        id,
        lang:lang ? lang : "vi",
        headerSection: convertStringToHTML(headerSection),
        footerSection: convertStringToHTML(footerSection),
        listPolicy: listPolicy,
        listQA : listQA,
        listCoop: listCoop,
        footerIcon: convertStringToHTML(footerIcon),
      } 
      return res.render('./Footer/policy.ejs',data)
    } catch (error) {
      console.log("error >>>", error);
      return res.render("ErrorPage.ejs");
    }
  },
  handleRenderQA: async (req,res) =>{
    const {id} = req.params
    const { lang } = req.params?.lang ? req.params : {lang:"vi"};
    const footerIcon = await editLandingService.getFooterIconSection(lang);
    try {
      const headerSection = await editLandingService.getHeaderSection(lang);
      const footerSection = await editLandingService.getFooterSection(lang);
      const listQA = await getQAList();  
      const listPolicy = await getPolicyList();
      const listQADetails = await getQADetails(); 
      const listCoop = await getCoopList();

      const data= {
        id,
        listQA,
        lang:lang ? lang : "vi",
        headerSection: convertStringToHTML(headerSection),
        footerSection: convertStringToHTML(footerSection),
        listQA: listQA,
        listPolicy : listPolicy,
        listQADetails : listQADetails,
        listCoop : listCoop,
        footerIcon: convertStringToHTML(footerIcon),
        
      } 
      return res.render('./Footer/q&a.ejs',data)
    } catch (error) {
      console.log("error >>>", error);  
      return res.render("ErrorPage.ejs");
    }
  },
  handleRenderCooperate: async (req, res)=>{
    const {id} = req.params
    const { lang } = req.params?.lang ? req.params : {lang:"vi"};

    const {name,content}= await getCoopDetails(id,lang);
    const footerIcon = await editLandingService.getFooterIconSection(lang);
    try {
      const headerSection = await editLandingService.getHeaderSection(lang);
      const footerSection = await editLandingService.getFooterSection(lang);
      const listPolicy = await getPolicyList();
      const listQA = await getQAList();  
      const listCoop = await getCoopList();

      const data= {
        name,
        content: convertStringToHTML(content),
        listPolicy : listPolicy,
        listQA: listQA,
        listCoop : listCoop,
        id,
        lang:lang ? lang : "vi",
        headerSection: convertStringToHTML(headerSection),
        footerSection: convertStringToHTML(footerSection),
        footerIcon: convertStringToHTML(footerIcon),
      } 
      if(data.id == 2){
        return res.render('./Footer/register.ejs',data)
      }
      if(data.id == 3){
          }
      return res.render('./Footer/cooperate.ejs',data)
    } catch (error) {
      console.log("error >>>", error);  
      return res.render("ErrorPage.ejs");
    }
  }

};
