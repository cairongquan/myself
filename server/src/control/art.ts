import { Response, Router } from "express";

import Tag, { type ITag } from "../schema/Tag.module";

const artController: Router = Router();

artController.post("/tag", async (req: CreateTagRequest, res: Response) => {
  const { name = "" } = req.body;
  if (!name || !name.trim().length) {
    return res.status(400).json({
      code: 0,
      message: "请填写标签名称",
    });
  }
  try {
    await Tag.create({ name, createDate: Date.now() });
    return res.status(200).json({
      code: 1,
      message: "标签创建成功",
    });
  } catch (error) {
    return res.status(500).json({
      code: 0,
      message: "标签创建失败",
      error: error instanceof Error ? error.message : String(error),
    });
  }
});

artController.delete("/tag", async (req: DelTagRequest, res: Response) => {
  const { id } = req.query;
  try {
    if (!id) {
      throw new Error("标签ID不能为空");
    }
    const result = await Tag.deleteOne({ _id: id });
    if (result.deletedCount === 0) {
      res.status(400).send({
        message: "标签未找到",
        code: 0,
      });
    } else {
      res.status(200).send({
        message: "标签删除成功",
        code: 1,
      });
    }
  } catch (err) {
    return res.status(400).send({
      message: "删除标签失败",
      code: 0,
    });
  }
});

artController.get("/tag", async (req: GetTagRequest, res: Response) => {
  try {
    const filter: Record<string, string> = {};
    if (req.query.name && req.query.name.trim()) {
      filter.name = req.query.name.trim();
    }
    const tagsDbList = await Tag.find(filter);
    res.status(200).json({
      code: 1,
      message: "获取标签成功",
      data: tagsDbList.map((tag: ITag) => ({
        name: tag.name,
        createDate: tag.createDate,
        id: tag._id?.toString?.() ?? "",
      })),
    });
  } catch (error) {
    return res.status(500).json({
      code: 0,
      message: "获取标签失败",
      error: error instanceof Error ? error.message : String(error),
    });
  }
});

artController.put("/tag", async (req: UpdateTagRequest, res: Response) => {
  const { id, name } = req.body;
  if (!id) return res.status(400).send({ code: 0, message: "标签ID不能为空" });
  if (!name || !name.trim().length) {
    return res.status(400).json({
      code: 0,
      message: "请填写标签名称",
    });
  }
  const updateDbResponse = await Tag.findOneAndUpdate({ _id: id }, { name });
  if (!updateDbResponse) {
    res.status(400).send({
      code: 0,
      message: "标签未找到",
    });
  } else {
    res.status(200).send({
      code: 1,
      message: "标签更新成功",
    });
  }
  try {
  } catch (error) {
    return res.status(500).send({
      code: 0,
      message: "更新标签失败",
      error: error instanceof Error ? error.message : String(error),
    });
  }
});

export default artController;
