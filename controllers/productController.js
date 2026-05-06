// import Product from '../models/Product.js';

// // 1. Naya Product dalne ke liye (Admin + Image Support)
// // export const addProduct = async (req, res) => {
// //     console.log("--- Add Product Request Aayi Hai ---");
// //     console.log("Body Data:", req.body);
// //     console.log("File Data:", req.file);

// //     try {
// //         const { name, description, price, category, stock } = req.body;

// //         if (!name || !price || !description || !category || !stock) {
// //             console.log("❌ Error: Kuch fields missing hain");
// //             return res.status(400).json({ message: "Bhai, saari details (name, price, desc, cat, stock) bharna zaroori hai!" });
// //         }

// //         if (!req.file) {
// //             console.log("❌ Error: Image upload nahi hui");
// //             return res.status(400).json({ message: "Bhai, bartan ki photo toh dalo!" });
// //         }

// //         const newProduct = new Product({
// //             name,
// //             description,
// //             price: Number(price), 
// //             category,
// //             stock: Number(stock),
// //             image: `/uploads/${req.file.filename}`
// //         });

// //         const savedProduct = await newProduct.save();
        
// //         console.log("✅ Success: Product database mein save ho gaya!");
// //         res.status(201).json({ message: "Product Added Successfully!", product: savedProduct });

// //     } catch (error) {
// //         console.log("🔥 Catch Error:", error.message);
// //         res.status(500).json({ message: "Server Error: " + error.message });
// //     }
// // };



// export const addProduct = async (req, res) => {
//     console.log("--- Add Product Request Aayi Hai ---");
//     console.log("Body Data:", req.body);
//     console.log("File Data:", req.file);

//     try {
//         const { name, description, price, category, stock } = req.body;

//         if (!name || !price || !description || !category || !stock) {
//             return res.status(400).json({ message: "All fields are required!" });
//         }

//         if (!req.file) {
//             return res.status(400).json({ message: "Product image is required!" });
//         }

//         // ✅ Cloudinary se full URL le rahe hain
//         let imageUrl = '';
//         if (req.file.path) {
//             imageUrl = req.file.path;  // Cloudinary full URL
//         } else if (req.file.secure_url) {
//             imageUrl = req.file.secure_url;  // Alternative field
//         } else {
//             imageUrl = `/uploads/${req.file.filename}`;  // Fallback
//         }

//         console.log("✅ Image URL:", imageUrl);

//         const newProduct = new Product({
//             name,
//             description,
//             price: Number(price),
//             category,
//             stock: Number(stock),
//             image: imageUrl
//         });

//         const savedProduct = await newProduct.save();
        
//         console.log("✅ Product saved!");
//         res.status(201).json({ 
//             success: true,
//             message: "Product Added Successfully!", 
//             product: savedProduct 
//         });

//     } catch (error) {
//         console.log("Error:", error.message);
//         res.status(500).json({ message: "Server Error: " + error.message });
//     }
// };

// // 2. Saare products dikhane ke liye
// // controllers/productController.js
// // backend/controllers/productController.js - Safe queries

// export const getProducts = async (req, res) => {
//     try {
//         const { keyword, category, sort, minPrice, maxPrice } = req.query;
//         let query = {};
        
//         // ✅ Safe keyword search (using $regex safely)
//         if (keyword && keyword.trim()) {
//             // Escape regex special characters
//             const safeKeyword = keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
//             query.name = { $regex: safeKeyword, $options: 'i' };
//         }
        
//         // ✅ Safe category filter (whitelist check)
//         const validCategories = ['Copper Utensils', 'Steel Bottles', 'Thermoware & Lunchboxes', 'Cookware Sets', 'Home Appliances', 'Cookers'];
//         if (category && validCategories.includes(category)) {
//             query.category = category;
//         }
        
//         // ✅ Safe price range
//         if (minPrice && !isNaN(minPrice) && Number(minPrice) >= 0) {
//             query.price = { ...query.price, $gte: Number(minPrice) };
//         }
//         if (maxPrice && !isNaN(maxPrice) && Number(maxPrice) > 0) {
//             query.price = { ...query.price, $lte: Number(maxPrice) };
//         }
        
