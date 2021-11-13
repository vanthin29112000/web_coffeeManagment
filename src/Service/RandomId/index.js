const baseString =
   "0123456789qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM";

const getRandomInt = (min, max) => {
   return Math.floor(Math.random() * (max - min)) + min;
};

const getRandomString = (length, base) => {
   let result = "";
   const baseLength = base.length;

   for (let i = 0; i < length; i++) {
      const randomIndex = getRandomInt(0, baseLength);
      result += base[randomIndex];
   }

   return result;
};

const random = {
   randomId: () => {
      return getRandomString(20, baseString);
   },
};
export default random;
