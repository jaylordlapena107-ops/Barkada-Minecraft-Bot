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

// ── MINECRAFT BOT ──────────────────
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
