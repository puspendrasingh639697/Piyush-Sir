import Content from '../models/Content.js';

// 1. Update ya Create Content (Admin Only)
export const updateContent = async (req, res) => {
    try {
        const { type, title, body, link } = req.body;
        
        let updateData = { title, body, link };

        // Agar Admin ne nayi image file upload ki hai (Banner ke liye)
        if (req.file) {
            console.log("🔄 Nayi Image detect hui, path update ho raha hai...");
            updateData.imageUrl = req.file.path; 
        }

        const content = await Content.findOneAndUpdate(
            { type },
            updateData,
            { new: true, upsert: true } // Agar nahi hai toh naya bana dega
        );

        res.status(200).json({ 
            message: `${type} successfully update ho gaya! ✅`, 
            content 
        });
    } catch (error) {
        console.log("🔥 Content Update Error:", error.message);
        res.status(500).json({ message: error.message });
    }
};

// 2. Get Content By Type (Public - Website pe dikhane ke liye)
export const getContentByType = async (req, res) => {
    try {
        const { type } = req.params;
        const content = await Content.findOne({ type });

        if (!content) {
            return res.status(404).json({ message: "Bhai, ye content nahi mila!" });
        }
        
        res.status(200).json(content);
    } catch (error) {
        console.log("🔥 Fetch Content Error:", error.message);
        res.status(500).json({ message: error.message });
    }
};