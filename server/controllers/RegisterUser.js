async function registerUser(request, response) {
    try {
        const { name, email } = request.body

        console.log(name," ",email);

        return response.status(201).json({
            message: "User Created Successfully !",
            data: "User",
            success: true
        })
    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
        })
    }
}

module.exports = registerUser