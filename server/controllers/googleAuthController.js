// Handle the callback after Google OAuth login
export const googleAuthCallback = (req, res) => {
    res.redirect("/auth/dashboard");
};

// Dashboard route (ensure user is authenticated)
export const googleDashboard = (req, res) => {
    if (!req.user) {
        return res.redirect("/");
    }
    res.send(`<h1>Hello, ${req.user.displayName}</h1>`);
};

// Logout and clear session
export const googleLogout = (req, res) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        res.redirect("/");
    });
};
