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

// ── CONNECT BOT ────────────────────
function connectBot() {

  console.log(
    "Connecting bot..."
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
        "1.21.11"
    });

  // ── LOGIN EVENT ──────────────────
  client.on(
    "login",
    () => {

      console.log(
        "Bot joined server!"
      );

      // auto register
      setTimeout(() => {

        try {

          client.write(
            "chat",
            {
              message:
                "/register 011020 011020"
            }
          );

          console.log(
            "Register command sent"
          );

        } catch (e) {

          console.log(
            "REGISTER ERROR:",
            e
          );
        }

      }, 3000);

      // auto login
      setTimeout(() => {

        try {

          client.write(
            "chat",
            {
              message:
                "/login 011020"
            }
          );

          console.log(
            "Login command sent"
          );

        } catch (e) {

          console.log(
            "LOGIN ERROR:",
            e
          );
        }

      }, 6000);

    }
  );

  // ── SHOW CHAT ONLY ───────────────
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

          console.log(
            "[CHAT]",
            msg
          );
        }

      } catch (e) {}
    }
  );

  // ── KEEP ALIVE ───────────────────
  setInterval(() => {

    try {

      client.write(
        "position",
        {
          x: 0,
          y: 0,
          z: 0,
          yaw: 0,
          pitch: 0,
          flags: 0,
          onGround: true
        }
      );

    } catch (e) {}

  }, 10000);

  // ── DISCONNECT ───────────────────
  client.on(
    "end",
    () => {

      console.log(
        "Disconnected."
      );

      setTimeout(() => {

        connectBot();

      }, 10000);
    }
  );

  // ── ERROR ────────────────────────
  client.on(
    "error",
    err => {

      console.log(
        "ERROR:",
        err
      );
    }
  );
}

// ── START BOT ──────────────────────
connectBot();
