window.addEventListener('mousemove', handleMouseMove)
const hiddenContent = document.querySelector('.hiddenContent')
const contentHeight = hiddenContent.scrollHeight

function handleMouseMove(event) {
  // 标记是否已经进入区间的变量
  let isEntered = false //原本是用let
  // 获取鼠标的Y坐标
  const mouseY = event.clientY
  // 定义您感兴趣的Y坐标区间
  const startY = 100 // 区间开始的Y坐标
  const endY = 200 // 区间结束的Y坐标

  // 如果鼠标的Y坐标在感兴趣的区间内，且之前未触发过事件，则执行相应的操作
  if (mouseY >= startY && mouseY <= endY && !isEntered) {
    console.log('觸發展開')
    hiddenContent.style.height = `${contentHeight}px`
    // 在这里执行您想要的操作
    isEntered = true // 标记为已进入区间，避免重复触发
  }
}
