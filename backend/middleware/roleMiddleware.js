exports.checkRole=(roles)=>(req, res, next) => {
    const {userId:currentUserId, userRole:currentUserRole} = req.auth;
    //const userRoles = req.user.roles;
    //const hasRole = userRoles.some(role => roles.includes(role));
    const hasRole = roles.includes(currentUserRole);
    if (!hasRole) {
        return res.status(403).send('Access forbidden');
    }
    next();
};