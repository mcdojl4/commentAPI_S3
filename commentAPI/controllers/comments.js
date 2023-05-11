import { PrismaClient } from "@prisma/client";
import Joi from "joi";
const prisma = new PrismaClient();

const getComments = async (req, res) => {
  try {
    const comments = await prisma.comment.findMany({});

    if (comments.length === 0) {
      return res.status(200).json({ msg: "No comments found" });
    }

    return res.json({ data: comments });
  } catch (err) {
    return res.status(500).json({
      msg: err.message,
    });
  }
};

// Sample HTTP POST request for Postman

/*
{
  "firstName": "Test",
  "lastName": "Test",
  "content": "Test"
}
*/

const commentSchema = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  content: Joi.string().max(300).required(),
});

const createComment = async (req, res) => {
  try {
    const { error, value } = commentSchema.validate(req.body);

    if (error) {
      return res.status(400).json({
        msg: error.details[0].message,
      });
    }

    const { firstName, lastName, content } = value; // destructuring validated object

    await prisma.comment.create({
      data: { firstName, lastName, content },
    });

    const newComments = await prisma.comment.findMany({});

    return res.status(201).json({
      msg: "Comment successfully created",
      data: newComments,
    });
  } catch (err) {
    return res.status(500).json({
      msg: err.message,
    });
  }
};

  
// Sample HTTP PUT request for Postman

/*
{
  "name": "Test"
}
*/

const updateComment = async (req, res) => {
  try {
    const { id } = req.params;
    const { firstName, lastName, content } = req.body;
    
    const updateCommentSchema = Joi.object({
      firstName: Joi.string(),
      lastName: Joi.string(),
      content: Joi.string().max(300),
    });

    const { error } = updateCommentSchema.validate({ firstName, lastName, content });

    if (error) {
      return res.status(400).json({
        msg: error.details[0].message,
      });
    }

    let comment = await prisma.comment.findUnique({
      where: { id: Number(id) },
    });

    if (!comment) {
      return res
        .status(201)
        .json({ msg: `No comment with the id: ${id} found` });
    }

    comment = await prisma.comment.update({
      where: { id: Number(id) },
      data: { firstName, lastName, content },
    });

    return res.json({
      msg: `Comment with the id: ${id} successfully updated`,
      data: comment,
    });
  } catch (err) {
    return res.status(500).json({
      msg: err.message,
    });
  }
};

  const deleteComment = async (req, res) => {
    try {
      const { id } = req.params;
  
      const comment = await prisma.comment.findUnique({
        where: { id: Number(id) },
      });
  
      if (!comment) {
        return res
          .status(200)
          .json({ msg: `No comment with the id: ${id} found` });
      }
  
      await prisma.comment.delete({
        where: { id: Number(id) },
      });
  
      return res.json({
        msg: `Comment with the id: ${id} successfully deleted`,
      });
    } catch (err) {
      return res.status(500).json({
        msg: err.message,
      });
    }
  };

  const getComment = async (req, res) => {
    try {
      const { id } = req.params;
  
      const comment = await prisma.comment.findUnique({
        where: { id: Number(id) },
      });
  
      if (!comment) {
        return res
          .status(200)
          .json({ msg: `No comment with the id: ${id} found` });
      }
  
      return res.json({
        data: comment,
      });
    } catch (err) {
      return res.status(500).json({
        msg: err.message,
      });
    }
  };

  export {
    getComment, // Get a single comment - returns an object
    getComments, // Get all comments - returns an array of objects
    createComment,
    updateComment,
    deleteComment
  };