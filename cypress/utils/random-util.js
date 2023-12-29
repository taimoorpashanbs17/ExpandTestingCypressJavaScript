

  function randomAlphaNumericString(length) {
    const characters = "abcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  function createRandomEmailAddress(){
    const randomCharacters = randomAlphaNumericString(6);
    const userName = "taimoor_pasha_"
    const domain = "@gmail.com"
    const email = userName + randomCharacters + domain
    return email
  }

  module.exports = {createRandomEmailAddress}

