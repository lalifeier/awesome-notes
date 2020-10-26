function jsonp({ url, params, callback }) {
  return new Promise((resolve, reject) => {
    //创建script标签
    let script = document.createElement('script')
    //将回调函数挂在 window 上
    window[callback] = function(data) {
      resolve(data)
      //代码执行后，删除插入的script标签
      document.body.removeChild(script)
    }
    //回调函数加在请求地址上
    params = { ...params, callback }
    let arrs = []
    for (let key in params) {
      arrs.push(`${key}=${params[key]}`)
    }
    script.src = `${url}?${arrs.join('&')}`
    document.body.appendChild(script)
  })
}

function show(data) {
  console.log(data)
}

jsonp({
  url: 'http://127.0.0.1:3000/api',
  params: {},
  callback: 'show',
}).then(data => {
  console.log(data)
})

$.ajax({
  url: 'http://127.0.0.1:3000/api',
  method: 'get',
  dataType: 'jsonp',
  success: res => {
    console.log(res)
  },
  error: err => {
    console.log(err)
  },
})
