import { atom, map } from "nanostores";

export const isLogedIn: boolean = atom(false);

export type User = {
  firstName: string;
  lastName: string;
  email: string;
  tokken: string;
  companies: Company[];
};

export type Company = {
  name: string;
};

export const userData: User = map({
  firstName: "anonymous",
  lastName: "anonymous",
  email: "anonymous",
  tokken: "anonymous",
  companies: ["anonymous"],
});