//         // ✅ Safe sort (whitelist)
//         let sortOption = { createdAt: -1 }; // default
//         const validSorts = {
//             'price-low': { price: 1 },
//             'price-high': { price: -1 },
//             'newest': { createdAt: -1 },
//             'oldest': { createdAt: 1 },
//             'name-asc': { name: 1 },
//             'name-desc': { name: -1 }
//         };
        
//         if (sort && validSorts[sort]) {
//             sortOption = validSorts[sort];
//         }
        
//         const products = await Product.find(query).sort(sortOption);
        
//         // ✅ Sanitize output - remove any potential injected fields
//         const sanitizedProducts = products.map(p => ({
//             _id: p._id,
//             name: p.name,
//             description: p.description,
//             price: p.price,
//             category: p.category,
//             stock: p.stock,
//             image: p.image,
//             createdAt: p.createdAt
//         }));
        
//         res.status(200).json(sanitizedProducts);
        
//     } catch (error) {
//         console.error("Search error:", error);
//         res.status(500).json({ message: "Search failed" });
//     }
// };
// // 3. ✅ SINGLE PRODUCT FETCH (ID se) - YEH FUNCTION ADD KARO
// export const getProductById = async (req, res) => {
//     console.log("--- Fetching Single Product ID:", req.params.id, "---");
//     try {
//         const product = await Product.findById(req.params.id);
//         if (!product) {
//             console.log("❌ Product not found");
//             return res.status(404).json({ message: "Product not found" });
//         }
//         console.log("✅ Product found:", product.name);
//         res.status(200).json(product);
//     } catch (error) {
//         console.log("🔥 Error fetching product:", error.message);
//         res.status(500).json({ message: error.message });
//     }
// };

// // 4. Search Products
// export const searchProducts = async (req, res) => {
//     const query = req.query.name;
//     console.log("--- Searching for:", query, "---");
//     try {
//         const products = await Product.find({
//             name: { $regex: query, $options: 'i' } 
//         });
//         res.status(200).json(products);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };

// // 5. Product update karne ke liye
// // export const updateProduct = async (req, res) => {
// //     console.log("--- Updating Product ID:", req.params.id, "---");
// //     try {
// //         let updateData = { ...req.body };

// //         if (req.file) {
// //             console.log("🔄 Nayi image detect hui, path update ho raha hai...");
// //             updateData.image = req.file.path;
// //         }

// //         const product = await Product.findByIdAndUpdate(
// //             req.params.id, 
// //             updateData, 
// //             { new: true }
// //         );

// //         console.log("✅ Product Update Ho Gaya!");
// //         res.status(200).json({ message: "Product Updated!", product });
// //     } catch (error) {
// //         console.log("🔥 Update Error:", error.message);
// //         res.status(500).json({ message: error.message });
// //     }
// // };
// export const updateProduct = async (req, res) => {
//     console.log("--- Updating Product ID:", req.params.id, "---");
//     try {
//         let updateData = { ...req.body };

//         if (req.file) {
//             console.log("🔄 Nayi image detect hui, path update ho raha hai...");
//             updateData.image = `/uploads/${req.file.filename}`;  // ✅ YEH LINE CHANGE KI
//         }

//         const product = await Product.findByIdAndUpdate(
//             req.params.id, 
//             updateData, 
//             { new: true }
//         );

//         console.log("✅ Product Update Ho Gaya!");
//         res.status(200).json({ message: "Product Updated!", product });
//     } catch (error) {
//         console.log("🔥 Update Error:", error.message);
//         res.status(500).json({ message: error.message });
//     }
// };
// // 6. Product delete karne ke liye
// export const deleteProduct = async (req, res) => {
//     console.log("--- Deleting Product ID:", req.params.id, "---");
//     try {
//         const product = await Product.findByIdAndDelete(req.params.id);
//         if (!product) {
//             return res.status(404).json({ message: "Product not found" });
//         }
//         console.log("✅ Product Deleted Successfully!");
//         res.status(200).json({ message: "Product deleted successfully" });
//     } catch (error) {
//         console.log("🔥 Delete Error:", error.message);
//         res.status(500).json({ message: error.message });
//     }
// };


// // controllers/productController.js mein add karo

// export const createProductReview = async (req, res) => {
//     const { rating, comment } = req.body;

//     try {
//         const product = await Product.findById(req.params.id);

//         if (!product) {
//             return res.status(404).json({ success: false, message: "Product nahi mila!" });
//         }

