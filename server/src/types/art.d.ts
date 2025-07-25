import { type Request } from "express";
import { type ITag } from "../schema/Tag.module";

declare global {
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

  /** 获取标签 */
  interface GetTagRequest extends Request {
    query: {
      name?: string;
    };
  }

  /** 更新标签 */
  interface UpdateTagRequest extends Request {
    body: {
      name: ITag["name"];
      id: ITag["_id"];
    };
  }
}
