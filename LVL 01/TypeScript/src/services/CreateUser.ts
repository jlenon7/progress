/**
 * Para criar: name, email, password
 */

 interface TechObject {
   title: string,
   experience: number;
 }

 interface CreateUserData {
   name?: String,
   email: String,
   password: String,
   techs: Array<string | TechObject>
 }

export default function createUser({ name = '', email, password }: CreateUserData) {
  const user = {
    name,
    email,
    password,
  }

  return user;
}