(function(window) {
    function ajax(options) {
        let url = options.url || '', // 请求的链接
        method = (options.method || 'get').toUpperCase(), // 请求方法
        data = options.data || null, // 请求的数据
        contentType = options.contentType || '', // 请求头
        dataType = options.dataType || '', // 请求的类型
        before = options.before || function(){}, // 发送请求之前触发的函数
        fail = options.fail || function(){}, // 发生错误时执行的函数
        success = options.success || function(){}; // 请求成功时触发的函数

        // 编码数据
        function setData() {
            // 设置对象数据的编码
            function setObjData(data) {
                let arr = [];
                for(let key in data) {
                    let value = data[key].toString();
                    key = encodeURIComponent(key);
                    value = encodeURIComponent(value);
                    arr.push([key, '=', value].join(''));
                }
                return arr;
            }

            // 设置字符串数据的编码
            function setStrData(data) {
                let arr = data.split('&');
                let length = arr.length, key, value;
                for(let i = 0; i < length; i++) {
                    let arr2 = arr[i].split('=');
                    key = encodeURIComponent(arr2[0]);
                    value = encodeURIComponent(arr2[1]);
                    arr[i] = [key, '=', value].join('');
                }
                return arr;
            }

            if(data) {
                if(typeof data === 'string') {
                    data = setStrData(data);
                }else if(typeof data === 'object') {
                    data = setObjData(data);
                }

                data = data.join('&');

                if(method === 'GET' || dataType === 'jsonp') {
                    url += url.lastIndexOf('?') > -1 ? (url.lastIndexOf('=') > -1 ? '&' + data : data) : ('?' + data);
                }
            }
        }

        /**
         * 动态创建script标签, 使用jsonp进行跨域
         */
        function createJsonp() {
            window[callback] = (data) => {
                document.body.removeChild(script);
                success(data);
            }

            let script = document.createElement('script');
            script.type = 'text/javascript';
            script.src = url + (url.lastIndexOf('?') > -1 ? '&' : '?') + 'callback=' + callback;
            document.body.appendChild(script);
        }

        function createXHR() {
            let xhr = new XMLHttpRequest();
            xhr.open(method, url, true);

            // 设置请求头
            if(method === 'POST' && !contentType) {
                xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded;charset=UTF-8');
            }else if(contentType) {
                xhr.setRequestHeader('Content-Type', contentType);
            }

            xhr.onreadystatechange = ()=>{
                if(xhr.readyState === 4) {
                    if(xhr.status >=200 && xhr.status < 300) {
                        success(xhr.responseText);
                    } else {
                        fail(xhr.status);
                    }
                }
            };

            xhr.send(data);
        }

        setData();
        before();
        if(dataType === 'jsonp') {
            createJsonp();
        }else {
            createXHR();
        }
    }
    window.ajax = ajax;
})(window)

/**
 * 参考来源: https://github.com/littleBlack520/ajax
 * 
 * 使用示例:
 * let options = {
 *     type: 'get',
 *     url: 'https://v1.hitokoto.cn',
 *     before: ()=>{},
 *     success: (s)=>{console.log(s)},
 *     fail: (f)=>{console.log(f)},
 *     data: 'c=f&encode=text'
 * };
 * window.ajax(options); 
 */