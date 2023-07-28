import { faker } from "@faker-js/faker";

export type Person = {
  firstName: string;
  lastName: string;
  age: number;
  visits: number;
  progress: number;
  status: "relationship" | "complicated" | "single";
  subRows?: Person[];
};

const range = (len: number) => {
  const arr = [];
  for (let i = 0; i < len; i++) {
    arr.push(i);
  }
  return arr;
};

// const newPerson = (): Person => {
//   return {
//     firstName: faker.name.firstName(),
//     lastName: faker.name.lastName(),
//     age: faker.datatype.number(40),
//     visits: faker.datatype.number(1000),
//     progress: faker.datatype.number(100),
//     status: faker.helpers.shuffle<Person["status"]>([
//       "relationship",
//       "complicated",
//       "single",
//     ])[0]!,
//   };
// };

export function makeData(...lens: number[]) {
  const makeDataLevel = (depth = 0): Person[] => {
    const len = lens[depth]!;
    return range(len).map((d, i): Person => {
      return {
        firstName: `John${i}`,
        lastName: `Doe${i}`,
        age: i,
        visits: i * 10,
        progress: i * 10,
        status: "relationship",
        subRows: lens[depth + 1] ? makeDataLevel(depth + 1) : undefined,
      };
    });
  };

  return makeDataLevel();
}

// export const dataForRetail = [
//   {
//     name: "Electronics",
//     id: "1",
//     parent: null,
//     children: [
//       {
//         name: "Smartphones",
//         id: "3",
//         parent: "1",
//         children: [
//           {
//             name: "iPhone",
//             id: "7",
//             parent: "3",
//             children: [],
//           },
//         ],
//       },
//       {
//         name: "Laptops",
//         id: "4",
//         parent: "1",
//         children: [
//           {
//             name: "Gaming Laptops",
//             id: "6",
//             parent: "4",
//             children: [],
//           },
//           {
//             name: "MacBook Pro",
//             id: "8",
//             parent: "4",
//             children: [],
//           },
//         ],
//       },
//     ],
//   },
//   {
//     name: "Furniture",
//     id: "2",
//     parent: null,
//     children: [
//       {
//         name: "Chairs",
//         id: "5",
//         parent: "2",
//         children: [
//           {
//             name: "Office Chairs",
//             id: "9",
//             parent: "5",
//             children: [],
//           },
//           {
//             name: "Dining Chairs",
//             id: "10",
//             parent: "5",
//             children: [],
//           },
//           {
//             name: "Recliners",
//             id: "11",
//             parent: "5",
//             children: [],
//           },
//           {
//             name: "Gaming Chairs",
//             id: "12",
//             parent: "5",
//             children: [],
//           },
//         ],
//       },
//     ],
//   },
// ];
