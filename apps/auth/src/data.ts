interface AuthRecord {
  id: number;
  email: string;
  password: string;
}

const data: AuthRecord[] = [
  {
    id: 1,
    email: "a@a.com",
    password: "$2a$10$pufkWzS.oD0RN35EHu6MY.fu.m3vI4kSmivXDm61kCpFRbW3SCqXC", // tothemoon
  },
  {
    id: 2,
    email: "b@a.com",
    password: "$2a$10$7uXfXAxaLIMcAGAojBJPUOKKxAC.yORyS10F6l0CpaYmxufWKtUsK", // tothemoon
  },
];

export default data;