//         // 🛠️ FIX: Agar reviews array nahi hai, toh empty array use karo
//         const reviews = product.reviews || [];

//         const alreadyReviewed = reviews.find(
//             (r) => r.user.toString() === req.user._id.toString()
//         );

//         if (alreadyReviewed) {
//             return res.status(400).json({ success: false, message: "Pehle hi review de chuke ho!" });
//         }

//         const review = {
//             name: req.user.name,
//             rating: Number(rating),
//             comment,
//             user: req.user._id,
//         };

//         // 🛠️ FIX: Reviews array ko initialize karo agar undefined hai
//         if (!product.reviews) {
//             product.reviews = [];
//         }

//         product.reviews.push(review);
//         product.numReviews = product.reviews.length;
//         product.rating = product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length;

//         await product.save();
//         res.status(201).json({ success: true, message: "Review add ho gaya! ⭐" });

//     } catch (error) {
//         res.status(500).json({ success: false, message: error.message });
//     }
// };

// // ✅ Get all reviews for a product (ADD THIS FUNCTION)
// export const getProductReviews = async (req, res) => {
//     try {
//         const product = await Product.findById(req.params.id);
        
//         if (!product) {
//             return res.status(404).json({ message: "Product not found" });
//         }
        
//         // Sort reviews by createdAt (newest first)
//         const reviews = product.reviews.sort((a, b) => 
//             new Date(b.createdAt) - new Date(a.createdAt)
//         );
        
//         // Calculate average rating
//         let averageRating = 0;
//         if (reviews.length > 0) {
//             const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
//             averageRating = sum / reviews.length;
//         }
        
//         res.json({
//             success: true,
//             reviews: reviews,
//             totalReviews: reviews.length,
//             averageRating: averageRating.toFixed(1)
//         });
//     } catch (error) {
//         console.error("Get product reviews error:", error);
//         res.status(500).json({ message: error.message });
//     }
// };

// backend/controllers/productController.js
import Product from '../models/Product.js';

// =======================
//   ADD PRODUCT
// =======================
export const addProduct = async (req, res) => {
    console.log("--- Add Product Request Aayi Hai ---");
    console.log("Body Data:", req.body);
    console.log("File Data:", req.file);

    try {
        const { name, description, price, category, stock } = req.body;

        if (!name || !price || !description || !category || !stock) {
            return res.status(400).json({ 
                success: false, 
                message: "All fields are required!" 
            });
        }

        if (!req.file) {
            return res.status(400).json({ 
                success: false, 
                message: "Product image is required!" 
            });
        }

        // ✅ Get image URL (Cloudinary or local)
        let imageUrl = '';
        if (req.file.path) {
            imageUrl = req.file.path;
        } else if (req.file.secure_url) {
            imageUrl = req.file.secure_url;
        } else {
            imageUrl = `/uploads/${req.file.filename}`;
        }

        console.log("✅ Image URL:", imageUrl);

        const newProduct = new Product({
            name: name.trim(),
            description: description.trim(),
            price: Number(price),
            category,
            stock: Number(stock),
            image: imageUrl,
            reviews: [],
            numReviews: 0,
            rating: 0
        });

        const savedProduct = await newProduct.save();
        
        console.log("✅ Product saved!");
        res.status(201).json({ 
            success: true,
            message: "Product Added Successfully!", 
            product: savedProduct 
        });

    } catch (error) {
        console.log("Error:", error.message);
        res.status(500).json({ 
            success: false, 
            message: "Server Error: " + error.message 
        });
    }
};

