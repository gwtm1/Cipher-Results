export const sendError = (res, status, error) => {
    res.status(status).json({ success: false, error });
}   