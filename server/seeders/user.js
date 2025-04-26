import { faker, SimpleFaker } from "@faker-js/faker";
import { User } from "../models/userModel.js";
import { Chat } from "../models/chatModel.js";

const createUser = async (numUsers) => {
  try {
    const userPromise = [];

    for (let i = 0; i < numUsers; i++) {
      const tempUser = User.create({
        name: faker.person.fullName(),
        username: faker.internet.username(),
        bio: faker.lorem.sentence(10),
        password: "123456",
        avatar: {
          url: faker.image.avatar(),
          public_id: faker.system.fileName(),
        },
      });

      userPromise.push(tempUser);
    }

    await Promise.all(userPromise);

    console.log("users created", numUsers);
    process.exit(1);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};



export {
  createUser,
  createSingleChats,
  createGroupChats,
  craeteMessages,
  craeteMessagesInAChat,
};
