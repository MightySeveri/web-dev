const express = require("express");
const router = express.Router();
const {
  getAllBlogs,
  getBlogById,
  createBlog,
  updateBlog,
  deleteBlog,
  // patchBlog
} = require("../controllers/blogControllers");
 
// GET /blogs
router.get("/", getAllBlogs);

// POST /Blogs
router.post("/", createBlog);

// GET /Blogs/:BlogId
router.get("/:blogId", getBlogById);

// PUT /blogs/:blogId
router.put("/:blogId", updateBlog);

// DELETE /blogs/:blogId
router.delete("/:blogId", deleteBlog);

// Update blog using PATCH 
// router.patch('/:blogId', patchBlog)

module.exports = router;