// =======================
//   GET ALL PRODUCTS (with filtering & sorting)
// =======================
export const getProducts = async (req, res) => {
    try {
        const { keyword, category, sort, minPrice, maxPrice, minRating, inStock } = req.query;
        let query = {};
        
        // ✅ Search by keyword
        if (keyword && keyword.trim()) {
            const safeKeyword = keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
            query.$or = [
                { name: { $regex: safeKeyword, $options: 'i' } },
                { description: { $regex: safeKeyword, $options: 'i' } },
                { category: { $regex: safeKeyword, $options: 'i' } }
            ];
        }
        
        // ✅ Category filter
        const validCategories = ['Copper Utensils', 'Steel Bottles', 'Thermoware & Lunchboxes', 'Cookware Sets', 'Home Appliances', 'Cookers'];
        if (category && validCategories.includes(category)) {
            query.category = category;
        }
        
        // ✅ Price range
        if (minPrice && !isNaN(minPrice) && Number(minPrice) >= 0) {
            query.price = { ...query.price, $gte: Number(minPrice) };
        }
        if (maxPrice && !isNaN(maxPrice) && Number(maxPrice) > 0) {
            query.price = { ...query.price, $lte: Number(maxPrice) };
        }
        
        // ✅ Rating filter
        if (minRating && !isNaN(minRating) && Number(minRating) > 0) {
            query.rating = { $gte: Number(minRating) };
        }
        
        // ✅ Stock filter
        if (inStock === 'true') {
            query.stock = { $gt: 0 };
        }
        
        // ✅ Sorting
        let sortOption = { createdAt: -1 };
        const validSorts = {
            'price-low': { price: 1 },
            'price-high': { price: -1 },
            'newest': { createdAt: -1 },
            'oldest': { createdAt: 1 },
            'name-asc': { name: 1 },
            'name-desc': { name: -1 },
            'rating-desc': { rating: -1, numReviews: -1 },
            'popular': { purchaseCount: -1, viewCount: -1 }
        };
        
        if (sort && validSorts[sort]) {
            sortOption = validSorts[sort];
        }
        
        const products = await Product.find(query).sort(sortOption);
        
        // ✅ Sanitize output
        const sanitizedProducts = products.map(p => ({
            _id: p._id,
            name: p.name,
            description: p.description,
            price: p.price,
            category: p.category,
            stock: p.stock,
            image: p.image,
            rating: p.rating || 0,
            numReviews: p.numReviews || 0,
            createdAt: p.createdAt
        }));
        
        res.status(200).json({
            success: true,
            count: sanitizedProducts.length,
            products: sanitizedProducts
        });
        
    } catch (error) {
        console.error("Get products error:", error);
        res.status(500).json({ 
            success: false, 
            message: "Failed to fetch products" 
        });
    }
};

// =======================
//   GET SINGLE PRODUCT BY ID
// =======================
export const getProductById = async (req, res) => {
    console.log("--- Fetching Single Product ID:", req.params.id, "---");
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ 
                success: false, 
                message: "Product not found" 
            });
        }
        
        // ✅ Increment view count
        product.viewCount = (product.viewCount || 0) + 1;
        await product.save();
        
        res.status(200).json({
            success: true,
            product: {
                _id: product._id,
                name: product.name,
                description: product.description,
                price: product.price,
                category: product.category,
                stock: product.stock,
                image: product.image,
                rating: product.rating || 0,
                numReviews: product.numReviews || 0,
                reviews: product.reviews || [],
                createdAt: product.createdAt
            }
        });
    } catch (error) {
        console.log("Error fetching product:", error.message);
        res.status(500).json({ 
            success: false, 
            message: error.message 
        });
    }
};

// =======================
//   UPDATE PRODUCT
// =======================
export const updateProduct = async (req, res) => {
    console.log("--- Updating Product ID:", req.params.id, "---");
    try {
        let updateData = { ...req.body };
        
        // Convert price and stock to numbers
        if (updateData.price) updateData.price = Number(updateData.price);
        if (updateData.stock) updateData.stock = Number(updateData.stock);

        if (req.file) {
            updateData.image = req.file.path || `/uploads/${req.file.filename}`;
        }

        const product = await Product.findByIdAndUpdate(
            req.params.id, 
            updateData, 
            { new: true, runValidators: true }
        );

        if (!product) {
            return res.status(404).json({ 
                success: false, 
                message: "Product not found" 
            });
        }

        console.log("✅ Product Updated!");
        res.status(200).json({ 
            success: true, 
            message: "Product Updated!", 
            product 
        });
    } catch (error) {
        console.log("Update Error:", error.message);
        res.status(500).json({ 
            success: false, 
            message: error.message 
        });
    }
};

// =======================
//   DELETE PRODUCT
// =======================
export const deleteProduct = async (req, res) => {
    console.log("--- Deleting Product ID:", req.params.id, "---");
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) {
            return res.status(404).json({ 
                success: false, 
                message: "Product not found" 
            });
        }
        console.log("✅ Product Deleted Successfully!");
        res.status(200).json({ 
            success: true, 
            message: "Product deleted successfully" 
        });
    } catch (error) {
        console.log("Delete Error:", error.message);
        res.status(500).json({ 
            success: false, 
            message: error.message 
        });
    }
};

