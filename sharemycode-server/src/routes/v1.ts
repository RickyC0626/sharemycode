import express from "express";
import fileSystemRouter from "./file-system.router";

const router = express.Router();

router.use("/fs", fileSystemRouter);

export default router;
