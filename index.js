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

const PORT =
process.env.PORT || 3000;

app.listen(PORT, () => {

  console.log(
    `Web server running on port ${PORT}`
  );
});

// ── CREATE BOT ─────────────────────
function createBot() {

  console.log(
    "Starting bot..."
  );

  const bot =
    mineflayer.createBot({

      host:
        "barkadacraftsmp.sg1-mczie.fun",

      port: 4090,

      username:
        "BarkadaBot",

      version:
        "1.21.1"
    });

  // ── FULLY SPAWNED ────────────────
  bot.once(
    "spawn",
    () => {

      console.log(
        "Bot fully spawned!"
      );

      // ── REGISTER ─────────────────
      setTimeout(() => {

        bot.chat(
          "/register 011020 011020"
        );

        console.log(
          "Tried /register"
        );

      }, 5000);

      // ── LOGIN ────────────────────
      setTimeout(() => {

        bot.chat(
          "/login 011020"
        );

        console.log(
          "Tried /login"
        );

      }, 8000);

      // ── JUMP ─────────────────────
      setTimeout(() => {

        bot.setControlState(
          "jump",
          true
        );

        setTimeout(() => {

          bot.setControlState(
            "jump",
            false
          );

        }, 1000);

      }, 12000);

      // ── MOVE FORWARD ─────────────
      setTimeout(() => {

        bot.look(
          0,
          0
        );

        bot.setControlState(
          "forward",
          true
        );

        setTimeout(() => {

          bot.setControlState(
            "forward",
            false
          );

        }, 2000);

      }, 15000);

      // ── ONLINE MESSAGE ───────────
      setTimeout(() => {

        bot.chat(
          "BarkadaBot Online!"
        );

      }, 18000);
    }
  );

  // ── AUTO RECONNECT ───────────────
  bot.on(
    "end",
    () => {

      console.log(
        "Disconnected..."
      );

      setTimeout(() => {

        createBot();

      }, 10000);
    }
  );

  // ── ERROR ────────────────────────
  bot.on(
    "error",
    err => {

      console.log(
        "BOT ERROR:",
        err
      );
    }
  );

  // ── KICK DETECT ──────────────────
  bot.on(
    "kicked",
    reason => {

      console.log(
        "KICKED:",
        reason
      );
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
}

// ── START ──────────────────────────
createBot();
