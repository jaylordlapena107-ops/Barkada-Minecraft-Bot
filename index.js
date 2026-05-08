const mc =
require(
  "minecraft-protocol"
);

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

// ── CONNECT BOT ────────────────────
function connectBot() {

  console.log(
    "Connecting..."
  );

  const client =
    mc.createClient({

      host:
        "barkadacraftsmp.sg1-mczie.fun",

      port: 4090,

      username:
        "BarkadaBot",

      auth:
        "offline",

      version:
        "1.19.4"
    });

  // ── CONNECTED ────────────────────
  client.on(
    "login",
    () => {

      console.log(
        "Bot joined!"
      );

      // REGISTER
      setTimeout(() => {

        try {

          client.write(
            "chat_command",
            {
              command:
                "register 011020 011020"
            }
          );

          console.log(
            "Register sent"
          );

        } catch (e) {}

      }, 3000);

      // LOGIN
      setTimeout(() => {

        try {

          client.write(
            "chat_command",
            {
              command:
                "login 011020"
            }
          );

          console.log(
            "Login sent"
          );

        } catch (e) {}

      }, 6000);

      // ── ANTI TIMEOUT ─────────────
      let x = 1265.5;
      let z = -288.5;

      setInterval(() => {

        try {

          x += 0.05;

          client.write(
            "position",
            {
              x: x,
              y: 66,
              z: z,
              onGround: true
            }
          );

        } catch (e) {}

      }, 2000);

      // ── KEEP CHAT ACTIVE ─────────
      setInterval(() => {

        try {

          client.write(
            "chat_command",
            {
              command:
                "list"
            }
          );

        } catch (e) {}

      }, 60000);
    }
  );

  // ── CHAT LOGGER ──────────────────
  client.on(
    "packet",
    (data, meta) => {

      try {

        if (
          meta.name ===
          "system_chat"
        ) {

          const msg =
            JSON.stringify(data);

          // only show readable chat
          if (
            msg.includes("text")
          ) {

            console.log(
              "[CHAT MESSAGE]"
            );
          }
        }

      } catch (e) {}
    }
  );

  // ── ERROR ────────────────────────
  client.on(
    "error",
    err => {

      console.log(
        "ERROR:",
        err.message
      );
    }
  );

  // ── DISCONNECT ───────────────────
  client.on(
    "end",
    reason => {

      console.log(
        "Disconnected:",
        reason
      );

      setTimeout(() => {

        connectBot();

      }, 10000);
    }
  );
}

// ── START ──────────────────────────
connectBot();
