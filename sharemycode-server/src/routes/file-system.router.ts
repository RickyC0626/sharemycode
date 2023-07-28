import express, { Request, Response } from "express";

const router = express.Router();

router.post("/files", (req: Request, res: Response) => {
  // Create new file with default values

  // Persist file in directory tree

  // Send the created file back to client
  res.status(201).json({});
});

export default router;
