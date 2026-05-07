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
        "BarkadaBot"
    });

  // ── WHEN BOT JOINS ───────────────
  bot.on(
    "spawn",
    () => {

      console.log(
        "Bot joined server!"
      );

      // ── AUTHME REGISTER ──────────
      setTimeout(() => {

        bot.chat(
          "/register 011020 011020"
        );

        console.log(
          "Tried /register"
        );

      }, 3000);

      // ── AUTHME LOGIN ─────────────
      setTimeout(() => {

        bot.chat(
          "/login 011020"
        );

        console.log(
          "Tried /login"
        );

      }, 6000);

      // ── ONLINE MESSAGE ───────────
      setTimeout(() => {

        bot.chat(
          "BarkadaBot Online!"
        );

      }, 9000);
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

  // ── ERROR HANDLER ────────────────
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

  // ── CHAT LOG ─────────────────────
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

// ── START BOT ──────────────────────
createBot();
