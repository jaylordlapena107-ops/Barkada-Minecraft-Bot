const mineflayer =
require("mineflayer");

function createBot() {

  const bot =
    mineflayer.createBot({

      host:
        "barkadacraftsmp.sg1-mczie.fun",

      port: 4090,

      username:
        "BarkadaBot"
    });

  bot.on(
    "spawn",
    () => {

      console.log(
        "Bot joined server!"
      );

      bot.chat(
        "BarkadaBot Online!"
      );
    }
  );

  // auto reconnect
  bot.on(
    "end",
    () => {

      console.log(
        "Disconnected..."
      );

      setTimeout(
        createBot,
        5000
      );
    }
  );

  bot.on(
    "error",
    err => console.log(err)
  );
}

createBot();
