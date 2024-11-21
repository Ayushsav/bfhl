import base64Img from 'base64-img'; // To handle file base64 validation
import fs from 'fs';

// Helper function to check if a number is prime
const isPrime = (num) => {
  if (num < 2) return false;
  for (let i = 2; i <= Math.sqrt(num); i++) {
    if (num % i === 0) return false;
  }
  return true;
};

// Helper function to get the highest lowercase alphabet
const getHighestLowercaseAlphabet = (arr) => {
  const lowercase = arr.filter((char) => char >= 'a' && char <= 'z');
  if (lowercase.length === 0) return [];
  return [lowercase.sort().pop()];
};

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { data, file_b64 } = req.body;

    if (!data || !Array.isArray(data)) {
      return res.status(400).json({ is_success: false, message: 'Invalid input' });
    }

    // Separate numbers and alphabets
    const numbers = data.filter((item) => !isNaN(item));
    const alphabets = data.filter((item) => /^[a-zA-Z]$/.test(item));
    const highestLowercase = getHighestLowercaseAlphabet(data);
    const isPrimeFound = numbers.some((num) => isPrime(parseInt(num)));

    // Handle base64 file validation
    let fileValid = false;
    let fileMimeType = null;
    let fileSizeKb = 0;

    if (file_b64) {
      try {
        const filePath = base64Img.imgSync(file_b64, './uploads', 'uploadedFile');
        const stats = fs.statSync(filePath);
        fileValid = true;
        fileMimeType = 'image/png'; // Hardcoded MIME type for now (can improve logic)
        fileSizeKb = stats.size / 1024; // Size in KB
      } catch (err) {
        fileValid = false;
      }
    }

    // Respond with the appropriate data
    return res.json({
      is_success: true,
      user_id: 'Ayush_Savner',
      email: 'ayush.savner@cdgi.edu.in',
      roll_number: '0832CS211043',
      numbers: numbers,
      alphabets: alphabets,
      highest_lowercase_alphabet: highestLowercase,
      is_prime_found: isPrimeFound,
      file_valid: fileValid,
      file_mime_type: fileMimeType,
      file_size_kb: fileSizeKb,
    });
  } else if (req.method === 'GET') {
    return res.json({
      operation_code: 1,
    });
  } else {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }
}
