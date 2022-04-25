let check_string = {};

check_string.username = function (username) {
  let status = {};

  if (username.length <= 12) {
    status.error = "Username too long";
  }

  return status;
};

check_string.password = function (password) {
  let status = {};

  let is_valid = password.match(
    "/^(?=.*d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/" //regex
  );

  if (is_valid) {
    status.code = true;
  } else status.error = "Invalid username";

  return status;
};

export function type(object) {
  return object.constructor.name;
}
