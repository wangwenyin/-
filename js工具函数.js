// 1. 时间格式化
const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

// 2. 节流函数（throttle）
// 用处：减少代码执行频率
function throttle(fn, interval = 500) {
    let run = true;

    return function() {
        if (!run) return;
        run = false;
        setTimeout(() => {
            fn.apply(this, arguments);
            run = true;
        }, interval)
    }
}

// window.addEventListener('scroll', throttle(() => {
//     console.log('i am scroll');
// }))

// 3. 防抖函数（debounce）
// 用处：判断某个动作结束，如滚动结束，input输入结束，window的resize结束等
function debounce(fn, interval = 500) {
    let timeout = null;
    return function() {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            fn.apply(this, arguments);
        }, interval)
    }
}

// window.addEventListener('scroll', debounce(() => {
//     console.log('scroll is over!');
// }))

// 4. 递归方法实现深拷贝
// 深拷贝的几种方法：
// 1. 热门函数库lodash的_.cloneDeap方法
// 2. jquery提供一个$.extend
// 3. JSON.parse(JSON.stringify())
// 4. 手写递归方法
//定义检测数据类型的功能函数
function checkedType(target) {
    return Object.prototype.toString.call(target).slice(8, -1);
}

function deepClone(target) {
    // 判断拷贝的数据类型
    //初始化变量result 成为最终克隆的数据
    let result, targetType = checkedType(target);
    if (targetType === Object) {
        result = {};
    } else if (targetType === Array) {
        result = [];
    } else {
        return target;
    }

    // 遍历目标数据
    for (let i in target) {
        // 获取遍历数据结构的每一项值
        let value = target[i];
        // 判断目标结构里的每一值是否存在对象/数组
        if (checkedType(value) === Object || checkedType(value) === Array) {
            // 递归遍历获取到value值
            result[i] = deepClone(value);
        } else {
            result[i] = value;
        }
    }
    return result;
}


module.exports = {
  formatTime: formatTime
}
