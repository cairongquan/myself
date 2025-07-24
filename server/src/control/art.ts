import e, { type Request, Response, Router } from "express";

import Tag from "../schema/Tag.module";

const artController = Router();

/**创建标签 */
interface CreateTagRequest extends Request {
  body: {
    name: string;
  };
}

/** 删除标签 */
interface DelTagRequest extends Request {
  query: {
    id: string;
  };
}

interface GetTagRequest extends Request {
  query: {
    name: string;
  };
}

artController.post(
  "/createTag",
  async (req: CreateTagRequest, res: Response) => {
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
  }
);

artController.delete("/delTag", async (req: DelTagRequest, res: Response) => {
  const { id } = req.query;
  try {
    if (!id) {
      throw new Error("标签ID不能为空");
    }
    const result = await Tag.deleteOne({ _id: id });
    if (result.deletedCount === 0) {
      return res.status(404).send({
        message: "标签未找到",
        code: 0,
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(400).send({
      message: "删除标签失败",
      code: 0,
    });
  }
});

artController.get("/getTags", async (req: GetTagRequest, res: Response) => {
    
});

export default artController;
