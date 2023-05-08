import { Router } from "express";
const router = Router(); // Accessing the Router() object from express. It allows you to handle various requests

// Importing the four CRUD functions
import {
  getComment, // Get a single Comment - returns an object
  getComments, // Get all Comments - returns an array of objects
  createComment,
  updateComment,
  deleteComment,
} from "../controllers/comments.js";

router.route("/").get(getComments).post(createComment);
router.route("/:id").put(updateComment).delete(deleteComment).get(getComment);

// or

/*
// This is equivalent to above
router.route("/").get(getComments)
router.route("/").post(createComment);
router.route("/:id").put(updateComment);
router.route("/:id").delete(deleteComment);
router.route("/:id").get(getComment);
*/

export default router; // You do not need to enclose router in curly braces