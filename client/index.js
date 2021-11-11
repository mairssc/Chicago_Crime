// barChart = document.getElementById('charts');

// FIX INDEXING FOR DICTIONARIES

getData()
async function getData() {
    const res = await fetch('/get/sortedWardCount')
    const items = await res.json()
    console.log(items)
    wardColDic = items[0]
    wardDemoDic = items[1]
    crimeColDic = items[2]
    wardCrimeDic = items[3]
    sortedWardCount = items[4]
    countVals = sortedWardCount
    for (var i = 0; i < sortedWardCount.length; i++) {
        countVals[i] = wardCrimeDic[countVals[i]].length
    }
    console.log(wardDemoDic[3])
}