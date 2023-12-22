function convertNumberToWord(number) {
  const units = ['', 'หนึ่ง', 'สอง', 'สาม', 'สี่', 'ห้า', 'หก', 'เจ็ด', 'แปด', 'เก้า'];
  const teens = ['', 'สิบ', 'สิบเอ็ด', 'สิบสอง', 'สิบสาม', 'สิบสี่', 'สิบห้า', 'สิบหก', 'สิบเจ็ด', 'สิบแปด', 'สิบเก้า'];
  const positions = ['', 'สิบ', 'ร้อย', 'พัน', 'หมื่น', 'แสน', 'ล้าน'];
  const BASE_URL = "http://localhost:3001"
  
  // แปลงตัวเลขเป็นคำ
  const convertToWord = (num) => {
    const numString = num.toString();
    let result = '';

    for (let i = 0; i < numString.length; i++) {
      const digit = parseInt(numString[i]);

      if (digit !== 0) {
        // ตำแหน่งของตัวเลข (หน่วย, สิบ, ร้อย, พัน, หมื่น, แสน, ล้าน)
        result += units[digit] + positions[numString.length - i - 1];
      }
    }

    return result;
  };

  // แปลงจำนวนทั้งหมดลงตัวอักษร
  let word = '';
  if (number === 0) {
    word = 'ศูนย์';
  } else {
    word = convertToWord(number);
  }

  return word;
}

// ตัวอย่างการใช้งาน
const result = convertNumberToWord(1234567);
console.log(result);  // หนึ่งล้านสองแสนสามหมื่นสี่พันห้าร้อยหกสิบเจ็ด