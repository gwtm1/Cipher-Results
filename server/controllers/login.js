export const adminLogingIn = (req,res)=>{
    try {
        res.json('Logging In');
    } catch(error) {
        console.log(error.message);
    }
};
export const studentLogingIn = (req,res)=>{
    try {
        res.json('Logging In');
    } catch(error) {
        console.log(error.message);
    }
}