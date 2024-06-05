const fetchProductDetails = async (productDetailsUrl) => {
  try {
    const response = await fetch(productDetailsUrl);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return await response.json();
  } catch (error) {
    console.error("There was a problem with your fetch operation:", error);
    throw error;
  }
};

export { fetchProductDetails };
