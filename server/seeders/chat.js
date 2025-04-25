import { faker, SimpleFaker } from "@faker-js/faker";
import { User } from "../models/userModel.js";
import { Chat } from "../models/chatModel.js";
import { Message } from "../models/messageModel.js";

const createSingleChats = async (numChats) => {
  try {
    const users = await User.find().select("_id");
    const chatPromise = [];

    for (let i = 0; i < numChats; i++) {
      for (let j = i + 1; j < numChats; j++) {
        chatPromise.push(
          Chat.create({
            name: faker.lorem.word(7),
            members: [users[i], users[j]],
          })
        );
      }
    }

    await Promise.all(chatPromise);

    console.log("chats created", numChats);
    process.exit();
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

const createGroupChats = async (numChats) => {
  try {
    const users = await User.find().select("_id");
    const chatPromise = [];

    for (let i = 0; i < numChats; i++) {
      const numMembers = SimpleFaker.number.int({ min: 3, max: users.length });
      const members = [];

      for (let i = 0; i < numMembers; i++) {
        const randomIndex = Math.floor(Math.random() * users.length);
        const randomUser = users[randomIndex];

        //Ensure that the user is not added twice
        if (!members.includes(randomUser)) {
          members.push(randomUser);
        }
      }

      const chat = Chat.create({
        groupChat: true,
        name: faker.lorem.word(2),
        members,
        creator: members[0],
      });

      chatPromise.push(chat);
    }

    await Promise.all(chatPromise);

    console.log("chats created", numChats);
    process.exit();
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

const craeteMessages = async (numMessages) => {
  try {
    const users = await User.find().select("_id");
    const chat = await Chat.find().select("_id");

    const messagePromise = [];

    for (let i = 0; i < numMessages; i++) {
      const randomUser = users[Math.floor(Math.random() * users.length)];
      const randomChat = chat[Math.floor(Math.random() * chat.length)];

      messagePromise.create({
        chat: randomChat,
        sender: randomUser,
        content: faker.lorem.sentence(10),
      });
    }

    await Promise.all(messagePromise);

    console.log("messages created", numMessages);
    process.exit();
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

const craeteMessagesInAChat = async (chatId, numMessages) => {
  try {
    const users = await User.find().select("_id");

    const messagePromise = [];

    for (let i = 0; i < numMessages; i++) {
      const randomUser = users[Math.floor(Math.random() * users.length)];

      messagePromise.push(
        Message.create({
          chat: chatId,
          sender: randomUser,
          content: faker.lorem.sentence(10),
        })
      );
    } 

    await Promise.all(messagePromise);

    console.log("messages created", numMessages);
    process.exit();
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

export {
  createSingleChats,
  createGroupChats,
  craeteMessages,
  craeteMessagesInAChat,
};
