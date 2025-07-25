import { useState, useRef } from 'react'

import Input from './input'

export default function TagTable() {
    const [tagName, setTagName] = useState("")
    const inputToggle = useRef()

    const confirmBtnEvent = () => {
        if (inputToggle.current.visible()) {
            console.log('pass')
        }
    }

    return (<table className="tag-table" cellSpacing="0">
        <thead>
            <tr>
                <th>标题</th>
                <th>关联文章数</th>
                <th>操作</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td colSpan="2" className="input-area">
                    <Input ref={inputToggle} placeholder="输入标题" value={tagName} onChange={setTagName}></Input>
                </td>
                <td>
                    <div className="tag-table__btn-group">
                        <button className="tag-table__action-btn" onClick={confirmBtnEvent}>
                            提交
                        </button>
                    </div>
                </td>
            </tr>
            <tr>
                <td>
                    <p>肖申克的救赎</p>
                </td>
                <td>
                    200
                </td>
                <td>
                    <div className="tag-table__btn-group">
                        <button className="tag-table__action-btn">
                            编辑
                        </button>
                        <button className="tag-table__action-btn action-btn--del">
                            删除
                        </button>
                    </div>
                </td>
            </tr>
        </tbody>
    </table >)
}