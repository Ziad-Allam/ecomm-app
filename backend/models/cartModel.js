const mongoose = require("mongoose");

var cartSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },

        products: [
            {
                productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", },
                quantity: {
                    type: Number,
                    min: 1
                },
            },
        ],
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Cart", cartSchema);