const mineflayer =
require("mineflayer");

const express =
require("express");

const app =
express();

// ── WEB SERVER ─────────────────────
app.get(
  "/",
  (req, res) => {

    res.send(
      "BarkadaBot Online!"
    );
  }
);

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

  const bot = mineflayer.createBot({
  host: "barkadacraftsmp.sg1-mczie.fun",
  port: 4090,
  username: "BarkadaBot1",
  auth: "offline",
  version: false,
  hideErrors: true,
  checkTimeoutInterval: 60000
});
  // ── SPAWN ────────────────────────
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

        } catch (e) {

          console.log(
            "REGISTER ERROR:",
            e
          );
        }

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

        } catch (e) {

          console.log(
            "LOGIN ERROR:",
            e
          );
        }

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

  // ── PLAYER CHAT ──────────────────
  bot.on(
    "chat",
    (
      username,
      message
    ) => {

      console.log(
        `[CHAT] ${username}: ${message}`
      );
    }
  );

  // ── SERVER MESSAGES ──────────────
  bot.on(
    "message",
    jsonMsg => {

      try {

        console.log(
          "[SERVER]",
          jsonMsg.toAnsi()
        );

      } catch {

        console.log(
          "[SERVER RAW]",
          jsonMsg.toString()
        );
      }
    }
  );

  // ── KICK LOGGER ──────────────────
  bot.on(
    "kicked",
    reason => {

      console.log(
        "[KICKED]"
      );

      console.log(reason);
    }
  );

  // ── ERROR LOGGER ─────────────────
  bot.on(
    "error",
    err => {

      console.log(
        "[ERROR]"
      );

      console.log(err);

      if (
        err.stack
      ) {

        console.log(
          err.stack
        );
      }
    }
  );

  // ── DISCONNECT LOGGER ────────────
  bot.on(
    "end",
    reason => {

      console.log(
        "[DISCONNECTED]",
        reason
      );

      setTimeout(() => {

        console.log(
          "Reconnecting..."
        );

        createBot();

      }, 10000);
    }
  );

  // ── LOW LEVEL PACKET LOGGER ──────
  bot._client.on(
    "disconnect",
    packet => {

      console.log(
        "[DISCONNECT PACKET]"
      );

      console.log(packet);
    }
  );
}

// ── START ──────────────────────────
createBot();
