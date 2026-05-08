const mineflayer =
require("mineflayer");

const express =
require("express");

const app =
express();

// WEB SERVER
app.get("/", (req, res) => {

  res.send(
    "BarkadaBot Online!"
  );
});

app.listen(
  process.env.PORT || 3000,
  () => {

    console.log(
      "Web server running."
    );
  }
);

// CREATE BOT
function createBot() {

  console.log(
    "Connecting..."
  );

  const bot =
    mineflayer.createBot({

      host:
        "barkadacraftsmp.sg1-mczie.fun",

      port:
        4090,

      username:
        "BarkadaBot",

      auth:
        "offline",

      version:
        "1.21.1",

      hideErrors:
        true
    });

  // JOIN
  bot.once(
    "spawn",
    () => {

      console.log(
        "Bot joined!"
      );

      // REGISTER
      setTimeout(() => {

        try {

          bot.chat(
            "/register 011020 011020"
          );

          console.log(
            "Register sent"
          );

        } catch {}

      }, 5000);

      // LOGIN
      setTimeout(() => {

        try {

          bot.chat(
            "/login 011020"
          );

          console.log(
            "Login sent"
          );

        } catch {}

      }, 8000);

      // ANTI AFK
      setInterval(() => {

        try {

          bot.setControlState(
            "jump",
            true
          );

          setTimeout(() => {

            bot.setControlState(
              "jump",
              false
            );

          }, 500);

        } catch {}

      }, 30000);

    }
  );

  // CHAT ONLY
  bot.on(
    "messagestr",
    msg => {

      if (
        msg &&
        msg.trim() !== ""
      ) {

        console.log(
          "[CHAT]",
          msg
        );
      }
    }
  );

  // KICK
  bot.on(
    "kicked",
    reason => {

      console.log(
        "Kicked:",
        reason
      );
    }
  );

  // ERROR
  bot.on(
    "error",
    err => {

      console.log(
        "Error:",
        err.message
      );
    }
  );

  // RECONNECT
  bot.on(
    "end",
    () => {

      console.log(
        "Disconnected"
      );

      setTimeout(() => {

        createBot();

      }, 10000);
    }
  );
}

createBot();
