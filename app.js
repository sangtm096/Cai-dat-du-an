const express = require("express");
const cors = require("cors");
const contactsRouter = require("./app/routes/contact.route");
const ApiError = require("./app/api-error");
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.json({ message: "Welcome to contact book application." });
});

app.use("/api/contacts", contactsRouter);

//handle 404 response
app.use((req, res, next) => {
    //Code ở đây sẽ chạy khi không có route được định nghĩa nào
    //      khớp với yêu cầu. Gọi next() để chuyển sang middleware xử lý lỗi
    return next(new ApiError(404, "Resource not found"));
    // return res.send({
    //     statusCode: 404,
    //     message: `Resource not found`
    // })
});

// express(): sử dụng callback để handle middleware.
// req: đi từ trên xuống dưới, hết middleware này đến middleware khác.
// next(): truyền value sang middleware tiếp theo.

// define error-handling middleware last, after other app.use() and routes calls
app.use((error, req, res, next) => {
    return res.status(error.statusCode || 500).json({
        statusCode: error.statusCode,
        message: error.message || "Internal Server Error",
    });
});

module.exports = app;


// Chưa lưu các thay đổi vào git ở bước "Cài đặt xử lý lỗi"




