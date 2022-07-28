module.exports = {
    routes: [
        { // Path defined with a URL parameter
            method: 'GET',
            path: '/preorders/getPreorder',
            handler: 'preorder.getPreorder',
        }
    ]
}