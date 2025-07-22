import { useRef, useEffect } from 'react'

import './style/bg.css'

const createImage = (canvasDom) => {
    const ctx = canvasDom.getContext("2d");
    // 设置画布尺寸
    canvasDom.width = 1300;
    canvasDom.height = 800;
    // 生成噪点
    const imageData = ctx.createImageData(canvasDom.width, canvasDom.height);
    for (let i = 0; i < imageData.data.length; i += 4) {
        const gray = Number(Math.random() * 255); // 随机灰度值
        imageData.data[i] = gray;       // R
        imageData.data[i + 1] = gray;   // G
        imageData.data[i + 2] = gray;   // B
        imageData.data[i + 3] = 25;     // A (透明度)
    }
    ctx.putImageData(imageData, 0, 0);
}

export default function Background(props) {
    console.log(props)
    const canvasDom = useRef(null)

    useEffect(() => {
        if (canvasDom.current) {
            createImage(canvasDom.current)
        }
    }, [canvasDom])


    useEffect(() => {
        const handleResize = () => {
            if (canvasDom.current) {
                createImage(canvasDom.current)
            }
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div className='bg-box'>
            <canvas ref={canvasDom}></canvas>
            <div className='bg-box__child'>
                {props.children}
            </div>
        </div>
    )
}
