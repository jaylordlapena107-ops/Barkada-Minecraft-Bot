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

      hideErrors: true,

      checkTimeoutInterval:
        30000
    });

  // ── SPAWN ────────────────────────
  bot.once(
    "spawn",
    () => {

      console.log(
        "Bot fully joined!"
      );

      // ── REGISTER ─────────────────
      setTimeout(() => {

        try {

          bot.chat(
            "/register 011020 011020"
          );

          console.log(
            "Register sent"
          );

        } catch (e) {}

      }, 3000);

      // ── LOGIN ────────────────────
      setTimeout(() => {

        try {

          bot.chat(
            "/login 011020"
          );

          console.log(
            "Login sent"
          );

        } catch (e) {}

      }, 6000);

      // ── RANDOM MOVEMENT ──────────
      setInterval(() => {

        try {

          // walk
          bot.setControlState(
            "forward",
            true
          );

          // jump
          bot.setControlState(
            "jump",
            true
          );

          // random look
          bot.look(
            Math.random() *
            Math.PI * 2,

            0
          );

          // stop jump
          setTimeout(() => {

            try {

              bot.setControlState(
                "jump",
                false
              );

            } catch (e) {}

          }, 1000);

          // stop walking
          setTimeout(() => {

            try {

              bot.setControlState(
                "forward",
                false
              );

            } catch (e) {}

          }, 3000);

        } catch (e) {}
        
      }, 15000);

      // ── KEEP CHAT ACTIVE ─────────
      setInterval(() => {

        try {

          bot.chat(
            "/list"
          );

        } catch (e) {}

      }, 60000);
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

  // ── END ──────────────────────────
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

// ── START ──────────────────────────
createBot();
