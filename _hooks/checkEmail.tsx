export const checkEmail = (userEmail : string | null | undefined) : boolean => {
  if (userEmail && userEmail.length <= 50) {
    var arr = userEmail.split('@');
    if (arr.length >= 2 && arr[1]) {
      var arr2 = arr[1].split('.');
      if (arr2.length >= 2 && arr2[1]) {
        return true;
      }
    }
  }
  return false;
};
