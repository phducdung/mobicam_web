const express = require("express");
const uploadFile = require("../middlewares/uploadFile.js");
const categoryService = require("../services/categoriesService.js");
const homeController = require("..//controllers/homeController.js");
const adminController = require("..//controllers/adminController.js");
const { veryfyUser } = require("../middlewares/authMiddleware.js");
const { uploadImage } = require("../middlewares/uploadImage.js");

const authService = require("..//services/authService.js");
const editLandingService = require("../services/editLandingService.js");
const router = express.Router();

const InitApiRoute = (app) => {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  router.get("/admin", adminController.handleRenderAdminLoginPage);

  router.get("/", (req, res) => {
    homeController.handleRenderHomePage(req, res, "home");
  });
  router.get("/:lang", (req, res) => {
    homeController.handleRenderHomePage(req, res, "home");
  });

  router.get("/tintuc/chitiet/:lang/:slug", homeController.handleGetNewById);
  router.get("/tintuc/:lang/", homeController.handleGetAllNews);

  router.get("/new", homeController.handleRenderNewPage);

  router.post(
    "/admin/uploadimage",
    uploadImage.single("image"),
    adminController.handleUploadImage
  );

  //add new
  router.post("/admin/add-new", adminController.handleAddNew);

  //delete new
  router.get("/admin/delete-new", adminController.handleDeleteNew);
  //add new
  router.put("/admin/update-new/:id", adminController.handleUpdateNews);

  // add product
  router.post("/admin/add-product", adminController.handleAddProduct);

  router.get("/admin/delete-product", adminController.handleDeleteProduct);

  router.put(
    "/admin/update-product/:id",
    adminController.handleUpdateProductById
  );

  //access dashboard

  router.get(
    "/admin/dashboard",
    veryfyUser,
    adminController.handleRenderDashboard
  );

  router.get(
    "/admin/dashboard/page/product",
    veryfyUser,
    adminController.handleRenderDashboardProduct
  );

  router.get(
    "/admin/dashboard/page/news",
    veryfyUser,
    adminController.handleRenderDashboardNews
  );

  router.get(
    "/admin/dashboard/page/policy",
    veryfyUser,
    adminController.handleRenderDashboardPolicy
  );
  router.get("/api/policy/:id", adminController.GetPolicyDetails);
  router.put("/api/update/:id", adminController.UpdatePolicy);
  router.post("/api/addPolicy", adminController.AddPolicy);
  router.delete("/api/deletePolicy/:id", adminController.DeletePolicy);

  router.get(
    "/admin/dashboard/page/q&a",
    veryfyUser,
    adminController.handleRenderDashboardQA
  );
  router.get("/admin//api/dashboard/qaCatList", adminController.handleGetCatQA);
  router.get("/api/q&a/:id", adminController.GetQADetails);

  router.get(
    "/admin/dashboard/page/cooperate",
    veryfyUser,
    adminController.handleRenderDashboardCoop
  );
  router.get("/api/coop/:id", adminController.GetCoopDetailsAdmin);
  router.put("/api/updateCoop/:id", adminController.UpdateCoop);
  router.get("/api/cooperation/:id", adminController.GetCoopDetails);
  router.post("/api/addCoop", adminController.AddCoop);
  router.delete("/api/deleteCoop/:id", adminController.DeleteCoop);

  //footer landing
  router.get("/policy/:id/:lang", homeController.handleRenderPolicy);
  router.get("/q&a/:id/:lang", homeController.handleRenderQA);
  router.get("/cooperate/:id/:lang", homeController.handleRenderCooperate);

  //check login

  router.post("/admin/checklogin", async (req, res) => {
    const { username, password } = req.body;
    try {
      const result = await authService.checkLogin(res, username, password);
      if (result) {
        return res.redirect("/admin/dashboard");
      }
      req.flash("message", "Invalid username or password");
      return res.redirect(`/admin`);
    } catch (error) {
      console.log("error >>>", error);
      return res.render("ErrorPage.ejs");
    }
  });

  router.get("/category/:id/:lang", async (req, res) => {
    const { id, lang } = req.params;

    try {
      const categories = await categoryService.getAllCategoryAndProduct(lang);
      const category = categories.find((item) => item.id == id);
      return res.status(200).json(category);
    } catch (error) {
      return res.status(500).json({ message: "Internal server error" });
    }
  });

  router.get("/admin/logout", (req, res) => {
    res.clearCookie("accesstoken");
    return res.redirect("/admin/dashboard");
  });

  router.get("/admin/editLandingPage/:lang", veryfyUser, (req, res) => {
    const roles = req?.roles;
    homeController.handleRenderHomePage(req, res, "editLandingPage", roles);
  });

  router.post(
    "/api/landingPage/uploadFile",
    uploadFile.single("file"),
    (req, res) => {
      const fileName = req.file.filename;
      const file_size = req.file.size / (1024 * 1000);
      if (fileName) {
        return res.status(200).json({ fileName: fileName });
      }

      return res.status(500).json({ message: "Internal Server Error" });
    }
  );
  router.post(
    "/admin/uploadFile",
    uploadFile.array("files", 10),
    (req, res) => {
      const files = req.files;

      const filePaths = files.map((file) => `/files/${file.filename}`);
      if (filePaths) {
        return res.status(200).json({ filePaths });
      }

      return res.status(500).json({ message: "Internal Server Error" });
    }
  );

  router.post("/api/landingPage/lang/:lang", async (req, res) => {
    try {
      const content = req.body;
      const { section } = req.query;
      const { lang } = req.params;

      if (content) {
        switch (section) {
          case "header":
            await editLandingService.updateHeader(content, lang);
            break;
          case "hero":
            await editLandingService.updateHero(content, lang);
            break;
          case "method":
            await editLandingService.updateMethod(content, lang);
            break;
          case "feture":
            await editLandingService.updateFeture(content, lang);
            break;
          case "achieve":
            await editLandingService.updateAchieve(content, lang);
            break;
          case "experience":
            await editLandingService.updateExperience(content, lang);
            break;
          case "benifit":
            await editLandingService.updateBenifit(content, lang);
            break;
          case "certificert":
            await editLandingService.updateCertificert(content, lang);
            break;
          case "categories":
            await editLandingService.updateCategories(content, lang);
            break;
          case "news":
            await editLandingService.updateNews(content, lang);
            break;
          case "certificert_heading":
            await editLandingService.updateCertificertHeading(content, lang);
            break;
          case "footer":
            await editLandingService.updateFooter(content, lang);
            break;
          case "footerIcon":
            await editLandingService.updateFooterIcon(content, lang);
            break;
          default:
            break;
        }
      }
      return res.status(200).json({ message: "success" });
    } catch (error) {
      return res.status(500).json({ message: "Internal server error" });
    }
  });

  router.post("/api/landingPage/restore", async (req, res) => {
    try {
      await editLandingService.restoreDefault();
      return res.status(200).json({ message: "success" });
    } catch (error) {
      return res.status(500).json({ message: "Internal server error" });
    }
  });
  
  router.get("/admin/api/dashboard/qaCatList",adminController.handleGetCatQA)
  router.get("/admin/api/qa/catqa/:id",adminController.GetQADetails)
  router.put("/admin/api/qa/:id",adminController.UpdateQADetails)
  router.delete("/admin/api/qa/:id",adminController.DeleteQA)
  router.post("/admin/api/qa",adminController.AddQA)

  app.use(router);
};

module.exports = InitApiRoute;
