
import React from 'react';
import { formatCurrency } from '../utils/helpers';
import './OrderConfirmation.css'; // Import the CSS file

export default function OrderConfirmation({ order }) {
    if (!order) return null;

    return (
        <div className="order-confirmation" data-testid="order-confirmation">
            <h2>Order Confirmed</h2>
            <div className="confirmation-details">
                <div className="confirmation-item">
                    <span className="confirmation-label">Order ID:</span>
                    <span className="confirmation-value" data-testid="confirmation-id">{order.id}</span>
                </div>
                <div className="confirmation-item">
                    <span className="confirmation-label">Name:</span>
                    <span className="confirmation-value" data-testid="confirmation-name">{order.customerName}</span>
                </div>
                <div className="confirmation-item">
                    <span className="confirmation-label">Email:</span>
                    <span className="confirmation-value" data-testid="confirmation-email">{order.customerEmail}</span>
                </div>
                <div className="confirmation-item">
                    <span className="confirmation-label">Total:</span>
                    <span className="confirmation-value" data-testid="confirmation-total">{formatCurrency(order.totalAmount)}</span>
                </div>
            </div>
        </div>
    );
}