// =======================
//   CREATE PRODUCT REVIEW
// =======================
export const createProductReview = async (req, res) => {
    const { rating, comment, title } = req.body;

    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({ 
                success: false, 
                message: "Product not found!" 
            });
        }

        // Check if user already reviewed
        const alreadyReviewed = product.reviews.find(
            (r) => r.user.toString() === req.user._id.toString()
        );

        if (alreadyReviewed) {
            return res.status(400).json({ 
                success: false, 
                message: "You have already reviewed this product!" 
            });
        }

        const review = {
            user: req.user._id,
            name: req.user.name,
            rating: Number(rating),
            comment: comment.trim(),
            title: title || '',
            createdAt: new Date()
        };

        product.reviews.push(review);
        product.numReviews = product.reviews.length;
        
        // Calculate average rating
        const totalRating = product.reviews.reduce((sum, item) => sum + item.rating, 0);
        product.rating = totalRating / product.reviews.length;

        await product.save();
        
        res.status(201).json({ 
            success: true, 
            message: "Review added successfully! ⭐",
            review: review,
            product: {
                rating: product.rating,
                numReviews: product.numReviews
            }
        });

    } catch (error) {
        console.error("Add review error:", error);
        res.status(500).json({ 
            success: false, 
            message: error.message 
        });
    }
};

// =======================
//   GET PRODUCT REVIEWS
// =======================
export const getProductReviews = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        
        if (!product) {
            return res.status(404).json({ 
                success: false, 
                message: "Product not found" 
            });
        }
        
        // Sort reviews by newest first
        const reviews = [...product.reviews].sort((a, b) => 
            new Date(b.createdAt) - new Date(a.createdAt)
        );
        
        // Calculate rating distribution
        const ratingDistribution = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
        reviews.forEach(review => {
            if (review.rating >= 1 && review.rating <= 5) {
                ratingDistribution[review.rating]++;
            }
        });
        
        res.json({
            success: true,
            reviews: reviews,
            totalReviews: product.numReviews,
            averageRating: product.rating || 0,
            ratingDistribution: ratingDistribution
        });
    } catch (error) {
        console.error("Get product reviews error:", error);
        res.status(500).json({ 
            success: false, 
            message: error.message 
        });
    }
};

// =======================
//   SEARCH PRODUCTS
// =======================
export const searchProducts = async (req, res) => {
    const query = req.query.q || req.query.name;
    console.log("--- Searching for:", query, "---");
    try {
        if (!query) {
            return res.status(400).json({ 
                success: false, 
                message: "Search query is required" 
            });
        }
        
        const safeKeyword = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const products = await Product.find({
            $or: [
                { name: { $regex: safeKeyword, $options: 'i' } },
                { description: { $regex: safeKeyword, $options: 'i' } },
                { category: { $regex: safeKeyword, $options: 'i' } }
            ]
        });
        
        res.status(200).json({
            success: true,
            count: products.length,
            products
        });
    } catch (error) {
        console.error("Search error:", error);
        res.status(500).json({ 
            success: false, 
            message: error.message 
        });
    }
};

// =======================
//   GET POPULAR PRODUCTS
// =======================
export const getPopularProducts = async (req, res) => {
    try {
        const products = await Product.find({})
            .sort({ purchaseCount: -1, viewCount: -1, rating: -1 })
            .limit(10);
        
        res.status(200).json({
            success: true,
            products
        });
    } catch (error) {
        res.status(500).json({ 
            success: false, 
            message: error.message 
        });
    }
};

// =======================
//   GET RELATED PRODUCTS
// =======================
export const getRelatedProducts = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);
        
        if (!product) {
            return res.status(404).json({ 
                success: false, 
                message: "Product not found" 
            });
        }
        
        const relatedProducts = await Product.find({
            category: product.category,
            _id: { $ne: id }
        })
        .sort({ rating: -1, createdAt: -1 })
        .limit(6);
        
        res.status(200).json({
            success: true,
            products: relatedProducts
        });
    } catch (error) {
        res.status(500).json({ 
            success: false, 
            message: error.message 
        });
    }
};