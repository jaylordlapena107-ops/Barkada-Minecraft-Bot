const mineflayer =
require("mineflayer");

const express =
require("express");

const app =
express();

// ── WEB SERVER ─────────────────────
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

// ── CREATE BOT ─────────────────────
function createBot() {

  console.log(
    "Connecting..."
  );

  const bot =
    mineflayer.createBot({

      host:
        "barkadacraftsmp.sg1-mczie.fun",

      port: 4090,

      username:
        "BarkadaBot",

      auth:
        "offline",

      version:
        "1.21.1",

      hideErrors: true
    });

  // ── SPAWN ────────────────────────
  bot.once(
    "spawn",
    () => {

      console.log(
        "Bot fully joined!"
      );

      // register
      setTimeout(() => {

        bot.chat(
          "/register 011020 011020"
        );

      }, 3000);

      // login
      setTimeout(() => {

        bot.chat(
          "/login 011020"
        );

      }, 6000);

      // anti timeout movement
      setInterval(() => {

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

      }, 15000);

    }
  );

  // ── CHAT LOGGER ──────────────────
  bot.on(
    "messagestr",
    msg => {

      console.log(
        "[CHAT]",
        msg
      );
    }
  );

  // ── KICK ─────────────────────────
  bot.on(
    "kicked",
    reason => {

      console.log(
        "KICKED:",
        reason
      );
    }
  );

  // ── ERROR ────────────────────────
  bot.on(
    "error",
    err => {

      console.log(
        "ERROR:",
        err.message
      );
    }
  );

  // ── RECONNECT ────────────────────
  bot.on(
    "end",
    () => {

      console.log(
        "Disconnected."
      );

      setTimeout(() => {

        createBot();

      }, 10000);
    }
  );
}

createBot();
