module.exports = {
    //数组操作
    isArr: {
        //数组中是否存在
        ifItemKey(arr, item) {
            return arr.indexOf(item) !== -1;
        },
        //数组或对象深拷贝
        nextArr(arr) {
            return JSON.parse(JSON.stringify(arr));
        },
        //获取数组索引
        getItemIndex(arr, item) {
            return arr.indexOf(item);
        },
        //移除数组中指定元素
        delItem(arr, item) {
            let index = arr.indexOf(item);
            let items = [...arr];
            items.splice(index, 1);
            return [...items];
        },
        //移除数组中其它元素
        delItemKey(arr, item) {
            let index = arr.indexOf(item);
            let items = [...arr];
            for (let i = 0; i < arr.length; i++) {
                if (index !== i) items.splice(i, 1);
            }
            return [...items];
        },
        //移除数组中左边的元素
        delItemLeft(arr, item) {
            let index = arr.indexOf(item);
            let items = [...arr];
            for (let i = 0; i < arr.length; i++) {
                if (index >= i) return;
                items.splice(i, 1);
            }
            return [...items];
        },
        //移除数组中右边的元素
        delItemRight(arr, item) {
            let index = arr.indexOf(item);
            let items = [...arr];
            for (let i = 0; i < arr.length; i++) {
                if (index > i) items.splice(i, 1);
            }
            return [...items];
        },
        //替换数组中两个元素的位置
        replaceItem(arr, item_a, item_b) {
            let index_a = arr.indexOf(item_a);
            let index_b = arr.indexOf(item_b);
            let items = [...arr];
            items.splice(index_a, 1);
            items.splice(index_b, 0, item_a);
            return [...items];
        },
        //数组中是否存在
        ifKey(arr, keyName, key) {
            for (let i = 0; i < arr.length; i++) {
                if (arr[i][keyName] === key) {
                    return true;
                }
            }
            return false;
        },
        //获取数组索引
        getIndex(arr, keyName, key) {
            for (let i = 0; i < arr.length; i++) {
                if (arr[i][keyName] === key) {
                    return i;
                }
            }
            return false;
        },
        //移除数组中指定元素
        del(arr, keyName, key) {
            let s = false, name = '', ArrData = [];
            for (let i = 0; i < arr.length; i++) {
                if (arr[i][keyName] !== key) {
                    if (!s) name = arr[i][keyName];
                    ArrData.push(arr[i]);
                } else {
                    s = true;
                }
            }
            return {key: name, arr: ArrData};
        },
        //移除数组中其它元素
        delKey(arr, keyName, key) {
            let ArrData = [];
            for (let i = 0; i < arr.length; i++) {
                if (arr[i][keyName] === key) {
                    ArrData.push(arr[i]);
                }
            }
            return ArrData;
        },
        //移除数组中左边的元素
        delLeft(arr, keyName, key) {
            let s = false, ArrData = [];
            for (let i = 0; i < arr.length; i++) {
                if (arr[i][keyName] === key) {
                    s = true;
                    ArrData.push(arr[i]);
                } else {
                    if (s) ArrData.push(arr[i]);
                }
            }
            return ArrData;
        },
        //移除数组中右边的元素
        delRight(arr, keyName, key) {
            let s = true, ArrData = [];
            for (let i = 0; i < arr.length; i++) {
                if (arr[i][keyName] === key) {
                    s = false;
                    ArrData.push(arr[i]);
                } else {
                    if (s) ArrData.push(arr[i]);
                }
            }
            return ArrData;
        },
        isForEach(arr, fn) {
            if (!arr.length || !fn) return;
            let i = -1, len = arr.length;
            while (++i < len) {
                let item = arr[i];
                fn(item, i, arr);
            }
        },
        //得到两个数组的交集, 两个数组的元素为数值或字符串
        intersection(arr1, arr2) {
            let len = Math.min(arr1.length, arr2.length)
            let i = -1, res = [];
            while (++i < len) {
                if (arr1.indexOf(arr2[i]) > -1) res.push(arr2[i])
            }
            return res
        },
        //得到两个数组的并集, 两个数组的元素为数值或字符串
        getUnion(arr1, arr2) {
            return Array.from(new Set([...arr1, ...arr2]));
        },
        //判断要查询的数组是否至少有一个元素包含在目标数组中
        hasOneOf(arr1, arr2) {
            return arr1.some(_ => arr2.indexOf(_) > -1);
        },
        //判断下级数组是否为空
        hasChild(arr, key = 'children') {
            return arr[key] && arr[key].length !== 0
        }
    }
}
