import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import Blog from '../models/Blog.js';
import Comment from '../models/Comment.js';
import Writer from '../models/Writer.js';

const hashPassword = (password) => {
    const salt = crypto.randomBytes(16).toString('hex');
    const hash = crypto.scryptSync(password, salt, 64).toString('hex');
    return `${salt}:${hash}`;
};

const verifyPassword = (password, storedPassword) => {
    const [salt, originalHash] = storedPassword.split(':');
    const hash = crypto.scryptSync(password, salt, 64).toString('hex');
    return crypto.timingSafeEqual(Buffer.from(hash, 'hex'), Buffer.from(originalHash, 'hex'));
};

const createWriterToken = (writer) => jwt.sign(
    { writerId: writer._id, name: writer.name, email: writer.email, phone: writer.phone, role: 'writer' },
    process.env.JWT_SECRET
);

const sanitizeWriter = (writer) => ({
    _id: writer._id,
    name: writer.name,
    email: writer.email,
    phone: writer.phone,
    createdAt: writer.createdAt
});

export const registerWriter = async (req, res) => {
    try {
        const { name, email, phone, password } = req.body;

        if (!name || !email || !phone || !password) {
            return res.json({ success: false, message: "All fields are required" });
        }

        if (password.length < 6) {
            return res.json({ success: false, message: "Password must be at least 6 characters long" });
        }

        const normalizedEmail = email.trim().toLowerCase();
        const normalizedPhone = phone.trim();

        const existingWriter = await Writer.findOne({
            $or: [{ email: normalizedEmail }, { phone: normalizedPhone }]
        });

        if (existingWriter) {
            return res.json({ success: false, message: "Writer already exists with this email or phone" });
        }

        const writer = await Writer.create({
            name: name.trim(),
            email: normalizedEmail,
            phone: normalizedPhone,
            password: hashPassword(password)
        });

        const token = createWriterToken(writer);

        res.json({
            success: true,
            message: "Writer account created successfully",
            token,
            writer: sanitizeWriter(writer)
        });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

export const loginWriter = async (req, res) => {
    try {
        const { login, password } = req.body;

        if (!login || !password) {
            return res.json({ success: false, message: "Email or phone and password are required" });
        }

        const normalizedLogin = login.trim().toLowerCase();
        const writer = await Writer.findOne({
            $or: [
                { email: normalizedLogin },
                { phone: login.trim() }
            ]
        });

        if (!writer || !verifyPassword(password, writer.password)) {
            return res.json({ success: false, message: "Invalid credentials" });
        }

        const token = createWriterToken(writer);

        res.json({
            success: true,
            message: "Writer login successful",
            token,
            writer: sanitizeWriter(writer)
        });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

export const getWriterProfile = async (req, res) => {
    try {
        const writer = await Writer.findById(req.writer.writerId).select('-password');

        if (!writer) {
            return res.status(404).json({ success: false, message: "Writer not found" });
        }

        const writerBlogs = await Blog.find({ writer: writer._id }).sort({ createdAt: -1 }).lean();
        const writerBlogIds = writerBlogs.map((blog) => blog._id);
        const comments = await Comment.find({ blog: { $in: writerBlogIds } })
            .populate('blog')
            .sort({ createdAt: -1 })
            .lean();

        const profile = {
            writer: sanitizeWriter(writer),
            blogs: writerBlogs,
            comments: comments.filter((comment) => comment.blog)
        };

        res.json({ success: true, profile });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

export const updateWriterPassword = async (req, res) => {
    try {
        const { currentPassword, newPassword } = req.body;

        if (!currentPassword || !newPassword) {
            return res.json({ success: false, message: "Current password and new password are required" });
        }

        if (newPassword.length < 6) {
            return res.json({ success: false, message: "New password must be at least 6 characters long" });
        }

        const writer = await Writer.findById(req.writer.writerId);

        if (!writer) {
            return res.status(404).json({ success: false, message: "Writer not found" });
        }

        if (!verifyPassword(currentPassword, writer.password)) {
            return res.json({ success: false, message: "Current password is incorrect" });
        }

        writer.password = hashPassword(newPassword);
        await writer.save();

        res.json({ success: true, message: "Writer password updated successfully" });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

export const verifyWriterResetIdentity = async (req, res) => {
    try {
        const { email, phone } = req.body;

        if (!email || !phone) {
            return res.json({ success: false, message: "Email and phone are required" });
        }

        const writer = await Writer.findOne({
            email: email.trim().toLowerCase(),
            phone: phone.trim()
        });

        if (!writer) {
            return res.json({ success: false, message: "No writer found with this email and phone" });
        }

        res.json({ success: true, message: "Writer verified successfully" });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

export const resetWriterPassword = async (req, res) => {
    try {
        const { email, phone, newPassword } = req.body;

        if (!email || !phone || !newPassword) {
            return res.json({ success: false, message: "Email, phone, and new password are required" });
        }

        if (newPassword.length < 6) {
            return res.json({ success: false, message: "Password must be at least 6 characters long" });
        }

        const writer = await Writer.findOne({
            email: email.trim().toLowerCase(),
            phone: phone.trim()
        });

        if (!writer) {
            return res.json({ success: false, message: "No writer found with this email and phone" });
        }

        writer.password = hashPassword(newPassword);
        await writer.save();

        res.json({ success: true, message: "Writer password reset successfully" });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

export const getWriterBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find({ writer: req.writer.writerId }).sort({ createdAt: -1 });
        res.json({ success: true, blogs });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

export const getWriterComments = async (req, res) => {
    try {
        const blogs = await Blog.find({ writer: req.writer.writerId }).select('_id');
        const comments = await Comment.find({ blog: { $in: blogs.map((blog) => blog._id) } })
            .populate('blog')
            .sort({ createdAt: -1 });
        res.json({ success: true, comments });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

export const getWriterDashboard = async (req, res) => {
    try {
        const writerId = req.writer.writerId;
        const writerBlogs = await Blog.find({ writer: writerId }).sort({ createdAt: -1 });
        const recentBlogs = await Blog.find({ writer: writerId }).sort({ createdAt: -1 }).limit(5);
        const writerBlogIds = writerBlogs.map((blog) => blog._id);
        const blogs = writerBlogs.length;
        const comments = await Comment.countDocuments({ blog: { $in: writerBlogIds } });
        const drafts = await Blog.countDocuments({ writer: writerId, isPublished: false });

        res.json({
            success: true,
            dashboardData: {
                blogs,
                comments,
                drafts,
                recentBlogs
            }
        });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

export const deleteWriterCommentById = async (req, res) => {
    try {
        const { id } = req.body;
        const comment = await Comment.findById(id).populate('blog');

        if (!comment || !comment.blog || comment.blog.writer?.toString() !== req.writer.writerId) {
            return res.status(404).json({ success: false, message: "Comment not found" });
        }

        await Comment.findByIdAndDelete(id);
        res.json({ success: true, message: "Comment deleted successfully" });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

export const approveWriterCommentById = async (req, res) => {
    try {
        const { id } = req.body;
        const comment = await Comment.findById(id).populate('blog');

        if (!comment || !comment.blog || comment.blog.writer?.toString() !== req.writer.writerId) {
            return res.status(404).json({ success: false, message: "Comment not found" });
        }

        await Comment.findByIdAndUpdate(id, { isApproved: true });
        res.json({ success: true, message: "Comment approved successfully" });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};
