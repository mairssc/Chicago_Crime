const papa = require('papaparse');
const fs = require('fs');

function getColumnDic(columnArray) {
    let columnDic = {};
    for (let index = 0; index < columnArray.length; index++) {
        columnDic[index] = columnArray[index];
    }
    console.log(columnDic);
    return columnDic;
}

function getDictByWard(arr, start, wardIndex) {
    let wardDic = {};
    j = wardIndex
    for (var i = start; i < arr.length; i++) {
        if (!(arr[i][j] in wardDic)) {
            if (arr[i][j] == NaN || arr[i][j] == ''){
                continue
            } else {
                wardDic[arr[i][j]] = [arr[i]];
            }
        } else {
            wardDic[arr[i][j]].push(arr[i]);
        }
    }
    // console.log(wardDic)
    return wardDic
}

function mergeSort(arr, dic) {
    if (arr.length == 1 || arr.length == 0) {
        return arr;
    } else {
        let left = mergeSort(arr.splice(0, arr.length / 2), dic);
        let right = mergeSort(arr, dic);
        let cur = [];
        while (left.length && right.length) {
            // Compares length of dic at given position with the other
            if (dic[left[0]].length > dic[right[0]].length) {
                cur.push(left.shift())
            } else {
                cur.push(right.shift())
            }
        }
        if (left.length) {
            cur = cur.concat(left)
        }
        else if (right.length) {
            cur = cur.concat(right)
        }
        return cur
    }
}

//////////////////////////////////////////////////



function dataWard() {
    return fs.readFileSync('../ward.csv', 'utf8')
}

function dataCrime() {
    return fs.readFileSync('../crime.csv', 'utf8')
}

function analysis(dataWard, dataCrime) {
    var wardFileDict = papa.parse(dataWard, {
        complete: function(results) {
            console.log("finished ward csv")
        }
    });
    var crimeFileDict = papa.parse(dataCrime, {
        complete: function(results) {
            console.log("finished crime csv")
        }
    });
    let wardArr = wardFileDict['data'];
    
    let crimeArr = crimeFileDict['data'];
    
    let crimeWardIndex = 10;
    
    let wardWardIndex = 1
    
    // Key for columnDic is column index of wardArr
    let wardColDic = getColumnDic(wardArr[0])
    
    // Key for wardDic is ward number, key is the row for that ward's demographics
    let wardDemoDic = getDictByWard(wardArr, 1, wardWardIndex)
    
    // Key for columnDic is column index of crimeArr. Value is column value
    let crimeColDic = getColumnDic(crimeArr[0]);
    
    
    // Key for wardDic is ward number, key is the row for that crime's information
    let wardCrimeDic = getDictByWard(crimeArr, 1, crimeWardIndex);
    let countCrimes = [];
    for (let i = 1; i < 51; i++) {
        countCrimes.push(i)
    }
    
    //contains ward indices as values sorted descending big => small
    let sortedWardCount = mergeSort(countCrimes, wardCrimeDic)
    return [wardColDic, wardDemoDic, crimeColDic, wardCrimeDic, sortedWardCount]
}

module.exports = {
    analysis, dataCrime, dataWard
}