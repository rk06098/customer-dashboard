const express = require("express")
const cors = require("cors")
const app = express()
const PORT = process.env.PORT || 5000;

app.use(cors())
app.use(express.json())

let customers = []

//add customer
app.post("/customers", (req, res) => {
  const { name, email, phone } = req.body
  if (!name?.trim() || !email?.trim() || !phone?.trim()) {
    return res.status(400).json({ message: "All fields are required" });
  }
  const newCustomer = { id: Date.now(), name, email, phone }
  customers.push(newCustomer)
  res.json(newCustomer)
})
//get all customers
app.get("/customers", (req, res) => {
  res.json(customers)
})
//delete customers
app.delete("/customers/:id", (req, res) => {
  const id = Number(req.params.id)
  customers = customers.filter(c => c.id !== id)
  res.json({ message: "customer deleted" })
})
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});