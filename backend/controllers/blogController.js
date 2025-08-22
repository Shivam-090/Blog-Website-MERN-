import fs from 'fs';
import imageKit from '../configs/imageKit.js';
import Blog from '../models/Blog.js';
import Comment from '../models/Comment.js';
import main from '../configs/gemini.js';

export const addBlog = async (req, res) => {
    try {
        const {title, subTitle, description, category, isPublished} = JSON.parse(req.body.blog)
        const imageFile = req.file;

        if (!title || !subTitle || !description || !category || !imageFile){
            return res.json({success:false, message:"Missing required fields"})
        }

        const fileBuffer = fs.readFileSync(imageFile.path)


        // Upload image to ImageKit
        const response = await imageKit.upload({
            file: fileBuffer,
            fileName: imageFile.originalname,
            folder: "/blogs"
        });

        // Optimize through ImageKit
        const optimizedImageUrl = imageKit.url({
           path: response.filePath,
           transformation: [{
               width: 1280,
               quality: "auto",
               format: "webp"
           }]
        }); 

        const image = optimizedImageUrl;

        await Blog.create({
            title,
            subTitle,
            description,
            category,
            image,
            isPublished
        });

        res.json({success: true, message: "Blog added successfully"});


    } catch (error) {
        res.json({success: false, message: error.message});

    }
}

export const getAllBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find({isPublished: true})
        res.json({success: true, blogs});
    }catch (error) {
        res.json({success: false, message: error.message});

    }
}

export const getBlogById = async (req, res) => {
    try {
        const { blogId } = req.params;
        const blog = await Blog.findById(blogId);
        if(!blog){
            return res.json({success: false, message: "Blog not found"});
        }
        res.json({success: true, blog});
    }catch (error) {
        res.json({success: false, message: error.message});
    }
}

export const deleteBlogById = async (req, res) => {
    try {
        const {id} = req.body;
        await Blog.findByIdAndDelete(id);
        // Delete all comments too
        await Comment.deleteMany({blog: id});


        res.json({success: true, message: "Blog deleted successfully"});
    }catch (error) {
        res.json({success: false, message: error.message});
    }
}

export const togglePublished = async (req, res) => {
    try {
        const {id} = req.body;
        const blog = await Blog.findById(id);
        if (!blog) {
            return res.json({success: false, message: "Blog not found"});
        }
        blog.isPublished = !blog.isPublished;
        await blog.save();
        res.json({success: true, message: "Status updated successfully"});
    } catch (error) {
        res.json({success: false, message: error.message});
    }
}


export const addComment = async (req, res) => {
    try {
        const {blog, name, content} = req.body;
        await Comment.create({blog, name, content});
        res.json({success: true, message: "Comment added for review"});

    } catch (error) {
        res.json({success: false, message: error.message});
    }
}

export const getBlogComments = async (req, res) => {
    try {
        const {blogId} = req.body;
        const comments = await Comment.find({blog: blogId, isApproved: true}).sort({createdAt: -1});
        res.json({success: true, comments}); 
    } catch (error) {
        res.json({success: false, message: error.message});
    }
} 

export const generateContent = async (req, res) => {
    try {
        const { currentContent, title, category } = req.body;
        
        if (!currentContent || !title) {
            return res.json({ success: false, message: 'Content and title are required' });
        }
        
        const prompt = `Based on this blog content: "${currentContent}", title: "${title}", and category: "${category}", Write the blog using bold, italic and list styles in the required areas and also if asked add linked text that will lead to the required site`;
        
        const generatedContent = await main(prompt);
        
        res.json({ 
            success: true, 
            generatedContent: generatedContent.trim()
        });
        
    } catch (error) {
        res.json({ success: false, message: 'Failed to generate content' });
    }
};