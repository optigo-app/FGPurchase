export function capitalizeWords(input) {
    if (!input || typeof input !== 'string') return ''; // Handle invalid input
  
    return input
      .split(' ') // Split the string into words
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) // Capitalize each word
      .join(' '); // Join the words back into a sentence
  }
  
  // Example usage:
  console.log(capitalizeWords("hello world")); // Output: "Hello World"
  console.log(capitalizeWords("javaSCRIPT is AWESOME")); // Output: "Javascript Is Awesome"
  