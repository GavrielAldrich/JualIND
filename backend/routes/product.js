const sellerProduct = (req, res) => {
  const { game, seller, id } = req.params;
  try {
    res.status(200).json({ message: "Success" });
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
};

export default sellerProduct