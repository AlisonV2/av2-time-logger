function getCurrentMonth() {
    const date = new Date();
    const monthArray = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
    const month = date.getMonth();
    return monthArray[month]
}

export default getCurrentMonth;