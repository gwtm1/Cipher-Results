
export const uploadresults = (req, res, next) => {
  try {    
    const { year, batch, semesterNumber } = req.body;

    console.log( year, batch, semesterNumber);

  } catch (error) {
    console.log(error.message);
  }
};
