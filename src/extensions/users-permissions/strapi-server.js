module.exports = (plugin) => {
    plugin.controllers.user.updateMe = (ctx) => {
        ctx.params.id = ctx.state.user.id;
        return plugin.controllers.user.update(ctx);
    }
    
    plugin.controllers.user.checkAvailability = async (ctx) => {
        const { username, email, phoneNumber } = ctx.request.body;
        var usernameFlag, emailFlag, phoneNumberFlag = '';
        console.log(username, email, phoneNumber);

        const checkUsername = await strapi.db.query('plugin::users-permissions.user').findMany({
            where: {
                username: username
            }
        });

        const checkEmail = await strapi.db.query('plugin::users-permissions.user').findMany({
            where: {
                email: email
            }
        });

        const checkPhoneNumber = await strapi.db.query('plugin::users-permissions.user').findMany({
            where: {
                phoneNumber: phoneNumber
            }
        });

        if (checkUsername.length > 0) {
            usernameFlag = 'Username already exists';
        } else {
            usernameFlag = 'Username available';
        }

        if (checkEmail.length > 0) {
            emailFlag = 'Email already exists';
        } else {
            emailFlag = 'Email available';
        }

        if (checkPhoneNumber.length > 0) {
            phoneNumberFlag = 'Phone number already exists';
        } else {
            phoneNumberFlag = 'Phone number available';
        }

        return ctx.send({
            usernameFlag: usernameFlag,
            emailFlag: emailFlag,
            phoneNumberFlag: phoneNumberFlag
        });
    }

    plugin.routes['content-api'].routes.push({
        method: 'PUT',
        path: '/users/me',
        handler: 'user.updateMe'
    });

    plugin.routes['content-api'].routes.push({
        method: 'POST',
        path: '/users/check',
        handler: 'user.checkAvailability'
    });

    return plugin;
}