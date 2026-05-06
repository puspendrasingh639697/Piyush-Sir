import Cart from '../models/Cart.js';


// 1. Cart mein saaman daalne ke liye
export const addToCart = async (req, res) => {
    const { userId, productId, quantity } = req.body;
    try {
        let cart = await Cart.findOne({ userId });

        if (cart) {
            // Check karo kya ye product pehle se cart mein hai?
            const itemIndex = cart.items.findIndex(p => p.productId == productId);
            
            if (itemIndex > -1) {
                // Hai toh quantity badha do
                cart.items[itemIndex].quantity += quantity;
            } else {
                // Nahi hai toh naya product push karo array mein
                cart.items.push({ productId, quantity });
            }
            cart = await cart.save();
        } else {
            // Agar user ki koi cart hi nahi hai, toh nayi banao
            cart = await Cart.create({ userId, items: [{ productId, quantity }] });
        }
        res.status(200).json({ message: "Cart Updated!", cart });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// 2. User ki puri cart dekhne ke liye
export const getCart = async (req, res) => {
    try {
        const cart = await Cart.findOne({ userId: req.params.userId }).populate('items.productId');

        if (!cart) return res.status(200).json({ items: [], totalAmount: 0 });

        // 🛡️ Filter Logic: Sirf wo items rakho jinka productId null NAHI hai
        const validItems = cart.items.filter(item => item.productId !== null);

        let totalAmount = 0;
        validItems.forEach(item => {
            totalAmount += item.productId.price * item.quantity;
        });

        res.status(200).json({
            cartId: cart._id,
            items: validItems, // Ab null wala item frontend pe nahi dikhega
            totalAmount: totalAmount, // Ab calculation sahi hogi (220 * 10 = 2200)
            totalItems: validItems.length
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// 3. Cart se saaman hatane ke liye (Remove from Cart)
export const removeFromCart = async (req, res) => {
    const { userId, productId } = req.params; // URL se data uthayenge
    try {
        let cart = await Cart.findOne({ userId });

        if (cart) {
            // Filter karke wo product nikal do
            cart.items = cart.items.filter(p => p.productId.toString() !== productId);
            cart = await cart.save();
            return res.status(200).json({ message: "Product hat gaya!", cart });
        }
        res.status(404).json({ message: "Cart nahi mili!" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// 4. Quantity kam ya zyada karne ke liye (Update Quantity)
export const updateCartQuantity = async (req, res) => {
    const { userId, productId, quantity } = req.body;
    try {
        let cart = await Cart.findOne({ userId });

        if (cart) {
            const itemIndex = cart.items.findIndex(p => p.productId == productId);
            
            if (itemIndex > -1) {
                // Nayi quantity set karo
                cart.items[itemIndex].quantity = quantity;
                cart = await cart.save();
                return res.status(200).json({ message: "Quantity update ho gayi!", cart });
            }
        }
        res.status(404).json({ message: "Product cart mein nahi hai!" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};