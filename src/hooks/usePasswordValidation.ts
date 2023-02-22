import { useState } from 'react';

// パスワードの文字数、大文字、小文字、数字、および特殊文字がそれぞれ最低限含まれているかをチェック
const usePasswordValidation = () => {
  // useStateを使用してerrorMessageを管理し、checkPassword関数で入力されたパスワードを受け取り、妥当性をチェック
  const [errorMessage, setErrorMessage] = useState<string>('');

  const checkPassword = (password: string) => {
    const minLength = 8; // 最小文字数
    const uppercaseRegex = /[A-Z]/; // 大文字
    const lowercaseRegex = /[a-z]/; // 小文字
    const numberRegex = /[0-9]/; // 数字
    // const specialCharacterRegex = /[-!$%^&*()_+|~=`{}\[\]:";'<>?,.\/]/; // 特殊文字
  
    let message = '';
  
    if (password.length < minLength) {
      message += 'パスワードは8文字以上でなければなりません。\n';
    }
  
    if (!uppercaseRegex.test(password)) {
      message += 'パスワードには少なくとも1つの大文字を含む必要があります。\n';
    }
  
    if (!lowercaseRegex.test(password)) {
      message += 'パスワードには少なくとも1つの小文字を含む必要があります。\n';
    }
  
    if (!numberRegex.test(password)) {
      message += 'パスワードには少なくとも1つの数字を含む必要があります。\n';
    }
  
    // if (!specialCharacterRegex.test(password)) {
    //   message += 'Password must contain at least one special character.\n';
    // }
  
    setErrorMessage(message || ''); // エラーがない場合は空文字列を設定
  };
  

  return { errorMessage, checkPassword };
};

export default usePasswordValidation;
