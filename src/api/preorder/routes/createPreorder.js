module.exports = {
    routes: [
        { // Path defined with a URL parameter
            method: 'POST',
            path: '/preorders/create',
            handler: 'preorder.create',
        }
    ]
}