async function generateCaption() {
    const imageInput = document.getElementById('imageInput');
    const captionResult = document.getElementById('captionResult');

    // Check if an image is selected
    if (!imageInput.files || imageInput.files.length === 0) {
        alert('Please select an image.');
        return;
    }

    // Prepare the image data
    const imageFile = imageInput.files[0];
    const formData = new FormData();
    console.log('Form Data:', formData);


    formData.append('file', imageFile);

    // Make a request to the Hugging Face API
   
    try {
        // Make a request to the Hugging Face API
        const response = await fetch(
            "https://api-inference.huggingface.co/models/nlpconnect/vit-gpt2-image-captioning",
            {
                headers: { Authorization: "Bearer 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" },
                method: "POST",
                body: imageFile,
            }
        );
        console.log(response);
        // Check if the request was successful (status code 200)
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        // Parse the JSON response
        const result = await response.json();

        // Check if the response has the expected structure
        if (result && result.length > 0 && result[0].hasOwnProperty('generated_text')) {
            // Display the caption result
            const caption = result[0].generated_text;
            captionResult.textContent = `Caption: ${caption}`;
        } else {
            throw new Error('Invalid response format from the Hugging Face API.');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error generating caption. Please try again.');
    }
}
