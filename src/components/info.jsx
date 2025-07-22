import { useState, useEffect } from 'react'
import { ArrowRight } from 'lucide-react'

const baseText = `Hello World? 记录我的开发之路.如果你感兴趣欢迎留言.`


export default function MyInfo() {
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    let animationFrame;
    let lastTime = performance.now();
    const delay = 80; // 每个字符的延迟，单位为毫秒
    let indexRef = 0;

    function typeWriter(now) {
      if (indexRef <= baseText.length) {
        if (now - lastTime >= delay) {
          setDisplayedText(baseText.slice(0, indexRef));
          indexRef += 1;
          lastTime = now;
        }
        animationFrame = requestAnimationFrame(typeWriter);
      } else {
        cancelAnimationFrame(animationFrame)
      }
    }
    animationFrame = requestAnimationFrame(typeWriter);
    return () => cancelAnimationFrame(animationFrame);
  }, []);

  const intoInfoView = () => {

  }
  return (
    <div className="base-info">
      <p>{displayedText}<span className="base-info__cursor-text"></span></p>
      <button className="confirm-btn" onclick={intoInfoView}>
        Timeline 2020~Now
        <ArrowRight size={16} />
      </button>
    </div>
  )
}
