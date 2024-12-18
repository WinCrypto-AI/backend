// Phải có ít nhất một ký tự in hoa ((?=.*[A-Z])):
// Mật khẩu phải chứa ít nhất một chữ cái từ A đến Z.
// Phải có ít nhất một ký tự in thường ((?=.*[a-z])):
// Mật khẩu phải chứa ít nhất một chữ cái từ a đến z.
// Phải có ít nhất một chữ số ((?=.*\d)):
// Mật khẩu phải chứa ít nhất một số từ 0 đến 9.
// Phải có ít nhất một ký tự đặc biệt ((?=.*[!@#$%^&*()\-+=_])):
// Mật khẩu phải chứa một trong các ký tự sau: !@#$%^&*()-+=_.
// Không được chứa khoảng trắng ([^\s]):
// Khoảng trắng không được phép xuất hiện trong mật khẩu.
// Độ dài từ 6 đến 20 ký tự ({6,20}):

// Mật khẩu phải có độ dài tối thiểu 1 ký tự và tối đa 20 ký tự.
const regexPassword: RegExp = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()\-+=_])[^\s]{8,20}$/;
const whitespaceRegex: RegExp = /^\S+$/;
export const RegexPattern = {
  regexPassword,
  whitespaceRegex,
};
