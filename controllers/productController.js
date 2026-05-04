import Product from '../models/Product.js';

// 1. Naya Product dalne ke liye (Admin + Image Support)
export const addProduct = async (req, res) => {
    console.log("--- Add Product Request Aayi Hai ---");
    console.log("Body Data:", req.body);
    console.log("File Data:", req.file);

    try {
        const { name, description, price, category, stock } = req.body;

        if (!name || !price || !description || !category || !stock) {
            console.log("❌ Error: Kuch fields missing hain");
            return res.status(400).json({ message: "Bhai, saari details (name, price, desc, cat, stock) bharna zaroori hai!" });
        }

        if (!req.file) {
            console.log("❌ Error: Image upload nahi hui");
            return res.status(400).json({ message: "Bhai, bartan ki photo toh dalo!" });
        }

        const newProduct = new Product({
            name,
            description,
            price: Number(price), 
            category,
            stock: Number(stock),
            image: req.file.path
        });

        const savedProduct = await newProduct.save();
        
        console.log("✅ Success: Product database mein save ho gaya!");
        res.status(201).json({ message: "Product Added Successfully!", product: savedProduct });

    } catch (error) {
        console.log("🔥 Catch Error:", error.message);
        res.status(500).json({ message: "Server Error: " + error.message });
    }
};

// 2. Saare products dikhane ke liye
// controllers/productController.js

export const getProducts = async (req, res) => {
    try {
        // Postman ya Frontend se ye query params aayenge
        const { keyword, category, sort } = req.query;
        let query = {};

        // 1. Keyword Search (Dynamic Search)
        if (keyword) {
            query.name = { $regex: keyword, $options: "i" }; // Case-insensitive search
        }

        // 2. Category Filter
        if (category && category !== "All") {
            query.category = category;
        }

        let apiQuery = Product.find(query);

        // 3. Sorting Logic (Price aur Newest)
        if (sort === "price-low") {
            apiQuery = apiQuery.sort({ price: 1 });
        } else if (sort === "price-high") {
            apiQuery = apiQuery.sort({ price: -1 });
        } else if (sort === "newest") {
            apiQuery = apiQuery.sort({ createdAt: -1 });
        } else {
            apiQuery = apiQuery.sort({ createdAt: -1 }); // Default: Latest
        }

        const products = await apiQuery;
        res.status(200).json(products);

    } catch (error) {
        res.status(500).json({ message: "Search fail ho gayi", error: error.message });
    }
};
// 3. ✅ SINGLE PRODUCT FETCH (ID se) - YEH FUNCTION ADD KARO
export const getProductById = async (req, res) => {
    console.log("--- Fetching Single Product ID:", req.params.id, "---");
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            console.log("❌ Product not found");
            return res.status(404).json({ message: "Product not found" });
        }
        console.log("✅ Product found:", product.name);
        res.status(200).json(product);
    } catch (error) {
        console.log("🔥 Error fetching product:", error.message);
        res.status(500).json({ message: error.message });
    }
};

// 4. Search Products
export const searchProducts = async (req, res) => {
    const query = req.query.name;
    console.log("--- Searching for:", query, "---");
    try {
        const products = await Product.find({
            name: { $regex: query, $options: 'i' } 
        });
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// 5. Product update karne ke liye
export const updateProduct = async (req, res) => {
    console.log("--- Updating Product ID:", req.params.id, "---");
    try {
        let updateData = { ...req.body };

        if (req.file) {
            console.log("🔄 Nayi image detect hui, path update ho raha hai...");
            updateData.image = req.file.path;
        }

        const product = await Product.findByIdAndUpdate(
            req.params.id, 
            updateData, 
            { new: true }
        );

        console.log("✅ Product Update Ho Gaya!");
        res.status(200).json({ message: "Product Updated!", product });
    } catch (error) {
        console.log("🔥 Update Error:", error.message);
        res.status(500).json({ message: error.message });
    }
};

// 6. Product delete karne ke liye
export const deleteProduct = async (req, res) => {
    console.log("--- Deleting Product ID:", req.params.id, "---");
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        console.log("✅ Product Deleted Successfully!");
        res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
        console.log("🔥 Delete Error:", error.message);
        res.status(500).json({ message: error.message });
    }
};


// controllers/productController.js mein add karo

export const createProductReview = async (req, res) => {
    const { rating, comment } = req.body;

    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({ success: false, message: "Product nahi mila!" });
        }

        // 🛠️ FIX: Agar reviews array nahi hai, toh empty array use karo
        const reviews = product.reviews || [];

        const alreadyReviewed = reviews.find(
            (r) => r.user.toString() === req.user._id.toString()
        );

        if (alreadyReviewed) {
            return res.status(400).json({ success: false, message: "Pehle hi review de chuke ho!" });
        }

        const review = {
            name: req.user.name,
            rating: Number(rating),
            comment,
            user: req.user._id,
        };

        // 🛠️ FIX: Reviews array ko initialize karo agar undefined hai
        if (!product.reviews) {
            product.reviews = [];
        }

        product.reviews.push(review);
        product.numReviews = product.reviews.length;
        product.rating = product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length;

        await product.save();
        res.status(201).json({ success: true, message: "Review add ho gaya! ⭐" });

    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// ✅ Get all reviews for a product (ADD THIS FUNCTION)
export const getProductReviews = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        
        // Sort reviews by createdAt (newest first)
        const reviews = product.reviews.sort((a, b) => 
            new Date(b.createdAt) - new Date(a.createdAt)
        );
        
        // Calculate average rating
        let averageRating = 0;
        if (reviews.length > 0) {
            const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
            averageRating = sum / reviews.length;
        }
        
        res.json({
            success: true,
            reviews: reviews,
            totalReviews: reviews.length,
            averageRating: averageRating.toFixed(1)
        });
    } catch (error) {
        console.error("Get product reviews error:", error);
        res.status(500).json({ message: error.message });
    }
};