import http from "./httpService";
import auth from "./authService";

const apiEndpoint = http.getAPIurl() + "/users";

// Create a new user given name, phone, email, and password
export function register(user) {
  return http.post(apiEndpoint, {
    name: user.name,
    phone: user.phone,
    email: user.email,
    password: user.password,
  });
}

// Update logged in user's information
/*
  Parameters:
  user - JWT of currently logged in user
  newUser - described below

  Return:
  http response
  or
  {status: 400, data: "inavlid password"} if password confirmation doesn't match
*/
export async function updateUser(user, newUser) {
  // newUser structure -
  /* {
    name,
    phone,
    email,
    password - new password if changing,
    confirm - old password entered to confirm user,
    verified
  }*/
  // Except for confirm, newUser fields only need to be set if user is changing them
  // verified should be set to false if the user's email is changed

  let httpRequest = `${apiEndpoint}/${user._id}`;
  let verified = await auth.verify(user.email, newUser.confirm);
  if (verified) {
    let response = await http.get(httpRequest);
    let oldUser = response.data;
    return await http.put(httpRequest, {
      name: newUser.name ? newUser.name : oldUser.name,
      phone: newUser.phone ? newUser.phone : oldUser.phone,
      email: newUser.email ? newUser.email : oldUser.email,
      password: newUser.password ? newUser.password : newUser.confirm,
      authLevel: oldUser.authLevel,
    });
  } else {
    return { status: 400, data: "Invalid password." };
  }
}
