import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./VendorDashboard.css";
import {
  getProductsByVendor,
  createProduct,
  updateProduct,
  deleteProductById,
  getOrdersByVendor,
  updateOrderStatus,
} from "../utils/api";

export default function VendorDashboard({ vendor }) {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [form, setForm] = useState({
    id: null,
    name: "",
    description: "",
    price: "",
    stockQuantity: "",
    category: "",
    imageUrl: "",
  });
  const [editing, setEditing] = useState(false);

  // Fetch products
  const fetchProducts = async () => {
    if (!vendor) return;
    const data = await getProductsByVendor(vendor.id);
    setProducts(data);
  };

  // Fetch orders
  const fetchOrders = async () => {
    if (!vendor) return;
    const data = await getOrdersByVendor(vendor.id);
    setOrders(data);
  };
// eslint-disable-next-line react-hooks/exhaustive-deps 
  useEffect(() => {
    fetchProducts();
    fetchOrders();
  }, [vendor]);

  // Form handling
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editing) {
        await updateProduct(form.id, { ...form, vendor });
      } else {
        await createProduct({ ...form, vendor });
      }
      setForm({
        id: null,
        name: "",
        description: "",
        price: "",
        stockQuantity: "",
        category: "",
        imageUrl: "",
      });
      setEditing(false);
      fetchProducts();
    } catch (err) {
      console.error(err);
      alert("Error saving product");
    }
  };

  const handleEdit = (product) => {
    setForm(product);
    setEditing(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure?")) {
      await deleteProductById(id);
      fetchProducts();
    }
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await updateOrderStatus(orderId, newStatus);
      fetchOrders();
    } catch (err) {
      console.error(err);
      alert("Error updating order status");
    }
  };

  // Logout handler
  const handleLogout = () => {
    localStorage.removeItem("token"); // clear token if stored
    navigate("/");
  };

  return (
    <div className="vendor-dashboard">
      <div className="dashboard-header">
        <h2>Welcome, {vendor?.name}</h2>
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>

      {/* Products Section */}
      <section className="products-section">
        <h3>Manage Products</h3>
        <form className="product-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="price"
            placeholder="Price"
            value={form.price}
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="stockQuantity"
            placeholder="Stock Quantity"
            value={form.stockQuantity}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="category"
            placeholder="Category"
            value={form.category}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="imageUrl"
            placeholder="Image URL"
            value={form.imageUrl}
            onChange={handleChange}
            required
          />
          <button type="submit" className="primary-btn">
            {editing ? "Update Product" : "Add Product"}
          </button>
          {editing && (
            <button
              type="button"
              className="cancel-btn"
              onClick={() => {
                setForm({
                  id: null,
                  name: "",
                  description: "",
                  price: "",
                  stockQuantity: "",
                  category: "",
                  imageUrl: "",
                });
                setEditing(false);
              }}
            >
              Cancel
            </button>
          )}
        </form>

        {/* Products Table */}
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Image</th>
              <th>Name</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Category</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.length === 0 ? (
              <tr>
                <td colSpan="7">No products found</td>
              </tr>
            ) : (
              products.map((p) => (
                <tr key={p.id}>
                  <td>{p.id}</td>
                  <td>
                    {p.imageUrl ? (
                      <img
                        src={p.imageUrl}
                        alt={p.name}
                        className="product-thumbnail"
                      />
                    ) : (
                      <span>No Image</span>
                    )}
                  </td>
                  <td>{p.name}</td>
                  <td>₹{p.price}</td>
                  <td>{p.stockQuantity}</td>
                  <td>{p.category}</td>
                  <td>
                    <button className="edit-btn" onClick={() => handleEdit(p)}>
                      Edit
                    </button>
                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(p.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </section>

      {/* Orders Section */}
      <section className="orders-section">
        <h3>Orders for Your Products</h3>
        <table>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer Email</th>
              <th>Product</th>
              <th>Image</th>
              <th>Quantity</th>
              <th>Subtotal</th>
              <th>Status</th>
              <th>Update Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.length === 0 ? (
              <tr>
                <td colSpan="8">No orders found</td>
              </tr>
            ) : (
              orders.map((order) =>
                order.orderItems?.map((item) => (
                  <tr key={item.id}>
                    <td>{order.id}</td>
                    <td>{order.customerEmail}</td>
                    <td>{item.product.name}</td>
                    <td>
                      {item.product.imageUrl ? (
                        <img
                          src={item.product.imageUrl}
                          alt={item.product.name}
                          className="product-thumbnail"
                        />
                      ) : (
                        <span>No Image</span>
                      )}
                    </td>
                    <td>{item.quantity}</td>
                    <td>₹{item.subtotal}</td>
                    <td>{order.status}</td>
                    <td>
                      <select
                        value={order.status}
                        onChange={(e) =>
                          handleStatusChange(order.id, e.target.value)
                        }
                      >
                        <option value="PENDING">PENDING</option>
                        <option value="PROCESSING">PROCESSING</option>
                        <option value="SHIPPED">SHIPPED</option>
                        <option value="DELIVERED">DELIVERED</option>
                        <option value="CANCELLED">CANCELLED</option>
                      </select>
                    </td>
                  </tr>
                ))
              )
            )}
          </tbody>
        </table>
      </section>
    </div>
  );
}