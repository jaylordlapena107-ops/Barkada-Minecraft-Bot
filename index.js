const mc =
require(
  "minecraft-protocol"
);

const express =
require("express");

const app =
express();

// ── WEB SERVER ─────────────────────
app.get(
  "/",
  (req, res) => {

    res.send(
      "Bot Online"
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

// ── CONNECT BOT ────────────────────
function connectBot() {

  console.log(
    "Connecting..."
  );

  const client =
    mc.createClient({

      host:
        "barkadacraftsmp.sg1-mczie.fun",

      port:
        4090,

      username:
        "BarkadaBot",

      auth:
        "offline",

      version:
        "1.19.4"
    });

  // ── CONNECTED ────────────────────
  client.on(
    "connect",
    () => {

      console.log(
        "Connected!"
      );
    }
  );

  // ── CHAT DETECTION ───────────────
  client.on(
    "packet",
    (data, meta) => {

      try {

        if (
          meta.name !==
          "system_chat"
        ) return;

        const msg =
          JSON.stringify(data);

        // show chat only
        console.log(
          "[CHAT]",
          msg
        );

        // auto register
        if (
          msg.includes(
            "/register"
          )
        ) {

          console.log(
            "Registering..."
          );

          client.write(
            "chat_command",
            {
              command:
                "register 011020 011020"
            }
          );
        }

        // auto login
        if (
          msg.includes(
            "/login"
          )
        ) {

          console.log(
            "Logging in..."
          );

          client.write(
            "chat_command",
            {
              command:
                "login 011020"
            }
          );
        }

      } catch (e) {

        console.log(e);
      }
    }
  );

  // ── KEEP ALIVE ───────────────────
  const keepAlive =
  setInterval(() => {

    try {

      client.write(
        "keep_alive",
        {
          keepAliveId:
            BigInt(Date.now())
        }
      );

    } catch (e) {}

  }, 15000);

  // ── DISCONNECT ───────────────────
  client.on(
    "end",
    () => {

      console.log(
        "Disconnected"
      );

      clearInterval(
        keepAlive
      );

      setTimeout(
        connectBot,
        10000
      );
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
}

// ── START ──────────────────────────
connectBot();
