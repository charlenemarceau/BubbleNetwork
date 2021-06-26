module.exports.signUpErrors = (err) => {
    let errors =  {
        pseudo: '',
        email: '',
        password: ''}

    if (err.message.includes('pseudo')) {
        errors.pseudo = "This pseudo is already used";
    }
    if (err.message.includes('email')) {
        errors.email = "Incorrect email";
    }
    if (err.message.includes('password')) {
        errors.password = "The password must contain at least 6 characters";
    } 
    if (err.code === 11000 && Object.keys(err.keyValue)[0].includes("pseudo"))
    errors.pseudo = "This pseudo is already used";

  if (err.code === 11000 && Object.keys(err.keyValue)[0].includes("email"))
    errors.email = "This email is already used";

    return errors;
}

module.exports.signInErrors = (err) => {
    let errors = { 
        email: '',
        password: ''
    }
  
    if (err.message.includes("email")) 
      errors.email = "Email unknown";
    
    if (err.message.includes('password'))
      errors.password = "Password does not match"
  
    return errors;
  }


module.exports.uploadErrors = (err) => {
    let errors = { format : '', maxSize: ""};

    if (err.message.includes('invalid file')) {
        errors.format = "Format incompatible";
    }
    if (err.message.includes('max size')) {
        errors.maxSize = "Le fichier dépasse 500ko";
    }
    return errors;
}